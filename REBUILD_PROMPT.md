# Rebuild Blueprint Prompt — Coffee ID (KTP Kopi)

> Dokumen ini adalah **Master Prompt** komprehensif yang dirancang untuk merekonstruksi aplikasi **Coffee ID (KTP Kopi)** dari nol menggunakan AI Coding Agent (seperti Google AI Studio, Antigravity, Cursor, atau Devin) tanpa perlu mengacu pada codebase lama.

---

```markdown
Anda adalah Senior Full-Stack Architect dan Craft Product Designer.
Tugas Anda adalah merancang dan membangun sebuah web application siap pakai bernama "Coffee ID (KTP Kopi)".

Bacalah seluruh spesifikasi produk, aturan bisnis, arsitektur, dan batasan di bawah ini secara teliti sebelum menulis baris kode pertama.

---

### 1. PRODUCT PURPOSE & CORE CONCEPT
"Coffee ID (KTP Kopi)" adalah aplikasi paspor identitas digital untuk biji kopi Nusantara dan internasional. Aplikasi ini menyelesaikan masalah kesenjangan pemahaman antara dunia kopi spesialti (*specialty coffee*) yang sarat jargon teknis dan konsumen peminum kopi sehari-hari.

Aplikasi ini menerbitkan kartu "KTP Kopi" yang memiliki kemampuan beradaptasi ke dalam TIGA LEVEL PEMAHAMAN (Adaptive Knowledge Depth):
1. **Mode Casual (Orang Biasa):** Bahasa rasa sehari-hari (misal: "seperti teh manis buah nangka hangat, tidak pahit"), saran cara minum terbaik (pakai es / dicampur susu / hitam murni), dan sensasi kafein tanpa istilah laboratorium.
2. **Mode Beginner (Penikmat Pemula):** Menampilkan asal negara, jenis proses pasca panen (Natural, Wash, Honey), tingkat sangrai (*roast level*), serta skala keasaman, *body*, dan kemanisan.
3. **Mode Enthusiast (KTP Kopi Resmi):** Paspor penuh standar barista mirip kartu tanda pengenal negara: Nomor KTP Kopi unik, ketinggian elevasi mdpl, kultivar varietal, produser/petani, roastery, estimasi skor SCA (*Specialty Coffee Association*), barcode identitas, dan panduan resep seduh barista (rasio seduh, suhu air, ukuran gilingan, dan waktu ekstraksi).

---

### 2. TARGET USERS
1. **Casual Drinkers:** Peminum kopi awam yang ingin tahu rasa kopi tanpa istilah memusingkan.
2. **Home Brewers & Coffee Enthusiasts:** Pecinta seduh manual rumahan yang mencatat jurnal rasa (*tasting log*), rating bintang, dan formula seduh.
3. **Barista & Pemilik Kedai Kopi (Coffee Shop / Roastery):** Pelaku usaha yang butuh sarana instan membuat kartu meja (*deskripsi kopi*) dan mengekspornya ke format PDF vektor cetak atau gambar PNG.

---

### 3. CORE FEATURES & FUNCTIONAL SPECIFICATIONS
1. **Katalog Kartu Kopi:**
   - Menampilkan koleksi kartu kopi dalam tata letak responsif.
   - Sediakan minimal 6 contoh data kopi bawaan yang faktual dan kaya rasa (misal: Gayo Avatara Natural, Puntang Red Honey, Toraja Sapan Semi Wash, Bali Kintamani Anaerobic, Liberika Kayong Gambut, dan Ethiopia Yirgacheffe Chelchele).
2. **Panel Pengaturan (Settings Modal):**
   - Pengalih Mode Tampilan Global: Pilihan antara mode Casual, Beginner, dan Enthusiast dengan pratinjau kartu mini dan penjelasan mode. Preferensi ini tersimpan permanen di `localStorage`.
   - Ringkasan statistik kartu tersimpan (total kartu dan jumlah kopi Nusantara).
   - Fitur *Cadangkan Data (Export JSON)* dan *Reset Data ke Bawaan*.
   - Indikator ringkas di bar atas yang menunjukkan mode aktif dan dapat diklik untuk membuka pengaturan.
3. **Pencarian, Filter & Pengelompokan (Search, Filter, & Group By):**
   - Pencarian teks langsung (nama kopi, wilayah, varietal, rasa).
   - Filter dropdown: Spesies (Arabika, Robusta, Liberika, Excelsa, Blend), Tingkat Sangrai, Metode Proses, dan Rating Bintang Minimum.
   - Opsi Group By: Kelompokkan kartu berdasarkan Negara Asal, Metode Proses, atau Tingkat Sangrai.
4. **Smart AI Auto-Complete (Gemini AI Integration):**
   - Saat pengguna menekan "Buat KTP Kopi Baru", sediakan form modal dengan tombol ajaib "Lengkapi Otomatis (Smart AI)".
   - Pengguna cukup mengisi Nama Kopi atau Asal Daerah.
   - Sistem memanggil Gemini AI (`gemini-3.8-flash`) pada server backend untuk menghasilkan data JSON terstruktur yang melengkapi seluruh parameter teknis botani, terroir, ketinggian mdpl rata-rata wilayah tersebut, varietas lokal tipikal, skor SCA estimasi, resep seduh barista, dan deskripsi santai bahasa Indonesia.
   - Tampilkan animasi konfeti (*canvas-confetti*) saat AI sukses melengkapi formulir.
5. **Detail Modal & Jurnal Seduh Pribadi:**
   - Klik pada kartu membuka modal inspeksi mendalam.
   - Pengguna dapat mencoba melihat kartu dalam ketiga mode tampilan secara independen di dalam modal.
   - Pengguna dapat menuliskan catatan seduh pribadi (*User Notes / Tasting Log*) dan mengubah rating bintang (1-5 bintang).
6. **Ekspor Multi-Format:**
   - **Ekspor PDF Vektor (jsPDF):** Buat dokumen A4 vektor murni (teks dapat diblok, badge SCA, garis pemisah, tabel spesifikasi, dan barcode). Hindari screenshot buram.
   - **Ekspor Gambar (PNG/JPEG via html-to-image):** Mengambil snapshot visual kartu kopi beresolusi tinggi (pixelRatio 2x).
   - **Ekspor Teks (TXT):** Menghasilkan paspor ringkas berformat plain text ASCII.
7. **PWA & Offline Capability:**
   - Konfigurasi Web App Manifest & Service Worker untuk kemampuan diinstal di perangkat (Desktop & Mobile) dan dapat diakses penuh saat internet mati.

---

### 4. DATA MODEL (TYPESCRIPT INTERFACES)
Definisikan entitas di `src/types.ts`:

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
  ktpNumber: string; // Format: ID-REG-YYYY-XXX
  name: string;
  originCountry: string;
  region: string;
  altitudeRange: string; // Misal: "1.450 - 1.650 mdpl"
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
  body: number;    // 1 to 5
  sweetness: number; // 1 to 5
  recommendedBrew: string[];
  brewRecipe?: BrewRecipe;
  casualDescription: string;
  bestWayToDrink: string;
  caffeineFeel: 'Ringan & Santai' | 'Sedang & Pas' | 'Kuat & Nendang';
  rating: number; // 1 to 5
  userNotes?: string;
  harvestYear?: string;
  createdAt: string;
}
```

