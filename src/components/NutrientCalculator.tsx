import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';
import { PlantSystemPair } from '../App';
import useLocalStorage from '../hooks/useLocalStorage';

interface NutrientRequirement {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

interface PlantStageRequirement {
  seedling: NutrientRequirement;
  vegetative: NutrientRequirement;
  flowering: NutrientRequirement;
  fruiting: NutrientRequirement;
}

interface NutrientCalculatorProps {
  selectedPairs: PlantSystemPair[];
}

const defaultRequirements: PlantStageRequirement = {
  seedling: { nitrogen: 100, phosphorus: 80, potassium: 100 },
  vegetative: { nitrogen: 200, phosphorus: 100, potassium: 150 },
  flowering: { nitrogen: 150, phosphorus: 150, potassium: 200 },
  fruiting: { nitrogen: 100, phosphorus: 200, potassium: 250 },
};

const NutrientCalculator: React.FC<NutrientCalculatorProps> = ({ selectedPairs }) => {
  const [waterVolume, setWaterVolume] = useState<number>(0);
  const [growthStage, setGrowthStage] = useState<keyof PlantStageRequirement>('seedling');
  const [calculatedNutrients, setCalculatedNutrients] = useState<NutrientRequirement | null>(null);
  const [savedCalculations, setSavedCalculations] = useLocalStorage<{[key: string]: NutrientRequirement}>('savedNutrientCalculations', {});
  const [selectedPair, setSelectedPair] = useState<string | null>(null);

  useEffect(() => {
    if (selectedPairs.length > 0 && !selectedPair) {
      setSelectedPair(`${selectedPairs[0].plant}-${selectedPairs[0].system}`);
    }
  }, [selectedPairs, selectedPair]);

  const calculateNutrients = () => {
    if (waterVolume > 0 && selectedPair) {
      const stageRequirements = defaultRequirements[growthStage];
      const calculated = {
        nitrogen: (stageRequirements.nitrogen * waterVolume) / 1000,
        phosphorus: (stageRequirements.phosphorus * waterVolume) / 1000,
        potassium: (stageRequirements.potassium * waterVolume) / 1000
      };
      setCalculatedNutrients(calculated);

      // Save the calculation
      const key = `${selectedPair}-${growthStage}`;
      setSavedCalculations({...savedCalculations, [key]: calculated});
    }
  };

  if (selectedPairs.length === 0) {
    return <p>Please select at least one plant and system pair to calculate nutrient requirements.</p>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Advanced Nutrient Calculator</h2>
      <div className="mb-4">
        <select
          className="w-full p-2 border rounded mb-2"
          value={selectedPair || ''}
          onChange={(e) => setSelectedPair(e.target.value)}
        >
          {selectedPairs.map((pair, index) => (
            <option key={index} value={`${pair.plant}-${pair.system}`}>
              {pair.plant} in {pair.system}
            </option>
          ))}
        </select>
        <label className="block mb-2">Water Volume (liters):</label>
        <input
          type="number"
          className="w-full p-2 border rounded"
          value={waterVolume}
          onChange={(e) => setWaterVolume(Number(e.target.value))}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">Growth Stage:</label>
        <select
          className="w-full p-2 border rounded"
          value={growthStage}
          onChange={(e) => setGrowthStage(e.target.value as keyof PlantStageRequirement)}
        >
          <option value="seedling">Seedling</option>
          <option value="vegetative">Vegetative</option>
          <option value="flowering">Flowering</option>
          <option value="fruiting">Fruiting</option>
        </select>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        onClick={calculateNutrients}
      >
        <Calculator className="mr-2" /> Calculate Nutrients
      </button>
      {calculatedNutrients && (
        <div className="mt-4 p-4 bg-green-100 rounded-lg">
          <h3 className="font-semibold mb-2">Calculated Nutrient Requirements:</h3>
          <p>Nitrogen: {calculatedNutrients.nitrogen.toFixed(2)} grams</p>
          <p>Phosphorus: {calculatedNutrients.phosphorus.toFixed(2)} grams</p>
          <p>Potassium: {calculatedNutrients.potassium.toFixed(2)} grams</p>
        </div>
      )}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Saved Calculations</h3>
        {Object.entries(savedCalculations).map(([key, calculation]) => {
          const [plant, system, stage] = key.split('-');
          return (
            <div key={key} className="mb-4 p-4 bg-gray-100 rounded-lg">
              <p><strong>Plant:</strong> {plant}</p>
              <p><strong>System:</strong> {system}</p>
              <p><strong>Stage:</strong> {stage}</p>
              <p>Nitrogen: {calculation.nitrogen.toFixed(2)} grams</p>
              <p>Phosphorus: {calculation.phosphorus.toFixed(2)} grams</p>
              <p>Potassium: {calculation.potassium.toFixed(2)} grams</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NutrientCalculator;
