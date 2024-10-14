export interface Plant {
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

export type PlantStage = 'seedling' | 'vegetative' | 'flowering' | 'harvest';

export interface PlantSystemPair {
  id: string;
  plant: string;
  system: string;
}
