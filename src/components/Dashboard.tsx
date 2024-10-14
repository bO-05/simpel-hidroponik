import React from 'react';
import { Sprout, Droplet, Sun, Clipboard } from 'lucide-react';
import { Plant } from '../types';
import { PlantSystemPair } from '../App';

interface DashboardProps {
  onNavigate: (route: string) => void;
  selectedPlants: Plant[];
  selectedPairs: PlantSystemPair[];
}

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, selectedPlants, selectedPairs }) => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Your Hydroponic Garden</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div onClick={() => onNavigate('/plants')} className="p-4 bg-green-100 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <Sprout className="mr-2" />
            <h2 className="text-xl font-semibold">Your Plants</h2>
          </div>
          <p className="mt-2">You have {selectedPlants.length} plants in your garden</p>
        </div>

        <div onClick={() => onNavigate('/systems')} className="p-4 bg-blue-100 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <Droplet className="mr-2" />
            <h2 className="text-xl font-semibold">Systems</h2>
          </div>
          <p className="mt-2">{selectedPairs.length} plants assigned to systems</p>
        </div>

        <div onClick={() => onNavigate('/nutrient-management')} className="p-4 bg-yellow-100 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <Sun className="mr-2" />
            <h2 className="text-xl font-semibold">Nutrient Management</h2>
          </div>
          <p className="mt-2">Manage nutrient levels for optimal growth</p>
        </div>

        <div onClick={() => onNavigate('/maintenance')} className="p-4 bg-red-100 rounded-lg shadow hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center">
            <Clipboard className="mr-2" />
            <h2 className="text-xl font-semibold">Maintenance</h2>
          </div>
          <p className="mt-2">View and complete maintenance tasks</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Garden Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Selected Plants</h3>
            {selectedPlants.length > 0 ? (
              <ul className="list-disc list-inside">
                {selectedPlants.map(plant => (
                  <li key={plant.id}>{plant.name}</li>
                ))}
              </ul>
            ) : (
              <p>No plants selected yet. Visit the Plants section to add some!</p>
            )}
          </div>
          <div className="border rounded-lg p-4">
            <h3 className="text-xl font-semibold mb-2">Plant-System Pairs</h3>
            {selectedPairs.length > 0 ? (
              <ul className="list-disc list-inside">
                {selectedPairs.map(pair => (
                  <li key={pair.id}>{pair.plant} - {pair.system}</li>
                ))}
              </ul>
            ) : (
              <p>No plant-system pairs set up yet. Visit the Systems section to assign plants to systems!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
