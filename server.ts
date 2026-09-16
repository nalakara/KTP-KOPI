import express from 'express';
import http from 'http';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini Client
let aiClient: GoogleGenAI | null = null;

function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error(
        'GEMINI_API_KEY belum dikonfigurasi. Mohon tambahkan API key di menu Settings.'
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'Coffee ID Backend' });
});

// POST /api/coffee/autocomplete
// Automatically completes coffee identity (KTP Kopi / Coffee Passport) with dual language support
app.post('/api/coffee/autocomplete', async (req, res) => {
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
              description: 'Roast level',
            },
            generalCharacter: { type: Type.STRING, description: 'Sensory summary in Indonesian' },
            generalCharacterEn: { type: Type.STRING, description: 'Sensory summary in English' },
            flavourNotes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3-5 flavour notes in Indonesian',
            },
            flavourNotesEn: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '3-5 flavour notes in English',
            },
            varietal: { type: Type.STRING, description: 'Coffee variety / cultivar (e.g., Typica, Bourbon, Ateng Super)' },
            producer: { type: Type.STRING, description: 'Farm / Station / Producer' },
            scaScore: { type: Type.NUMBER, description: 'Estimated SCA cupping score (e.g., 86.5)' },
            acidity: { type: Type.INTEGER, description: 'Acidity scale 1-5' },
            body: { type: Type.INTEGER, description: 'Body scale 1-5' },
            sweetness: { type: Type.INTEGER, description: 'Sweetness scale 1-5' },
            recommendedBrew: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Recommended brew methods',
            },
            brewRecipe: {
              type: Type.OBJECT,
              properties: {
                ratio: { type: Type.STRING, description: 'Brew ratio (e.g. 1:15)' },
                temperature: { type: Type.STRING, description: 'Water temp (e.g. 92°C)' },
                grindSize: { type: Type.STRING, description: 'Grind size (e.g. Medium-Fine)' },
                time: { type: Type.STRING, description: 'Extraction time (e.g. 2m 30s)' },
                note: { type: Type.STRING, description: 'Brew tip' },
              },
            },
            casualDescription: {
              type: Type.STRING,
              description: 'Casual friendly description in Indonesian without technical jargon',
            },
            casualDescriptionEn: {
              type: Type.STRING,
              description: 'Casual friendly description in English with warm approachable metaphors',
            },
            bestWayToDrink: {
              type: Type.STRING,
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
});

async function startServer() {
  const server = http.createServer(app);

  if (process.env.NODE_ENV !== 'production') {
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { server },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Coffee ID App listening on port ${PORT}`);
  });
}

startServer();
