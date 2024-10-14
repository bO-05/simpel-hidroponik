import React, { useState, ChangeEvent, useEffect } from 'react';
import { Sprout, Filter, ArrowUpDown, Search, Users } from 'lucide-react';
import { Plant } from '../types';
import { plants } from '../data/plants';

interface PlantSelectionProps {
  onSelectPlant: (plant: Plant) => void;
  selectedPlants: Plant[];
}

const PlantSelection: React.FC<PlantSelectionProps> = ({ onSelectPlant, selectedPlants }) => {
  const [sortBy, setSortBy] = useState<keyof Plant>('name');
  const [filterDifficulty, setFilterDifficulty] = useState<'All' | Plant['difficulty']>('All');
  const [filterType, setFilterType] = useState<'All' | Plant['type']>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedPlants, setExpandedPlants] = useState<Set<string>>(new Set());
  const [recommendedPlants, setRecommendedPlants] = useState<Plant[]>([]);
  const [userPreferences, setUserPreferences] = useState({
    temperature: '',
    humidity: '',
    experience: ''
  });

  useEffect(() => {
    if (userPreferences.temperature && userPreferences.humidity && userPreferences.experience) {
      const recommended = plants.filter(plant => {
        const [minTemp, maxTemp] = plant.idealTemperature.split(' - ').map(t => parseInt(t));
        const [minHumidity, maxHumidity] = plant.idealHumidity.split(' - ').map(h => parseInt(h));
        const userTemp = parseInt(userPreferences.temperature);
        const userHumidity = parseInt(userPreferences.humidity);

        const tempMatch = userTemp >= Math.max(15, minTemp) && userTemp <= Math.min(30, maxTemp);
        const humidityMatch = userHumidity >= Math.max(50, minHumidity) && userHumidity <= Math.min(80, maxHumidity);
        const difficultyMatch = 
          (userPreferences.experience === 'Beginner' && plant.difficulty === 'Easy') ||
          (userPreferences.experience === 'Intermediate' && (plant.difficulty === 'Easy' || plant.difficulty === 'Medium')) ||
          (userPreferences.experience === 'Advanced');

        return tempMatch && humidityMatch && difficultyMatch;
      });
      setRecommendedPlants(recommended);
    } else {
      setRecommendedPlants([]);
    }
  }, [userPreferences]);

  const sortedPlants = [...plants].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'difficulty') {
      const difficultyOrder: Record<Plant['difficulty'], number> = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    }
    if (sortBy === 'growthTime') {
      return a.growthTime - b.growthTime;
    }
    return 0; // Default case, no sorting
  });

  const filteredPlants = sortedPlants.filter(plant => 
    (filterDifficulty === 'All' || plant.difficulty === filterDifficulty) &&
    (filterType === 'All' || plant.type === filterType) &&
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePlantSelection = (plant: Plant) => {
    onSelectPlant(plant);
  };

  const toggleExpandPlant = (plantName: string) => {
    setExpandedPlants(prev => {
      const newSet = new Set(prev);
      if (newSet.has(plantName)) {
        newSet.delete(plantName);
      } else {
        newSet.add(plantName);
      }
      return newSet;
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Recommended Plants for Jakarta</h2>
      <div className="mb-4 p-4 bg-blue-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Get Personalized Plant Recommendations</h3>
        <div className="flex flex-wrap gap-4">
          <input
            type="number"
            placeholder="Average Temperature (°C)"
            className="border rounded p-2"
            value={userPreferences.temperature}
            onChange={(e) => setUserPreferences(prev => ({ ...prev, temperature: e.target.value }))}
            min="15"
            max="30"
            step="5"
          />
          <input
            type="number"
            placeholder="Average Humidity (%)"
            className="border rounded p-2"
            value={userPreferences.humidity}
            onChange={(e) => setUserPreferences(prev => ({ ...prev, humidity: e.target.value }))}
            min="50"
            max="80"
            step="5"
          />
          <select
            className="border rounded p-2"
            value={userPreferences.experience}
            onChange={(e) => setUserPreferences(prev => ({ ...prev, experience: e.target.value }))}
          >
            <option value="">Select Experience Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>
      {recommendedPlants.length > 0 && (
        <div className="mb-8 p-4 bg-green-100 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Recommended Plants for You</h3>
          <div className="flex flex-wrap gap-4">
            {recommendedPlants.map((plant, index) => (
              <div key={index} className="bg-white p-2 rounded-lg shadow-md">
                <img src={plant.image} alt={plant.name} className="w-24 h-24 object-cover rounded-md mb-2" />
                <p className="font-semibold">{plant.name}</p>
                <p className="text-sm text-gray-600">{plant.difficulty}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex flex-wrap justify-between mb-4 gap-2">
        <div className="flex items-center">
          <Search className="mr-2" />
          <input
            type="text"
            placeholder="Search plants..."
            className="border rounded p-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center">
          <Filter className="mr-2" />
          <select 
            className="border rounded p-2 mr-2"
            value={filterDifficulty}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterDifficulty(e.target.value as 'All' | Plant['difficulty'])}
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select 
            className="border rounded p-2"
            value={filterType}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setFilterType(e.target.value as 'All' | Plant['type'])}
          >
            <option value="All">All Types</option>
            <option value="Leafy Green">Leafy Green</option>
            <option value="Fruit">Fruit</option>
            <option value="Root">Root</option>
          </select>
        </div>
        <div className="flex items-center">
          <ArrowUpDown className="mr-2" />
          <select 
            className="border rounded p-2"
            value={sortBy}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortBy(e.target.value as keyof Plant)}
          >
            <option value="name">Name</option>
            <option value="difficulty">Difficulty</option>
            <option value="growthTime">Growth Time</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredPlants.map((plant, index) => (
          <div 
            key={index} 
            className={`bg-white p-4 rounded-lg shadow-md transition-all duration-300 ${
              selectedPlants.some(p => p.name === plant.name) ? 'ring-2 ring-green-500' : ''
            }`}
          >
            <img src={plant.image} alt={plant.name} className="w-full h-40 object-cover rounded-md mb-2" />
            <h3 className="font-semibold flex items-center text-lg">
              <Sprout className="mr-2 text-green-600" /> {plant.name}
            </h3>
            <p className="text-sm text-gray-600">Type: {plant.type}</p>
            <p className="text-sm text-gray-600">Difficulty: {plant.difficulty}</p>
            <p className="text-sm text-gray-600">Growth Time: {plant.growthTime} weeks</p>
            <div className="mt-2 flex justify-between">
              <button
                className="text-blue-500 hover:text-blue-700"
                onClick={() => toggleExpandPlant(plant.name)}
              >
                {expandedPlants.has(plant.name) ? 'Less Info' : 'More Info'}
              </button>
              <button
                className={`px-2 py-1 rounded ${
                  selectedPlants.some(p => p.name === plant.name)
                    ? 'bg-red-500 text-white' 
                    : 'bg-green-500 text-white'
                }`}
                onClick={() => handlePlantSelection(plant)}
              >
                {selectedPlants.some(p => p.name === plant.name) ? 'Remove' : 'Add'}
              </button>
            </div>
            {expandedPlants.has(plant.name) && (
              <div className="mt-2 text-sm text-gray-700">
                <p><strong>Description:</strong> {plant.description}</p>
                <p><strong>Nutrient Needs:</strong> {plant.nutrientNeeds}</p>
                <p><strong>Ideal pH:</strong> {plant.idealPh}</p>
                <p><strong>Harvest Time:</strong> {plant.harvestTime}</p>
                <p><strong>Ideal Temperature:</strong> {plant.idealTemperature}</p>
                <p><strong>Ideal Humidity:</strong> {plant.idealHumidity}</p>
                <p><strong>Companion Plants:</strong> {plant.companions.join(', ')}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedPlants.length > 0 && (
        <div className="mt-8 bg-green-100 p-4 rounded-lg">
          <h3 className="text-xl font-semibold mb-2">Your Hydroponic Garden</h3>
          <ul>
            {selectedPlants.map((plant, index) => (
              <li key={index} className="flex items-center mb-2">
                <Sprout className="mr-2 text-green-600" />
                <span className="flex-grow">{plant.name}</span>
                <Users className="mr-2 text-blue-600" />
                <span className="text-sm text-gray-600">
                  Companions: {plant.companions.join(', ')}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PlantSelection;
