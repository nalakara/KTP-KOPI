import { CoffeeCardItem, Language, CoffeeType, RoastLevel } from '../types';

interface CoffeeEnglishInterpretation {
  name: string;
  originCountry: string;
  region: string;
  altitudeRange: string;
  process: string;
  generalCharacter: string;
  flavourNotes: string[];
  casualDescription: string;
  bestWayToDrink: string;
  caffeineFeel: string;
  recipeNote?: string;
}

// Hand-crafted, barista-level specialty English interpretations for default coffees
const DEFAULT_COFFEE_INTERPRETATIONS: Record<string, CoffeeEnglishInterpretation> = {
  'coffee-gayo-avatara': {
    name: 'Gayo Avatara Anaerobic Natural',
    originCountry: 'Indonesia',
    region: 'Central Aceh, Gayo Highlands',
    altitudeRange: '1,450 - 1,650 MASL',
    process: 'Anaerobic Natural',
    generalCharacter: 'Lush ripe jackfruit, tropical stone fruit, warmed brown sugar, and a velvety dark cocoa finish.',
    flavourNotes: ['Ripe Jackfruit', 'Palm Nectar', 'Dark Cocoa', 'Ceylon Black Tea'],
    casualDescription: 'An aromatic burst reminiscent of warm jackfruit sweetness and honeyed black tea. Low on harsh bitterness and exceptionally gentle on the stomach!',
    bestWayToDrink: 'Sublime brewed as a clean morning pour-over or poured over crystal-clear ice cubes.',
    caffeineFeel: 'Balanced & Crisp',
    recipeNote: '3-stage gentle pour: 45g bloom (40s), steady 100g spiral, finished with 80g center pour.',
  },
  'coffee-puntang-honey': {
    name: 'Mount Puntang Red Honey',
    originCountry: 'Indonesia',
    region: 'South Bandung, West Java',
    altitudeRange: '1,300 - 1,550 MASL',
    process: 'Red Honey Craft Process',
    generalCharacter: 'Delicate jasmine tea blossom, rich wild forest honey, and sparkling sweet citrus.',
    flavourNotes: ['Jasmine Blossom', 'Wild Honey', 'Sweet Mandarin', 'Sun Apricot'],
    casualDescription: 'Tastes delightfully like sweet jasmine blossom tea infused with wild honey. Light, refreshingly floral, with zero astringency.',
    bestWayToDrink: 'Sip hot and unadorned during serene mornings or breezy late afternoons.',
    caffeineFeel: 'Gentle & Breezy',
    recipeNote: 'Gentle, steady water flow to preserve delicate floral volatile aromatics.',
  },
  'coffee-toraja-sapan': {
    name: 'Toraja Sapan Heritage Wet-Hulled',
    originCountry: 'Indonesia',
    region: 'Tana Toraja, South Sulawesi',
    altitudeRange: '1,600 - 1,800 MASL',
    process: 'Wet Hulled (Traditional Giling Basah)',
    generalCharacter: 'Commanding heavy body, fragrant sweet cinnamon bark, toasted caramel, and dark Belgian chocolate.',
    flavourNotes: ['Cinnamon Bark', 'Toasted Caramel', 'Belgian Cocoa', 'Sweet Cedar Herb'],
    casualDescription: 'Rich, comforting, and deeply satisfying with prominent dark cocoa and fragrant spice. Built for those who love bold, unapologetic coffee.',
    bestWayToDrink: 'Divine brewed as a silky palm-sugar milk latte or a traditional heavy immersion.',
    caffeineFeel: 'Bold & Electric',
    recipeNote: 'Classic immersion brew: steep 4 minutes, skim the crust, and enjoy the rich body.',
  },
  'coffee-kintamani-karana': {
    name: 'Bali Kintamani Anaerobic Citrus',
    originCountry: 'Indonesia',
    region: 'Kintamani, Bangli, Island of Bali',
    altitudeRange: '1,250 - 1,450 MASL',
    process: 'Anaerobic Natural Slow Dry',
    generalCharacter: 'Vibrant signature Kintamani citrus, crisp watermelon juice, and tropical fruit syrup.',
    flavourNotes: ['Pomelo Citrus', 'Crisp Watermelon', 'Wild Strawberry', 'Cane Nectar'],
    casualDescription: 'Bright and cheerful like freshly squeezed citrus and sweet summer watermelon! Refreshing with zero bitter burnt taste.',
    bestWayToDrink: 'Served crisp and cold over ice cubes on a sun-drenched tropical afternoon.',
    caffeineFeel: 'Balanced & Crisp',
    recipeNote: 'Ideal for Japanese Iced Filter: brew over 80g of crystal ice for instant thermal shock.',
  },
  'coffee-liberika-kayong': {
    name: 'Kayong Peatland Jackfruit Liberica',
    originCountry: 'Indonesia',
    region: 'North Kayong Peatlands, West Borneo',
    altitudeRange: '5 - 50 MASL (Peatland Lowlands)',
    process: 'Fully Washed Special Fermentation',
    generalCharacter: 'Enchanting dense jackfruit bouquet, smoked cedarwood, sweet milk chocolate, and monstrous Liberoid body.',
    flavourNotes: ['Intense Jackfruit', 'Smoked Cedarwood', 'Milk Chocolate', 'Warm Vanilla'],
    casualDescription: 'A rare heritage varietal harvested from ancient giant trees in Borneo peat forests. Natural sweet jackfruit perfume with a thick, syrupy mouthfeel.',
    bestWayToDrink: 'Indulgent with condensed milk, or brewed slowly in a stovetop moka pot.',
    caffeineFeel: 'Balanced & Crisp',
    recipeNote: 'Slow stovetop extraction or fine-drip method over low heat.',
  },
  'coffee-ethiopia-yirga': {
    name: 'Ethiopia Yirgacheffe Chelchele',
    originCountry: 'Ethiopia',
    region: 'Gedeb District, Yirgacheffe Zone',
    altitudeRange: '1,950 - 2,200 MASL',
    process: 'Extended Fermentation Washed',
    generalCharacter: 'Regal bergamot aromatics, Earl Grey tea, succulent white peach, and pristine lemon blossom acid.',
    flavourNotes: ['Bergamot Citrus', 'Earl Grey Tea', 'White Peach', 'Lemon Blossom'],
    casualDescription: 'World-renowned nobility in a cup. Tastes remarkably like an aristocratic royal peach tea with delicate floral notes. Incredibly silky.',
    bestWayToDrink: 'Must be enjoyed pure black with zero sweeteners to savor its astonishing clarity.',
    caffeineFeel: 'Gentle & Breezy',
    recipeNote: 'Minimal bed agitation to maximize the luminous clarity of the peach and tea notes.',
  },
};

