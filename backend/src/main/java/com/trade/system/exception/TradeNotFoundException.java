package com.trade.system.exception;

/**
 * Thrown when a trade with a given ID does not exist in the database.
 * The controller will catch this and return a 404 response.
 */
public class TradeNotFoundException extends RuntimeException {

    public TradeNotFoundException(Long id) {
        super("Trade not found with id: " + id);
    }
}
