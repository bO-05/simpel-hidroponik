import React, { useState } from 'react';
import { Sprout, Droplet, Sun, Thermometer } from 'lucide-react';
import PlantSelection from './components/PlantSelection';
import SystemGuide from './components/SystemGuide';
import NutrientManagement from './components/NutrientManagement';
import GrowthTimeline from './components/GrowthTimeline';

function App() {
  const [activeTab, setActiveTab] = useState('plants');

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <Sprout className="mr-2" /> Hydroponic Home Gardener
          </h1>
          <p className="text-sm">Jakarta, Indonesia</p>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <nav className="flex mb-6">
            <button
              className={`flex-1 py-2 px-4 ${
                activeTab === 'plants' ? 'bg-green-500 text-white' : 'bg-gray-200'
              } rounded-l-lg`}
              onClick={() => setActiveTab('plants')}
            >
              <Sprout className="inline mr-2" /> Plants
            </button>
            <button
              className={`flex-1 py-2 px-4 ${
                activeTab === 'systems' ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab('systems')}
            >
              <Droplet className="inline mr-2" /> Systems
            </button>
            <button
              className={`flex-1 py-2 px-4 ${
                activeTab === 'nutrients' ? 'bg-green-500 text-white' : 'bg-gray-200'
              }`}
              onClick={() => setActiveTab('nutrients')}
            >
              <Sun className="inline mr-2" /> Nutrients
            </button>
            <button
              className={`flex-1 py-2 px-4 ${
                activeTab === 'timeline' ? 'bg-green-500 text-white' : 'bg-gray-200'
              } rounded-r-lg`}
              onClick={() => setActiveTab('timeline')}
            >
              <Thermometer className="inline mr-2" /> Timeline
            </button>
          </nav>

          {activeTab === 'plants' && <PlantSelection />}
          {activeTab === 'systems' && <SystemGuide />}
          {activeTab === 'nutrients' && <NutrientManagement />}
          {activeTab === 'timeline' && <GrowthTimeline />}
        </div>
      </main>

      <footer className="bg-green-600 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Hydroponic Home Gardener. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;