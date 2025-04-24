# Travel Agent Landing Page

This is a landing page for the Smart Travel Planner algorithm. It allows users to input their travel preferences and constraints, and receive personalized destination recommendations.

## Features

- Interest-based travel matching
- Region and budget filtering
- Personalized destination recommendations
- Detailed explanations for why each destination was recommended

## Project Structure

The project is organized as follows:

- `src/` - Contains the source code for the application
  - `components/` - React components for the application
    - `TravelPlanner.tsx` - Main component integrating the form and results
    - `PreferenceForm.tsx` - Form for collecting user preferences
    - `RecommendationResults.tsx` - Display component for recommendations
  - `App.tsx` - Main application component
  - `main.tsx` - Entry point for the application

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173

## Algorithm Integration

This frontend application is designed to integrate with the Smart Travel Planner algorithm from the `ALGORITHM` directory. Currently, it uses a mock implementation that simulates the behavior of the actual algorithm.

In a production environment, the `mockFetchRecommendations` function in `TravelPlanner.tsx` would be replaced with an actual API call to the backend service that implements the scoring algorithm.

## Next Steps

- Connect to the actual scoring algorithm API
- Add visualization of travel routes between multiple destinations
- Implement itinerary generation functionality
- Add user accounts for saving preferences and itineraries
- Integrate real-time pricing data for accommodations and transportation 