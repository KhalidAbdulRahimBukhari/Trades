package com.trade.system.service;

import com.trade.system.dto.CreateTradeRequest;
import com.trade.system.dto.TradeReportResponse;
import com.trade.system.entity.Trade;
import com.trade.system.entity.TradeStatus;
import com.trade.system.event.TradeEvent;
import com.trade.system.exception.TradeNotFoundException;
import com.trade.system.repository.TradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Contains all the business logic for trade operations.
 *
 * The controller calls these methods — it doesn't know about
 * the database or events, that's all handled here.
 */
@Service
@RequiredArgsConstructor
public class TradeService {

    private final TradeRepository tradeRepository;

    // Used to fire Spring events (e.g. trade created, trade settled)
    private final ApplicationEventPublisher eventPublisher;

    /**
     * Creates a new trade and saves it to the database.
     * Validates that quantity and price are positive numbers.
     */
    public Trade createTrade(CreateTradeRequest request) {
        // Simple validation — throws 400 if invalid
        if (request.getQuantity() <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than 0");
        }
        if (request.getPrice() <= 0) {
            throw new IllegalArgumentException("Price must be greater than 0");
        }

        // Build the new trade entity
        Trade trade = new Trade();
        trade.setProduct(request.getProduct());
        trade.setQuantity(request.getQuantity());
        trade.setPrice(request.getPrice());
        trade.setStatus(TradeStatus.PENDING); // always starts as PENDING

        // Save to database
        Trade saved = tradeRepository.save(trade);

        // Fire a Spring event so other parts of the app can react
        eventPublisher.publishEvent(new TradeEvent(this, "CREATED", saved));

        return saved;
    }

    /**
     * Returns all trades from the database.
     */
    public List<Trade> getAllTrades() {
        return tradeRepository.findAll();
    }

    /**
     * Changes a trade's status from PENDING to SETTLED.
     * Throws 404 if the trade doesn't exist.
     */
    public Trade settleTrade(Long id) {
        // Look up the trade — throws TradeNotFoundException if not found
        Trade trade = tradeRepository.findById(id)
                .orElseThrow(() -> new TradeNotFoundException(id));

        trade.setStatus(TradeStatus.SETTLED);

        Trade updated = tradeRepository.save(trade);

        // Fire a Spring event
        eventPublisher.publishEvent(new TradeEvent(this, "SETTLED", updated));

        return updated;
    }

    /**
     * Returns a summary report of all trades.
     * totalVolume = sum of (quantity * price) for every trade.
     */
    public TradeReportResponse getReport() {
        List<Trade> trades = tradeRepository.findAll();

        long totalTrades = trades.size();

        double totalVolume = trades.stream()
                .mapToDouble(t -> t.getQuantity() * t.getPrice())
                .sum();

        return new TradeReportResponse(totalTrades, totalVolume);
    }
}
