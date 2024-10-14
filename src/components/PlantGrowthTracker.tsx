import React, { useState, useEffect } from 'react';
import { Plant, PlantStage } from '../types';
import { Sprout, Leaf, Flower, Apple } from 'lucide-react';

interface PlantGrowthTrackerProps {
  selectedPlants: Plant[];
}

const PlantGrowthTracker: React.FC<PlantGrowthTrackerProps> = ({ selectedPlants }) => {
  const [plantProgress, setPlantProgress] = useState<Record<string, PlantStage>>({});

  useEffect(() => {
    const initialProgress: Record<string, PlantStage> = {};
    selectedPlants.forEach(plant => {
      initialProgress[plant.name] = 'seedling';
    });
    setPlantProgress(initialProgress);
  }, [selectedPlants]);

  const getStageIcon = (stage: PlantStage) => {
    switch (stage) {
      case 'seedling':
        return <Sprout className="text-green-500" />;
      case 'vegetative':
        return <Leaf className="text-green-600" />;
      case 'flowering':
        return <Flower className="text-pink-500" />;
      case 'harvest':
        return <Apple className="text-red-500" />;
    }
  };

  const advanceStage = (plantName: string) => {
    setPlantProgress(prev => {
      const currentStage = prev[plantName];
      let nextStage: PlantStage = currentStage;
      
      switch (currentStage) {
        case 'seedling':
          nextStage = 'vegetative';
          break;
        case 'vegetative':
          nextStage = 'flowering';
          break;
        case 'flowering':
          nextStage = 'harvest';
          break;
        case 'harvest':
          nextStage = 'seedling';
          break;
      }

      return { ...prev, [plantName]: nextStage };
    });
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Plant Growth Tracker</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedPlants.map(plant => (
          <div key={plant.name} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-lg mb-2">{plant.name}</h3>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                {getStageIcon(plantProgress[plant.name])}
                <span className="ml-2 capitalize">{plantProgress[plant.name]}</span>
              </div>
              <button
                onClick={() => advanceStage(plant.name)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Advance Stage
              </button>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                {plant.growthTime} weeks to harvest
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantGrowthTracker;
