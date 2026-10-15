# Coffee ID - KTP Kopi

> Aplikasi kartu identitas digital (paspor kopi) Nusantara dan dunia berbasis Progressive Web App (PWA) dengan tiga tingkat pemahaman informasi rasa (Casual, Beginner, Enthusiast), pelengkap data otomatis dengan AI, serta ekspor multi-format (PDF vektor, PNG, TXT).

---

## Overview

**Coffee ID (KTP Kopi)** adalah aplikasi web katalog dan paspor kopi yang dirancang untuk menjembatani jurang pemahaman antara dunia kopi spesialti (*specialty coffee*) yang sarat istilah teknis dengan penikmat kopi sehari-hari. 

Aplikasi ini menyajikan kartu identitas kopi yang dapat diadaptasikan ke dalam 3 sudut pandang:
1. **Casual (Orang Biasa):** Menyoroti analogi rasa santai (seperti rasa teh melati, nangka matang, atau cokelat), cara minum yang paling cocok (es, susu, atau hitam), dan sensasi kafein tanpa istilah rumit.
2. **Beginner (Penikmat Pemula):** Menampilkan asal daerah, jenis proses pasca panen (Natural, Wash, Honey), tingkat sangrai (*roast level*), serta skala keasaman, *body*, dan kemanisan.
3. **Enthusiast (KTP Kopi Resmi):** Format paspor penuh mirip kartu identitas negara (Republik Kopi Indonesia) lengkap dengan nomor seri/NIK kopi, elevasi tanam (mdpl), varietal botani, nama produser/petani, estimasi skor SCA (*Specialty Coffee Association*), barcode pengenal, hingga resep seduh barista (rasio, suhu air, ukuran gilingan, dan waktu ekstraksi).

---

## Masalah yang Ingin Diselesaikan

1. **Jargon Kopi Terlalu Menakutkan Bagi Orang Awam:** Informasi di kantong kopi (*beans bag*) sering kali terlalu teknis (misalnya: *Anaerobic Slow Dry, Ateng Super, 1600 mdpl, SCA 87*). Peminum biasa hanya ingin tahu: *"Kopi ini rasanya manis atau asam? Enak pakai es atau susu?"*
2. **Kurangnya Dokumentasi Identitas Kopi yang Menarik:** Roaster lokal dan kedai kopi sering kesulitan membuat kartu deskripsi kopi (*coffee card*) yang rapi dan siap cetak untuk pelanggan.
3. **Pengisian Data Biji Kopi Memakan Waktu:** Mengetik manual detail ketinggian tanam, varietal khas daerah, dan resep seduh memakan waktu jika harus dicari satu per satu di mesin pencari.

---

## Target Pengguna

- **Peminum Kopi Santai (Casual Drinkers):** Orang yang ingin tahu karakter rasa kopi yang sedang diminumnya tanpa pusing dengan istilah laboratorium.
- **Home Brewers & Pecinta Kopi:** Penikmat kopi rumahan yang ingin mencatat biji kopi yang pernah dibeli, menyimpan resep seduh, dan memberi penilaian rasa (*tasting log*).
- **Barista & Pemilik Kedai Kopi (Coffee Shop / Roastery):** Pelaku usaha yang membutuhkan sarana cepat untuk membuat kartu informasi kopi (*deskripsi notes meja / display counter*) dan mencetaknya sebagai dokumen PDF atau gambar PNG.

---

## Fitur Utama (Core Features)

| Fitur | Status | Deskripsi |
| :--- | :--- | :--- |
| **3 Mode Tampilan Adaptif** | Implemented | Memilih mode Casual, Beginner, atau Enthusiast melalui panel Pengaturan atau pratinjau kartu. |
| **Katalog Kartu Kopi Bawaan** | Implemented | Berisi 6 contoh kopi khas Nusantara dan dunia (Gayo Avatara, Puntang Red Honey, Toraja Sapan, Bali Kintamani, Liberika Kayong Utara, dan Ethiopia Yirgacheffe). |
| **Pencarian & Multi-Filter** | Implemented | Mencari berdasarkan nama, daerah, varietal, rasa; menyaring berdasarkan spesies (Arabika, Robusta, Liberika, Excelsa, Blend), sangrai, proses, dan rating bintang. |
| **Pengelompokan (Group By)** | Implemented | Mengelompokkan daftar kartu kopi berdasarkan negara asal, proses, atau tingkat sangrai. |
| **Smart AI Auto-Complete** | Implemented | Menggunakan model Gemini (`gemini-3.8-flash`) pada server Express untuk menebak data botani, terroir, elevasi mdpl, profil rasa, resep seduh, dan deskripsi santai hanya dari nama atau daerah asal. |
| **Ekspor Multi-Format** | Implemented | Menghasilkan PDF Vektor murni (*searchable text* & resolusi tajam via jsPDF), gambar kartu (PNG/JPEG via html-to-image), dan ringkasan teks paspor (TXT). |
| **Catatan Seduh Pribadi & Rating** | Implemented | Menyimpan kesan rasa pribadi (*user notes*) dan mengubah bintang kepuasan (1-5 bintang). |
| **Penyimpanan Lokal (Offline-First)** | Implemented | Semua kartu tersimpan di `localStorage` browser pengguna, dilengkapi fitur Ekspor Cadangan JSON dan Reset ke Data Bawaan. |
| **Dukungan PWA (Progressive Web App)** | Implemented | Tombol instalasi ke homescreen (Android/Desktop/iOS prompt) dan deteksi status koneksi offline/online. |

