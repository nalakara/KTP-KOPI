export type CoffeeType = 'Arabika' | 'Robusta' | 'Liberika' | 'Excelsa' | 'Blend';

export type RoastLevel = 'Light' | 'Light-Medium' | 'Medium' | 'Medium-Dark' | 'Dark';

export type ViewMode = 'casual' | 'beginner' | 'enthusiast';

export interface BrewRecipe {
  ratio: string;
  temperature: string;
  grindSize: string;
  time: string;
  note?: string;
}

export interface CoffeeCardItem {
  id: string;
  ktpNumber: string;
  name: string;
  originCountry: string;
  region: string;
  altitudeRange: string;
  type: CoffeeType;
  process: string;
  roastLevel: RoastLevel;
  generalCharacter: string;
  flavourNotes: string[];
  varietal: string;
  producer?: string;
  roaster?: string;
  scaScore?: number;
  acidity: number; // 1 to 5
  body: number; // 1 to 5
  sweetness: number; // 1 to 5
  recommendedBrew: string[];
  brewRecipe?: BrewRecipe;
  casualDescription: string;
  bestWayToDrink: string; // e.g. "Nikmat Hitam Hangat" / "Cocok Dicampur Susu Dingin"
  caffeineFeel: 'Ringan & Santai' | 'Sedang & Pas' | 'Kuat & Nendang';
  rating: number; // 1 to 5
  userNotes?: string;
  harvestYear?: string;
  createdAt: string;
}

export interface SmartAutoCompleteRequest {
  name?: string;
  process?: string;
  roastLevel?: string;
  origin?: string;
  notes?: string;
}