/**
 * Translates species names accurately for specialty lexicon
 */
export function formatSpecies(species: CoffeeType, lang: Language): string {
  if (lang === 'en') {
    switch (species) {
      case 'Arabika':
        return 'Arabica';
      case 'Robusta':
        return 'Robusta';
      case 'Liberika':
        return 'Liberica';
      case 'Excelsa':
        return 'Excelsa';
      case 'Blend':
        return 'Craft Blend';
      default:
        return species;
    }
  }
  return species;
}

/**
 * Translates roast level terminology
 */
export function formatRoastLevel(roast: RoastLevel, lang: Language): string {
  if (lang === 'en') {
    switch (roast) {
      case 'Light':
        return 'Light Roast';
      case 'Light-Medium':
        return 'Light-Medium';
      case 'Medium':
        return 'Medium Roast';
      case 'Medium-Dark':
        return 'Medium-Dark';
      case 'Dark':
        return 'Dark Roast';
      default:
        return roast;
    }
  }
  return roast;
}

/**
 * Translates caffeine feel descriptions
 */
export function formatCaffeineFeel(feel: string | undefined, lang: Language): string {
  if (!feel) return lang === 'en' ? 'Balanced & Crisp' : 'Sedang & Pas';

  if (lang === 'en') {
    if (feel.includes('Ringan') || feel.includes('Gentle')) return 'Gentle & Breezy';
    if (feel.includes('Kuat') || feel.includes('Nendang') || feel.includes('Bold')) return 'Bold & Electric';
    return 'Balanced & Crisp';
  }

  if (feel.includes('Gentle') || feel.includes('Ringan')) return 'Ringan & Santai';
  if (feel.includes('Bold') || feel.includes('Electric') || feel.includes('Kuat')) return 'Kuat & Nendang';
  return 'Sedang & Pas';
}