---

## Alur Kerja Pengguna (Main User Workflow)

```
[Buka Aplikasi]
       │
       ├──> [Jelajahi Kartu Kopi] ──> Pilih filter / cari rasa tertentu
       │
       ├──> [Buka Pengaturan] ──> Ganti mode tampilan (Casual / Beginner / Enthusiast)
       │
       ├──> [Klik Detail Kartu] ──> Baca profil rasa, edit catatan seduh, beri rating
       │                               │
       │                               └──> [Ekspor Kartu] (PDF Vektor / PNG / TXT)
       │
       └──> [Tambah Kartu Kopi] ──> Masukkan nama / daerah
                                       │
                                       ├──> [Klik "Lengkapi dengan AI"]
                                       │        └──> AI melengkapi terroir, rasa & resep
                                       │
                                       └──> [Simpan Kartu] ──> Tersimpan ke penyimpanan lokal
```

---

## Cara Kerja Aplikasi (How It Works)

Aplikasi dibangun dengan arsitektur hybrid **React SPA + Node.js Express**:
1. **Frontend (Browser):**
   - Mengelola state kartu kopi di memori React dan menyelaraskannya ke `localStorage` (`coffee_id_ktp_cards_v1`).
   - Menyediakan antarmuka bertema visual retro-arsip terinspirasi formulir identitas fisik (*warm paper, dark espresso border, monospace metadata, condensed display headers*).
   - Menghasilkan file PDF vektor langsung di sisi klien menggunakan pustaka `jspdf`, menggambar elemen kartu, tabel spesifikasi, badge SCA, dan barcode pengenal.
2. **Backend (Server Express):**
   - Berjalan pada port `3000`.
   - Mengarahkan request statis dan rute SPA ke bundle Vite.
   - Menyediakan endpoint API `POST /api/coffee/autocomplete` yang memanggil Google Gemini SDK (`@google/genai`) menggunakan API Key aman di sisi server (`process.env.GEMINI_API_KEY`).

---

## Teknologi yang Digunakan (Tech Stack)

- **Frontend Core:** React 19, TypeScript, Vite 6
- **Styling:** Tailwind CSS v4, Font IBM Plex Mono, Font Barlow Condensed
- **Iconography:** Lucide React
- **PWA & Offline:** `vite-plugin-pwa`, Service Worker Workbox
- **Ekspor Dokumen:** `jspdf` (PDF vektor), `html-to-image` (snapshot PNG)
- **Animasi & Interaksi:** `canvas-confetti`
- **Backend:** Node.js, Express 4, `tsx`, `esbuild`
- **AI Engine:** Google Gemini SDK (`@google/genai`), Model `gemini-3.8-flash`

---

## Cara Menjalankan

```bash
npm install
cp .env.example .env   # opsional: isi GEMINI_API_KEY untuk fitur "Lengkapi dengan AI"
npm run dev
```

Buka `http://localhost:3000`. Tanpa API key aplikasi tetap berjalan penuh — hanya fitur autocomplete AI yang nonaktif (formulir tetap bisa diisi manual).

---

## Status Saat Ini (Current Status)

- **Tahap:** **Functional Prototype / High-Fidelity Prototype**.
- Seluruh alur kerja lokal (tambah kartu, AI autocomplete, filter, detail modal, ganti mode tampilan, ekspor PDF/PNG/TXT, instalasi PWA) berfungsi penuh secara mandiri tanpa crash.
- Belum memiliki sistem autentikasi multi-pengguna dan belum terhubung ke database cloud terpusat.

---

## Batasan yang Diketahui (Known Limitations)

1. **Penyimpanan Berbasis Browser Saja:** Data kartu yang ditambahkan pengguna tersimpan di `localStorage` peramban saat ini. Menghapus cache browser atau berganti perangkat akan menghilangkan kartu yang baru dibuat kecuali pengguna sempat mengunduh file JSON cadangan.
2. **Ketergantungan API Key Gemini:** Fitur Smart Auto-Complete membutuhkan `GEMINI_API_KEY` aktif pada environment server. Jika kunci tidak ada atau kuota habis, form tetap bisa diisi secara manual tetapi otomasi AI akan gagal.
3. **Belum Ada Unggah Gambar Sendiri:** Kartu kopi menggunakan tata letak identitas berbasis teks/desain grafis, belum menyediakan input untuk mengunggah foto fisik kemasan biji kopi.
4. **Validasi Formulir Minimal:** Validasi saat ini hanya memastikan nama kopi terisi. Tidak ada pembatasan format angka ketat di sisi klien untuk skor SCA selain tipe input dasar.

---

## Catatan Penting untuk Pengembang Berikutnya

- **Port Standar:** Aplikasi dikonfigurasi untuk port `3000`.
- **Mode Ekspor PDF:** Fungsi `exportCardAsPDF` di `src/utils/exportCard.ts` memiliki dua cabang: pembuatan dokumen vektor murni saat objek data `CoffeeCardItem` tersedia (sangat direkomendasikan karena hasil cetak tajam dan teks dapat di-blok), dan fallback raster HTML snapshot jika objek data tidak disertakan.
- **Konfigurasi Lingkungan:** Pastikan variabel `GEMINI_API_KEY` terdefinisi di file `.env`.
- **Mode Tampilan:** Preferensi mode tampilan (`casual` | `beginner` | `enthusiast`) kini disimpan di `localStorage` dan dapat diatur melalui tombol pengaturan di navigasi atas maupun footer.

---

## License

MIT License © 2026 Yudhan Sebastian
