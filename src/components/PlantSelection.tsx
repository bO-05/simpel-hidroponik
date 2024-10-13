import React from 'react';
import { Sprout } from 'lucide-react';

const plants = [
  { name: 'Kangkung (Water Spinach)', difficulty: 'Easy', growthTime: '3-4 weeks' },
  { name: 'Bayam (Spinach)', difficulty: 'Easy', growthTime: '4-6 weeks' },
  { name: 'Selada (Lettuce)', difficulty: 'Easy', growthTime: '4-5 weeks' },
  { name: 'Pakcoy (Bok Choy)', difficulty: 'Medium', growthTime: '5-7 weeks' },
  { name: 'Cabe (Chili)', difficulty: 'Medium', growthTime: '8-12 weeks' },
];

const PlantSelection: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Recommended Plants for Jakarta</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {plants.map((plant, index) => (
          <div key={index} className="bg-green-100 p-4 rounded-lg">
            <h3 className="font-semibold flex items-center">
              <Sprout className="mr-2 text-green-600" /> {plant.name}
            </h3>
            <p className="text-sm text-gray-600">Difficulty: {plant.difficulty}</p>
            <p className="text-sm text-gray-600">Growth Time: {plant.growthTime}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlantSelection;