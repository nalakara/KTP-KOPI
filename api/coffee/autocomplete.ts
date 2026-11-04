import { GoogleGenAI, Type } from '@google/genai';

interface ApiRequest {
  method?: string;
  body?: any;
}

interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (data: any) => void;
}

let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'GEMINI_API_KEY belum dikonfigurasi pada Environment Variables Vercel.'
      );
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  try {
    const { name, process: coffeeProcess, roastLevel, origin, notes, lang = 'id' } = req.body || {};

    if (!name && !origin && !coffeeProcess) {
      return res.status(400).json({
        success: false,
        error:
          lang === 'en'
            ? 'Please provide at least a coffee name or origin region.'
            : 'Mohon masukkan setidaknya nama kopi atau asal daerah kopi.',
      });
    }

    const ai = getAiClient();

    const prompt = `You are an internationally acclaimed Q-Grader, green coffee curator, and sensory specialist for Indonesian and global specialty coffees.
Your task is to enrich and autocomplete an official Specialty Coffee Passport (KTP Kopi) based on partial user input.

Provide both Indonesian terms (with local cultural analogues) and English specialty terms (with international terroir, MASL elevation, and cupping descriptors).

Input clues:
- Name / Label: "${name || 'Not specified'}"
- Process: "${coffeeProcess || 'Not specified'}"
- Roast Profile: "${roastLevel || 'Not specified'}"
- Origin: "${origin || 'Not specified'}"
- Extra Notes: "${notes || 'None'}"

Deduce the botanical variety, altitude range, terroir notes, sensory scales (1-5), SCA cup score, dial-in brew recipes, and friendly descriptions for both casual everyday sippers and specialty enthusiasts.`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'Return valid structured JSON matching the schema. Provide rich, accurate coffee specifications with both Indonesian text and localized English fields.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: 'Standard coffee lot title' },
            originCountry: { type: Type.STRING, description: 'Country of origin (e.g., Indonesia, Ethiopia, Colombia)' },
            region: { type: Type.STRING, description: 'Specific region in Indonesian (e.g., Dataran Tinggi Gayo, Aceh Tengah)' },
            regionEn: { type: Type.STRING, description: 'Specific terroir in English (e.g., Gayo Highlands, Central Aceh)' },
            altitudeRange: { type: Type.STRING, description: 'Elevation in mdpl, e.g., 1.300 - 1.600 mdpl' },
            altitudeRangeEn: { type: Type.STRING, description: 'Elevation in MASL, e.g., 1,300 - 1,600 MASL' },
            type: {
              type: Type.STRING,
              enum: ['Arabika', 'Robusta', 'Liberika', 'Excelsa', 'Blend'],
              description: 'Species',
            },
            process: { type: Type.STRING, description: 'Processing method in Indonesian (e.g., Natural Anaerob)' },
            processEn: { type: Type.STRING, description: 'Processing method in English (e.g., Anaerobic Natural)' },
            roastLevel: {
              type: Type.STRING,
              enum: ['Light', 'Light-Medium', 'Medium', 'Medium-Dark', 'Dark'],
              description: 'Roast profile',
            },
            varietal: { type: Type.STRING, description: 'Botanical varietal (e.g., Typica, Bourbon, Ateng Super)' },
            producer: { type: Type.STRING, description: 'Producer, mill, or smallholder cooperative' },
            scaScore: { type: Type.NUMBER, description: 'Estimated SCA cupping score (e.g., 86.5)' },
            generalCharacter: {
              type: Type.STRING,
              description: 'General character in Indonesian',
            },
            generalCharacterEn: {
              type: Type.STRING,
              description: 'General character in English',
            },
            flavourNotes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of flavour notes in Indonesian',
            },
            flavourNotesEn: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'List of flavour notes in English',
            },
            acidity: { type: Type.INTEGER, description: 'Acidity scale 1 to 5' },
            body: { type: Type.INTEGER, description: 'Body mouthfeel scale 1 to 5' },
            sweetness: { type: Type.INTEGER, description: 'Sweetness scale 1 to 5' },
            brewMethod: { type: Type.STRING, description: 'Recommended brew method (e.g., V60, Aeropress, Espresso)' },
            brewRatio: { type: Type.STRING, description: 'Brew ratio (e.g., 1:15)' },
            waterTemp: { type: Type.STRING, description: 'Water temperature (e.g., 92°C)' },
            grindSize: { type: Type.STRING, description: 'Grind size (e.g., Medium-Coarse)' },
            brewTime: { type: Type.STRING, description: 'Brew time (e.g., 2m 30s)' },
            recommendedBrew: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Alternative brew methods',
            },
            casualDescription: {
              type: Type.STRING,
              description: 'Casual description in Indonesian',
            },
            casualDescriptionEn: {
              type: Type.STRING,
              description: 'Casual description in English',
            },
            bestWayToDrink: {
              type: Type.STRING,
              enum: ['Kopi Hitam Dingin (Es)', 'Seduh Manual Hangat', 'Pakai Susu / Oatmilk', 'Espresso Shot Murni'],
              description: 'Serving suggestion in Indonesian',
            },
            bestWayToDrinkEn: {
              type: Type.STRING,
              description: 'Serving suggestion in English',
            },
            caffeineFeel: {
              type: Type.STRING,
              enum: ['Ringan & Santai', 'Sedang & Pas', 'Kuat & Nendang'],
              description: 'Caffeine sensation in Indonesian',
            },
            caffeineFeelEn: {
              type: Type.STRING,
              description: 'Caffeine sensation in English',
            },
          },
          required: [
            'name',
            'originCountry',
            'region',
            'altitudeRange',
            'type',
            'process',
            'roastLevel',
            'generalCharacter',
            'flavourNotes',
            'varietal',
            'acidity',
            'body',
            'sweetness',
            'recommendedBrew',
            'casualDescription',
            'bestWayToDrink',
            'caffeineFeel',
          ],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error('Error autocomplete coffee:', error);
    return res.status(500).json({
      success: false,
      error: error.message || 'Gagal melengkapi identitas kopi secara otomatis.',
    });
  }
}

