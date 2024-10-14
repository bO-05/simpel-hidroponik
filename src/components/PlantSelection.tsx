import React from 'react';
import { Plant } from '../types';
import { usePlants } from '../hooks/usePlants';

interface PlantSelectionProps {
  onSelectPlant: (plant: Plant) => void;
  selectedPlants: Plant[];
}

const PlantSelection: React.FC<PlantSelectionProps> = ({ onSelectPlant, selectedPlants }) => {
  const { plants, loading, error, fetchPlants, addPlant } = usePlants();

  const isSelected = (plant: Plant) => selectedPlants.some(p => p.id === plant.id);

  const handleAddPlant = () => {
    const newPlant: Omit<Plant, 'id'> = {
      name: 'New Plant',
      difficulty: 'Easy',
      growthTime: 4,
      type: 'Vegetable',
      image: 'https://example.com/placeholder.jpg',
      description: 'A new plant to grow',
      nutrientNeeds: 'Moderate',
      idealPh: '6.0-6.5',
      harvestTime: '4-6 weeks',
      idealTemperature: '65-75°F',
      idealHumidity: '50-70%',
      companions: []
    };
    addPlant(newPlant);
  };

  if (loading) {
    return <div>Loading plants...</div>;
  }

  if (error) {
    return (
      <div className="text-center">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <button
          onClick={() => fetchPlants()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
        >
          Retry
        </button>
        <button
          onClick={handleAddPlant}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Add a Sample Plant
        </button>
      </div>
    );
  }

  if (plants.length === 0) {
    return (
      <div className="text-center">
        <p className="mb-4">No plants found in the database.</p>
        <button
          onClick={handleAddPlant}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Add a Sample Plant
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Select Plants for Your Garden</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {plants.map((plant) => (
          <div
            key={plant.id}
            className={`p-4 border rounded-lg cursor-pointer ${
              isSelected(plant) ? 'bg-green-100 border-green-500' : 'bg-white'
            }`}
            onClick={() => onSelectPlant(plant)}
          >
            <img src={plant.image} alt={plant.name} className="w-full h-40 object-cover mb-2 rounded" />
            <h3 className="text-lg font-semibold">{plant.name}</h3>
            <p className="text-sm text-gray-600">Difficulty: {plant.difficulty}</p>
            <p className="text-sm text-gray-600">Growth Time: {plant.growthTime} weeks</p>
            <p className="text-sm text-gray-600">{plant.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantSelection;
