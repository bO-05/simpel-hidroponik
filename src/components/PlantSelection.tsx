import React, { useState, ChangeEvent, useEffect } from 'react';
import { Sprout, Filter, ArrowUpDown, Search, Users } from 'lucide-react';

interface Plant {
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  growthTime: number;
  type: string;
  image: string;
  description: string;
  nutrientNeeds: string;
  idealPh: string;
  harvestTime: string;
  idealTemperature: string;
  idealHumidity: string;
  companions: string[];
}

interface PlantSelectionProps {
  onSelectPlant: (plant: string) => void;
}

const plants: Plant[] = [
  { 
    name: 'Kangkung (Water Spinach)', 
    difficulty: 'Easy', 
    growthTime: 3, 
    type: 'Leafy Green', 
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&q=80&w=300&h=300',
    description: 'Fast-growing, nutritious leafy green popular in Southeast Asian cuisine.',
    nutrientNeeds: 'Low to moderate',
    idealPh: '5.5 - 6.5',
    harvestTime: '3-4 weeks after planting',
    idealTemperature: '25°C - 30°C',
    idealHumidity: '60% - 70%',
    companions: ['Bayam (Spinach)', 'Selada (Lettuce)']
  },
  { 
    name: 'Bayam (Spinach)', 
    difficulty: 'Easy', 
    growthTime: 4, 
    type: 'Leafy Green', 
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=300&h=300',
    description: 'Nutrient-dense leafy green, rich in iron and vitamins.',
    nutrientNeeds: 'Moderate',
    idealPh: '6.0 - 7.0',
    harvestTime: '4-6 weeks after planting',
    idealTemperature: '20°C - 25°C',
    idealHumidity: '50% - 60%',
    companions: ['Kangkung (Water Spinach)', 'Selada (Lettuce)', 'Tomat (Tomato)']
  },
  { 
    name: 'Selada (Lettuce)', 
    difficulty: 'Easy', 
    growthTime: 4, 
    type: 'Leafy Green', 
    image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&q=80&w=300&h=300',
    description: 'Crisp and refreshing, perfect for salads and sandwiches.',
    nutrientNeeds: 'Low',
    idealPh: '6.0 - 7.0',
    harvestTime: '4-5 weeks after planting',
    idealTemperature: '15°C - 22°C',
    idealHumidity: '60% - 70%',
    companions: ['Kangkung (Water Spinach)', 'Bayam (Spinach)', 'Tomat (Tomato)']
  },
  { 
    name: 'Pakcoy (Bok Choy)', 
    difficulty: 'Medium', 
    growthTime: 5, 
    type: 'Leafy Green', 
    image: 'https://images.unsplash.com/photo-1725369865444-7a0f5e3af865?auto=format&fit=crop&q=80&w=300&h=300',
    description: 'Mild-flavored Chinese cabbage, great for stir-fries.',
    nutrientNeeds: 'Moderate',
    idealPh: '6.0 - 7.0',
    harvestTime: '5-7 weeks after planting',
    idealTemperature: '18°C - 24°C',
    idealHumidity: '55% - 65%',
    companions: ['Tomat (Tomato)', 'Timun (Cucumber)']
  },
  { 
    name: 'Cabe (Chili)', 
    difficulty: 'Medium', 
    growthTime: 8, 
    type: 'Fruit', 
    image: 'https://images.unsplash.com/photo-1588252303782-cb80119abd6d?auto=format&fit=crop&q=80&w=300&h=300',
    description: 'Spicy fruit used to add heat and flavor to dishes.',
    nutrientNeeds: 'High',
    idealPh: '5.5 - 6.8',
    harvestTime: '8-10 weeks after flowering',
    idealTemperature: '20°C - 30°C',
    idealHumidity: '60% - 70%',
    companions: ['Tomat (Tomato)', 'Bawang Merah (Shallot)']
  },
  { 
    name: 'Tomat (Tomato)', 
    difficulty: 'Medium', 
    growthTime: 8, 
    type: 'Fruit', 
    image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300&h=300',
    description: 'Versatile fruit used in many cuisines, rich in vitamins.',
    nutrientNeeds: 'High',
    idealPh: '5.5 - 6.5',
    harvestTime: '8-10 weeks after flowering',
    idealTemperature: '18°C - 27°C',
    idealHumidity: '65% - 75%',
    companions: ['Bayam (Spinach)', 'Selada (Lettuce)', 'Pakcoy (Bok Choy)', 'Cabe (Chili)']
  },
  { 
    name: 'Timun (Cucumber)', 
    difficulty: 'Medium', 
    growthTime: 6, 
    type: 'Fruit', 
    image: 'https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&q=80&w=300&h=300',
    description: 'Refreshing fruit often used in salads and pickles.',
    nutrientNeeds: 'Moderate',
    idealPh: '5.5 - 6.5',
    harvestTime: '6-8 weeks after planting',
    idealTemperature: '22°C - 28°C',
    idealHumidity: '70% - 80%',
    companions: ['Pakcoy (Bok Choy)', 'Bawang Merah (Shallot)']
  },
  { 
    name: 'Bawang Merah (Shallot)', 
    difficulty: 'Hard', 
    growthTime: 10, 
    type: 'Root', 
    image: 'https://images.unsplash.com/photo-1600807644626-fb3c8c8ba40d?auto=format&fit=crop&q=80&w=300&h=300',
    description: 'Flavorful bulb used as a seasoning in many dishes.',
    nutrientNeeds: 'Moderate',
    idealPh: '6.0 - 6.8',
    harvestTime: '10-12 weeks after planting',
    idealTemperature: '15°C - 25°C',
    idealHumidity: '60% - 70%',
    companions: ['Cabe (Chili)', 'Timun (Cucumber)']
  },
];

