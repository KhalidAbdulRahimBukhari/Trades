package com.trade.system.repository;

import com.trade.system.entity.Trade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Handles all database operations for Trade entities.
 *
 * By extending JpaRepository, we get these methods for free:
 * - save(trade)         → INSERT or UPDATE
 * - findById(id)        → SELECT by primary key
 * - findAll()           → SELECT all rows
 * - deleteById(id)      → DELETE by primary key
 * - count()             → SELECT COUNT(*)
 */
@Repository
public interface TradeRepository extends JpaRepository<Trade, Long> {
    // No extra methods needed — JpaRepository covers everything we use
}
