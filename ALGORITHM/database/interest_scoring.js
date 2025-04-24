/**
 * Smart Travel Planner - Interest Scoring Algorithm
 * 
 * This module implements the scoring methodology for matching user preferences
 * to destinations based on interest categories.
 */

// Constants for scoring thresholds
const SCORE_THRESHOLDS = {
  MINIMAL: 0.3, // Upper bound for minimal relevance
  MODERATE: 0.6, // Upper bound for moderate relevance
  HIGH: 0.8,     // Upper bound for high relevance
  // 0.9-1.0 is exceptional relevance
};

// Confidence factor weights
const CONFIDENCE_WEIGHTS = {
  RECENCY: 0.3,        // How recent the data is
  EVIDENCE: 0.3,       // Amount of supporting evidence
  EXTERNAL_VALIDATION: 0.2, // Expert opinions, awards, etc.
  USER_FEEDBACK: 0.2   // Volume and consistency of user feedback
};

/**
 * Calculate a match score between user preferences and a destination
 * 
 * @param {Object} userPreferences - Map of interest category IDs to preference intensity (0.0-1.0)
 * @param {Object} destination - Destination object with interest scores
 * @param {Array} destinationInterests - Array of destination-interest mappings with scores
 * @return {Object} Match score and explanation
 */
function calculateMatchScore(userPreferences, destination, destinationInterests) {
  let totalScore = 0;
  let weightedTotal = 0;
  let matchExplanations = [];
  
  // Create a map of interest category IDs to scores for this destination
  const interestScores = {};
  destinationInterests.forEach(item => {
    interestScores[item.category_id] = {
      score: item.score,
      evidence: item.supporting_evidence
    };
  });
  
  // Calculate match score for each user preference
  for (const [categoryId, preferenceIntensity] of Object.entries(userPreferences)) {
    if (interestScores[categoryId]) {
      // Calculate weighted score for this interest
      const interestScore = interestScores[categoryId].score;
      const weightedScore = preferenceIntensity * interestScore;
      
      // Add to totals
      totalScore += weightedScore;
      weightedTotal += preferenceIntensity; // Sum of weights
      
      // Generate explanation if significant match
      if (weightedScore > 0.5) {
        matchExplanations.push({
          category_id: categoryId,
          user_interest: preferenceIntensity,
          destination_score: interestScore,
          weighted_contribution: weightedScore,
          evidence: interestScores[categoryId].evidence
        });
      }
    }
  }
  
  // Normalize the final score
  let normalizedScore = 0;
  if (weightedTotal > 0) {
    normalizedScore = totalScore / weightedTotal;
  }
  
  // Sort explanations by contribution
  matchExplanations.sort((a, b) => b.weighted_contribution - a.weighted_contribution);
  
  return {
    destination_id: destination.destination_id,
    destination_name: destination.name,
    match_score: normalizedScore,
    match_explanations: matchExplanations.slice(0, 5) // Top 5 reasons
  };
}

/**
 * Extract and normalize user preferences from natural language input
 * 
 * @param {string} userInput - Natural language description of preferences
 * @param {Array} interestCategories - Available interest categories
 * @return {Object} Normalized preference intensities by category ID
 */
function extractUserPreferences(userInput, interestCategories) {
  // This is a simplified implementation that would be replaced with NLP
  // In a real implementation, this would use NLP techniques to extract preferences
  
  const preferences = {};
  
  // Simple keyword matching (for demonstration)
  interestCategories.forEach(category => {
    // Check if category name appears in user input
    if (userInput.toLowerCase().includes(category.name.toLowerCase())) {
      // Basic intensity detection
      const strongPatterns = ['love', 'adore', 'really want', 'must have', 'passionate about'];
      const moderatePatterns = ['like', 'enjoy', 'interested in', 'would like'];
      const weakPatterns = ['somewhat', 'a bit', 'maybe', 'if possible'];
      
      let intensity = 0.5; // Default moderate interest
      
      // Check for intensity modifiers
      for (const pattern of strongPatterns) {
        if (userInput.toLowerCase().includes(pattern) && 
            userInput.toLowerCase().indexOf(pattern) < userInput.toLowerCase().indexOf(category.name.toLowerCase()) + 20) {
          intensity = 0.9;
          break;
        }
      }
      
      for (const pattern of moderatePatterns) {
        if (userInput.toLowerCase().includes(pattern) && 
            userInput.toLowerCase().indexOf(pattern) < userInput.toLowerCase().indexOf(category.name.toLowerCase()) + 20) {
          intensity = 0.6;
          break;
        }
      }
      
      for (const pattern of weakPatterns) {
        if (userInput.toLowerCase().includes(pattern) && 
            userInput.toLowerCase().indexOf(pattern) < userInput.toLowerCase().indexOf(category.name.toLowerCase()) + 20) {
          intensity = 0.3;
          break;
        }
      }
      
      // Check for negation
      const negationPatterns = ['not', 'don\'t', 'hate', 'dislike', 'avoid'];
      for (const pattern of negationPatterns) {
        if (userInput.toLowerCase().includes(pattern) && 
            userInput.toLowerCase().indexOf(pattern) < userInput.toLowerCase().indexOf(category.name.toLowerCase()) + 20) {
          intensity = 0; // No interest
          break;
        }
      }
      
      preferences[category.category_id] = intensity;
    }
  });
  
  return preferences;
}

