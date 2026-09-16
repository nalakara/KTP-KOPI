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
// Automatically completes coffee identity (KTP Kopi) based on partial user input
app.post('/api/coffee/autocomplete', async (req, res) => {
  try {
    const { name, process: coffeeProcess, roastLevel, origin, notes } = req.body || {};

    if (!name && !origin && !coffeeProcess) {
      return res.status(400).json({
        success: false,
        error: 'Mohon masukkan setidaknya nama kopi atau asal daerah kopi.',
      });
    }

    const ai = getAiClient();

    const prompt = `Anda adalah ahli kopi dunia, Q-Grader bersertifikat, dan kurator profil rasa kopi Indonesia & internasional.
Tugas Anda adalah melengkapi identitas kopi ("KTP Kopi") secara akurat, presisi, dan kaya informasi berdasarkan petunjuk yang diberikan oleh pengguna.

Data awal yang diketahui dari pengguna:
- Nama / Label: "${name || 'Tidak disebutkan'}"
- Metode Proses: "${coffeeProcess || 'Tidak ditentukan'}"
- Tingkat Roasting: "${roastLevel || 'Tidak ditentukan'}"
- Asal / Origin: "${origin || 'Tidak ditentukan'}"
- Catatan Tambahan: "${notes || 'Tidak ada'}"

Silakan tebak dan lengkapi data identitas kopi dengan pengetahuan botani, terroir, ketinggian mdpl rata-rata daerah tersebut, varietas lokal tipikal (misalnya jika Gayo: Ateng Super, Tim-Tim, Bourbon; jika Toraja: S795; jika Kintamani: Kopyol; jika Ethiopia: Heirloom, dll), profil rasa (flavour notes), skala acidity/body/sweetness (1-5), rekomendasi seduh, resep seduh optimal, serta deskripsi santai dalam bahasa Indonesia yang mudah dimengerti orang awam (casual drinker).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction:
          'Kembalikan data identitas kopi terstruktur dalam format JSON murni. Pastikan nama daerah, ketinggian mdpl, varietas, karakter rasa, dan resep seduh akurat sesuai dunia kopi spesialis.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            name: { type: Type.STRING, description: 'Nama lengkap kopi yang standar' },
            originCountry: { type: Type.STRING, description: 'Negara asal (contoh: Indonesia, Ethiopia, Colombia)' },
            region: { type: Type.STRING, description: 'Daerah / ketinggian micro-region (contoh: Aceh Tengah, Pegunungan Gayo)' },
            altitudeRange: { type: Type.STRING, description: 'Rentang ketinggian tanam, contoh: 1.300 - 1.600 mdpl' },
            type: {
              type: Type.STRING,
              enum: ['Arabika', 'Robusta', 'Liberika', 'Excelsa', 'Blend'],
              description: 'Spesies / jenis kopi',
            },
            process: { type: Type.STRING, description: 'Metode pasca panen (Natural, Full Wash, Honey, Anaerobic, dll)' },
            roastLevel: {
              type: Type.STRING,
              enum: ['Light', 'Light-Medium', 'Medium', 'Medium-Dark', 'Dark'],
              description: 'Tingkat sangrai',
            },
            generalCharacter: { type: Type.STRING, description: 'Ringkasan karakter umum rasa dalam 1 kalimat' },
            flavourNotes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Daftar 3-5 flavour notes spesifik',
            },
            varietal: { type: Type.STRING, description: 'Kultivar/varietas tanaman kopi (contoh: Typica, Ateng Super)' },
            producer: { type: Type.STRING, description: 'Petani, prosesor, atau nama koperasi tipikal' },
            scaScore: { type: Type.NUMBER, description: 'Perkiraan SCA Cupping Score (misal 85.5)' },
            acidity: { type: Type.INTEGER, description: 'Skala keasaman 1-5' },
            body: { type: Type.INTEGER, description: 'Skala ketebalan body 1-5' },
            sweetness: { type: Type.INTEGER, description: 'Skala rasa manis alami 1-5' },
            recommendedBrew: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Metode seduh yang disarankan (contoh: V60, Tubruk, Espresso, Aeropress)',
            },
            brewRecipe: {
              type: Type.OBJECT,
              properties: {
                ratio: { type: Type.STRING, description: 'Rasio seduh kopi:air' },
                temperature: { type: Type.STRING, description: 'Suhu air ideal (misal 92°C)' },
                grindSize: { type: Type.STRING, description: 'Tingkat gilingan (Medium-Fine, Coarse, dll)' },
                time: { type: Type.STRING, description: 'Waktu ekstraksi total (misal 2m 30s)' },
                note: { type: Type.STRING, description: 'Tips seduh khusus' },
              },
            },
            casualDescription: {
              type: Type.STRING,
              description: 'Penjelasan santai gaya bahasa sehari-hari untuk orang biasa yang tidak paham istilah teknis kopi',
            },
            bestWayToDrink: {
              type: Type.STRING,
              description: 'Saran cara minum paling enak (contoh: Nikmat diminum hitam segar tanpa gula, atau enak pakai es)',
            },
            caffeineFeel: {
              type: Type.STRING,
              enum: ['Ringan & Santai', 'Sedang & Pas', 'Kuat & Nendang'],
              description: 'Sensasi kafein yang dirasakan',
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
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`Coffee ID Server running on http://localhost:${PORT}`);
  });
}

startServer();
