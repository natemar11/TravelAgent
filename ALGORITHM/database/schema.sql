-- Smart Travel Planner - Database Schema
-- This schema defines the data structure for the travel planner algorithm
-- Phase 1: Interest Analysis & Destination Selection

-- Core Destinations Table
CREATE TABLE destinations (
    destination_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    region VARCHAR(100) NOT NULL,
    city_type VARCHAR(20) CHECK (city_type IN ('major_city', 'small_city', 'town', 'rural')) NOT NULL,
    description TEXT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    timezone VARCHAR(50),
    language_primary VARCHAR(50),
    languages_secondary VARCHAR(255),
    currency VARCHAR(10),
    avg_daily_budget_low DECIMAL(10, 2),
    avg_daily_budget_mid DECIMAL(10, 2),
    avg_daily_budget_high DECIMAL(10, 2),
    safety_index INTEGER CHECK (safety_index BETWEEN 1 AND 10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_quality_score DECIMAL(3, 2) CHECK (data_quality_score BETWEEN 0 AND 1)
);

-- Seasonality Information
CREATE TABLE destination_seasonality (
    seasonality_id SERIAL PRIMARY KEY,
    destination_id INTEGER REFERENCES destinations(destination_id),
    month INTEGER CHECK (month BETWEEN 1 AND 12),
    high_season BOOLEAN DEFAULT FALSE,
    shoulder_season BOOLEAN DEFAULT FALSE,
    low_season BOOLEAN DEFAULT FALSE,
    avg_temperature DECIMAL(5, 2),
    precipitation_mm DECIMAL(6, 2),
    crowd_level INTEGER CHECK (crowd_level BETWEEN 1 AND 10),
    price_factor DECIMAL(3, 2) -- multiplier for prices during this season
);

-- Interest Categories
CREATE TABLE interest_categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    parent_category_id INTEGER REFERENCES interest_categories(category_id),
    description TEXT
);

-- Destination-Interest Mapping (with scores)
CREATE TABLE destination_interests (
    destination_id INTEGER REFERENCES destinations(destination_id),
    category_id INTEGER REFERENCES interest_categories(category_id),
    score DECIMAL(3, 2) CHECK (score BETWEEN 0 AND 1),
    supporting_evidence TEXT,
    PRIMARY KEY (destination_id, category_id)
);

-- Major Attractions
CREATE TABLE attractions (
    attraction_id SERIAL PRIMARY KEY,
    destination_id INTEGER REFERENCES destinations(destination_id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    importance_score DECIMAL(3, 2) CHECK (importance_score BETWEEN 0 AND 1),
    avg_visit_hours DECIMAL(4, 2),
    avg_cost DECIMAL(10, 2),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8)
);

-- Attraction-Interest Mapping
CREATE TABLE attraction_interests (
    attraction_id INTEGER REFERENCES attractions(attraction_id),
    category_id INTEGER REFERENCES interest_categories(category_id),
    score DECIMAL(3, 2) CHECK (score BETWEEN 0 AND 1),
    PRIMARY KEY (attraction_id, category_id)
);

-- Accommodation Information
CREATE TABLE accommodation_options (
    accommodation_id SERIAL PRIMARY KEY,
    destination_id INTEGER REFERENCES destinations(destination_id),
    type VARCHAR(20) CHECK (type IN ('hotel', 'hostel', 'apartment', 'resort', 'guesthouse')) NOT NULL,
    price_category VARCHAR(20) CHECK (price_category IN ('budget', 'mid-range', 'luxury')) NOT NULL,
    avg_nightly_cost DECIMAL(10, 2),
    location_quality_score DECIMAL(3, 2) CHECK (location_quality_score BETWEEN 0 AND 1),
    avg_rating DECIMAL(3, 2) CHECK (avg_rating BETWEEN 0 AND 5)
);

-- Travel Advisories
CREATE TABLE travel_advisories (
    advisory_id SERIAL PRIMARY KEY,
    destination_id INTEGER REFERENCES destinations(destination_id),
    issuing_authority VARCHAR(100) NOT NULL,
    advisory_level INTEGER CHECK (advisory_level BETWEEN 1 AND 4),
    description TEXT,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    is_active BOOLEAN DEFAULT TRUE
);

-- Indexes for performance optimization
CREATE INDEX idx_destinations_country ON destinations(country);
CREATE INDEX idx_destinations_region ON destinations(region);
CREATE INDEX idx_destination_interests_category ON destination_interests(category_id);
CREATE INDEX idx_attraction_interests_category ON attraction_interests(category_id);
CREATE INDEX idx_seasonality_destination_month ON destination_seasonality(destination_id, month); 