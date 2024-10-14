import React, { useState, useCallback, useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Sprout, Droplet, Sun, Thermometer, Clipboard, LineChart, Calculator, Bell, Menu } from 'lucide-react';
import Dashboard from './components/Dashboard';
import PlantSelection from './components/PlantSelection';
import SystemGuide from './components/SystemGuide';
import NutrientManagement from './components/NutrientManagement';
import GrowthTimeline from './components/GrowthTimeline';
import MaintenanceChecklist from './components/MaintenanceChecklist';
import PlantGrowthTracker from './components/PlantGrowthTracker';
import NutrientCalculator from './components/NutrientCalculator';
import CareReminders from './components/CareReminders';
import { Plant, PlantSystemPair } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [selectedPlants, setSelectedPlants] = useState<Plant[]>([]);
  const [selectedPairs, setSelectedPairs] = useState<PlantSystemPair[]>([]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const handleSelectPlant = useCallback((plant: Plant) => {
    setSelectedPlants(prev => {
      const isAlreadySelected = prev.some(p => p.name === plant.name);
      if (isAlreadySelected) {
        return prev.filter(p => p.name !== plant.name);
      } else {
        return [...prev, plant];
      }
    });
  }, []);

  const handleSelectSystem = useCallback((system: string) => {
    setSelectedPairs(prev => [
      ...prev,
      { id: Date.now().toString(), plant: '', system }
    ]);
  }, []);

  const navItems = useMemo(() => [
    { id: 'dashboard', icon: Sprout, label: 'Dashboard' },
    { id: 'plants', icon: Sprout, label: 'Plants' },
    { id: 'systems', icon: Droplet, label: 'Systems' },
    { id: 'nutrients', icon: Sun, label: 'Nutrients' },
    { id: 'timeline', icon: Thermometer, label: 'Timeline' },
    { id: 'checklist', icon: Clipboard, label: 'Checklist' },
    { id: 'growth-tracker', icon: LineChart, label: 'Growth Tracker' },
    { id: 'nutrient-calculator', icon: Calculator, label: 'Nutrient Calculator' },
    { id: 'care-reminders', icon: Bell, label: 'Care Reminders' },
  ], []);

  const renderActiveTab = useCallback(() => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'plants':
        return <PlantSelection onSelectPlant={handleSelectPlant} selectedPlants={selectedPlants} />;
      case 'systems':
        return <SystemGuide onSelectSystem={handleSelectSystem} selectedPairs={selectedPairs} />;
      case 'nutrients':
        return <NutrientManagement />;
      case 'timeline':
        return <GrowthTimeline />;
      case 'checklist':
        return <MaintenanceChecklist selectedPairs={selectedPairs} />;
      case 'growth-tracker':
        return <PlantGrowthTracker selectedPlants={selectedPlants} />;
      case 'nutrient-calculator':
        return <NutrientCalculator selectedPairs={selectedPairs} />;
      case 'care-reminders':
        return <CareReminders selectedPlants={selectedPlants.map(p => p.name)} />;
      default:
        return null;
    }
  }, [activeTab, handleSelectPlant, handleSelectSystem, selectedPlants, selectedPairs]);

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
            </div>
          </header>

          <main className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {renderActiveTab()}
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
};

export default App;
