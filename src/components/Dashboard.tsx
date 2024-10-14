import React, { useEffect, useState } from 'react';
import { useUser } from '../contexts/UserContext';
import useDatabase from '../hooks/useDatabase';
import { Plant, PlantSystemPair } from '../types';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const db = useDatabase();
  const [plants, setPlants] = useState<Plant[]>([]);
  const [systems, setSystems] = useState<PlantSystemPair[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPlants = await db.getAllPlants();
      const fetchedSystems = await db.getAllSystems();
      setPlants(fetchedPlants);
      setSystems(fetchedSystems);
    };
    fetchData();
  }, [db]);

  const handleDeletePlant = async (plantName: string) => {
    await db.deletePlant(plantName);
    setPlants(plants.filter(plant => plant.name !== plantName));
  };

  const handleDeleteSystem = async (systemId: string) => {
    await db.deleteSystem(systemId);
    setSystems(systems.filter(system => system.id !== systemId));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Plants</h2>
        {plants.length === 0 ? (
          <p>No plants added yet.</p>
        ) : (
          <ul className="space-y-2">
            {plants.map((plant) => (
              <li key={plant.name} className="flex justify-between items-center bg-white p-2 rounded shadow">
                <span>{plant.name}</span>
                <button
                  onClick={() => handleDeletePlant(plant.name)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">Your Systems</h2>
        {systems.length === 0 ? (
          <p>No systems added yet.</p>
        ) : (
          <ul className="space-y-2">
            {systems.map((system) => (
              <li key={system.id} className="flex justify-between items-center bg-white p-2 rounded shadow">
                <span>{system.plant} - {system.system}</span>
                <button
                  onClick={() => handleDeleteSystem(system.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