/**
 * Translates elevation units and text
 */
export function formatAltitude(altitude: string, lang: Language): string {
  if (!altitude) return '';
  if (lang === 'en') {
    return altitude
      .replace(/\s*mdpl/gi, ' MASL')
      .replace(/\./g, ','); // e.g. 1.450 -> 1,450
  }
  return altitude.replace(/\s*MASL/gi, ' mdpl');
}

/**
 * Translates standard process names
 */
export function formatProcess(process: string, lang: Language): string {
  if (!process) return '';
  if (lang === 'en') {
    if (/giling\s*basah/i.test(process)) {
      return 'Wet Hulled (Giling Basah)';
    }
    if (/semi\s*wash/i.test(process)) {
      return 'Semi Washed / Wet Hulled';
    }
    if (/full\s*wash/i.test(process)) {
      return 'Fully Washed';
    }
    if (/natural\s*anaerobic/i.test(process)) {
      return 'Anaerobic Natural';
    }
  }
  return process;
}

/**
 * Flavour note interpretation helper
 */
const FLAVOUR_NOTE_MAP_EN: Record<string, string> = {
  'nangka matang': 'Ripe Jackfruit',
  'gula palem': 'Palm Sugar Nectar',
  'cokelat hitam': 'Dark Chocolate',
  'teh hitam': 'Black Tea',
  'bunga melati': 'Jasmine Blossom',
  'madu hutan': 'Wild Honey',
  'jeruk manis': 'Sweet Mandarin',
  'aprikot': 'Apricot',
  'kayu manis': 'Cinnamon Bark',
  'karamel panggang': 'Toasted Caramel',
  'cokelat belgia': 'Belgian Chocolate',
  'herbal': 'Aromatic Herbs',
  'jeruk bali': 'Pomelo Citrus',
  'semangka': 'Watermelon',
  'stroberi': 'Wild Strawberry',
  'gula tebu': 'Cane Sugar',
  'aroma nangka pekat': 'Intense Jackfruit',
  'smoked cedar': 'Smoked Cedarwood',
  'cokelat susu': 'Milk Chocolate',
  'vanilla': 'Warm Vanilla',
  'bergamot': 'Bergamot Citrus',
  'earl grey tea': 'Earl Grey Tea',
  'white peach': 'White Peach',
  'lemon blossom': 'Lemon Blossom',
};

export function formatFlavourNote(note: string, lang: Language): string {
  if (lang === 'en') {
    const key = note.trim().toLowerCase();
    if (FLAVOUR_NOTE_MAP_EN[key]) {
      return FLAVOUR_NOTE_MAP_EN[key];
    }
  }
  return note;
}

export interface LocalizedCoffeeView {
  id: string;
  ktpNumber: string;
  name: string;
  originCountry: string;
  region: string;
  altitudeRange: string;
  type: CoffeeType;
  typeFormatted: string;
  process: string;
  roastLevel: RoastLevel;
  roastLevelFormatted: string;
  generalCharacter: string;
  flavourNotes: string[];
  varietal: string;
  producer?: string;
  roaster?: string;
  scaScore?: number;
  acidity: number;
  body: number;
  sweetness: number;
  recommendedBrew: string[];
  brewRecipe?: {
    ratio: string;
    temperature: string;
    grindSize: string;
    time: string;
    note?: string;
  };
  casualDescription: string;
  bestWayToDrink: string;
  caffeineFeel: string;
  rating: number;
  userNotes?: string;
  harvestYear?: string;
  createdAt: string;

  // Language & Styling flags
  lang: Language;
  passportHeaderTop: string;
  passportHeaderSub: string;
  passportNumberBadge: string;
  provenanceStampText: string;
  watermarkText: string;
}

