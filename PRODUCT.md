# Product Documentation — Coffee ID (KTP Kopi)

## Product Overview
**Coffee ID (KTP Kopi)** adalah aplikasi identitas dan kurasi biji kopi berbasis web/PWA yang menerbitkan kartu paspor digital ("KTP Kopi") untuk setiap varian kopi. Produk ini mengusung pendekatan informasi berjenjang (*adaptive knowledge depth*) dengan tiga perspektif: **Casual** (bahasa rasa sehari-hari untuk orang awam), **Beginner** (parameter teknis dasar seperti proses dan tingkat sangrai), dan **Enthusiast** (spesifikasi penuh berstandar spesialti seperti elevasi mdpl, varietal tanaman, skor SCA, dan parameter seduh barista).

---

## Problem Statement

- **Kesenjangan Bahasa (Language Barrier in Coffee):** Kemasan biji kopi spesialti penuh dengan istilah teknis (*anaerobic natural, washed extended fermentation, SL28, 1800 MASL, SCA 88*) yang membingungkan konsumen umum. Akibatnya, banyak penikmat kopi kasual merasa terintimidasi untuk membeli biji kopi berkualitas tinggi.
- **Ketiadaan Standar Kartu Informasi Biji Kopi yang Siap Pakai:** Kedai kopi (*coffee shop*) dan roastery skala kecil dan menengah membutuhkan waktu lama untuk mendesain kartu profil kopi (*tasting cards*) yang rapi untuk diselipkan ke dalam kemasan atau dipajang di meja barista.
- **Kesulitan Menghimpun Data Botani & Resep Seduh:** Mengidentifikasi ketinggian tumbuh, varietal tipikal, dan formula seduh ideal suatu daerah membutuhkan pencarian referensi berulang kali.

---

## Target Users

1. **Peminum Kopi Sehari-hari / Pemula (Casual to Beginner Drinkers)**
   - *Status:* [Implemented - Didukung penuh via mode tampilan Casual & Beginner]
   - Membutuhkan rekomendasi rasa yang mudah dibayangkan tanpa jargon.
2. **Penggemar Seduh Rumahan (Home Brewers & Coffee Enthusiasts)**
   - *Status:* [Implemented - Didukung penuh via mode Enthusiast & User Tasting Notes]
   - Membutuhkan parameter seduh yang presisi (rasio, suhu, ukuran gilingan) dan catatan log rasa pribadi.
3. **Barista & Pengelola Kedai Kopi (Coffee Shop Staff / Roaster)**
   - *Status:* [Implemented - Didukung via fitur Ekspor PDF Cetak & Smart Auto-Complete AI]
   - Membutuhkan alat cepat untuk menerbitkan dan mencetak kartu identitas kopi untuk dipajang atau dibagikan ke pelanggan.

---

## User Needs

- **Pemahaman Rasa yang Relevan:** Konsumen ingin tahu apakah kopi tersebut asam buah, manis karamel, atau pahit pekat sebelum menyeduhnya. *(Implemented)*
- **Kemudahan Pembuatan Identitas Kopi:** Pengguna tidak ingin repot mengetik puluhan parameter jika sistem dapat membantu melengkapinya. *(Implemented via Gemini AI)*
- **Portabilitas & Cetak:** Kemampuan mengunduh kartu dalam format dokumen resmi (PDF vektor dan gambar PNG) tanpa aplikasi desain grafis tambahan. *(Implemented)*
- **Akses Cepat Tanpa Koneksi Berat:** Kebutuhan membuka resep seduh di meja dapur tanpa bergantung pada internet berkecepatan tinggi. *(Implemented via PWA & LocalStorage)*

---

## Core Use Cases

1. **Mencari & Mengeksplorasi Profil Kopi:** Pengguna mencari kopi tertentu (misal: "Gayo", "Nangka", atau "Light Roast") dan melihat profil rasa serta saran penyajiannya. *(Implemented)*
2. **Membuat Kartu KTP Kopi Baru dengan AI:** Pengguna mengetik nama kopi (misal: "Bali Kintamani"), menekan tombol AI, dan memperoleh kartu spesifikasi lengkap secara otomatis. *(Implemented)*
3. **Mencetak Kartu Deskripsi Meja:** Barista mengunduh file PDF beresolusi tajam untuk dicetak dan diletakkan di samping dripper V60 di bar kopi. *(Implemented)*
4. **Mencatat Jurnal Seduh Pribadi:** Pengguna menuliskan catatan rasa dan memberi bintang rating setelah mencoba menyeduh kopi di rumah. *(Implemented)*
5. **Menyesuaikan Tingkat Pemahaman:** Pengguna yang belum paham istilah kopi dapat beralih ke mode "Casual" agar kartu hanya menampilkan analogi rasa sederhana. *(Implemented)*