---

### 5. DESIGN & VISUAL DIRECTION (ANTI-SLOP PRINCIPLES)
- **Tema Visual:** *Vintage Coffee Passport / Official Document Archive*.
- **Palet Warna:**
  - Background Utama: Warm Manila Paper (`#F0E5C5`)
  - Warna Kontras / Tinta: Dark Roasted Espresso (`#332B1C`)
  - Aksen / Highlight: Soft Matcha Mint (`#E2F4CB`)
  - Netral Gelap: Pure Onyx (`#121212`) untuk backdrop modal
- **Tipografi:**
  - Judul / Display / Header KTP: `Barlow Condensed` (sans-serif kondensasi tegas, tracking ketat).
  - Data / Label / Metadata: `IBM Plex Mono` (monospace arsip, ukuran 11-12px yang teratur dan rapi).
- **Struktur Kartu:**
  - Sudut tajam atau lengkungan terukur (hindari rounded-3xl berlebihan pada kartu data).
  - Border tegas 1px `#332B1C`.
  - Jangan gunakan gradien ungu-biru neon, efek glowing drop-shadows acak, atau glassmorphism murahan.

---

### 6. TECHNICAL & ARCHITECTURAL EXPECTATIONS
1. **Frontend:** React 19, Vite, Tailwind CSS v4, TypeScript.
2. **Backend:** Node.js Express terintegrasi di `server.ts`.
   - Menggunakan `@google/genai` (SDK resmi terbaru) dengan model `gemini-3.8-flash`.
   - Kunci API Gemini (`process.env.GEMINI_API_KEY`) WAJIB di sisi server, jangan pernah diekspos ke browser.
   - Endpoint: `POST /api/coffee/autocomplete` menerima nama/daerah/proses, mengembalikan JSON terstruktur dengan `responseSchema`.
3. **Penyimpanan Klien:** `localStorage` untuk persistensi kartu dan preferensi mode tampilan.

---

### 7. WHAT NOT TO BUILD (STRICT CONSTRAINTS)
- JANGAN buat sistem e-commerce, keranjang belanja, checkout, atau payment gateway.
- JANGAN buat sistem autentikasi multi-tenant yang rumit untuk fase awal jika belum diminta; fokus pada local utility first.
- JANGAN gunakan chatbot interaktif mengambang (*floating chat bubble*). Gunakan AI murni sebagai asisten pelengkap formulir (*Smart Auto-Complete*).
- JANGAN gunakan CSS inline atau library komponen UI eksternal yang membengkakkan bundle. Gunakan Tailwind CSS utility murni dan Lucide React.

---

### 8. DEFINITION OF DONE
Aplikasi dinyatakan selesai jika:
1. Menampilkan katalog 6 kopi bawaan dengan rendering yang benar pada mode Casual, Beginner, dan Enthusiast.
2. Pengaturan mode tampilan di modal Settings tersimpan dan mengubah tampilan kartu secara instan.
3. Tombol "Lengkapi Otomatis (Smart AI)" pada form modal berhasil menghubungi `/api/coffee/autocomplete` dan mengisi seluruh input form secara otomatis.
4. Kartu baru berhasil disimpan dan tetap muncul setelah browser di-refresh.
5. Tombol Ekspor PDF berhasil mengunduh dokumen A4 vektor tajam dengan nomor KTP, tabel spesifikasi, dan resep seduh.
6. Tombol Ekspor PNG dan TXT berfungsi tanpa error.
7. Aplikasi lolos build (`npm run build`) dan linting (`npm run lint`) tanpa kesalahan tipe data TypeScript.
```
