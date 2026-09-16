# Architecture Documentation — Coffee ID (KTP Kopi)

## Technology Stack

### Frontend
- **Framework:** React 19.0.1
- **Bundler & Build Tool:** Vite 6.2.3
- **Language:** TypeScript 5.8.2
- **Styling:** Tailwind CSS v4.1.14 (dengan plugin `@tailwindcss/vite`)
- **Web Fonts:** Google Fonts (`IBM Plex Mono` untuk metadata dan teks dokumen, `Barlow Condensed` untuk judul dan display)
- **Icons:** Lucide React (v0.546.0)
- **Document & Media Export:**
  - `jspdf` (v4.2.1): Pembuatan dokumen PDF vektor murni
  - `html-to-image` (v1.11.13): Pengambilan snapshot elemen DOM menjadi gambar PNG/JPEG
- **PWA & Offline:** `vite-plugin-pwa` (v1.3.0), Workbox runtime caching
- **FX / Animation:** `canvas-confetti` (v1.9.4)

### Backend & AI Runtime
- **Runtime:** Node.js
- **Server Framework:** Express 4.21.2
- **Execution Tooling:** `tsx` (TypeScript executor untuk mode dev), `esbuild` (bundler backend untuk build produksi)
- **AI SDK:** `@google/genai` (v2.4.0)
- **Model:** `gemini-3.8-flash`

---

## Project Structure

```
.
├── .env.example              # Dokumentasi variabel lingkungan (GEMINI_API_KEY)
├── .gitignore                # Berkas yang diabaikan Git (node_modules, dist)
├── bun.lock                  # Lockfile manajemen paket
├── index.html                # HTML entry point, meta tags SEO & deklarasi font
├── metadata.json             # Metadata aplikasi AI Studio & perizinan frame
├── package.json              # Definisi dependensi dan skrip proyek
├── public/                   # Berkas statis publik & aset ikon PWA
│   ├── apple-touch-icon.png
│   ├── favicon.ico
│   ├── icon.svg
│   ├── pwa-192x192.png
│   ├── pwa-512x512.png
│   └── pwa-maskable-512x512.png
├── server.ts                 # Server Express: Vite dev middleware & endpoint API Gemini
├── tsconfig.json             # Konfigurasi compiler TypeScript
├── vite.config.ts            # Konfigurasi Vite, Tailwind CSS v4 plugin, & PWA
└── src/
    ├── App.tsx               # Root component: state utama, layout, filter & katalog
    ├── main.tsx              # React DOM render entry point
    ├── index.css             # Entry point Tailwind CSS v4 & custom design tokens
    ├── types.ts              # Deklarasi tipe data TypeScript (CoffeeCardItem, ViewMode, dll)
    ├── components/           # Sub-komponen modular antarmuka
    │   ├── AddCoffeeModal.tsx       # Form penambahan kartu dengan asisten AI
    │   ├── BeginnerCoffeeCard.tsx   # Kartu kopi mode Beginner
    │   ├── CasualCoffeeCard.tsx     # Kartu kopi mode Casual
    │   ├── CoffeeDetailModal.tsx    # Modal inspeksi detail kartu & opsi ekspor
    │   ├── EnthusiastCoffeeCard.tsx # Kartu kopi paspor resmi (Enthusiast)
    │   ├── OfflineIndicator.tsx     # Notifikasi visual saat offline
    │   ├── PWAInstallButton.tsx     # Tombol interaktif pemasangan PWA
    │   ├── RatingStars.tsx          # Komponen pemilih rating bintang interaktif
    │   ├── RoastLevelBadge.tsx      # Lencana visual tingkat sangrai
    │   ├── SensoryBar.tsx           # Bar pengukur sensori (keasaman/body/manis)
    │   └── SettingsModal.tsx        # Modal pengaturan (pilihan mode tampilan & data)
    ├── data/
    │   └── defaultCoffees.ts        # Data awal 6 varian kopi Nusantara & internasional
    ├── hooks/
    │   └── usePWAInstall.ts         # Hook pendeteksi PWA install prompt & status jaringan
    └── utils/
        └── exportCard.ts            # Logika ekspor file PDF vektor, gambar PNG, dan teks TXT
```

---

## Application Structure

Aplikasi mengadopsi arsitektur **Single Page Application (SPA) full-stack sederhana**:
- Tidak menggunakan router berbasis URL multi-halaman (seperti React Router); seluruh interaksi dikelola dalam satu layar terpadu dengan bantuan modal dialog (`AddCoffeeModal`, `CoffeeDetailModal`, `SettingsModal`).
- Server Express (`server.ts`) berfungsi sebagai *Reverse Proxy* dan *API Gateway* untuk endpoint AI, sekaligus melayani file statis hasil kompilasi Vite pada lingkungan produksi.

---

## Main Components

1. **`App.tsx` (State Coordinator):**
   - Mengelola array kartu kopi (`coffees`), filter pencarian, pengelompokan (*grouping*), preferensi mode tampilan (`viewMode`), dan kontrol modal dialog.
