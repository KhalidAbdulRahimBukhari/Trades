package com.trade.system.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Represents a single trade in the system.
 * Maps to the "trades" table in PostgreSQL.
 */
@Entity
@Table(name = "trades")
@Getter
@Setter
@NoArgsConstructor
public class Trade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // The product being traded (e.g. "Electricity", "Gas")
    @Column(nullable = false)
    private String product;

    // How many units are being traded
    @Column(nullable = false)
    private double quantity;

    // Price per unit
    @Column(nullable = false)
    private double price;

    // Current state of the trade
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TradeStatus status = TradeStatus.PENDING;

    // Timestamp set automatically when the trade is created
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
