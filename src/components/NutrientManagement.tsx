import React from 'react';
import { Beaker, Thermometer, Droplet } from 'lucide-react';

const NutrientManagement: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Nutrient Management</h2>
      <div className="space-y-6">
        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold flex items-center">
            <Beaker className="mr-2 text-yellow-600" /> Basic Nutrient Solution
          </h3>
          <p className="mt-2">
            For most leafy greens and herbs, use a balanced hydroponic nutrient solution. You can find affordable options at local gardening stores or online marketplaces in Jakarta.
          </p>
          <p className="mt-2">
            Recommended EC (Electrical Conductivity) range: 1.0 - 1.4 mS/cm for leafy greens.
          </p>
        </div>

        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="font-semibold flex items-center">
            <Thermometer className="mr-2 text-red-600" /> pH Management
          </h3>
          <p className="mt-2">
            Maintain pH levels between 5.5 and 6.5 for optimal nutrient uptake. Use pH testing kits and adjusters available in local hydroponics shops.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold flex items-center">
            <Droplet className="mr-2 text-blue-600" /> Water Quality
          </h3>
          <p className="mt-2">
            Use filtered or rainwater if possible. If using tap water, let it sit for 24 hours to allow chlorine to evaporate.
          </p>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold">Tips for Jakarta's Climate:</h3>
          <ul className="list-disc list-inside mt-2">
            <li>Change nutrient solution every 1-2 weeks to prevent salt buildup.</li>
            <li>In hot weather, check water levels daily and top up with plain water as needed.</li>
            <li>Consider using a shade cloth during the hottest parts of the day to prevent nutrient solution from overheating.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NutrientManagement;