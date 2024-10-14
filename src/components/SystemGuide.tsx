import React from 'react';
import { Droplet } from 'lucide-react';

interface SystemGuideProps {
  selectedPairs: { id: string; plant: string; system: string }[];
  onSelectSystem: (plantId: string, system: string) => void;
}

const hydroponicSystems = [
  {
    name: 'Deep Water Culture (DWC)',
    description: 'Plants are suspended in nutrient-rich water with their roots submerged.',
    pros: ['Simple to set up', 'Low maintenance', 'Good for leafy greens'],
    cons: ['Not ideal for large plants', 'Requires air pump']
  },
  {
    name: 'Nutrient Film Technique (NFT)',
    description: 'A thin film of nutrient solution flows over the roots in a shallow channel.',
    pros: ['Efficient water and nutrient use', 'Good for small to medium plants'],
    cons: ['Requires precise slope', 'Vulnerable to pump failures']
  },
  {
    name: 'Ebb and Flow (Flood and Drain)',
    description: 'Plants are periodically flooded with nutrient solution, which then drains back into a reservoir.',
    pros: ['Versatile for different plant sizes', 'Good oxygenation for roots'],
    cons: ['More complex setup', 'Potential for pump failure']
  },
  {
    name: 'Drip System',
    description: 'Nutrient solution is slowly dripped onto the growing medium and roots of each plant.',
    pros: ['Efficient water use', 'Suitable for a wide range of plants'],
    cons: ['Drippers can clog', 'Requires monitoring of nutrient concentration']
  }
];

const SystemGuide: React.FC<SystemGuideProps> = ({ selectedPairs, onSelectSystem }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Droplet className="mr-2" /> Hydroponic System Guide
      </h2>
      <p className="text-gray-600 mb-4">
        Select a hydroponic system for your plants. Each system has its own advantages and is suited for different types of plants and growing conditions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hydroponicSystems.map((system) => (
          <div key={system.name} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-2">{system.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{system.description}</p>
            <div className="mb-2">
              <strong>Pros:</strong>
              <ul className="list-disc list-inside">
                {system.pros.map((pro, index) => (
                  <li key={index} className="text-sm">{pro}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <strong>Cons:</strong>
              <ul className="list-disc list-inside">
                {system.cons.map((con, index) => (
                  <li key={index} className="text-sm">{con}</li>
                ))}
              </ul>
            </div>
            {selectedPairs.map((pair) => (
              <button
                key={pair.id}
                onClick={() => onSelectSystem(pair.id, system.name)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2 mb-2"
              >
                Select for {pair.plant}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemGuide;
