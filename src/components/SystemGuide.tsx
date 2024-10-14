import React, { useState, useCallback } from 'react';
import { PlantSystemPair } from '../types';

interface SystemGuideProps {
  onSelectSystem: (system: string) => void;
  selectedPairs: PlantSystemPair[];
}

const SystemGuide: React.FC<SystemGuideProps> = React.memo(({ onSelectSystem, selectedPairs }) => {
  const [newSystem, setNewSystem] = useState({ plant: '', system: '' });

  const handleAddSystem = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (newSystem.plant && newSystem.system) {
      onSelectSystem(newSystem.system);
      setNewSystem({ plant: '', system: '' });
    }
  }, [newSystem, onSelectSystem]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Hydroponic Systems Guide</h2>
      
      <form onSubmit={handleAddSystem} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={newSystem.plant}
            onChange={(e) => setNewSystem(prev => ({ ...prev, plant: e.target.value }))}
            placeholder="Plant Name"
            className="flex-1 p-2 border rounded"
            required
          />
          <input
            type="text"
            value={newSystem.system}
            onChange={(e) => setNewSystem(prev => ({ ...prev, system: e.target.value }))}
            placeholder="System Type"
            className="flex-1 p-2 border rounded"
            required
          />
          <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
            Add System
          </button>
        </div>
      </form>
      
      <div className="space-y-4">
        {selectedPairs.map((system) => (
          <div key={system.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow">
            <div>
              <h3 className="text-lg font-semibold">{system.plant}</h3>
              <p className="text-gray-600">{system.system}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default SystemGuide;
