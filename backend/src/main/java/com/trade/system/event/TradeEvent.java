package com.trade.system.event;

import com.trade.system.entity.Trade;
import org.springframework.context.ApplicationEvent;

/**
 * A simple Spring event that gets fired when something meaningful
 * happens to a trade (created or settled).
 *
 * Spring's event system lets different parts of the app react to
 * things happening without them directly depending on each other.
 */
public class TradeEvent extends ApplicationEvent {

    private final String eventType; // "CREATED" or "SETTLED"
    private final Trade trade;

    public TradeEvent(Object source, String eventType, Trade trade) {
        super(source);
        this.eventType = eventType;
        this.trade = trade;
    }

    public String getEventType() {
        return eventType;
    }

    public Trade getTrade() {
        return trade;
    }
}
