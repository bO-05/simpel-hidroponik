import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

interface NutrientCalculatorProps {
  selectedPairs: { id: string; plant: string; system: string }[];
}

interface NutrientRecommendation {
  nutrientName: string;
  amount: number;
  unit: string;
}

const NutrientCalculator: React.FC<NutrientCalculatorProps> = ({ selectedPairs }) => {
  const [waterVolume, setWaterVolume] = useState<number>(0);
  const [recommendations, setRecommendations] = useState<NutrientRecommendation[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedPairs.length > 0 && waterVolume > 0) {
      calculateNutrients();
    }
  }, [selectedPairs, waterVolume]);

  const calculateNutrients = async () => {
    setLoading(true);
    try {
      // In a real application, you would fetch this data from your Supabase database
      // based on the selected plants and systems. For this example, we'll use mock data.
      const mockRecommendations: NutrientRecommendation[] = [
        { nutrientName: 'Nitrogen', amount: 5 * waterVolume, unit: 'ml' },
        { nutrientName: 'Phosphorus', amount: 3 * waterVolume, unit: 'ml' },
        { nutrientName: 'Potassium', amount: 4 * waterVolume, unit: 'ml' },
        { nutrientName: 'Calcium', amount: 2 * waterVolume, unit: 'ml' },
        { nutrientName: 'Magnesium', amount: 1 * waterVolume, unit: 'ml' },
      ];

      setRecommendations(mockRecommendations);
    } catch (error) {
      console.error('Error calculating nutrients:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <Calculator className="mr-2" /> Nutrient Calculator
      </h2>
      <p className="text-gray-600 mb-4">
        Calculate the recommended nutrient mix for your hydroponic system based on your plants and water volume.
      </p>
      {selectedPairs.length === 0 ? (
        <p className="text-yellow-600">Please select plants and systems to calculate nutrients.</p>
      ) : (
        <>
          <div className="mb-4">
            <label htmlFor="waterVolume" className="block text-sm font-medium text-gray-700">
              Water Volume (liters)
            </label>
            <input
              type="number"
              id="waterVolume"
              value={waterVolume}
              onChange={(e) => setWaterVolume(Number(e.target.value))}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>
          {loading ? (
            <p>Calculating nutrients...</p>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Recommended Nutrient Mix:</h3>
              <ul className="list-disc pl-5">
                {recommendations.map((rec, index) => (
                  <li key={index}>
                    {rec.nutrientName}: {rec.amount.toFixed(2)} {rec.unit}
                  </li>
                ))}
              </ul>
              <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mt-4">
                <p className="font-bold">Instructions:</p>
                <ol className="list-decimal pl-5 mt-2">
                  <li>Fill your reservoir with {waterVolume} liters of water.</li>
                  <li>Add each nutrient in the order listed above, stirring well after each addition.</li>
                  <li>Check and adjust pH levels if necessary.</li>
                  <li>Let the solution circulate for a few minutes before use.</li>
                </ol>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NutrientCalculator;
