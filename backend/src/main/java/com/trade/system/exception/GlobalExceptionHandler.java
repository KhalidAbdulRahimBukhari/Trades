package com.trade.system.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Catches exceptions thrown anywhere in the app and returns
 * a clean JSON error response instead of a stack trace.
 *
 * @RestControllerAdvice means this applies to all @RestController classes.
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handles TradeNotFoundException → returns 404 Not Found
     */
    @ExceptionHandler(TradeNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleTradeNotFound(TradeNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(Map.of(
                        "timestamp", LocalDateTime.now().toString(),
                        "status", 404,
                        "error", ex.getMessage()
                ));
    }

    /**
     * Handles validation errors (e.g. negative quantity) → returns 400 Bad Request
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<Map<String, Object>> handleIllegalArgument(IllegalArgumentException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(Map.of(
                        "timestamp", LocalDateTime.now().toString(),
                        "status", 400,
                        "error", ex.getMessage()
                ));
    }
}
