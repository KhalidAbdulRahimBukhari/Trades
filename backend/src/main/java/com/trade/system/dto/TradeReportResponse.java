package com.trade.system.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * Response object for the GET /api/trades/report endpoint.
 *
 * Example response:
 * {
 *   "totalTrades": 10,
 *   "totalVolume": 1000.0
 * }
 */
@Getter
@AllArgsConstructor
public class TradeReportResponse {

    // Total number of trades in the system
    private long totalTrades;

    // Sum of (quantity * price) across all trades
    private double totalVolume;
}
