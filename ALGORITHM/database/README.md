# Smart Travel Planner - Database Design

This directory contains the database schema and related files for the Smart Travel Planner application's data infrastructure.

## Schema Overview

The database schema is designed to support Phase 1 (Interest Analysis & Destination Selection) of the Smart Travel Planner algorithm, with consideration for future phases. It includes:

### Core Tables

- **destinations**: Contains comprehensive information about travel destinations, including geographic data, cost indicators, and basic metadata.
- **interest_categories**: Hierarchical taxonomy of interest categories used for matching users to destinations.
- **destination_interests**: Maps destinations to interest categories with quantitative scores.
- **attractions**: Major points of interest within destinations.
- **attraction_interests**: Maps attractions to interest categories with quantitative scores.
- **destination_seasonality**: Monthly data affecting travel experience and costs.
- **accommodation_options**: Typical accommodation choices with cost indicators.
- **travel_advisories**: Safety and travel advisory information.

## Design Considerations

### Interest Matching

The schema supports the core requirement of matching user interests to destinations by:

1. Maintaining a hierarchical interest taxonomy
2. Scoring destinations against each interest category
3. Providing supporting evidence for scores
4. Extending interest mapping to specific attractions

### Cost Estimation

Budget optimization is supported through:

1. Multiple budget tiers per destination
2. Seasonal price factors
3. Accommodation cost indicators at different price points
4. Attraction cost tracking

### Geographic Organization

The schema enables geographic organization for itinerary planning:

1. Country and region classification
2. Precise latitude/longitude coordinates
3. Relationship between destinations and their attractions

## Implementation Notes

- Add indexes as query patterns emerge to optimize performance
- Consider partitioning large tables by region for improved query performance
- The schema is SQL standard-compatible but may need specific adaptations for your chosen database system

## Next Steps

1. Create seed data for interest categories
2. Implement data import pipeline for destinations
3. Develop scoring methodology for destination-interest mappings 