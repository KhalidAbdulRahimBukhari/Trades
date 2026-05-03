-- =============================================
-- Trade Processing System - Database Schema
-- =============================================

-- Create the trades table if it doesn't exist
CREATE TABLE IF NOT EXISTS trades (
    id          BIGSERIAL PRIMARY KEY,
    product     VARCHAR(255)   NOT NULL,
    quantity    DOUBLE PRECISION NOT NULL,
    price       DOUBLE PRECISION NOT NULL,
    status      VARCHAR(50)    NOT NULL DEFAULT 'PENDING',
    created_at  TIMESTAMP      NOT NULL DEFAULT CURRENT_TIMESTAMP
);
