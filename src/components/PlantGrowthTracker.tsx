import React, { useState, useEffect } from 'react';
import { LineChart } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface GrowthRecord {
  id: string;
  plantId: string;
  date: string;
  height: number;
  numLeaves: number;
}

interface Plant {
  id: string;
  name: string;
}

interface PlantGrowthTrackerProps {
  selectedPlants: Plant[];
}

const PlantGrowthTracker: React.FC<PlantGrowthTrackerProps> = ({ selectedPlants }) => {
  const [growthRecords, setGrowthRecords] = useState<GrowthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [newRecords, setNewRecords] = useState<{[key: string]: {height: string, numLeaves: string}}>({});

  useEffect(() => {
    if (selectedPlants.length > 0) {
      fetchGrowthRecords();
    }
  }, [selectedPlants]);

  async function fetchGrowthRecords() {
    try {
      setLoading(true);
      const plantIds = selectedPlants.map(plant => plant.id);
      const { data, error } = await supabase
        .from('growth_records')
        .select('*')
        .in('plantId', plantIds)
        .order('date', { ascending: true });
      
      if (error) {
        throw error;
      }
      
      if (data) {
        setGrowthRecords(data);
      }
    } catch (error) {
      console.error('Error fetching growth records:', error);
    } finally {
      setLoading(false);
    }
  }

  const addGrowthRecord = async (plantId: string) => {
    try {
      const { height, numLeaves } = newRecords[plantId];
      const newRecord = {
        plantId,
        date: new Date().toISOString(),
        height: parseFloat(height),
        numLeaves: parseInt(numLeaves, 10)
      };

      const { data, error } = await supabase
        .from('growth_records')
        .insert([newRecord])
        .select();

      if (error) {
        throw error;
      }

      if (data) {
        setGrowthRecords([...growthRecords, ...data]);
        // Clear the input fields after successful addition
        setNewRecords({...newRecords, [plantId]: {height: '', numLeaves: ''}});
      }
    } catch (error) {
      console.error('Error adding growth record:', error);
    }
  };

  const renderGrowthChart = (plantId: string) => {
    const plantRecords = growthRecords.filter(record => record.plantId === plantId);
    
    // This is a simple representation. You might want to use a proper charting library for a more sophisticated chart.
    return (
      <div className="h-40 flex items-end space-x-1">
        {plantRecords.map((record) => (
          <div 
            key={record.id} 
            className="bg-green-500 w-4"
            style={{ height: `${record.height}%` }}
            title={`Date: ${new Date(record.date).toLocaleDateString()}, Height: ${record.height}cm, Leaves: ${record.numLeaves}`}
          ></div>
        ))}
      </div>
    );
  };

  const handleInputChange = (plantId: string, field: 'height' | 'numLeaves', value: string) => {
    setNewRecords({
      ...newRecords,
      [plantId]: {
        ...newRecords[plantId],
        [field]: value
      }
    });
  };

  if (loading) {
    return <div>Loading growth tracker...</div>;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <LineChart className="mr-2" /> Plant Growth Tracker
      </h2>
      <p className="text-gray-600 mb-4">
        Track the growth of your plants over time. Add new measurements regularly to see progress.
      </p>
      {selectedPlants.length === 0 ? (
        <p className="text-yellow-600">Please select plants to track their growth.</p>
      ) : (
        <div className="space-y-8">
          {selectedPlants.map((plant) => (
            <div key={plant.id} className="border rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-2">{plant.name}</h3>
              {renderGrowthChart(plant.id)}
              <div className="mt-4 flex space-x-4">
                <input
                  type="number"
                  placeholder="Height (cm)"
                  className="border rounded px-2 py-1"
                  value={newRecords[plant.id]?.height || ''}
                  onChange={(e) => handleInputChange(plant.id, 'height', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Number of leaves"
                  className="border rounded px-2 py-1"
                  value={newRecords[plant.id]?.numLeaves || ''}
                  onChange={(e) => handleInputChange(plant.id, 'numLeaves', e.target.value)}
                />
                <button
                  onClick={() => addGrowthRecord(plant.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Add Record
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlantGrowthTracker;
