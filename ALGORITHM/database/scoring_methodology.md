# Interest-Destination Scoring Methodology

This document outlines the methodology for quantifying the relevance of destinations and attractions to specific interest categories, which is essential for Phase 1 of the Smart Travel Planner algorithm.

## Score Range

All interest scores use a decimal scale from 0.0 to 1.0:

- **0.0**: The destination/attraction has no relevance to this interest category
- **0.1-0.3**: Minimal relevance - can satisfy this interest but is not notable for it
- **0.4-0.6**: Moderate relevance - reasonably good for this interest
- **0.7-0.8**: High relevance - known for this interest category
- **0.9-1.0**: Exceptional relevance - world-class or iconic for this interest

## Scoring Criteria

### Destination-Interest Scores

Destinations are scored against interest categories using these criteria:

1. **Quantity**: Number of related attractions/experiences available
2. **Quality**: Excellence of the experiences related to the interest
3. **Uniqueness**: How distinctive the destination is for this interest
4. **Accessibility**: How easily visitors can engage with this interest
5. **Seasonality**: Whether the interest can be satisfied year-round or is seasonal

### Attraction-Interest Scores

Individual attractions are scored against interest categories using these criteria:

1. **Relevance**: How directly the attraction relates to the interest category
2. **Quality**: Excellence of the experience for this interest
3. **Uniqueness**: How distinctive or special the attraction is
4. **Visitor Rating**: Aggregated feedback from visitors specific to this interest

## Supporting Evidence

Each destination-interest score must include supporting evidence in the `supporting_evidence` field, which may include:

- Notable attractions supporting this score
- Expert opinions or recognition (awards, designations)
- Visitor feedback statistics
- Comparisons to other destinations in the same category

## Scoring Process

1. **Initial Assignment**: Base scores are assigned by subject matter experts or derived from external data sources
2. **Validation**: Scores are reviewed against established benchmarks for consistency
3. **User Feedback Integration**: Scores are adjusted based on user feedback over time
4. **Periodic Review**: All scores undergo regular review to ensure they remain current

## Hierarchical Scoring

Interest categories form a hierarchy, and scoring follows these principles:

1. A destination/attraction with a high score in a specific subcategory should have at least a moderate score in the parent category
2. Parent category scores should generally represent a weighted average of their subcategories
3. Third-level category scores should be more specific and potentially higher than their parent categories

## Score Usage in Matching Algorithm

The destination-interest scores are used in the matching algorithm as follows:

1. User preferences are mapped to the same interest category taxonomy
2. Preference intensities are normalized to the same 0.0-1.0 scale
3. For each destination, a match score is calculated using:
   - Preference intensity × Destination-interest score
   - Summed across all interest categories
   - Normalized for comparison across destinations

## Data Quality Considerations

Destination-interest scores include a confidence factor based on:

1. Recency of the score assessment
2. Amount of supporting evidence
3. Consistency of external validation
4. Volume of user feedback

This confidence factor is used to weigh scores in the matching algorithm and prioritize data collection efforts. 