2. **`SettingsModal.tsx` (Configuration Center):**
   - Menampung preferensi pengguna: pemilihan 3 mode pemahaman kopi (*Casual*, *Beginner*, *Enthusiast*), statistik kartu tersimpan, pencadangan file JSON, dan tombol reset data.
3. **Card Component Triad (`CasualCoffeeCard`, `BeginnerCoffeeCard`, `EnthusiastCoffeeCard`):**
   - Tiga representasi visual independen dari satu entitas data `CoffeeCardItem`.
   - Mengisolasi kompleksitas informasi sehingga kode tidak dipenuhi oleh *ternary operator* bersarang.
4. **`AddCoffeeModal.tsx` (AI Smart Input):**
   - Menangani formulir masukan kartu baru, pemanggilan API AI autocomplete, penanganan error, dan pemformatan data sebelum disimpan.
5. **`CoffeeDetailModal.tsx` (Inspector & Document Producer):**
   - Menyajikan kartu secara mendalam, memungkinkan pengujian ganti mode pratinjau kartu secara langsung, mengedit *user notes*, dan mengekspor dokumen.

---

## Data Model

Model data utama berada di `src/types.ts`:

```typescript
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
  acidity: number; // Skala 1-5
  body: number;    // Skala 1-5
  sweetness: number; // Skala 1-5
  recommendedBrew: string[];
  brewRecipe?: BrewRecipe;
  casualDescription: string;
  bestWayToDrink: string;
  caffeineFeel: 'Ringan & Santai' | 'Sedang & Pas' | 'Kuat & Nendang';
  rating: number; // 1-5
  userNotes?: string;
  harvestYear?: string;
  createdAt: string;
}
```

---

## State Management

- **Teknologi:** React Native State (`useState`, `useMemo`, `useEffect`).
- **Tidak Memerlukan Eksternal State Manager (Redux/Zustand):** Mengingat skala aplikasi yang fokus pada satu alur kerja utama, penggunaan React Local State terbukti memadai dan menjaga *bundle size* tetap ringan.
- **Sinkronisasi Otomatis:**
  - Perubahan pada state `coffees` secara otomatis memicu penulisan ke `localStorage` melalui `useEffect`.
  - Preferensi `viewMode` disimpan dan dibaca dari `localStorage` secara independen.

---

## Data Flow

```
[User Input / Interaksi]
       │
       ▼
   App.tsx ──── (State: coffees, viewMode, filters)
       │
       ├──> [Filter & Memo Logic] ──> filteredCoffees ──> groupedCoffees
       │                                                        │
       │                                                        ▼
       ├──> [Render Grid Cards] ◄────────────────────── [Casual / Beginner / Enthusiast]
       │
       ├──> [Tambah Kopi Baru] ──> AddCoffeeModal
       │                              │
       │                              ├──> fetch('/api/coffee/autocomplete')
       │                              │        │
       │                              │        ▼
       │                              │    server.ts ──> Google Gemini API (gemini-3.8-flash)
       │                              │        │
       │                              │        ▼ (JSON Terstruktur)
       │                              └──> Isi Form Otomatis ──> handleAddCoffee() ──> localStorage
       │
       └──> [Inspeksi & Ekspor] ──> CoffeeDetailModal
                                       │
                                       ├──> exportCardAsPDF() (jsPDF Vector Generator)
                                       ├──> exportCardAsImage() (html-to-image PNG)
                                       └──> exportCardAsTXT() (Blob Download)
```

---

## Storage / Persistence

- **Penyimpanan Utama:** Web Storage API (`localStorage`).
  - Kunci: `coffee_id_ktp_cards_v1` (menyimpan array `CoffeeCardItem[]`).
  - Kunci: `coffee_id_view_mode_v1` (menyimpan string mode tampilan aktif).
- **Data Fallback:** Jika `localStorage` kosong atau gagal dibaca, aplikasi otomatis memuat `INITIAL_COFFEE_CARDS` dari `src/data/defaultCoffees.ts`.
- **Fitur Backup:** Fitur bawaan *Export Cadangan JSON* memungkinkan serialisasi seluruh data lokal ke dalam file fisik yang dapat disimpan pengguna.

---

## External Services

- **Google Gemini API:** Layanan eksternal AI generatif yang diakses melalui pustaka `@google/genai` dari backend Node.js.
- **Google Fonts CDN:** Memuat font *IBM Plex Mono* dan *Barlow Condensed*.

---

## AI Integration

