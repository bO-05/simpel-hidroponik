import React, { useState } from 'react';
import { DollarSign, Droplet, Wrench, BarChart2 } from 'lucide-react';

interface SystemGuideProps {
  onSelectSystem: (system: string) => void;
}

interface System {
  name: string;
  cost: number;
  difficulty: number;
  materials: string;
  description: string;
  pros: string[];
  cons: string[];
  systemImage: string;
  materialsImage: string;
}

const systems: System[] = [
  {
    name: 'Wick System',
    cost: 1,
    difficulty: 1,
    materials: 'Plastic containers, wicks, growing medium',
    description: 'Simple passive system using wicks to draw nutrient solution to the roots.',
    pros: ['Low cost', 'Easy to set up', 'Low maintenance'],
    cons: ['Limited to small plants', 'Can be less efficient'],
    systemImage: 'https://images.unsplash.com/photo-1558435186-d31d126391fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    materialsImage: 'https://images.unsplash.com/photo-1615477081663-5e5c9b8bca21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Deep Water Culture (DWC)',
    cost: 2,
    difficulty: 2,
    materials: 'Bucket, air pump, air stone, net pots',
    description: 'Plants are suspended in nutrient-rich, oxygenated water.',
    pros: ['Fast growth', 'High yields', 'Good for leafy greens'],
    cons: ['Requires constant electricity', 'Risk of pump failure'],
    systemImage: 'https://images.unsplash.com/photo-1589469526983-0887ebe10072?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    materialsImage: 'https://images.unsplash.com/photo-1624958723474-05d32b99c0a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Nutrient Film Technique (NFT)',
    cost: 3,
    difficulty: 3,
    materials: 'PVC pipes, pump, reservoir',
    description: 'Thin film of nutrient solution flows over the roots in channels.',
    pros: ['Water efficient', 'Scalable', 'Good for commercial use'],
    cons: ['Higher initial cost', 'Requires precise slope'],
    systemImage: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    materialsImage: 'https://images.unsplash.com/photo-1624959462477-c69d45934523?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Ebb and Flow (Flood and Drain)',
    cost: 3,
    difficulty: 3,
    materials: 'Grow tray, reservoir, pump, timer',
    description: 'Periodically floods the grow tray with nutrient solution and then drains it.',
    pros: ['Versatile for various plant sizes', 'Efficient nutrient use'],
    cons: ['More complex setup', 'Risk of pump or timer failure'],
    systemImage: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    materialsImage: 'https://images.unsplash.com/photo-1624959462477-c69d45934523?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  },
  {
    name: 'Aeroponics',
    cost: 5,
    difficulty: 5,
    materials: 'Spray nozzles, high-pressure pump, timer, growing chamber',
    description: 'Roots are suspended in air and misted with nutrient solution.',
    pros: ['Highest oxygen exposure', 'Fast growth', 'Water efficient'],
    cons: ['Expensive', 'Complex to maintain', 'Requires constant electricity'],
    systemImage: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    materialsImage: 'https://images.unsplash.com/photo-1624959462477-c69d45934523?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
  }
];

const SystemGuide: React.FC<SystemGuideProps> = ({ onSelectSystem }) => {
  const [sortBy, setSortBy] = useState<'cost' | 'difficulty'>('cost');
  const [showComparison, setShowComparison] = useState(false);
  const [selectedSystem, setSelectedSystem] = useState<string | null>(null);

  const sortedSystems = [...systems].sort((a, b) => a[sortBy] - b[sortBy]);

  const getCostLabel = (cost: number): string => {
    const labels = ['Very Low', 'Low', 'Medium', 'High', 'Very High'];
    return labels[cost - 1];
  };

  const getDifficultyLabel = (difficulty: number): string => {
    const labels = ['Very Easy', 'Easy', 'Moderate', 'Difficult', 'Very Difficult'];
    return labels[difficulty - 1];
  };

  const handleSelectSystem = (systemName: string): void => {
    setSelectedSystem(systemName);
    onSelectSystem(systemName);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Hydroponic Systems Guide</h2>
      <div className="flex justify-between mb-4">
        <div>
          <button
            className={`mr-2 px-3 py-1 rounded ${
              sortBy === 'cost' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSortBy('cost')}
          >
            <DollarSign className="inline mr-1" /> Sort by Cost
          </button>
          <button
            className={`px-3 py-1 rounded ${
              sortBy === 'difficulty' ? 'bg-green-500 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setSortBy('difficulty')}
          >
            <Wrench className="inline mr-1" /> Sort by Difficulty
          </button>
        </div>
        <button
          className="px-3 py-1 rounded bg-blue-500 text-white"
          onClick={() => setShowComparison(!showComparison)}
        >
          <BarChart2 className="inline mr-1" /> {showComparison ? 'Hide' : 'Show'} Comparison
        </button>
      </div>
      {showComparison ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">System</th>
                <th className="border border-gray-300 p-2">Cost</th>
                <th className="border border-gray-300 p-2">Difficulty</th>
                <th className="border border-gray-300 p-2">Pros</th>
                <th className="border border-gray-300 p-2">Cons</th>
              </tr>
            </thead>
            <tbody>
              {sortedSystems.map((system, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="border border-gray-300 p-2 font-semibold">{system.name}</td>
                  <td className="border border-gray-300 p-2">{getCostLabel(system.cost)}</td>
                  <td className="border border-gray-300 p-2">{getDifficultyLabel(system.difficulty)}</td>
                  <td className="border border-gray-300 p-2">
                    <ul className="list-disc list-inside">
                      {system.pros.map((pro, i) => (
                        <li key={i}>{pro}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-300 p-2">
                    <ul className="list-disc list-inside">
                      {system.cons.map((con, i) => (
                        <li key={i}>{con}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedSystems.map((system, index) => (
            <div key={index} className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{system.name}</h3>
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <img src={system.systemImage} alt={`${system.name} system`} className="w-full h-48 object-cover rounded" />
                  <p className="text-sm text-center mt-1">System Image</p>
                </div>
                <div className="w-full md:w-1/2 px-2 mb-4">
                  <img src={system.materialsImage} alt={`${system.name} materials`} className="w-full h-48 object-cover rounded" />
                  <p className="text-sm text-center mt-1">Materials Image</p>
                </div>
              </div>
              <p className="flex items-center mb-1">
                <DollarSign className="mr-2 text-green-600" /> Cost: {getCostLabel(system.cost)}
              </p>
              <p className="flex items-center mb-1">
                <Wrench className="mr-2 text-blue-600" /> Difficulty: {getDifficultyLabel(system.difficulty)}
              </p>
              <p className="flex items-center mb-1">
                <Droplet className="mr-2 text-blue-600" /> Materials: {system.materials}
              </p>
              <p className="text-sm text-gray-600 mt-2">{system.description}</p>
              <div className="mt-2">
                <h4 className="font-semibold">Pros:</h4>
                <ul className="list-disc list-inside">
                  {system.pros.map((pro, i) => (
                    <li key={i}>{pro}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-2">
                <h4 className="font-semibold">Cons:</h4>
                <ul className="list-disc list-inside">
                  {system.cons.map((con, i) => (
                    <li key={i}>{con}</li>
                  ))}
                </ul>
              </div>
              <button
                className={`mt-4 px-4 py-2 rounded transition-colors ${
                  selectedSystem === system.name
                    ? 'bg-green-600 text-white'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
                onClick={() => handleSelectSystem(system.name)}
              >
                {selectedSystem === system.name ? 'Selected' : 'Select This System'}
              </button>
            </div>
          ))}
        </div>
      )}
      {selectedSystem && (
        <div className="mt-8 p-4 bg-green-100 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Selected System: {selectedSystem}</h3>
          <p>You have selected the {selectedSystem} for your hydroponic setup. This information will be used in the maintenance checklist.</p>
        </div>
      )}
    </div>
  );
};

export default SystemGuide;