---

## User Workflows

### Alur 1: Mengganti Mode Pemahaman Rasa (Casual / Beginner / Enthusiast)
- Pengguna membuka menu **Pengaturan** (ikon gear di navbar atas atau footer).
- Pengguna memilih salah satu dari 3 kartu mode:
  - *Casual:* Tampilan visual fokus pada analogi rasa, saran cara minum, dan sensasi kafein.
  - *Beginner:* Menyoroti asal negara, proses kopi, tingkat sangrai, dan radar sensori sederhana.
  - *Enthusiast:* Menampilkan paspor formal dengan nomor KTP Kopi, elevasi mdpl, skor SCA, kultivar botani, dan formula seduh.
- Pilihan langsung tersimpan ke penyimpanan browser dan seluruh kartu di beranda diperbarui secara seketika.

### Alur 2: Menambahkan Kartu Kopi Menggunakan Asisten AI
- Pengguna menekan tombol **"Buat KTP Kopi Baru"**.
- Form modal terbuka. Pengguna memasukkan nama kopi (misal: "Toraja Mamasa") dan asal daerah.
- Pengguna menekan tombol **"Lengkapi Otomatis (Smart AI)"**.
- Sistem mengirimkan permintaan ke server Express (`/api/coffee/autocomplete`), yang meneruskannya ke Google Gemini (`gemini-3.8-flash`).
- Form terisi secara otomatis dengan data ketinggian tanam, proses pasca-panen, kultivar tanaman, skor SCA, *flavour notes*, skala sensori, resep seduh, dan analogi bahasa santai.
- Animasi konfeti muncul sebagai penanda sukses. Pengguna dapat mengubah rincian jika diinginkan, lalu menekan **"Simpan Kartu Identitas Kopi"**.

### Alur 3: Pratinjau & Ekspor Dokumen
- Pengguna mengklik salah satu kartu kopi di katalog untuk membuka jendela detail.
- Pengguna dapat melihat pratinjau kartu dalam mode yang berbeda.
- Pengguna mengklik tombol ekspor:
  - **Simpan Teks (TXT):** Menghasilkan paspor berformat ASCII/Plain text.
  - **Unduh Gambar (PNG):** Mengambil tangkapan visual kartu kopi.
  - **Ekspor Kartu (PDF):** Membuat dokumen cetak PDF vektor standar A4 yang dapat dicetak atau disimpan di arsip.

---

## Functional Requirements

| Komponen Fungsional | Status | Detail Implementasi Aktual |
| :--- | :--- | :--- |
| **Katalog Kartu Kopi** | Implemented | Menampilkan grid kartu kopi responsif dengan kartu bergaya retro paspor. |
| **Pencarian Kata Kunci** | Implemented | Melakukan pencarian teks pada nama, daerah, negara, proses, varietal, notes, dan deskripsi umum. |
| **Filter Spesies** | Implemented | Filter dropdown: Semua, Arabika, Robusta, Liberika, Excelsa, Blend. |
| **Filter Tingkat Sangrai** | Implemented | Filter dropdown: Semua, Light, Light-Medium, Medium, Medium-Dark, Dark. |
| **Filter Proses Pengolahan** | Implemented | Filter dropdown: Semua, Natural, Wash, Honey, Semi Wash / Giling Basah. |
| **Filter Rating Minimum** | Implemented | Memilih ambang batas bintang (0-5 bintang). |
| **Pengelompokan (Grouping)** | Implemented | Menata kartu berdasarkan Negara Asal, Proses, atau Tingkat Sangrai. |
| **Smart AI Autocomplete** | Implemented | Memanggil Gemini 3.8 Flash via backend API untuk menghasilkan JSON terstruktur identitas kopi. |
| **Ekspor PDF Vektor** | Implemented | Menggunakan `jspdf` untuk menggambar kartu A4 resolusi tinggi dengan teks yang dapat diseleksi. |
| **Ekspor PNG** | Implemented | Menggunakan `html-to-image` untuk menyimpan tangkapan visual elemen DOM kartu. |
| **Ekspor TXT** | Implemented | Menghasilkan file teks berformat tabel ringkas identitas kopi. |
| **Backup / Export JSON** | Implemented | Mengunduh seluruh array kartu kopi yang ada di `localStorage` ke file `.json`. |
| **Reset Data ke Contoh Asli** | Implemented | Mengembalikan state aplikasi ke 6 kartu bawaan. |
| **PWA Installation Prompt** | Implemented | Menangkap event `beforeinstallprompt` browser dan menyediakan tombol unduh aplikasi. |
| **Deteksi Status Offline** | Implemented | Menampilkan indikator di pojok kiri bawah saat koneksi internet terputus. |
| **Autentikasi Pengguna (Login/Register)** | Out of Scope / Planned | Belum ada sistem akun. Seluruh pengguna berbagi status lokal di peramban yang sama. |
| **Sinkronisasi Multi-Device Cloud** | Planned / Inferred | Belum ada database server terpusat. |
| **Unggah Foto Kemasan / Biji Kopi** | Planned | Belum ada form file upload gambar biji kopi pada modal input. |

