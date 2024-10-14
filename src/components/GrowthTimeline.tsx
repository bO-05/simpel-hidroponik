import React, { useState, useEffect } from 'react';
import { Thermometer } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { Plant } from '../types';

interface PlantGrowth {
  id: string;
  plantId: string;
  currentStage: string;
  startDate: string;
}

interface GrowthTimelineProps {
  selectedPlants: Plant[];
}

const growthStages = [
  { name: 'Germination', description: 'Seeds start to sprout' },
  { name: 'Seedling', description: 'First leaves appear' },
  { name: 'Vegetative', description: 'Rapid growth of leaves and stems' },
  { name: 'Budding', description: 'First signs of flower buds' },
  { name: 'Flowering', description: 'Flowers bloom' },
  { name: 'Ripening', description: 'Fruits or vegetables begin to mature' },
  { name: 'Harvesting', description: 'Ready to be harvested' }
];

const GrowthTimeline: React.FC<GrowthTimelineProps> = ({ selectedPlants }) => {
  const [plantGrowth, setPlantGrowth] = useState<PlantGrowth[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlantGrowth();
  }, [selectedPlants]);

  async function fetchPlantGrowth() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('plant_growth')
        .select('*')
        .in('plantId', selectedPlants.map(p => p.id));
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setPlantGrowth(data);
      }
    } catch (error) {
      console.error('Error fetching plant growth data:', error);
    } finally {
      setLoading(false);
    }
  }

  const updateGrowthStage = async (id: string, newStage: string) => {
    try {
      const { error } = await supabase
        .from('plant_growth')
        .update({ currentStage: newStage })
        .eq('id', id);

      if (error) {
        throw error;
      }

      setPlantGrowth(plantGrowth.map(plant => 
        plant.id === id ? { ...plant, currentStage: newStage } : plant
      ));
    } catch (error) {
      console.error('Error updating growth stage:', error);
    }
  };

  const calculateGrowthPercentage = (plant: PlantGrowth): number => {
    const currentStageIndex = growthStages.findIndex(stage => stage.name === plant.currentStage);
    return Math.round((currentStageIndex + 1) / growthStages.length * 100);
  };

  if (loading) {
    return <div>Loading growth timeline...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Thermometer className="mr-2" /> Growth Timeline
      </h2>
      <p className="text-gray-600 mb-4">
        Track the growth stages of your plants. Update the current stage as your plants progress.
      </p>
      <div className="space-y-6">
        {selectedPlants.map((plant) => {
          const growth = plantGrowth.find(pg => pg.plantId === plant.id);
          return (
            <div key={plant.id} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{plant.name}</h3>
              {growth ? (
                <>
                  <p className="text-sm text-gray-600 mb-2">Start Date: {new Date(growth.startDate).toLocaleDateString()}</p>
                  <div className="mb-4">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div className="bg-green-600 h-2.5 rounded-full" style={{width: `${calculateGrowthPercentage(growth)}%`}}></div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">Growth Progress: {calculateGrowthPercentage(growth)}%</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {growthStages.map((stage) => (
                      <button
                        key={stage.name}
                        onClick={() => updateGrowthStage(growth.id, stage.name)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          growth.currentStage === stage.name
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                        title={stage.description}
                      >
                        {stage.name}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-yellow-600">No growth data available for this plant.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GrowthTimeline;