Implementasi AI diatur secara ketat (*controlled generation*) di file `server.ts`:
1. **Model:** `gemini-3.8-flash`.
2. **Karakter & Instruksi Sistem:** Bertindak sebagai *Q-Grader* bersertifikat dan ahli kopi dunia.
3. **Pemberian Format:** Menggunakan `responseMimeType: 'application/json'` dan `responseSchema` yang mewajibkan struktur objek sesuai properti kartu kopi (ketinggian mdpl, varietal, skor SCA, *flavour notes*, keasaman, *body*, kemanisan, resep seduh, dan analogi bahasa santai).
4. **Keamanan:** API Key tersimpan di variabel lingkungan server (`process.env.GEMINI_API_KEY`) dan tidak pernah dikirimkan ke peramban klien.

---

## Architectural Patterns

- **BFF (Backend-For-Frontend) Pattern Ringkas:** Server Express bertindak sebagai perantara aman antara frontend React dan Google Gemini API.
- **Adaptive Presentation Pattern:** Pemisahan komponen kartu berdasarkan mode pemahaman (*polymorphic card views*), di mana entitas data yang sama diproyeksikan ke dalam format visual yang berbeda sesuai audiens target.
- **Dual Engine Document Generation:**
  - *Vector-first:* Untuk PDF, sistem memprioritaskan pembuatan dokumen vektor murni menggunakan koordinat `jspdf` sehingga menghasilkan teks yang dapat di-copy dan dicetak tajam pada ukuran kertas fisik.
  - *Canvas-fallback:* Untuk gambar PNG, sistem menggunakan rendering DOM snapshot `html-to-image`.

---

## Security Considerations

- **Isolasi API Key:** Kunci API Google Gemini disimpan di server dan hanya dipanggil via endpoint internal `/api/coffee/autocomplete`. Tidak ada variabel `VITE_GEMINI_API_KEY` di sisi klien.
- **Sanitasi Data Sederhana:** Nilai JSON dari AI divalidasi dan diurai dengan skema ketat sebelum dikembalikan ke klien.
- **Tanpa Autentikasi Pengguna:** Mengingat seluruh data tersimpan di browser masing-masing pengguna, tidak ada risiko kebocoran data antar-pengguna pada arsitektur saat ini.

---

## Current Technical Debt

1. **Single File Server (`server.ts`):** Rute API dan konfigurasi server Vite digabung dalam satu file. Jika rute bertambah, ini perlu dipecah ke direktori `server/routes/`.
2. **Komponen `App.tsx` Cukup Besar:** File `App.tsx` memiliki ~640 baris kode yang mencakup state aplikasi, header bar, filter bar, logic grouping, footer, dan bindings modal. Filter dan header bar dapat diekstrak menjadi sub-komponen terpisah.
3. **Ketiadaan Skema Validasi Runtime (Zod/Valibot):** Saat ini pembacaan `localStorage` dan respons AI bergantung pada tipe data TypeScript statis dan pengecekan manual, belum menggunakan library validasi skema runtime seperti Zod.

---

## Scalability Considerations

- **Sisi Klien:** `localStorage` memiliki batas kapasitas penyimpanan tipikal sebesar 5MB per domain. Untuk format teks JSON kartu kopi, kapasitas ini mampu menampung ribuan kartu kopi tanpa kendala. Namun, jika di masa depan ditambahkan fitur unggah foto kemasan berukuran besar (Base64), penyimpanan lokal akan cepat penuh.
- **Sisi Server:** Server Express saat ini bersifat *stateless* (tidak menyimpan sesi maupun database lokal). Hal ini membuat backend sangat mudah di-scale secara horizontal di container Cloud Run tanpa kekhawatiran sinkronisasi status server.

---

## Maintainability Considerations

- **Modularitas Komponen:** Komponen kartu telah dipisah dengan rapi (`CasualCoffeeCard`, `BeginnerCoffeeCard`, `EnthusiastCoffeeCard`), memudahkan pengembang memperbarui gaya salah satu mode tanpa merusak mode lainnya.
- **Pewarnaan & Desain Konsisten:** Variabel warna dan token CSS dikonsentrasikan di `src/index.css` (`--bg-primary: #F0E5C5`, `--color-secondary: #332B1C`, dll).

---

## Architecture Assessment

- **Temuan Faktual (What Was Actually Found):**
  - Aplikasi merupakan purwarupa fungsional (*functional prototype*) berbasis React 19 + Express + Vite.
  - Arsitektur sederhana, bersih, tidak over-engineered, dan sepenuhnya berfungsi sesuai cakupan yang dibutuhkan.
  - Tidak ada dependensi yang tidak terpakai atau pustaka mock yang mengambang.
- **Interpretasi (Interpretation):**
  - Keputusan menggunakan `localStorage` dan arsitektur tanpa database eksternal sangat tepat untuk fase prototype dan utilitas pribadi/kedai kopi tunggal, karena meminimalkan biaya infrastruktur dan kerumitan konfigurasi.
- **Asumsi (Assumptions):**
  - Jika aplikasi ini ingin diubah menjadi platform SaaS multi-roastery, arsitektur data perlu dimigrasikan ke database cloud (seperti Firestore atau Supabase/PostgreSQL) beserta sistem autentikasi pengguna.