---

## Business Rules

1. **Penomoran Nomor KTP Kopi (KTP Number):**
   - Kartu bawaan memiliki kode terstruktur (contoh: `ID-AC-1104-001`, `ID-JB-3204-002`).
   - Kartu baru yang dibuat melalui formulir menggunakan generator otomatis: `[KODE_NEGARA]-[KODE_WILAYAH]-[TAHUN]-[RANDOM_3_DIGIT]` (contoh: `ID-TO-2026-842`). *(Implemented)*
2. **Hak Edit & Hapus Kartu:**
   - Seluruh kartu (baik bawaan maupun buatan pengguna) dapat diedit catatan rasanya, diubah rating bintangnya, atau dihapus secara permanen dari penyimpanan lokal. *(Implemented)*
3. **Persistensi Data:**
   - Semua modifikasi kartu disimpan langsung ke kunci `coffee_id_ktp_cards_v1` di `localStorage`. *(Implemented)*
   - Reset data akan menggantikan seluruh kartu custom dengan kartu bawaan setelah konfirmasi pengguna. *(Implemented)*
4. **Isolasi Kunci API:**
   - Kunci API Gemini tidak boleh ada di frontend dan hanya dipanggil melalui rute `/api/coffee/autocomplete`. *(Implemented)*

---

## Data / Entities

Entitas data utama didefinisikan dalam interface TypeScript `CoffeeCardItem`:

- `id`: string (UUID unik atau timestamp)
- `ktpNumber`: string (Nomor registrasi unik paspor kopi)
- `name`: string (Nama varian/produk kopi)
- `originCountry`: string (Negara asal tanaman)
- `region`: string (Ketinggian / nama wilayah mikro)
- `altitudeRange`: string (Rentang ketinggian tanam mdpl)
- `type`: 'Arabika' | 'Robusta' | 'Liberika' | 'Excelsa' | 'Blend'
- `process`: string (Metode pasca panen)
- `roastLevel`: 'Light' | 'Light-Medium' | 'Medium' | 'Medium-Dark' | 'Dark'
- `generalCharacter`: string (Deskripsi profil 1 kalimat)
- `flavourNotes`: string[] (Daftar label nuansa rasa)
- `varietal`: string (Kultivar botani tanaman)
- `producer`?: string (Nama petani/koperasi/prosesor)
- `roaster`?: string (Nama rumah sangrai)
- `scaScore`?: number (Skor cupping skala 0-100)
- `acidity`: number (Skala 1-5)
- `body`: number (Skala 1-5)
- `sweetness`: number (Skala 1-5)
- `recommendedBrew`: string[] (Daftar metode seduh yang disarankan)
- `brewRecipe`?: { ratio, temperature, grindSize, time, note }
- `casualDescription`: string (Analogi rasa bahasa sehari-hari untuk orang awam)
- `bestWayToDrink`: string (Saran cara minum: es/susu/hitam murni)
- `caffeineFeel`: 'Ringan & Santai' | 'Sedang & Pas' | 'Kuat & Nendang'
- `rating`: number (Bintang 1-5)
- `userNotes`?: string (Catatan seduh pribadi)
- `harvestYear`?: string (Tahun panen)
- `createdAt`: string (Tanggal penerbitan kartu)

