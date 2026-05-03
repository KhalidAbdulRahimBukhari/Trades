package com.trade.system.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * Data Transfer Object for creating a new trade.
 * The client sends this JSON body when calling POST /api/trades.
 *
 * Example:
 * {
 *   "product": "Electricity",
 *   "quantity": 100,
 *   "price": 50
 * }
 */
@Getter
@Setter
public class CreateTradeRequest {

    private String product;
    private double quantity;
    private double price;
}
