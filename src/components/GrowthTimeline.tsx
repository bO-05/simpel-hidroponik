import React from 'react';
import { Calendar, Sun, Cloud, Droplet } from 'lucide-react';

const GrowthTimeline: React.FC = () => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Growth Timeline</h2>
      <div className="space-y-6">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="font-semibold flex items-center">
            <Calendar className="mr-2 text-green-600" /> General Timeline
          </h3>
          <ul className="mt-2 space-y-2">
            <li><strong>Week 1-2:</strong> Germination and seedling stage</li>
            <li><strong>Week 3-4:</strong> Early growth stage</li>
            <li><strong>Week 5-6:</strong> Rapid growth stage</li>
            <li><strong>Week 7-8:</strong> Maturation and harvesting (for most leafy greens)</li>
            <li><strong>Week 9+:</strong> Extended growth and multiple harvests (for some plants like chili)</li>
          </ul>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold flex items-center">
            <Sun className="mr-2 text-yellow-600" /> Jakarta's Climate Considerations
          </h3>
          <p className="mt-2">
            Jakarta's tropical climate affects plant growth. Consider these factors:
          </p>
          <ul className="mt-2 list-disc list-inside">
            <li>Year-round warm temperatures accelerate growth</li>
            <li>High humidity may increase the risk of fungal diseases</li>
            <li>Rainy season (October to April) may affect outdoor systems</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg">
          <h3 className="font-semibold flex items-center">
            <Cloud className="mr-2 text-blue-600" /> Seasonal Adjustments
          </h3>
          <div className="mt-2 space-y-2">
            <p><strong>Dry Season (May to September):</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>Monitor water levels closely</li>
              <li>Provide shade during peak sun hours</li>
              <li>Increase frequency of nutrient solution changes</li>
            </ul>
            <p><strong>Wet Season (October to April):</strong></p>
            <ul className="list-disc list-inside ml-4">
              <li>Protect systems from heavy rain if outdoors</li>
              <li>Monitor for pests that may be more active</li>
              <li>Ensure good air circulation to prevent mold</li>
            </ul>
          </div>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg">
          <h3 className="font-semibold flex items-center">
            <Droplet className="mr-2 text-purple-600" /> Maintenance Schedule
          </h3>
          <ul className="mt-2 space-y-2">
            <li><strong>Daily:</strong> Check water levels and plant health</li>
            <li><strong>Weekly:</strong> Test and adjust pH and EC levels</li>
            <li><strong>Bi-weekly:</strong> Change nutrient solution</li>
            <li><strong>Monthly:</strong> Deep clean system and check for any needed repairs</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default GrowthTimeline;