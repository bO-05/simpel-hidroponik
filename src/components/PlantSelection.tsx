import React, { useMemo } from 'react';
import { Plant } from '../types';
import { plants as plantsData } from '../data/plants';

interface PlantSelectionProps {
  onSelectPlant: (plant: Plant) => void;
  selectedPlants: Plant[];
}

const PlantSelection: React.FC<PlantSelectionProps> = React.memo(({ onSelectPlant, selectedPlants }) => {
  const plantList = useMemo(() => plantsData, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Your Plants</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plantList.map((plant) => (
          <div key={plant.name} className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{plant.name}</h3>
            <p className="mb-2">Difficulty: {plant.difficulty}</p>
            <p className="mb-2">Growth Time: {plant.growthTime} days</p>
            <button
              onClick={() => onSelectPlant(plant)}
              className={`px-4 py-2 rounded ${
                selectedPlants.some(p => p.name === plant.name)
                  ? 'bg-red-500 hover:bg-red-600 text-white'
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {selectedPlants.some(p => p.name === plant.name) ? 'Remove' : 'Add'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default PlantSelection;
