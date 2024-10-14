import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from './supabaseClient';
import AuthComponent from './components/AuthComponent';
import Dashboard from './components/Dashboard';
import PlantSelection from './components/PlantSelection';
import SystemGuide from './components/SystemGuide';
import NutrientManagement from './components/NutrientManagement';
import GrowthTimeline from './components/GrowthTimeline';
import MaintenanceChecklist from './components/MaintenanceChecklist';
import PlantGrowthTracker from './components/PlantGrowthTracker';
import NutrientCalculator from './components/NutrientCalculator';
import CareReminders from './components/CareReminders';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import useLocalStorage from './hooks/useLocalStorage';
import { Plant } from './types';
import { Session } from '@supabase/supabase-js';

export interface PlantSystemPair {
  id: string;
  plant: string;
  system: string;
}

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentRoute, setCurrentRoute] = useState('/');
  const [selectedPlants, setSelectedPlants] = useLocalStorage<Plant[]>('selectedPlants', []);
  const [selectedPairs, setSelectedPairs] = useLocalStorage<PlantSystemPair[]>('selectedPairs', []);

  useEffect(() => {
    // Log Supabase URL and anonymous key
    console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL);
    console.log('Supabase Anon Key:', import.meta.env.VITE_SUPABASE_ANON_KEY ? 'Set' : 'Not set');

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleNavigate = (route: string) => {
    setCurrentRoute(route);
  };

  const handleSelectPlant = (plant: Plant) => {
    setSelectedPlants((prev) => {
      const isAlreadySelected = prev.some((p) => p.id === plant.id);
      if (isAlreadySelected) {
        toast.info(`${plant.name} removed from selection`);
        return prev.filter((p) => p.id !== plant.id);
      } else {
        toast.success(`${plant.name} added to selection`);
        return [...prev, plant];
      }
    });
  };

  const handleSelectSystem = (plantId: string, system: string) => {
    setSelectedPairs((prev) => {
      const existingPairIndex = prev.findIndex((pair) => pair.id === plantId);
      if (existingPairIndex !== -1) {
        const newPairs = [...prev];
        newPairs[existingPairIndex] = { ...newPairs[existingPairIndex], system };
        toast.success(`System updated for ${newPairs[existingPairIndex].plant}`);
        return newPairs;
      } else {
        const plant = selectedPlants.find((p) => p.id === plantId);
        if (plant) {
          toast.success(`System selected for ${plant.name}`);
          return [...prev, { id: plantId, plant: plant.name, system }];
        }
        return prev;
      }
    });
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setSelectedPlants([]);
    setSelectedPairs([]);
    toast.info('You have been signed out');
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return <AuthComponent />;
  }

  return (
    <ErrorBoundary>
      <DndProvider backend={HTML5Backend}>
        <div className="min-h-screen bg-green-50">
          <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
              <h1 className="text-2xl font-bold text-green-600">Hydroponic Home Gardener</h1>
              <nav>
                <ul className="flex space-x-4">
                  <li><button onClick={() => handleNavigate('/')} className="text-green-600 hover:text-green-800">Dashboard</button></li>
                  <li><button onClick={() => handleNavigate('/plants')} className="text-green-600 hover:text-green-800">Plants</button></li>
                  <li><button onClick={() => handleNavigate('/systems')} className="text-green-600 hover:text-green-800">Systems</button></li>
                  <li><button onClick={() => handleNavigate('/nutrient-management')} className="text-green-600 hover:text-green-800">Nutrients</button></li>
                  <li><button onClick={() => handleNavigate('/growth-timeline')} className="text-green-600 hover:text-green-800">Timeline</button></li>
                  <li><button onClick={() => handleNavigate('/maintenance')} className="text-green-600 hover:text-green-800">Maintenance</button></li>
                  <li><button onClick={handleSignOut} className="text-red-600 hover:text-red-800">Sign Out</button></li>
                </ul>
              </nav>
            </div>
          </header>

          <main className="container mx-auto p-4">
            {currentRoute === '/' && (
              <Dashboard
                onNavigate={handleNavigate}
                selectedPlants={selectedPlants}
                selectedPairs={selectedPairs}
              />
            )}
            {currentRoute === '/plants' && (
              <PlantSelection
                onSelectPlant={handleSelectPlant}
                selectedPlants={selectedPlants}
              />
            )}
            {currentRoute === '/systems' && (
              <SystemGuide
                selectedPairs={selectedPairs}
                onSelectSystem={handleSelectSystem}
              />
            )}
            {currentRoute === '/nutrient-management' && <NutrientManagement selectedPlants={selectedPlants} />}
            {currentRoute === '/growth-timeline' && <GrowthTimeline selectedPlants={selectedPlants} />}
            {currentRoute === '/maintenance' && <MaintenanceChecklist selectedPairs={selectedPairs} />}
            {currentRoute === '/growth-tracker' && <PlantGrowthTracker selectedPlants={selectedPlants} />}
            {currentRoute === '/nutrient-calculator' && <NutrientCalculator selectedPairs={selectedPairs} />}
            {currentRoute === '/care-reminders' && <CareReminders selectedPlants={selectedPlants.map(p => p.name)} />}
          </main>

          <footer className="bg-white text-gray-600 p-4 mt-8">
            <div className="container mx-auto text-center">
              <p>&copy; 2024 Hydroponic Home Gardener. All rights reserved.</p>
            </div>
          </footer>
        </div>
        <ToastContainer position="bottom-right" autoClose={3000} />
      </DndProvider>
    </ErrorBoundary>
  );
}

export default App;
