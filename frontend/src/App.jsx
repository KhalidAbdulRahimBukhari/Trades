import { useTrades } from './hooks/useTrades'
import StatsBar        from './components/StatsBar'
import TradeChart      from './components/TradeChart'
import FilterBar       from './components/FilterBar'
import TradeList       from './components/TradeList'
import CreateTradeForm from './components/CreateTradeForm'

/**
 * App — root component
 *
 * All trade state is managed by the useTrades hook.
 * This component wires together the UI sections.
 *
 * Layout:
 *   Header
 *   StatsBar (4 stat cards)
 *   [CreateTradeForm]  |  [TradeChart]
 *   FilterBar
 *   TradeList
 */
function App() {
  const {
    trades, visibleTrades, stats,
    loading, fetchError, settlingIds,
    loadTrades, settleTrade,
    statusFilter, setStatusFilter,
    sortBy,       setSortBy,
    searchQuery,  setSearchQuery,
  } = useTrades()

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <span className="header-logo">◈</span>
          <div>
            <h1>Trade Processing</h1>
            <p className="header-sub">Internal trading desk dashboard</p>
          </div>
        </div>
        <button
          className="btn-refresh"
          onClick={loadTrades}
          disabled={loading}
          title="Refresh"
        >
          {loading ? <span className="spinner spinner-sm" /> : '↻ Refresh'}
        </button>
      </header>

      <main>
        {fetchError && (
          <div className="banner-error">{fetchError}</div>
        )}

        {/* 4 stat cards computed from trades array */}
        <StatsBar stats={stats} />

        {/* Two-column: form + chart */}
        <div className="two-col">
          <CreateTradeForm onTradeCreated={loadTrades} />
          <TradeChart stats={stats} />
        </div>

        {/* Filter + sort + search controls */}
        <FilterBar
          searchQuery={searchQuery}   setSearchQuery={setSearchQuery}
          statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          sortBy={sortBy}             setSortBy={setSortBy}
          visibleCount={visibleTrades.length}
          totalCount={trades.length}
        />

        {/* Trade table */}
        {loading && trades.length === 0 ? (
          <div className="card loading-card">
            <span className="spinner" /> Loading trades…
          </div>
        ) : (
          <TradeList
            trades={visibleTrades}
            totalCount={trades.length}
            settlingIds={settlingIds}
            onSettle={settleTrade}
          />
        )}
      </main>
    </div>
  )
}

export default App