const PlantSelection: React.FC<PlantSelectionProps> = ({ onSelectPlant }) => {
  const [sortBy, setSortBy] = useState<keyof Plant>('name');
  const [filterDifficulty, setFilterDifficulty] = useState<'All' | Plant['difficulty']>('All');
  const [filterType, setFilterType] = useState<'All' | Plant['type']>('All');
  const [selectedPlants, setSelectedPlants] = useState<string[]>([]);
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

        const tempMatch = userTemp >= minTemp && userTemp <= maxTemp;
        const humidityMatch = userHumidity >= minHumidity && userHumidity <= maxHumidity;
        const difficultyMatch = 
          (userPreferences.experience === 'Beginner' && plant.difficulty === 'Easy') ||
          (userPreferences.experience === 'Intermediate' && (plant.difficulty === 'Easy' || plant.difficulty === 'Medium')) ||
          (userPreferences.experience === 'Advanced');

        return tempMatch && humidityMatch && difficultyMatch;
      });
      setRecommendedPlants(recommended);
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

  const handlePlantSelection = (plantName: string) => {
    setSelectedPlants(prev => {
      const newSelection = prev.includes(plantName)
        ? prev.filter(name => name !== plantName)
        : [...prev, plantName];
      
      // Call the onSelectPlant prop with the selected plant
      if (!prev.includes(plantName)) {
        onSelectPlant(plantName);
      }
      
      return newSelection;
    });
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

  const getCompanionPlants = (plantName: string): string[] => {
    const plant = plants.find(p => p.name === plantName);
    return plant ? plant.companions : [];
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
          />
          <input
            type="number"
            placeholder="Average Humidity (%)"
            className="border rounded p-2"
            value={userPreferences.humidity}
            onChange={(e) => setUserPreferences(prev => ({ ...prev, humidity: e.target.value }))}
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
              selectedPlants.includes(plant.name) ? 'ring-2 ring-green-500' : ''
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
                  selectedPlants.includes(plant.name) 
                    ? 'bg-red-500 text-white' 
                    : 'bg-green-500 text-white'
                }`}
                onClick={() => handlePlantSelection(plant.name)}
              >
                {selectedPlants.includes(plant.name) ? 'Remove' : 'Add'}
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
                <span className="flex-grow">{plant}</span>
                <Users className="mr-2 text-blue-600" />
                <span className="text-sm text-gray-600">
                  Companions: {getCompanionPlants(plant).join(', ')}
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
