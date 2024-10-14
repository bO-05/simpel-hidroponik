import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Sprout, Droplet, Sun, Thermometer, Clipboard, LineChart, Calculator, Bell, Menu } from 'lucide-react';
import PlantSelection from './components/PlantSelection';
import SystemGuide from './components/SystemGuide';
import NutrientManagement from './components/NutrientManagement';
import GrowthTimeline from './components/GrowthTimeline';
import MaintenanceChecklist from './components/MaintenanceChecklist';
import PlantGrowthTracker from './components/PlantGrowthTracker';
import NutrientCalculator from './components/NutrientCalculator';
import CareReminders from './components/CareReminders';
import useLocalStorage from './hooks/useLocalStorage';
import { Plant } from './types';

export interface PlantSystemPair {
  id: string;
  plant: string;
  system: string;
}

function App() {
  const [activeTab, setActiveTab] = useState('plants');
  const [selectedPairs, setSelectedPairs] = useLocalStorage<PlantSystemPair[]>('selectedPairs', []);
  const [selectedPlants, setSelectedPlants] = useState<Plant[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const addPair = (plant: Plant, system: string) => {
    const newPair: PlantSystemPair = {
      id: Date.now().toString(),
      plant: plant.name,
      system,
    };
    setSelectedPairs(prev => [...prev, newPair]);
  };

  const updatePairSystem = (system: string) => {
    setSelectedPairs(prev => {
      const lastPair = prev[prev.length - 1];
      if (lastPair && !lastPair.system) {
        const updatedPairs = [...prev];
        updatedPairs[updatedPairs.length - 1] = { ...lastPair, system };
        return updatedPairs;
      }
      return [...prev, { id: Date.now().toString(), plant: '', system }];
    });
  };

  const handleSelectPlant = (plant: Plant) => {
    setSelectedPlants(prev => {
      const isAlreadySelected = prev.some(p => p.name === plant.name);
      if (isAlreadySelected) {
        return prev.filter(p => p.name !== plant.name);
      } else {
        addPair(plant, '');
        return [...prev, plant];
      }
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const navItems = [
    { id: 'plants', icon: Sprout, label: 'Plants' },
    { id: 'systems', icon: Droplet, label: 'Systems' },
    { id: 'nutrients', icon: Sun, label: 'Nutrients' },
    { id: 'timeline', icon: Thermometer, label: 'Timeline' },
    { id: 'checklist', icon: Clipboard, label: 'Checklist' },
    { id: 'growth-tracker', icon: LineChart, label: 'Growth Tracker' },
    { id: 'nutrient-calculator', icon: Calculator, label: 'Nutrient Calculator' },
    { id: 'care-reminders', icon: Bell, label: 'Care Reminders' },
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-green-50 flex">
        {/* Sidebar */}
        <aside className={`bg-green-600 text-white ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 ease-in-out`}>
          <div className="p-4">
            <button onClick={toggleSidebar} className="text-white">
              <Menu size={24} />
            </button>
          </div>
          <nav className="mt-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                className={`w-full text-left p-4 flex items-center ${activeTab === item.id ? 'bg-green-700' : ''} hover:bg-green-500`}
                onClick={() => setActiveTab(item.id)}
              >
                <item.icon className="mr-4" size={20} />
                {isSidebarOpen && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <div className="flex-1">
          <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex items-center justify-between">
              <h1 className="text-2xl font-bold flex items-center text-green-600">
                <Sprout className="mr-2" /> Hydroponic Home Gardener
              </h1>
              <div className="text-sm text-gray-600">
                <p>Jakarta, Indonesia</p>
              </div>
            </div>
          </header>

          <main className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {activeTab === 'plants' && (
                <PlantSelection
                  onSelectPlant={handleSelectPlant}
                  selectedPlants={selectedPlants}
                />
              )}
              {activeTab === 'systems' && <SystemGuide onSelectSystem={updatePairSystem} />}
              {activeTab === 'nutrients' && <NutrientManagement />}
              {activeTab === 'timeline' && <GrowthTimeline />}
              {activeTab === 'checklist' && (
                <MaintenanceChecklist selectedPairs={selectedPairs} />
              )}
              {activeTab === 'growth-tracker' && (
                <PlantGrowthTracker selectedPlants={selectedPlants} />
              )}
              {activeTab === 'nutrient-calculator' && (
                <NutrientCalculator selectedPairs={selectedPairs} />
              )}
              {activeTab === 'care-reminders' && (
                <CareReminders selectedPlants={selectedPlants.map(p => p.name)} />
              )}
            </div>
          </main>

          <footer className="bg-white text-gray-600 p-4 mt-8 shadow-md">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 Hydroponic Home Gardener. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </DndProvider>
  );
}

export default App;
