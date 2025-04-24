import { useState } from 'react';

// Define types for our form
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

interface PreferenceFormProps {
  onSubmit: (preferences: UserPreference[], constraints: UserConstraints, freeTextQuery: string) => void;
}

// Sample interest categories matching our schema
const SAMPLE_CATEGORIES = [
  { id: 1, name: "Nature & Outdoors" },
  { id: 2, name: "Culture & Heritage" },
  { id: 3, name: "Food & Gastronomy" },
  { id: 4, name: "Entertainment & Nightlife" },
  { id: 5, name: "Relaxation & Wellness" },
  { id: 6, name: "Adventure & Sports" },
  { id: 7, name: "Shopping & Markets" },
  { id: 8, name: "Urban Exploration" },
  { id: 102, name: "Beaches & Islands" },
  { id: 204, name: "Architecture" },
  { id: 301, name: "Local Cuisine" },
];

// Regions based on our European-focused data
const REGIONS = [
  "Any Region",
  "Western Europe",
  "Southern Europe",
  "Northern Europe",
  "Eastern Europe",
  "Central Europe",
];

const PreferenceForm: React.FC<PreferenceFormProps> = ({ onSubmit }) => {
  // State for user preferences
  const [selectedPreferences, setSelectedPreferences] = useState<UserPreference[]>([]);
  const [currentCategory, setCurrentCategory] = useState<number | null>(null);
  const [currentIntensity, setCurrentIntensity] = useState<number>(3); // Medium intensity by default
  
  // State for constraints
  const [region, setRegion] = useState<string>("Any Region");
  const [budgetMax, setBudgetMax] = useState<number | undefined>(undefined);
  const [tripLength, setTripLength] = useState<number | undefined>(undefined);
  const [startDate, setStartDate] = useState<string>("");
  const [mustVisit, setMustVisit] = useState<string>("");
  
  // State for free-text query
  const [freeTextQuery, setFreeTextQuery] = useState<string>("");

  // Add a preference to the selection
  const addPreference = () => {
    if (!currentCategory) return;
    
    const category = SAMPLE_CATEGORIES.find(c => c.id === currentCategory);
    if (!category) return;
    
    // Convert 1-5 scale to 0-1 scale for our algorithm
    const normalizedIntensity = currentIntensity / 5;
    
    const newPreference: UserPreference = {
      categoryId: currentCategory,
      name: category.name,
      intensity: normalizedIntensity
    };
    
    // Don't add duplicates
    if (!selectedPreferences.some(p => p.categoryId === currentCategory)) {
      setSelectedPreferences([...selectedPreferences, newPreference]);
    }
    
    // Reset the selection
    setCurrentCategory(null);
    setCurrentIntensity(3);
  };
  
  // Remove a preference
  const removePreference = (categoryId: number) => {
    setSelectedPreferences(selectedPreferences.filter(p => p.categoryId !== categoryId));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Prepare constraints object
    const constraints: UserConstraints = {};
    
    if (region !== "Any Region") {
      constraints.region = region;
    }
    
    if (budgetMax) {
      constraints.budget_max = budgetMax;
    }
    
    if (tripLength) {
      constraints.trip_length_days = tripLength;
    }
    
    if (startDate) {
      constraints.start_date = startDate;
    }
    
    if (mustVisit.trim()) {
      constraints.must_visit_destinations = mustVisit.split(',').map(d => d.trim());
    }
    
    onSubmit(selectedPreferences, constraints, freeTextQuery);
  };
  
  // Intensity label mapping
  const getIntensityLabel = (intensity: number) => {
    switch (intensity) {
      case 1: return "Not Important";
      case 2: return "Somewhat Important";
      case 3: return "Important";
      case 4: return "Very Important";
      case 5: return "Must Have";
      default: return "Important";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Tell Us About Your Dream Trip</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Free text query */}
        <div className="mb-8">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Describe your ideal trip in a few sentences:
          </label>
          <textarea 
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows={3}
            placeholder="e.g., I love beaches and really enjoy good food. Looking for somewhere with beautiful views."
            value={freeTextQuery}
            onChange={(e) => setFreeTextQuery(e.target.value)}
          />
          <p className="text-sm text-gray-500 mt-1">
            This helps our AI understand your preferences in natural language.
          </p>
        </div>
        
        {/* Interest preferences */}
        <div className="mb-8">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            What interests you most? (Add multiple)
          </label>
          <div className="flex items-end gap-4 mb-4">
            <div className="flex-grow">
              <select 
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                value={currentCategory || ""}
                onChange={(e) => setCurrentCategory(Number(e.target.value))}
              >
                <option value="">Select an interest</option>
                {SAMPLE_CATEGORIES.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-1/3">
              <label className="block text-gray-700 text-xs mb-1">Importance: {getIntensityLabel(currentIntensity)}</label>
              <input 
                type="range" 
                min="1" 
                max="5" 
                value={currentIntensity}
                onChange={(e) => setCurrentIntensity(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <button 
              type="button" 
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={addPreference}
              disabled={!currentCategory}
            >
              Add
            </button>
          </div>
          
          {/* Selected preferences */}
          {selectedPreferences.length > 0 && (
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Selected Interests:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedPreferences.map(pref => (
                  <div key={pref.categoryId} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full flex items-center">
                    <span>{pref.name} ({(pref.intensity * 5).toFixed(0)}/5)</span>
                    <button 
                      type="button" 
                      className="ml-2 text-blue-600 hover:text-blue-800 focus:outline-none"
                      onClick={() => removePreference(pref.categoryId)}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Trip constraints */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Preferred Region
            </label>
            <select 
              className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              {REGIONS.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Maximum Daily Budget (€)
            </label>
            <input 
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., 200"
              value={budgetMax || ""}
              onChange={(e) => setBudgetMax(e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Trip Length (days)
            </label>
            <input 
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., 10"
              value={tripLength || ""}
              onChange={(e) => setTripLength(e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Start Date
            </label>
            <input 
              type="date"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          <div className="md:col-span-2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Must-Visit Destinations (comma separated)
            </label>
            <input 
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="e.g., Paris, Barcelona"
              value={mustVisit}
              onChange={(e) => setMustVisit(e.target.value)}
            />
          </div>
        </div>
        
        {/* Submit button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline text-lg"
          >
            Get Personalized Recommendations
          </button>
        </div>
      </form>
    </div>
  );
};

export default PreferenceForm; 