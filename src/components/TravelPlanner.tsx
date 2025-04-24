import { useState } from 'react';
import PreferenceForm from './PreferenceForm';
import RecommendationResults from './RecommendationResults';

// Types for our application
interface UserPreference {
  categoryId: number;
  name: string;
  intensity: number;
}

interface UserConstraints {
  region?: string;
  budget_max?: number;
  trip_length_days?: number;
  start_date?: string;
  must_visit_destinations?: string[];
}

interface Recommendation {
  destination_id: number;
  destination_name: string;
  match_score: number;
  match_explanations: {
    evidence: string;
    weighted_contribution: number;
  }[];
  destination: {
    country: string;
    region: string;
    avg_daily_budget_mid: number;
  };
}

// Mock API for demonstration
const mockFetchRecommendations = async (
  preferences: UserPreference[],
  constraints: UserConstraints,
  freeTextQuery: string
): Promise<Recommendation[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simplified version of our example_scoring.js logic
  // In a real application, this would be a backend API call
  
  // Sample data matching our sample_data.sql
  const sampleDestinations = [
    {
      destination_id: 1,
      destination_name: 'Barcelona',
      match_score: 0.92,
      match_explanations: [
        {
          evidence: 'World-famous for Gaudí architecture including Sagrada Família and Park Güell',
          weighted_contribution: 0.87
        },
        {
          evidence: 'Renowned for Catalan cuisine, tapas, and food markets',
          weighted_contribution: 0.83
        },
        {
          evidence: 'Vibrant nightlife with numerous bars, clubs and entertainment venues',
          weighted_contribution: 0.81
        },
        {
          evidence: 'Urban beaches including Barceloneta with Mediterranean coastline',
          weighted_contribution: 0.76
        }
      ],
      destination: {
        country: 'Spain',
        region: 'Southern Europe',
        avg_daily_budget_mid: 180
      }
    },
    {
      destination_id: 2,
      destination_name: 'Paris',
      match_score: 0.88,
      match_explanations: [
        {
          evidence: 'Exceptional concentration of museums, historic sites, and cultural institutions',
          weighted_contribution: 0.88
        },
        {
          evidence: 'Capital of French cuisine with renowned restaurants and culinary traditions',
          weighted_contribution: 0.87
        },
        {
          evidence: 'Iconic architectural landmarks from medieval to modern',
          weighted_contribution: 0.85
        },
        {
          evidence: 'Premier luxury shopping destination with fashion houses and boutiques',
          weighted_contribution: 0.83
        }
      ],
      destination: {
        country: 'France',
        region: 'Western Europe',
        avg_daily_budget_mid: 200
      }
    },
    {
      destination_id: 3,
      destination_name: 'Santorini',
      match_score: 0.85,
      match_explanations: [
        {
          evidence: 'Spectacular caldera views and volcanic formations',
          weighted_contribution: 0.88
        },
        {
          evidence: 'Distinctive beaches including red and black volcanic sand',
          weighted_contribution: 0.84
        },
        {
          evidence: 'Premier relaxation destination with luxury accommodations',
          weighted_contribution: 0.82
        },
        {
          evidence: 'Exceptional sunset viewing and panoramic vistas',
          weighted_contribution: 0.86
        }
      ],
      destination: {
        country: 'Greece',
        region: 'Southern Europe',
        avg_daily_budget_mid: 190
      }
    }
  ] as Recommendation[];
  
  // Filter by region constraint
  let filteredResults = [...sampleDestinations];
  
  if (constraints.region && constraints.region !== 'Any Region') {
    filteredResults = filteredResults.filter(dest => dest.destination.region === constraints.region);
  }
  
  // Filter by budget constraint
  if (constraints.budget_max && constraints.budget_max > 0) {
    filteredResults = filteredResults.filter(dest => dest.destination.avg_daily_budget_mid <= constraints.budget_max!);
  }
  
  // Simulate preference matching by adjusting scores based on preferences
  if (preferences.length > 0) {
    // Find preferences for beaches, culture, food, etc. and adjust scores
    // This is a simplified simulation of our actual algorithm
    
    for (const result of filteredResults) {
      let scoreAdjustment = 0;
      
      for (const pref of preferences) {
        // Culture & Heritage preference boosts Paris and Barcelona
        if (pref.categoryId === 2) {
          if (result.destination_name === 'Paris') {
            scoreAdjustment += 0.05 * pref.intensity;
          } else if (result.destination_name === 'Barcelona') {
            scoreAdjustment += 0.03 * pref.intensity;
          }
        }
        
        // Beaches preference boosts Santorini and Barcelona
        if (pref.categoryId === 102) {
          if (result.destination_name === 'Santorini') {
            scoreAdjustment += 0.07 * pref.intensity;
          } else if (result.destination_name === 'Barcelona') {
            scoreAdjustment += 0.04 * pref.intensity;
          }
        }
        
        // Food preference slightly boosts all, but more for Paris
        if (pref.categoryId === 3) {
          if (result.destination_name === 'Paris') {
            scoreAdjustment += 0.06 * pref.intensity;
          } else {
            scoreAdjustment += 0.03 * pref.intensity;
          }
        }
      }
      
      result.match_score = Math.min(0.99, result.match_score + scoreAdjustment);
    }
  }
  
  // Sort by match score
  filteredResults.sort((a, b) => b.match_score - a.match_score);
  
  return filteredResults;
};

const TravelPlanner: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(true);
  
  const handleSubmit = async (
    preferences: UserPreference[],
    constraints: UserConstraints,
    freeTextQuery: string
  ) => {
    setIsLoading(true);
    
    try {
      // In a real application, this would call your scoring API
      const results = await mockFetchRecommendations(preferences, constraints, freeTextQuery);
      setRecommendations(results);
      setShowForm(false);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      // Handle error state
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setRecommendations([]);
    setShowForm(true);
  };
  
  return (
    <section id="travel-planner" className="py-16 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Find Your Perfect European Destination
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tell us what you're looking for, and our AI will match you with destinations that fit your interests and budget.
          </p>
        </div>
        
        {showForm && (
          <PreferenceForm onSubmit={handleSubmit} />
        )}
        
        <RecommendationResults 
          recommendations={recommendations}
          isLoading={isLoading}
          onReset={handleReset}
        />
      </div>
    </section>
  );
};

export default TravelPlanner; 