# Smart Travel Planner - Interest Scoring System

This directory contains the implementation of the interest scoring system for the Smart Travel Planner algorithm. The scoring system is the core of Phase 1, which matches user preferences to destinations based on interest categories.

## Algorithm Overview

The interest scoring algorithm works in four main steps:

1. **Extract user preferences** from natural language input
2. **Calculate match scores** between user preferences and destination interest profiles
3. **Apply constraints** such as budget, region, or seasonality
4. **Rank and diversify** results to provide relevant and varied recommendations

## Files in this Directory

- `interest_scoring.js` - Core implementation of the scoring algorithm
- `example_scoring.js` - Example of using the algorithm with sample data
- `run_example.js` - Script to run the example
- `scoring_methodology.md` - Detailed explanation of the scoring methodology
- `sample_data.sql` - Sample destination and interest data for testing
- `interest_categories_seed.sql` - Initial interest category taxonomy

## Running the Example

To run the example and see the algorithm in action:

```bash
node run_example.js
```

This will display sample user queries and how the algorithm matches them to destinations, including explanations for why each destination was recommended.

## Algorithm Details

### User Preference Extraction

The algorithm extracts preferences from natural language input by:
- Identifying interest categories mentioned in the input
- Determining the intensity of interest for each category
- Detecting negations and exclusions
- Normalizing preference intensities to a 0.0-1.0 scale

### Match Score Calculation

Match scores are calculated by:
1. For each user preference, finding the corresponding destination interest score
2. Multiplying the preference intensity by the destination interest score
3. Summing these weighted scores across all interest categories
4. Normalizing the result based on total preference weight

### Explanation Generation

For each match, the algorithm generates explanations by:
- Identifying the interest categories that contributed most to the match
- Retrieving supporting evidence for those interest scores
- Ranking explanations by their contribution to the final score

### Confidence Factors

The algorithm includes confidence factors based on:
- Recency of data
- Amount of supporting evidence
- External validation (awards, expert opinions)
- Volume of user feedback

### Diversity Rules

To ensure varied recommendations, the algorithm:
- Limits the number of destinations from the same region
- Balances high-scoring matches with diversity
- Prioritizes destinations that satisfy different interest categories

## Integration

In a production environment, this scoring system would be integrated with:
- A database storing destination and interest data
- A more sophisticated NLP system for preference extraction
- A user interface for collecting preferences and displaying results
- Analytics for tracking recommendation performance and user satisfaction

## Next Steps

1. Enhance natural language processing for more accurate preference extraction
2. Implement adaptive scoring based on user feedback
3. Add personalization by tracking user history and preferences
4. Expand the algorithm to include seasonality optimization 