export type Language = 'id' | 'en';

export type CoffeeType = 'Arabika' | 'Robusta' | 'Liberika' | 'Excelsa' | 'Blend';

export type RoastLevel = 'Light' | 'Light-Medium' | 'Medium' | 'Medium-Dark' | 'Dark';

export type ViewMode = 'casual' | 'beginner' | 'enthusiast';

export interface BrewRecipe {
  ratio: string;
  temperature: string;
  grindSize: string;
  time: string;
  note?: string;
  noteEn?: string;
}

export interface CoffeeCardItem {
  id: string;
  ktpNumber: string;
  name: string;
  nameEn?: string;
  originCountry: string;
  originCountryEn?: string;
  region: string;
  regionEn?: string;
  altitudeRange: string;
  altitudeRangeEn?: string;
  type: CoffeeType;
  process: string;
  processEn?: string;
  roastLevel: RoastLevel;
  generalCharacter: string;
  generalCharacterEn?: string;
  flavourNotes: string[];
  flavourNotesEn?: string[];
  varietal: string;
  producer?: string;
  roaster?: string;
  scaScore?: number;
  acidity: number; // 1 to 5
  body: number; // 1 to 5
  sweetness: number; // 1 to 5
  recommendedBrew: string[];
  recommendedBrewEn?: string[];
  brewRecipe?: BrewRecipe;
  casualDescription: string;
  casualDescriptionEn?: string;
  bestWayToDrink: string; // e.g. "Nikmat Hitam Hangat" / "Cocok Dicampur Susu Dingin"
  bestWayToDrinkEn?: string;
  caffeineFeel: 'Ringan & Santai' | 'Sedang & Pas' | 'Kuat & Nendang';
  caffeineFeelEn?: string;
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
  lang?: Language;
}
