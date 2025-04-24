/**
 * Smart Travel Planner - Example Scoring Implementation
 * 
 * This file demonstrates how the interest scoring algorithm would be used
 * with the sample data to match user preferences to destinations.
 */

const interestScoring = require('./interest_scoring');

// Example function to load data (in a real app, this would come from a database)
function loadSampleData() {
  // Simplified representation of our sample data
  const destinations = [
    {
      destination_id: 1,
      name: 'Barcelona',
      country: 'Spain',
      region: 'Southern Europe',
      avg_daily_budget_mid: 180
    },
    {
      destination_id: 2,
      name: 'Paris',
      country: 'France',
      region: 'Western Europe',
      avg_daily_budget_mid: 200
    },
    {
      destination_id: 3,
      name: 'Santorini',
      country: 'Greece',
      region: 'Southern Europe',
      avg_daily_budget_mid: 190
    }
  ];

  // Sample interest categories (simplified subset)
  const interestCategories = [
    { category_id: 1, name: 'Nature & Outdoors', parent_category_id: null },
    { category_id: 2, name: 'Culture & Heritage', parent_category_id: null },
    { category_id: 3, name: 'Food & Gastronomy', parent_category_id: null },
    { category_id: 4, name: 'Entertainment & Nightlife', parent_category_id: null },
    { category_id: 102, name: 'Beaches & Islands', parent_category_id: 1 },
    { category_id: 204, name: 'Architecture', parent_category_id: 2 },
    { category_id: 301, name: 'Local Cuisine', parent_category_id: 3 },
    { category_id: 106, name: 'Scenic Landscapes', parent_category_id: 1 }
  ];

  // Sample destination interest scores (simplified from our sample data)
  const destinationInterests = [
    // Barcelona
    { destination_id: 1, category_id: 2, score: 0.90, supporting_evidence: 'Rich cultural heritage spanning Roman times to Modernisme' },
    { destination_id: 1, category_id: 204, score: 0.97, supporting_evidence: 'World-famous for Gaudí architecture including Sagrada Família and Park Güell' },
    { destination_id: 1, category_id: 3, score: 0.92, supporting_evidence: 'Renowned for Catalan cuisine, tapas, and food markets' },
    { destination_id: 1, category_id: 4, score: 0.90, supporting_evidence: 'Vibrant nightlife with numerous bars, clubs and entertainment venues' },
    { destination_id: 1, category_id: 102, score: 0.85, supporting_evidence: 'Urban beaches including Barceloneta with Mediterranean coastline' },
    
    // Paris
    { destination_id: 2, category_id: 2, score: 0.97, supporting_evidence: 'Exceptional concentration of museums, historic sites, and cultural institutions' },
    { destination_id: 2, category_id: 204, score: 0.95, supporting_evidence: 'Iconic architectural landmarks from medieval to modern' },
    { destination_id: 2, category_id: 3, score: 0.96, supporting_evidence: 'Capital of French cuisine with renowned restaurants and culinary traditions' },
    { destination_id: 2, category_id: 4, score: 0.87, supporting_evidence: 'Rich entertainment offerings including opera, theater, and cabaret' },
    
    // Santorini
    { destination_id: 3, category_id: 1, score: 0.93, supporting_evidence: 'Breathtaking natural landscapes shaped by volcanic activity' },
    { destination_id: 3, category_id: 106, score: 0.98, supporting_evidence: 'Spectacular caldera views and volcanic formations' },
    { destination_id: 3, category_id: 102, score: 0.94, supporting_evidence: 'Distinctive beaches including red and black volcanic sand' },
    { destination_id: 3, category_id: 3, score: 0.89, supporting_evidence: 'Growing reputation for Greek cuisine using local ingredients' },
    { destination_id: 3, category_id: 301, score: 0.91, supporting_evidence: 'Authentic Greek tavernas and restaurants featuring local produce' }
  ];

  return { destinations, interestCategories, destinationInterests };
}

// Example function to process a user query and return destination recommendations
function processUserQuery(userQuery, constraints = {}) {
  console.log('Processing user query:', userQuery);
  console.log('Constraints:', constraints);
  
  // Load sample data
  const { destinations, interestCategories, destinationInterests } = loadSampleData();
  
  // Extract user preferences from natural language query
  const userPreferences = interestScoring.extractUserPreferences(userQuery, interestCategories);
  console.log('\nExtracted user preferences:');
  console.log(userPreferences);
  
  // Calculate match scores for all destinations
  const matchScores = [];
  for (const destination of destinations) {
    // Get interest scores for this destination
    const destinationInterestsForThis = destinationInterests.filter(
      item => item.destination_id === destination.destination_id
    );
    
    // Calculate match score
    const matchScore = interestScoring.calculateMatchScore(
      userPreferences, 
      destination,
      destinationInterestsForThis
    );
    
    matchScores.push({
      ...matchScore,
      destination
    });
  }
  
  // Rank and filter destinations based on constraints
  const rankedDestinations = interestScoring.rankDestinations(matchScores, constraints);
  
  return rankedDestinations;
}

// Example usage
console.log('==========================================');
console.log('SMART TRAVEL PLANNER - INTEREST MATCHING');
console.log('==========================================\n');

// Example 1: User interested in beaches and food
const example1 = processUserQuery('I love beaches and really enjoy good food. Looking for somewhere with beautiful views.');
console.log('\nRECOMMENDED DESTINATIONS (EXAMPLE 1):\n');
example1.forEach((result, index) => {
  console.log(`${index + 1}. ${result.destination_name} (Match score: ${result.match_score.toFixed(2)})`);
  console.log('   Top reasons:');
  result.match_explanations.forEach(explanation => {
    console.log(`   - ${explanation.evidence}`);
  });
  console.log('');
});

// Example 2: User interested in culture and architecture with budget constraint
const example2 = processUserQuery(
  'I am passionate about architecture and cultural experiences. I enjoy museums and historical sites.',
  { budget_max: 190 }
);
console.log('\nRECOMMENDED DESTINATIONS (EXAMPLE 2):\n');
example2.forEach((result, index) => {
  console.log(`${index + 1}. ${result.destination_name} (Match score: ${result.match_score.toFixed(2)})`);
  console.log(`   Average daily budget: ${result.destination.avg_daily_budget_mid} EUR`);
  console.log('   Top reasons:');
  result.match_explanations.forEach(explanation => {
    console.log(`   - ${explanation.evidence}`);
  });
  console.log('');
});

// Example 3: User with specific regional preference
const example3 = processUserQuery(
  'I would like to visit Western Europe and enjoy fine dining and nightlife.',
  { region: 'Western Europe' }
);
console.log('\nRECOMMENDED DESTINATIONS (EXAMPLE 3):\n');
example3.forEach((result, index) => {
  console.log(`${index + 1}. ${result.destination_name} (Match score: ${result.match_score.toFixed(2)})`);
  console.log(`   Region: ${result.destination.region}`);
  console.log('   Top reasons:');
  result.match_explanations.forEach(explanation => {
    console.log(`   - ${explanation.evidence}`);
  });
  console.log('');
}); 