---

## AI Capabilities

- **Model yang Digunakan:** `gemini-3.8-flash` via `@google/genai`.
- **Lokasi Eksekusi:** Server-side (`server.ts`), dipanggil dari modal `AddCoffeeModal.tsx`.
- **Tipe Tugas AI:** Knowledge Retrieval & Data Completion.
- **Sifat Input:** Pengguna cukup memasukkan nama kopi (misal: "Flores Bajawa") atau asal daerah.
- **Sifat Output:** JSON terstruktur sesuai skema resmi dengan panduan botani kopi dunia, terroir wilayah, estimasi ketinggian mdpl, varietal lokal Indonesia & dunia, dan analogi bahasa santai.
- **Status:** [Implemented]. Berfungsi aktif jika `GEMINI_API_KEY` terkonfigurasi pada server.

---

## Integrations

- **Google Gemini API:** Terintegrasi di server Express untuk melengkapi data paspor kopi. *(Implemented)*
- **Web Storage API (`localStorage`):** Untuk persistensi offline kartu kopi dan preferensi mode tampilan. *(Implemented)*
- **Service Worker / Workbox:** Untuk caching aset PWA. *(Implemented)*
- **Cloud Database (Firebase / PostgreSQL):** Tidak terintegrasi. *(Out of Scope)*
- **Sistem Pembayaran / E-Commerce:** Tidak terintegrasi. *(Out of Scope)*

---

## UX Principles

1. **Aesthetic Identity yang Kuat ("Vintage Coffee Passport"):** Menggunakan palet warna kertas hangat (`#F0E5C5`), aksen tinta espresso gelap (`#332B1C`), hijau matcha pastel (`#E2F4CB`), dan tipografi monospace IBM Plex Mono dipadu Barlow Condensed.
2. **Konteks Bertingkat Tanpa Duplikasi Halaman:** Pergantian antara mode Casual, Beginner, dan Enthusiast tidak memuat ulang halaman atau memindahkan rute, melainkan mentransformasi kartu yang sama sesuai tingkat pemahaman yang dipilih.
3. **Desain Siap Cetak (Print-Ready):** Menyediakan stylesheet media cetak (`@media print`) dan generator PDF vektor yang menjaga proporsi kartu resmi.

---

## Current Scope

- Katalog 6 kartu kopi bawaan (Nusantara & Internasional).
- Penyaringan multi-kriteria dan pengelompokan kartu.
- Form penambahan kartu kopi baru dengan asisten AI.
- Pengaturan mode tampilan yang tersimpan permanen di browser.
- Ekspor kartu ke format PDF vektor, PNG, TXT, dan cadangan JSON.
- Dukungan PWA offline-first.

---

## Out of Scope

- Autentikasi multi-user (login dengan Google / email).
- Sinkronisasi awan antar perangkat.
- Fitur jual-beli biji kopi (*marketplace* atau keranjang belanja).
- Komunitas publik / membagikan kartu kopi ke feed media sosial bersama.
- Pemindai kamera OCR / scan kemasan kopi fisik secara langsung.

---

## Known Limitations

- Kehilangan data dapat terjadi jika pengguna membersihkan *cache/storage* browser tanpa melakukan *Export JSON* terlebih dahulu.
- Tidak tersedianya input untuk menyertakan foto kemasan atau foto biji kopi secara visual.
- Belum ada kemampuan multi-bahasa (seluruh antarmuka saat ini berbahasa Indonesia).

---

## Future Opportunities

1. **Cloud Sync & User Accounts:** Mengintegrasikan Firebase Auth & Firestore agar barista dapat mengakses koleksi kartu mereka dari tablet di bar maupun ponsel pribadi.
2. **Photo Upload / AI Vision Scanning:** Mengunggah foto kemasan kopi dan membiarkan Gemini Vision membaca label kemasan untuk membuat KTP Kopi secara instan.
3. **QR Code Generator:** Menambahkan QR code dinamis pada kartu PDF/cetak yang jika di-scan oleh pelanggan kedai kopi langsung membuka kartu digital interaktif ini.
4. **Preset Resep Komunitas:** Memungkinkan pengguna menyimpan berbagai variasi resep seduh (misal: resep Tetsu Kasuya 4:6 vs resep James Hoffmann) untuk kartu yang sama.
