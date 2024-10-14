import React, { useState, useEffect } from 'react';
import { Sun, AlertTriangle } from 'lucide-react';
import { Plant } from '../types';
import { supabase } from '../supabaseClient';

interface NutrientLevel {
  plantId: string;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

interface NutrientManagementProps {
  selectedPlants: Plant[];
}

const NutrientManagement: React.FC<NutrientManagementProps> = ({ selectedPlants }) => {
  const [nutrientLevels, setNutrientLevels] = useState<NutrientLevel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNutrientLevels();
  }, []);

  async function fetchNutrientLevels() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('nutrient_levels')
        .select('*')
        .in('plantId', selectedPlants.map(p => p.id));
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setNutrientLevels(data);
      }
    } catch (error) {
      console.error('Error fetching nutrient levels:', error);
    } finally {
      setLoading(false);
    }
  }

  const updateNutrientLevel = async (plantId: string, nutrient: keyof Omit<NutrientLevel, 'plantId'>, level: number) => {
    try {
      const { error } = await supabase
        .from('nutrient_levels')
        .update({ [nutrient]: level })
        .eq('plantId', plantId);

      if (error) {
        throw error;
      }

      setNutrientLevels(prevLevels => 
        prevLevels.map(pl => 
          pl.plantId === plantId ? { ...pl, [nutrient]: level } : pl
        )
      );
    } catch (error) {
      console.error('Error updating nutrient level:', error);
    }
  };

  if (loading) {
    return <div>Loading nutrient management...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Sun className="mr-2" /> Nutrient Management
      </h2>
      {selectedPlants.length === 0 ? (
        <p className="text-yellow-600 flex items-center">
          <AlertTriangle className="mr-2" /> No plants selected. Please select plants to manage their nutrients.
        </p>
      ) : (
        <div className="space-y-6">
          {selectedPlants.map((plant) => {
            const plantNutrients = nutrientLevels.find(nl => nl.plantId === plant.id) || 
              { plantId: plant.id, nitrogen: 5, phosphorus: 5, potassium: 5 };
            return (
              <div key={plant.id} className="border rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">{plant.name}</h3>
                {['nitrogen', 'phosphorus', 'potassium'].map((nutrient) => (
                  <div key={nutrient} className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 capitalize mb-1">
                      {nutrient}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="10"
                      value={plantNutrients[nutrient as keyof Omit<NutrientLevel, 'plantId'>]}
                      onChange={(e) => updateNutrientLevel(plant.id, nutrient as keyof Omit<NutrientLevel, 'plantId'>, parseInt(e.target.value))}
                      className="w-full"
                    />
                    <span className="text-sm font-semibold">
                      Level: {plantNutrients[nutrient as keyof Omit<NutrientLevel, 'plantId'>]}
                    </span>
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default NutrientManagement;
