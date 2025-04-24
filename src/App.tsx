import { MapIcon, CurrencyDollarIcon, BriefcaseIcon } from '@heroicons/react/24/outline'
import TravelPlanner from './components/TravelPlanner'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-blue-600">TravelAgent</div>
          <div>
            {/* Potential Nav Links */}
            <a href="#" className="px-4 hover:text-blue-500">Home</a>
            <a href="#features" className="px-4 hover:text-blue-500">Features</a>
            <a href="#travel-planner" className="px-4 hover:text-blue-500">Plan Your Trip</a>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-6 pt-24 pb-16 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 md:text-6xl">
          Smart <span className="text-blue-600">Multi-City Trip Planning</span> on a Budget
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto">
          Let our AI optimize your multi-destination travel, find the best deals, and create personalized itineraries—all within your budget.
        </p>
        <a href="#travel-planner" className="mt-10 px-8 py-4 bg-blue-600 text-white text-xl font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 inline-block">
          Plan Your Trip with AI
        </a>
      </main>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How Our AI Makes Travel Smarter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
              <MapIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Multi-Destination Planner</h3>
              <p className="text-gray-600">
                Automatically generates optimized multi-city itineraries based on your preferences, trip length, and budget, minimizing cost and travel time.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
              <CurrencyDollarIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Budget Optimization Engine</h3>
              <p className="text-gray-600">
                Intelligently allocates your budget across flights, lodging, and activities, helping you make smart trade-offs for the best value.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm text-center">
              <BriefcaseIcon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Integrated Booking Assistant</h3>
              <p className="text-gray-600">
                Finds and recommends the best real-time deals on flights, trains, and accommodations, connecting directly to major booking platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Travel Planner Component */}
      <TravelPlanner />

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-gray-400 text-center">
        <div className="container mx-auto px-6">
          <p>© 2023 TravelAgent. All rights reserved.</p>
          <p className="mt-2 text-sm">This is a demonstration of the Smart Travel Planner algorithm.</p>
        </div>
      </footer>
    </div>
  )
}

export default App 