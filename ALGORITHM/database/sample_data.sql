-- Smart Travel Planner - Sample Data
-- This file provides example data to demonstrate how the database schema works in practice

-- Sample Destinations
INSERT INTO destinations (
    destination_id, name, country, region, city_type, description,
    latitude, longitude, timezone, language_primary, currency,
    avg_daily_budget_low, avg_daily_budget_mid, avg_daily_budget_high,
    safety_index, data_quality_score
) VALUES
(1, 'Barcelona', 'Spain', 'Southern Europe', 'major_city',
   'Vibrant Catalan city known for architecture, beaches, and cuisine',
   41.3851, 2.1734, 'Europe/Madrid', 'Spanish', 'EUR',
   80.00, 180.00, 350.00, 7, 0.96),

(2, 'Paris', 'France', 'Western Europe', 'major_city',
   'Iconic capital city renowned for art, cuisine, and historic monuments',
   48.8566, 2.3522, 'Europe/Paris', 'French', 'EUR',
   100.00, 200.00, 450.00, 6, 0.98),

(3, 'Santorini', 'Greece', 'Southern Europe', 'small_city',
   'Stunning Aegean island with whitewashed buildings and dramatic caldera views',
   36.3932, 25.4615, 'Europe/Athens', 'Greek', 'EUR',
   85.00, 190.00, 500.00, 9, 0.94);

-- Sample Seasonality Data
INSERT INTO destination_seasonality (
    seasonality_id, destination_id, month, high_season, shoulder_season, low_season,
    avg_temperature, precipitation_mm, crowd_level, price_factor
) VALUES
-- Barcelona seasonality
(101, 1, 7, TRUE, FALSE, FALSE, 25.0, 20.0, 9, 1.5),  -- July (peak summer)
(102, 1, 4, FALSE, TRUE, FALSE, 16.0, 40.0, 7, 1.1),  -- April (spring)
(103, 1, 10, FALSE, TRUE, FALSE, 18.0, 80.0, 6, 0.9), -- October (fall)
(104, 1, 1, FALSE, FALSE, TRUE, 10.0, 40.0, 4, 0.7),  -- January (winter)

-- Paris seasonality
(201, 2, 6, TRUE, FALSE, FALSE, 20.0, 60.0, 9, 1.6),  -- June (peak summer)
(202, 2, 4, FALSE, TRUE, FALSE, 13.0, 45.0, 7, 1.2),  -- April (spring)
(203, 2, 9, FALSE, TRUE, FALSE, 17.0, 55.0, 7, 1.1),  -- September (fall)
(204, 2, 1, FALSE, FALSE, TRUE, 5.0, 50.0, 5, 0.8),   -- January (winter)

-- Santorini seasonality
(301, 3, 7, TRUE, FALSE, FALSE, 26.0, 0.0, 10, 1.8),  -- July (peak season)
(302, 3, 5, FALSE, TRUE, FALSE, 21.0, 10.0, 7, 1.3),  -- May (shoulder)
(303, 3, 10, FALSE, TRUE, FALSE, 19.0, 40.0, 5, 0.9), -- October (shoulder)
(304, 3, 1, FALSE, FALSE, TRUE, 12.0, 70.0, 2, 0.6);  -- January (off-season)

-- Sample Interest Scores for Destinations
INSERT INTO destination_interests (destination_id, category_id, score, supporting_evidence)
VALUES
-- Barcelona interest scores
(1, 2, 0.90, 'Rich cultural heritage spanning Roman times to Modernisme'),
(1, 204, 0.97, 'World-famous for Gaudí architecture including Sagrada Família and Park Güell'),
(1, 202, 0.88, 'Home to outstanding museums including Picasso Museum and MACBA'),
(1, 3, 0.92, 'Renowned for Catalan cuisine, tapas, and food markets'),
(1, 303, 0.94, 'Excellent street food culture centered around La Boqueria and other markets'),
(1, 4, 0.90, 'Vibrant nightlife with numerous bars, clubs and entertainment venues'),
(1, 402, 0.89, 'World-class nightclub scene including beachfront venues'),
(1, 102, 0.85, 'Urban beaches including Barceloneta with Mediterranean coastline'),
(1, 8, 0.93, 'Highly walkable city with distinctive neighborhoods'),
(1, 804, 0.88, 'Significant street art throughout neighborhoods like El Raval and Poblenou'),

-- Paris interest scores
(2, 2, 0.97, 'Exceptional concentration of museums, historic sites, and cultural institutions'),
(2, 202, 0.98, 'World-class museums including the Louvre, Musée d\'Orsay, and Centre Pompidou'),
(2, 204, 0.95, 'Iconic architectural landmarks from medieval to modern'),
(2, 3, 0.96, 'Capital of French cuisine with renowned restaurants and culinary traditions'),
(2, 302, 0.97, 'Home to numerous Michelin-starred restaurants and fine dining establishments'),
(2, 7, 0.92, 'Premier luxury shopping destination with fashion houses and boutiques'),
(2, 703, 0.98, 'Global center for luxury fashion and retail'),
(2, 4, 0.87, 'Rich entertainment offerings including opera, theater, and cabaret'),
(2, 406, 0.91, 'Historic theaters and performance venues including the Opéra Garnier'),
(2, 8, 0.95, 'Highly walkable city with distinctive neighborhoods and boulevards'),

