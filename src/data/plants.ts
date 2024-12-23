import { Plant } from '../types';

export const plants: Plant[] = [
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
