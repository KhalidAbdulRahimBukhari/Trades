package com.trade.system.controller;

import com.trade.system.dto.CreateTradeRequest;
import com.trade.system.dto.TradeReportResponse;
import com.trade.system.entity.Trade;
import com.trade.system.service.TradeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for the Trade API.
 *
 * Handles HTTP requests and delegates all work to TradeService.
 * The controller's only job is: receive request → call service → return response.
 *
 * Base path: /api/trades
 */
@RestController
@RequestMapping("/api/trades")
@RequiredArgsConstructor
// Allow requests from the React frontend running on localhost:5173
@CrossOrigin(origins = "http://localhost:5173")
public class TradeController {

    private final TradeService tradeService;

    /**
     * POST /api/trades
     * Creates a new trade.
     * Returns 201 Created with the saved trade object.
     */
    @PostMapping
    public ResponseEntity<Trade> createTrade(@RequestBody CreateTradeRequest request) {
        Trade created = tradeService.createTrade(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    /**
     * GET /api/trades
     * Returns a list of all trades.
     */
    @GetMapping
    public ResponseEntity<List<Trade>> getAllTrades() {
        return ResponseEntity.ok(tradeService.getAllTrades());
    }

    /**
     * POST /api/trades/{id}/settle
     * Settles a trade by ID.
     * Returns 404 if not found (handled by GlobalExceptionHandler).
     */
    @PostMapping("/{id}/settle")
    public ResponseEntity<Trade> settleTrade(@PathVariable Long id) {
        Trade settled = tradeService.settleTrade(id);
        return ResponseEntity.ok(settled);
    }

    /**
     * GET /api/trades/report
     * Returns a summary of all trades (count + total volume).
     *
     * NOTE: This must be declared BEFORE /{id}/settle to avoid
     * Spring misinterpreting "report" as a path variable ID.
     */
    @GetMapping("/report")
    public ResponseEntity<TradeReportResponse> getReport() {
        return ResponseEntity.ok(tradeService.getReport());
    }
}
