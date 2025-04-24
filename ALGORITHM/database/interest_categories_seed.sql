-- Smart Travel Planner - Interest Categories Seed Data
-- This file provides the initial taxonomy of interest categories for the travel planner

-- Root level categories
INSERT INTO interest_categories (category_id, name, parent_category_id, description)
VALUES 
(1, 'Nature & Outdoors', NULL, 'Natural attractions and outdoor activities'),
(2, 'Culture & Heritage', NULL, 'Cultural experiences, historical sites, and heritage attractions'),
(3, 'Food & Gastronomy', NULL, 'Culinary experiences and food-related activities'),
(4, 'Entertainment & Nightlife', NULL, 'Entertainment venues, shows, and nightlife options'),
(5, 'Relaxation & Wellness', NULL, 'Relaxation activities and wellness experiences'),
(6, 'Adventure & Sports', NULL, 'Adventure activities and sports-related experiences'),
(7, 'Shopping & Markets', NULL, 'Shopping destinations and market experiences'),
(8, 'Urban Exploration', NULL, 'City exploration and urban experiences');

-- Nature & Outdoors subcategories
INSERT INTO interest_categories (category_id, name, parent_category_id, description)
VALUES 
(101, 'National Parks', 1, 'Protected natural areas and national parks'),
(102, 'Beaches & Islands', 1, 'Coastal destinations and island getaways'),
(103, 'Mountains & Hiking', 1, 'Mountain landscapes and hiking opportunities'),
(104, 'Wildlife & Safari', 1, 'Wildlife viewing and safari experiences'),
(105, 'Lakes & Rivers', 1, 'Freshwater destinations including lakes, rivers and waterfalls'),
(106, 'Scenic Landscapes', 1, 'Notable and beautiful natural landscapes'),
(107, 'Botanical Gardens', 1, 'Gardens featuring plants and landscaping');

-- Culture & Heritage subcategories
INSERT INTO interest_categories (category_id, name, parent_category_id, description)
VALUES 
(201, 'Historical Sites', 2, 'Places of historical significance'),
(202, 'Museums & Galleries', 2, 'Museums, art galleries and exhibition spaces'),
(203, 'Religious Sites', 2, 'Temples, churches, mosques and other religious destinations'),
(204, 'Architecture', 2, 'Notable architectural attractions and building styles'),
(205, 'Indigenous Cultures', 2, 'Experiences connected to indigenous peoples and cultures'),
(206, 'Performing Arts', 2, 'Theater, dance, music and other performing arts'),
(207, 'Festivals & Events', 2, 'Cultural celebrations, festivals and events');

-- Food & Gastronomy subcategories
INSERT INTO interest_categories (category_id, name, parent_category_id, description)
VALUES 
(301, 'Local Cuisine', 3, 'Traditional and local food experiences'),
(302, 'Fine Dining', 3, 'High-end culinary experiences'),
(303, 'Street Food', 3, 'Informal street and market food'),
(304, 'Cooking Classes', 3, 'Participatory food preparation experiences'),
(305, 'Food Tours', 3, 'Guided culinary exploration'),
(306, 'Wineries & Vineyards', 3, 'Wine tasting and vineyard experiences'),
(307, 'Breweries & Distilleries', 3, 'Beer, spirits and other beverage experiences');

-- Entertainment & Nightlife subcategories
INSERT INTO interest_categories (category_id, name, parent_category_id, description)
VALUES 
(401, 'Live Music', 4, 'Concerts and live music venues'),
(402, 'Nightclubs', 4, 'Dancing and club experiences'),
(403, 'Bars & Pubs', 4, 'Drinking establishments'),
(404, 'Casinos & Gambling', 4, 'Gaming and gambling venues'),
(405, 'Theme Parks', 4, 'Amusement and theme parks'),
(406, 'Theaters & Shows', 4, 'Theatrical performances and shows'),
(407, 'Cinemas & Film', 4, 'Movie theaters and film-related attractions');

-- Relaxation & Wellness subcategories
INSERT INTO interest_categories (category_id, name, parent_category_id, description)
VALUES 
(501, 'Spas & Massages', 5, 'Spa treatments and massage services'),
(502, 'Hot Springs', 5, 'Natural thermal springs and baths'),
(503, 'Yoga & Meditation', 5, 'Mind-body wellness practices'),
(504, 'Retreats', 5, 'Dedicated wellness retreat experiences'),
(505, 'Beach Relaxation', 5, 'Leisure time at beaches'),
(506, 'Health Resorts', 5, 'Dedicated wellness facilities and resorts');

-- Adventure & Sports subcategories
INSERT INTO interest_categories (category_id, name, parent_category_id, description)
VALUES 
(601, 'Water Sports', 6, 'Aquatic activities like surfing, diving, and kayaking'),
(602, 'Winter Sports', 6, 'Snow activities like skiing and snowboarding'),
(603, 'Hiking & Trekking', 6, 'Trail-based walking activities'),
(604, 'Cycling', 6, 'Bicycle-based activities'),
(605, 'Extreme Sports', 6, 'High-adrenaline activities like bungee jumping and skydiving'),
(606, 'Team Sports', 6, 'Participation or spectating team sports'),
(607, 'Climbing', 6, 'Rock climbing and mountaineering');

-- Shopping & Markets subcategories
INSERT INTO interest_categories (category_id, name, parent_category_id, description)
VALUES 
(701, 'Local Markets', 7, 'Traditional markets selling local goods'),
(702, 'Artisan Crafts', 7, 'Handmade goods and crafts'),
(703, 'Luxury Shopping', 7, 'High-end retail experiences'),
(704, 'Malls & Shopping Districts', 7, 'Dedicated shopping areas'),
(705, 'Souvenirs', 7, 'Items purchased as mementos'),
(706, 'Antiques & Vintage', 7, 'Historical and collectible items');

-- Urban Exploration subcategories
INSERT INTO interest_categories (category_id, name, parent_category_id, description)
VALUES 
(801, 'City Walking', 8, 'Exploring urban areas on foot'),
(802, 'City Views', 8, 'Observation points and city vistas'),
(803, 'Public Spaces', 8, 'Parks, plazas and communal spaces'),
(804, 'Street Art', 8, 'Murals, graffiti and public art'),
(805, 'Urban Photography', 8, 'Photogenic city locations'),
(806, 'Hidden Gems', 8, 'Lesser-known urban attractions');

-- Third-level categories (examples)
INSERT INTO interest_categories (category_id, name, parent_category_id, description)
VALUES 
-- Nature & Outdoors > Mountains & Hiking
(10301, 'Day Hikes', 103, 'Shorter hiking trails completable in a day'),
(10302, 'Multi-day Treks', 103, 'Extended hiking requiring overnight stays'),
(10303, 'Summit Climbs', 103, 'Reaching mountain peaks'),
(10304, 'Scenic Trails', 103, 'Particularly beautiful hiking routes'),

-- Food & Gastronomy > Local Cuisine
(30101, 'Traditional Restaurants', 301, 'Established eateries serving traditional food'),
(30102, 'Food Markets', 301, 'Markets specializing in local food ingredients'),
(30103, 'Regional Specialties', 301, 'Dishes specific to a particular region'),
(30104, 'Seasonal Cuisine', 301, 'Food that varies by season');

-- This is a starter set and can be expanded with more subcategories as needed 