/**
 * Returns a fully interpreted and localized representation of a coffee card item.
 */
export function getLocalizedCoffee(coffee: CoffeeCardItem, lang: Language): LocalizedCoffeeView {
  const defaultEn = DEFAULT_COFFEE_INTERPRETATIONS[coffee.id];

  const name =
    lang === 'en'
      ? coffee.nameEn || defaultEn?.name || coffee.name
      : coffee.name;

  const originCountry =
    lang === 'en'
      ? coffee.originCountryEn || defaultEn?.originCountry || coffee.originCountry
      : coffee.originCountry;

  const region =
    lang === 'en'
      ? coffee.regionEn || defaultEn?.region || coffee.region
      : coffee.region;

  const altitudeRange =
    lang === 'en'
      ? coffee.altitudeRangeEn || defaultEn?.altitudeRange || formatAltitude(coffee.altitudeRange, 'en')
      : coffee.altitudeRange;

  const process =
    lang === 'en'
      ? coffee.processEn || defaultEn?.process || formatProcess(coffee.process, 'en')
      : coffee.process;

  const generalCharacter =
    lang === 'en'
      ? coffee.generalCharacterEn || defaultEn?.generalCharacter || coffee.generalCharacter
      : coffee.generalCharacter;

  const flavourNotes =
    lang === 'en'
      ? coffee.flavourNotesEn || defaultEn?.flavourNotes || coffee.flavourNotes.map((n) => formatFlavourNote(n, 'en'))
      : coffee.flavourNotes;

  const casualDescription =
    lang === 'en'
      ? coffee.casualDescriptionEn || defaultEn?.casualDescription || coffee.casualDescription
      : coffee.casualDescription;

  const bestWayToDrink =
    lang === 'en'
      ? coffee.bestWayToDrinkEn || defaultEn?.bestWayToDrink || coffee.bestWayToDrink
      : coffee.bestWayToDrink;

  const caffeineFeel = formatCaffeineFeel(
    lang === 'en' ? coffee.caffeineFeelEn || defaultEn?.caffeineFeel || coffee.caffeineFeel : coffee.caffeineFeel,
    lang
  );

  const brewRecipe = coffee.brewRecipe
    ? {
        ratio: coffee.brewRecipe.ratio,
        temperature: coffee.brewRecipe.temperature,
        grindSize:
          lang === 'en'
            ? coffee.brewRecipe.grindSize
                .replace(/kasar/i, 'Coarse')
                .replace(/sedang/i, 'Medium')
                .replace(/halus/i, 'Fine')
            : coffee.brewRecipe.grindSize,
        time: coffee.brewRecipe.time,
        note:
          lang === 'en'
            ? coffee.brewRecipe.noteEn || defaultEn?.recipeNote || coffee.brewRecipe.note
            : coffee.brewRecipe.note,
      }
    : undefined;

  return {
    ...coffee,
    name,
    originCountry,
    region,
    altitudeRange,
    process,
    generalCharacter,
    flavourNotes,
    casualDescription,
    bestWayToDrink,
    caffeineFeel,
    brewRecipe,
    typeFormatted: formatSpecies(coffee.type, lang),
    roastLevelFormatted: formatRoastLevel(coffee.roastLevel, lang),

    // Styling & Archival Badges
    lang,
    passportHeaderTop:
      lang === 'en'
        ? 'GLOBAL SPECIALTY COFFEE REGISTRY'
        : 'REPUBLIK KOPI INDONESIA',
    passportHeaderSub:
      lang === 'en'
        ? 'OFFICIAL COFFEE PROVENANCE PASSPORT'
        : 'KARTU TANDA PENGENAL KOPI',
    passportNumberBadge:
      lang === 'en' ? 'PASSPORT NO.' : 'NO. KTP',
    provenanceStampText:
      lang === 'en' ? 'CERTIFIED ORIGIN' : 'WARGA KOPI RESMI',
    watermarkText:
      lang === 'en' ? 'VERIFIED PROVENANCE ARCHIVE' : 'ARSIP RESMI KOPI NUSANTARA',
  };
}
