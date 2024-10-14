export interface Plant {
  id: string;
  name: string;
  difficulty: string;
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
