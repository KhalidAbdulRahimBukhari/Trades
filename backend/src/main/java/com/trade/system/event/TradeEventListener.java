package com.trade.system.event;

import com.trade.system.entity.Trade;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

/**
 * Listens for TradeEvents and logs them.
 *
 * This is our simple "event-driven" behavior.
 * The service fires an event → Spring calls this listener automatically.
 *
 * In a real system, you might send a notification, update analytics,
 * or push to Kafka here — but logging is enough to demonstrate the pattern.
 */
@Slf4j
@Component
public class TradeEventListener {

    @EventListener
    public void handleTradeEvent(TradeEvent event) {
        Trade trade = event.getTrade();

        if ("CREATED".equals(event.getEventType())) {
            log.info("Trade created: {}", trade.getId());
        } else if ("SETTLED".equals(event.getEventType())) {
            log.info("Trade settled: {}", trade.getId());
        }
    }
}
