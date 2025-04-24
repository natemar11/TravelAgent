import { useState } from 'react';

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

interface RecommendationResultsProps {
  recommendations: Recommendation[];
  isLoading: boolean;
  onReset: () => void;
}

const RecommendationResults: React.FC<RecommendationResultsProps> = ({ 
  recommendations, 
  isLoading,
  onReset
}) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  
  // Toggle expanded state for a recommendation
  const toggleExpanded = (id: number) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        <p className="mt-4 text-xl text-gray-600">Finding your perfect destinations...</p>
      </div>
    );
  }
  
  // Show empty state if no recommendations and not loading
  if (recommendations.length === 0) {
    return null;
  }
  
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">Your Personalized Recommendations</h3>
        <p className="text-gray-600">Destinations ranked by how well they match your interests and constraints.</p>
      </div>
      
      <div className="space-y-6">
        {recommendations.map((recommendation) => (
          <div 
            key={recommendation.destination_id}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            {/* Recommendation header */}
            <div className="p-6 cursor-pointer" onClick={() => toggleExpanded(recommendation.destination_id)}>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">
                    {recommendation.destination_name}, {recommendation.destination.country}
                  </h4>
                  <div className="text-sm text-gray-500 mt-1">
                    {recommendation.destination.region} | 
                    €{recommendation.destination.avg_daily_budget_mid}/day avg. budget
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(recommendation.match_score * 100)}%
                  </div>
                  <div className="text-sm text-gray-500">match</div>
                </div>
              </div>
              
              {/* Preview one reason */}
              {recommendation.match_explanations.length > 0 && (
                <div className="mt-3 text-gray-700">
                  <span className="font-medium">Why you'll love it: </span>
                  {recommendation.match_explanations[0].evidence}
                </div>
              )}
            </div>
            
            {/* Expanded details */}
            {expandedId === recommendation.destination_id && (
              <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                <h5 className="font-semibold text-gray-700 mb-3">Why This Destination Matches Your Preferences:</h5>
                <ul className="space-y-2">
                  {recommendation.match_explanations.map((explanation, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{explanation.evidence}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 text-center">
                  <p className="text-gray-500 mb-2">In a real app, you would see options to:</p>
                  <div className="space-x-4">
                    <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-200">
                      View Hotels
                    </button>
                    <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-200">
                      See Attractions
                    </button>
                    <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded-md font-medium hover:bg-blue-200">
                      Add to Itinerary
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Reset button */}
      <div className="mt-8 text-center">
        <button
          onClick={onReset}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
        >
          Start Over
        </button>
        
        <p className="mt-4 text-gray-500 text-sm">
          This is a demo of the SmartTravelPlanner algorithm. In a real application, you would be able to refine your preferences, view detailed information about each destination, and create a complete itinerary.
        </p>
      </div>
    </div>
  );
};

export default RecommendationResults; 