-- Santorini interest scores
(3, 1, 0.93, 'Breathtaking natural landscapes shaped by volcanic activity'),
(3, 106, 0.98, 'Spectacular caldera views and volcanic formations'),
(3, 102, 0.94, 'Distinctive beaches including red and black volcanic sand'),
(3, 5, 0.92, 'Premier relaxation destination with luxury accommodations'),
(3, 505, 0.94, 'Exceptional beach relaxation experiences'),
(3, 204, 0.90, 'Unique Cycladic architecture with cave houses and blue-domed churches'),
(3, 3, 0.89, 'Growing reputation for Greek cuisine using local ingredients'),
(3, 301, 0.91, 'Authentic Greek tavernas and restaurants featuring local produce'),
(3, 306, 0.88, 'Indigenous wine production with unique volcanic terroir'),
(3, 802, 0.96, 'Exceptional sunset viewing and panoramic vistas');

-- Sample Attractions
INSERT INTO attractions (
    attraction_id, destination_id, name, description,
    importance_score, avg_visit_hours, avg_cost,
    latitude, longitude
) VALUES
-- Barcelona attractions
(101, 1, 'Sagrada Família', 'Gaudí\'s masterpiece basilica under construction since 1882',
    0.98, 2.5, 26.00, 41.4036, 2.1744),
(102, 1, 'Park Güell', 'Fantastical public park designed by Gaudí with mosaics and structures',
    0.92, 2.0, 10.00, 41.4145, 2.1527),
(103, 1, 'La Boqueria Market', 'Famous public market with food stalls and eateries',
    0.89, 1.5, 0.00, 41.3817, 2.1718),

-- Paris attractions
(201, 2, 'Eiffel Tower', 'Iconic iron lattice tower and symbol of Paris',
    0.98, 3.0, 26.00, 48.8584, 2.2945),
(202, 2, 'Louvre Museum', 'World\'s largest art museum housing the Mona Lisa',
    0.97, 4.0, 17.00, 48.8606, 2.3376),
(203, 2, 'Notre-Dame Cathedral', 'Medieval Catholic cathedral with Gothic architecture',
    0.95, 2.0, 0.00, 48.8530, 2.3499),

-- Santorini attractions
(301, 3, 'Oia Sunset Point', 'Famous viewpoint for watching Santorini\'s legendary sunsets',
    0.96, 2.0, 0.00, 36.4618, 25.3764),
(302, 3, 'Red Beach', 'Distinctive beach with red volcanic cliffs and sand',
    0.90, 3.0, 0.00, 36.3477, 25.3967),
(303, 3, 'Ancient Akrotiri', 'Archaeological site of a Minoan Bronze Age settlement',
    0.92, 2.0, 12.00, 36.3517, 25.4037);

-- Sample Attraction-Interest Mappings
INSERT INTO attraction_interests (attraction_id, category_id, score)
VALUES
-- Sagrada Família
(101, 2, 0.98),   -- Culture & Heritage
(101, 204, 0.99), -- Architecture
(101, 203, 0.95), -- Religious Sites

-- Park Güell
(102, 2, 0.93),   -- Culture & Heritage
(102, 204, 0.96), -- Architecture
(102, 803, 0.88), -- Public Spaces

-- La Boqueria Market
(103, 3, 0.95),   -- Food & Gastronomy
(103, 301, 0.96), -- Local Cuisine
(103, 303, 0.98), -- Street Food
(103, 701, 0.94), -- Local Markets

-- Eiffel Tower
(201, 2, 0.95),   -- Culture & Heritage
(201, 204, 0.97), -- Architecture
(201, 802, 0.99), -- City Views

-- Louvre Museum
(202, 2, 0.99),   -- Culture & Heritage
(202, 202, 0.99), -- Museums & Galleries
(202, 201, 0.95), -- Historical Sites

-- Notre-Dame Cathedral
(203, 2, 0.96),   -- Culture & Heritage
(203, 203, 0.98), -- Religious Sites
(203, 204, 0.97), -- Architecture
(203, 201, 0.94), -- Historical Sites

-- Oia Sunset Point
(301, 1, 0.95),   -- Nature & Outdoors
(301, 106, 0.98), -- Scenic Landscapes
(301, 802, 0.99), -- City Views

-- Red Beach
(302, 1, 0.93),   -- Nature & Outdoors
(302, 102, 0.97), -- Beaches & Islands
(302, 106, 0.94), -- Scenic Landscapes
(302, 505, 0.91), -- Beach Relaxation

-- Ancient Akrotiri
(303, 2, 0.95),   -- Culture & Heritage
(303, 201, 0.97), -- Historical Sites
(303, 205, 0.92); -- Indigenous Cultures

-- Sample Accommodation Options
INSERT INTO accommodation_options (
    accommodation_id, destination_id, type, price_category,
    avg_nightly_cost, location_quality_score, avg_rating
) VALUES
-- Barcelona accommodations
(101, 1, 'hotel', 'luxury', 300.00, 0.92, 4.7),
(102, 1, 'apartment', 'mid-range', 120.00, 0.90, 4.3),
(103, 1, 'hostel', 'budget', 30.00, 0.85, 4.1),

-- Paris accommodations
(201, 2, 'hotel', 'luxury', 450.00, 0.94, 4.8),
(202, 2, 'apartment', 'mid-range', 180.00, 0.89, 4.2),
(203, 2, 'hostel', 'budget', 40.00, 0.82, 4.0),

-- Santorini accommodations
(301, 3, 'resort', 'luxury', 500.00, 0.97, 4.9),
(302, 3, 'hotel', 'mid-range', 200.00, 0.93, 4.5),
(303, 3, 'guesthouse', 'budget', 80.00, 0.88, 4.2); 