import React from 'react';
import { DollarSign, Droplet, Wrench } from 'lucide-react';

const systems = [
  {
    name: 'Wick System',
    cost: 'Low',
    difficulty: 'Easy',
    materials: 'Plastic containers, wicks, growing medium',
    description: 'Simple passive system using wicks to draw nutrient solution to the roots.',
  },
  {
    name: 'Deep Water Culture (DWC)',
    cost: 'Low to Medium',
    difficulty: 'Easy',
    materials: 'Bucket, air pump, air stone, net pots',
    description: 'Plants are suspended in nutrient-rich, oxygenated water.',
  },
  {
    name: 'Nutrient Film Technique (NFT)',
    cost: 'Medium',
    difficulty: 'Medium',
    materials: 'PVC pipes, pump, reservoir',
    description: 'Thin film of nutrient solution flows over the roots in channels.',
  },
];

const SystemGuide: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Affordable Hydroponic Systems</h2>
      <div className="space-y-6">
        {systems.map((system, index) => (
          <div key={index} className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-2">{system.name}</h3>
            <p className="flex items-center mb-1">
              <DollarSign className="mr-2 text-green-600" /> Cost: {system.cost}
            </p>
            <p className="flex items-center mb-1">
              <Wrench className="mr-2 text-blue-600" /> Difficulty: {system.difficulty}
            </p>
            <p className="flex items-center mb-1">
              <Droplet className="mr-2 text-blue-600" /> Materials: {system.materials}
            </p>
            <p className="text-sm text-gray-600 mt-2">{system.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemGuide;