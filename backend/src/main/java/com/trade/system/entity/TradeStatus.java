package com.trade.system.entity;

/**
 * Represents the lifecycle state of a trade.
 * PENDING  → trade has been submitted but not yet processed
 * SETTLED  → trade has been finalized
 */
public enum TradeStatus {
    PENDING,
    SETTLED
}
