import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchAllTrades, settleTrade as apiSettleTrade } from "../api/tradeApi";

/**
 * Central hook that owns all trade data and derived state.
 * Components just call this hook — they don't fetch directly.
 *
 * Responsibilities:
 *  - fetch trades from backend
 *  - handle optimistic settle (update UI first, rollback on error)
 *  - expose filter / sort / search controls
 *  - compute inline statistics
 */
export function useTrades() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [settlingIds, setSettlingIds] = useState(new Set()); // track in-flight settle calls

  // ── Filter / Sort / Search controls ──────────────────────────────────────
  const [statusFilter, setStatusFilter] = useState("ALL"); // ALL | PENDING | SETTLED
  const [sortBy, setSortBy] = useState("newest"); // newest | price | quantity
  const [searchQuery, setSearchQuery] = useState("");

  // ── Load trades from backend ──────────────────────────────────────────────
  const loadTrades = useCallback(async () => {
    setLoading(true);
    setFetchError(null);
    try {
      const data = await fetchAllTrades();
      setTrades(data);
    } catch (err) {
      setFetchError("Backend is starting. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTrades();
  }, [loadTrades]);

  // ── Optimistic settle ─────────────────────────────────────────────────────
  const settleTrade = useCallback(
    async (id) => {
      // 1. Save original state so we can roll back
      const original = trades.find((t) => t.id === id);

      // 2. Update UI immediately — optimistic
      setTrades((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: "SETTLED" } : t)),
      );
      setSettlingIds((prev) => new Set([...prev, id]));

      try {
        // 3. Hit backend
        await apiSettleTrade(id);
      } catch (err) {
        // 4. Rollback on failure
        setTrades((prev) => prev.map((t) => (t.id === id ? original : t)));
        alert(`Failed to settle trade #${id}: ${err.message}`);
      } finally {
        setSettlingIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
      }
    },
    [trades],
  );

  // ── Derived: filtered + sorted + searched trades ──────────────────────────
  const visibleTrades = useMemo(() => {
    let result = [...trades];

    // Filter by status
    if (statusFilter !== "ALL") {
      result = result.filter((t) => t.status === statusFilter);
    }

    // Filter by product name search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((t) => t.product.toLowerCase().includes(q));
    }

    // Sort
    result.sort((a, b) => {
      if (sortBy === "price") return b.price - a.price;
      if (sortBy === "quantity") return b.quantity - a.quantity;
      // 'newest' — fall back to descending ID (proxy for creation order)
      return b.id - a.id;
    });

    return result;
  }, [trades, statusFilter, sortBy, searchQuery]);

  // ── Derived: inline statistics (computed client-side) ────────────────────
  const stats = useMemo(() => {
    const pending = trades.filter((t) => t.status === "PENDING").length;
    const settled = trades.filter((t) => t.status === "SETTLED").length;
    const volume = trades.reduce((sum, t) => sum + t.quantity * t.price, 0);
    return {
      total: trades.length,
      pending,
      settled,
      volume,
    };
  }, [trades]);

  return {
    // data
    trades,
    visibleTrades,
    stats,
    // status
    loading,
    fetchError,
    settlingIds,
    // actions
    loadTrades,
    settleTrade,
    // controls
    statusFilter,
    setStatusFilter,
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
  };
}
