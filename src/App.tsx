import React, { useState } from 'react';
import { Sprout, Droplet, Sun, Thermometer, Clipboard, LineChart, Calculator, X } from 'lucide-react';
import PlantSelection from './components/PlantSelection';
import SystemGuide from './components/SystemGuide';
import NutrientManagement from './components/NutrientManagement';
import GrowthTimeline from './components/GrowthTimeline';
import MaintenanceChecklist from './components/MaintenanceChecklist';
import PlantGrowthTracker from './components/PlantGrowthTracker';
import NutrientCalculator from './components/NutrientCalculator';
import useLocalStorage from './hooks/useLocalStorage';

export interface PlantSystemPair {
  plant: string;
  system: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('plants');
  const [selectedPairs, setSelectedPairs] = useLocalStorage<PlantSystemPair[]>('selectedPairs', []);

  const addPair = (plant: string, system: string) => {
    setSelectedPairs(prev => [...prev, { plant, system }]);
  };

  const removePair = (index: number) => {
    setSelectedPairs(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-green-50">
      <header className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold flex items-center">
            <Sprout className="mr-2" /> Hydroponic Home Gardener
          </h1>
          <div className="text-sm">
            <p>Jakarta, Indonesia</p>
            {selectedPairs.length > 0 && (
              <div className="mt-1">
                {selectedPairs.map((pair, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <p>{pair.plant} in {pair.system}</p>
                    <button 
                      onClick={() => removePair(index)}
                      className="ml-2 text-red-300 hover:text-red-500"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <nav className="flex mb-6 flex-wrap">
            {['plants', 'systems', 'nutrients', 'timeline', 'checklist', 'growth-tracker', 'nutrient-calculator'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-2 px-4 ${
                  activeTab === tab ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'plants' && <Sprout className="inline mr-2" />}
                {tab === 'systems' && <Droplet className="inline mr-2" />}
                {tab === 'nutrients' && <Sun className="inline mr-2" />}
                {tab === 'timeline' && <Thermometer className="inline mr-2" />}
                {tab === 'checklist' && <Clipboard className="inline mr-2" />}
                {tab === 'growth-tracker' && <LineChart className="inline mr-2" />}
                {tab === 'nutrient-calculator' && <Calculator className="inline mr-2" />}
                {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              </button>
            ))}
          </nav>

          {activeTab === 'plants' && <PlantSelection onSelectPlant={(plant) => addPair(plant, '')} />}
          {activeTab === 'systems' && <SystemGuide onSelectSystem={(system) => {
            if (selectedPairs.length > 0 && selectedPairs[selectedPairs.length - 1].system === '') {
              setSelectedPairs(prev => {
                const newPairs = [...prev];
                newPairs[newPairs.length - 1].system = system;
                return newPairs;
              });
            } else {
              addPair('', system);
            }
          }} />}
          {activeTab === 'nutrients' && <NutrientManagement />}
          {activeTab === 'timeline' && <GrowthTimeline />}
          {activeTab === 'checklist' && (
            <MaintenanceChecklist selectedPairs={selectedPairs} />
          )}
          {activeTab === 'growth-tracker' && (
            <PlantGrowthTracker selectedPairs={selectedPairs} />
          )}
          {activeTab === 'nutrient-calculator' && (
            <NutrientCalculator selectedPairs={selectedPairs} />
          )}
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