/**
 * Calculate confidence factor for destination-interest scores
 * 
 * @param {Object} interestMapping - Destination-interest mapping
 * @param {Object} metadata - Additional metadata about the mapping
 * @return {number} Confidence factor (0.0-1.0)
 */
function calculateConfidenceFactor(interestMapping, metadata) {
  // Calculate recency score (0-1)
  const now = new Date();
  const lastUpdated = new Date(metadata.last_updated);
  const monthsSinceUpdate = (now - lastUpdated) / (1000 * 60 * 60 * 24 * 30);
  const recencyScore = Math.max(0, 1 - (monthsSinceUpdate / 12)); // Degrades over 12 months
  
  // Calculate evidence score based on length and quality of supporting evidence
  let evidenceScore = 0;
  if (interestMapping.supporting_evidence) {
    // Basic heuristic: longer evidence text likely has more detail
    const evidenceLength = interestMapping.supporting_evidence.length;
    evidenceScore = Math.min(1, evidenceLength / 200); // Normalize by expected length
  }
  
  // External validation score
  const externalValidationScore = metadata.external_validation || 0;
  
  // User feedback score
  const userFeedbackScore = metadata.user_feedback_volume ? 
      (metadata.user_feedback_score * Math.min(1, metadata.user_feedback_volume / 100)) : 0;
  
  // Calculate weighted confidence factor
  const confidenceFactor = 
    (recencyScore * CONFIDENCE_WEIGHTS.RECENCY) +
    (evidenceScore * CONFIDENCE_WEIGHTS.EVIDENCE) +
    (externalValidationScore * CONFIDENCE_WEIGHTS.EXTERNAL_VALIDATION) +
    (userFeedbackScore * CONFIDENCE_WEIGHTS.USER_FEEDBACK);
  
  return confidenceFactor;
}

/**
 * Rank and filter destinations based on match scores
 * 
 * @param {Array} matchScores - Array of destination match scores
 * @param {Object} constraints - User-defined constraints (budget, region, etc.)
 * @return {Array} Ranked and filtered destinations
 */
function rankDestinations(matchScores, constraints = {}) {
  let filteredScores = [...matchScores];
  
  // Apply filters based on constraints
  if (constraints.region) {
    filteredScores = filteredScores.filter(item => 
      item.destination.region === constraints.region);
  }
  
  if (constraints.budget_max) {
    filteredScores = filteredScores.filter(item =>
      item.destination.avg_daily_budget_mid <= constraints.budget_max);
  }
  
  // Sort by match score
  filteredScores.sort((a, b) => b.match_score - a.match_score);
  
  // Apply diversity rules to avoid all-similar recommendations
  const diversifiedResults = diversifyResults(filteredScores);
  
  return diversifiedResults;
}

/**
 * Apply diversity rules to avoid all-similar recommendations
 * 
 * @param {Array} rankedDestinations - Destinations ranked by match score
 * @return {Array} Diversified destination list
 */
function diversifyResults(rankedDestinations, maxSameRegion = 2) {
  // Simple diversity implementation: limit destinations from same region
  const result = [];
  const regionCounts = {};
  
  for (const destination of rankedDestinations) {
    const region = destination.destination.region;
    regionCounts[region] = regionCounts[region] || 0;
    
    if (regionCounts[region] < maxSameRegion) {
      result.push(destination);
      regionCounts[region]++;
    }
  }
  
  return result;
}

// Export functions for use in the application
module.exports = {
  calculateMatchScore,
  extractUserPreferences,
  calculateConfidenceFactor,
  rankDestinations
}; 