import { Language } from '../types';

export interface TranslationDictionary {
  // Brand & Header
  appTitle: string;
  appSubtitle: string;
  officialArchiveTag: string;
  newCardBtn: string;
  settingsBtn: string;
  pwaInstall: string;
  activeModeLabel: string;
  totalCardsSummary: (total: number, indo: number) => string;
  brandTitle: string;
  brandBadge: string;
  brandTagline: string;
  navSettings: string;
  navCreateBtn: string;
  footerResetBtn: string;

  // Language Switcher
  langToggleLabel: string;
  langIndonesian: string;
  langEnglish: string;
  langToneDescription: string;

  // View Modes (Interpretation & Tone)
  modeCasualTitle: string;
  modeCasualSubtitle: string;
  modeCasualDesc: string;
  modeCasualBanner: string;

  modeBeginnerTitle: string;
  modeBeginnerSubtitle: string;
  modeBeginnerDesc: string;
  modeBeginnerBanner: string;

  modeEnthusiastTitle: string;
  modeEnthusiastSubtitle: string;
  modeEnthusiastDesc: string;
  modeEnthusiastBanner: string;

  // Search & Filters
  searchPlaceholder: string;
  searchLabel: string;
  filterSpeciesLabel: string;
  filterRoastLabel: string;
  filterProcessLabel: string;
  filterRatingLabel: string;
  groupByLabel: string;
  groupByNone: string;
  groupByCountry: string;
  groupByProcess: string;
  groupByRoast: string;
  allOption: string;
  filterAllSpecies: string;
  filterAllProcesses: string;
  filterAllRoasts: string;
  filterAllRatings: string;
  filterGroupLabel: string;
  filterGroupNone: string;
  filterGroupOrigin: string;
  filterGroupProcess: string;
  filterGroupRoast: string;
  clearFilterBtn: string;
  filterActivePrefix: string;
  filterResetAll: string;
  emptyNotFoundTitle: string;
  emptyNotFoundDesc: string;
  emptyShowAllBtn: string;
  starsAndAbove: (n: number) => string;
  resetFilterBtn: string;
  showingCount: (count: number) => string;
  emptySearchTitle: string;
  emptySearchDesc: string;

  // Card Content & Passport Labels
  passportHeaderTop: string;
  passportHeaderSub: string;
  passportNumberLabel: string;
  provenanceStamp: string;
  watermarkText: string;
  casualImpressionLabel: string;
  flavourNotesLabel: string;
  servingRitualLabel: string;
  caffeinePunchLabel: string;
  viewDetailsBtn: string;
  exportBtn: string;
  exportPng: string;
  exportPdf: string;
  exportTxt: string;

  // Technical Specs (Enthusiast & Beginner)
  specProcess: string;
  specElevation: string;
  specVarietal: string;
  specProducer: string;
  specRoast: string;
  specAcidity: string;
  specBody: string;
  specSweetness: string;
  specBrewFormula: string;
  specRatio: string;
  specTemp: string;
  specGrind: string;
  specTime: string;
  specBaristaNote: string;
  specRecommendedBrew: string;
  specScaCupScore: string;
  specHarvest: string;
  specIssued: string;

  // Caffeine Feel Terms
  caffeineGentle: string;
  caffeineBalanced: string;
  caffeineBold: string;

  // Modals
  settingsTitle: string;
  settingsSubtitle: string;
  settingsSectionViewMode: string;
  settingsSectionLanguage: string;
  settingsSectionData: string;
  settingsResetBtn: string;
  settingsResetConfirm: string;
  settingsBackupJsonBtn: string;
  settingsActiveBadge: string;
  settingsLanguageIntro: string;
  settingsLangIdName: string;
  settingsLangIdTone: string;
  settingsLangEnName: string;
  settingsLangEnTone: string;

  // Detail Modal
  detailPreviewBadge: string;
  detailDeleteBtn: string;
  detailDeleteConfirm: (name: string) => string;
  detailTastingLogTitle: string;
  detailTastingLogPlaceholder: string;
  detailSaveNoteBtn: string;
  detailEditNoteBtn: string;
  detailRatingLabel: string;
  detailCloseBtn: string;

  // Add Coffee Modal
  addModalTitle: string;
  addModalSubtitle: string;
  addAiBannerTitle: string;
  addAiBannerDesc: string;
  addNameLabel: string;
  addNamePlaceholder: string;
  addOriginLabel: string;
  addOriginPlaceholder: string;
  addProcessLabel: string;
  addProcessPlaceholder: string;
  addRoastLabel: string;
  addAiBtn: string;
  addAiBtnLoading: string;
  addAiSuccess: string;
  addRegionLabel: string;
  addAltitudeLabel: string;
  addVarietalLabel: string;
  addProducerLabel: string;
  addFlavourNotesLabel: string;
  addGeneralCharacterLabel: string;
  addCasualDescriptionLabel: string;
  addBestWayToDrinkLabel: string;
  addCaffeineFeelLabel: string;
  addScaScoreLabel: string;
  addSaveBtn: string;
  addCancelBtn: string;

  // Offline & PWA
  offlineMsg: string;
  pwaInstallTooltip: string;
}

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  id: {
    // Brand & Header
    appTitle: 'COFFEE ID — KTP KOPI',
    appSubtitle: 'Paspor Identitas Kopi Nusantara & Dunia',
    officialArchiveTag: 'REPUBLIK KOPI INDONESIA',
    newCardBtn: 'Buat KTP Kopi Baru',
    settingsBtn: 'Pengaturan',
    pwaInstall: 'Instal Aplikasi',
    activeModeLabel: 'Mode Tampilan:',
    totalCardsSummary: (total, indo) => `Total: ${total} Kartu (${indo} Nusantara)`,
    brandTitle: 'COFFEE ID',
    brandBadge: 'KTP KOPI',
    brandTagline: 'Paspor Identitas Kopi Nusantara & Dunia',
    navSettings: 'Pengaturan',
    navCreateBtn: 'Buat KTP Kopi',
    footerResetBtn: 'Reset Data Sampel',

    // Language Switcher
    langToggleLabel: 'Pilihan Bahasa / Language',
    langIndonesian: 'Bahasa Indonesia',
    langEnglish: 'English (Specialty)',
    langToneDescription: 'Gaya administrasi arsip KTP Kopi, analogi rasa nusantara, dan istilah khas kedai lokal.',

    // View Modes
    modeCasualTitle: 'Casual',
    modeCasualSubtitle: 'Orang Biasa',
    modeCasualDesc: 'Analogi rasa santai & cara minum tanpa istilah rumit.',
    modeCasualBanner: 'Mode Casual: Analogi rasa santai, cara minum (es/susu/hitam), tanpa istilah teknis.',

    modeBeginnerTitle: 'Beginner',
    modeBeginnerSubtitle: 'Penikmat Pemula',
    modeBeginnerDesc: 'Asal daerah, proses kopi, tingkat sangrai, dan skala sensori.',
    modeBeginnerBanner: 'Mode Beginner: Asal daerah, proses kopi (Natural/Wash/Honey), tingkat sangrai, keasaman & body.',

    modeEnthusiastTitle: 'Enthusiast',
    modeEnthusiastSubtitle: 'KTP Kopi Resmi',
    modeEnthusiastDesc: 'Paspor identitas resmi, elevasi mdpl, varietal, skor SCA, dan resep barista.',
    modeEnthusiastBanner: 'Mode Enthusiast: KTP Kopi lengkap dengan nomor registrasi, elevasi mdpl, varietal, SCA score, dan resep seduh.',

    // Search & Filters
    searchPlaceholder: 'Cari nama kopi, daerah, varietal, atau rasa (mis: Gayo, Melati, Nangka)...',
    searchLabel: 'Pencarian Kopi',
    filterSpeciesLabel: 'Spesies / Jenis',
    filterRoastLabel: 'Tingkat Sangrai',
    filterProcessLabel: 'Metode Proses',
    filterRatingLabel: 'Rating Minimal',
    groupByLabel: 'Kelompokkan (Group By)',
    groupByNone: 'Tanpa Pengelompokan',
    groupByCountry: 'Negara Asal',
    groupByProcess: 'Metode Proses',
    groupByRoast: 'Tingkat Sangrai',
    allOption: 'Semua',
    filterAllSpecies: 'Semua Spesies',
    filterAllProcesses: 'Semua Proses',
    filterAllRoasts: 'Semua Tingkat Sangrai',
    filterAllRatings: 'Semua Rating Bintang',
    filterGroupLabel: 'Kelompokkan',
    filterGroupNone: 'Tanpa Pengelompokan',
    filterGroupOrigin: 'Negara Asal',
    filterGroupProcess: 'Metode Proses',
    filterGroupRoast: 'Tingkat Sangrai',
    clearFilterBtn: 'Hapus Filter',
    filterActivePrefix: 'Filter aktif:',
    filterResetAll: 'Reset Semua Filter',
    emptyNotFoundTitle: 'Tidak Ada Kopi yang Cocok',
    emptyNotFoundDesc: 'Coba gunakan kata kunci pencarian lain atau sesuaikan filter di atas.',
    emptyShowAllBtn: 'Tampilkan Semua Kopi',
    starsAndAbove: (n) => `${n} Bintang ke Atas`,
    resetFilterBtn: 'Reset Filter',
    showingCount: (count) => `Menampilkan ${count} Kartu`,
    emptySearchTitle: 'Tidak ada kartu kopi yang cocok',
    emptySearchDesc: 'Coba ubah kata kunci pencarian atau sesuaikan opsi filter Anda.',

    // Card Content & Passport Labels
    passportHeaderTop: 'REPUBLIK KOPI INDONESIA',
    passportHeaderSub: 'KARTU TANDA PENGENAL KOPI (KTP KOPI)',
    passportNumberLabel: 'NO. KTP',
    provenanceStamp: 'WARGA KOPI RESMI',
    watermarkText: 'ARSIP RESMI KOPI NUSANTARA',
    casualImpressionLabel: 'Kesan Rasa Utama:',
    flavourNotesLabel: 'Nuansa Rasa yang Terasa:',
    servingRitualLabel: 'Saran Minum:',
    caffeinePunchLabel: 'Efek Kafein:',
    viewDetailsBtn: 'Lihat Selengkapnya →',
    exportBtn: 'Ekspor',
    exportPng: 'Gambar (PNG)',
    exportPdf: 'Dokumen (PDF)',
    exportTxt: 'Teks Kopi (TXT)',

    // Technical Specs
    specProcess: 'PROSES:',
    specElevation: 'ELEVASI:',
    specVarietal: 'VARIETAS:',
    specProducer: 'PETANI/PRODUSER:',
    specRoast: 'SANGRAI:',
    specAcidity: 'Keasaman',
    specBody: 'Ketebalan Body',
    specSweetness: 'Kemanisan Alami',
    specBrewFormula: 'RESEP SEDUH BARISTA',
    specRatio: 'Rasio',
    specTemp: 'Suhu Air',
    specGrind: 'Gilingan',
    specTime: 'Waktu Seduh',
    specBaristaNote: 'Catatan Barista',
    specRecommendedBrew: 'Seduhan yang Disarankan:',
    specScaCupScore: 'SKOR CUPPING SCA',
    specHarvest: 'Tahun Panen:',
    specIssued: 'Diterbitkan:',

    // Caffeine Feel
    caffeineGentle: 'Ringan & Santai',
    caffeineBalanced: 'Sedang & Pas',
    caffeineBold: 'Kuat & Nendang',

    // Modals
    settingsTitle: 'Pengaturan (Settings)',
    settingsSubtitle: 'Sesuaikan preferensi bahasa, mode tampilan, dan data aplikasi',
    settingsSectionViewMode: 'Mode Tampilan: Tingkat Pemahaman Kopi',
    settingsSectionLanguage: 'Bahasa & Gaya Penulisan (Interpretation)',
    settingsSectionData: 'Manajemen Data & Cadangan',
    settingsResetBtn: 'Kembalikan Data Bawaan',
    settingsResetConfirm: 'Apakah Anda yakin ingin mengembalikan ke 6 kartu kopi bawaan? Kartu yang Anda tambahkan sendiri akan terhapus.',
    settingsBackupJsonBtn: 'Cadangkan Data (Export JSON)',
    settingsActiveBadge: 'Aktif',
    settingsLanguageIntro: 'Pilih bahasa antarmuka dan interpretasi profil kopi:',
    settingsLangIdName: 'Bahasa Indonesia (Nuansa KTP & Nusantara)',
    settingsLangIdTone: 'Metafora KTP Kopi, istilah birokrasi arsip resmi Republik Kopi Indonesia, analogi jajanan & buah lokal, resep seduh khas Nusantara.',
    settingsLangEnName: 'English (Specialty Passport & Terroir)',
    settingsLangEnTone: 'International Specialty Coffee Passport terminology, MASL elevation scales, origin provenance stamps, and professional barista brew specs.',

    // Detail Modal
    detailPreviewBadge: 'Pratinjau Kartu KTP Kopi',
    detailDeleteBtn: 'Hapus Kartu',
    detailDeleteConfirm: (name) => `Hapus kartu kopi "${name}" secara permanen?`,
    detailTastingLogTitle: 'Catatan Rasa Pribadi (Tasting Log)',
    detailTastingLogPlaceholder: 'Tulis kesan rasa Anda setelah menyeduh kopi ini (misal: "sangat wangi melati ketika diseduh pagi hari...")...',
    detailSaveNoteBtn: 'Simpan Catatan',
    detailEditNoteBtn: 'Edit Catatan',
    detailRatingLabel: 'Penilaian Kepuasan Anda:',
    detailCloseBtn: 'Tutup',

    // Add Coffee Modal
    addModalTitle: 'Terbitkan KTP Kopi Baru',
    addModalSubtitle: 'Isi identitas kopi manual atau gunakan asisten AI untuk melengkapi data secara otomatis',
    addAiBannerTitle: 'Smart AI Auto-Complete (Gemini)',
    addAiBannerDesc: 'Cukup masukkan Nama Kopi atau Asal Daerah, AI akan melengkapi elevasi, varietal, skor SCA, resep seduh, dan analogi rasa.',
    addNameLabel: 'Nama Kopi *',
    addNamePlaceholder: 'Contoh: Flores Bajawa, Mandheling, atau Geisha...',
    addOriginLabel: 'Asal Daerah / Negara *',
    addOriginPlaceholder: 'Contoh: Nusa Tenggara Timur, Indonesia...',
    addProcessLabel: 'Metode Pengolahan',
    addProcessPlaceholder: 'Contoh: Anaerobic Natural, Full Wash...',
    addRoastLabel: 'Tingkat Sangrai (Roast)',
    addAiBtn: 'Lengkapi Otomatis (Smart AI)',
    addAiBtnLoading: 'Menganalisis profil botani & rasa...',
    addAiSuccess: 'Data berhasil dilengkapi oleh AI! Silakan tinjau sebelum menyimpan.',
    addRegionLabel: 'Wilayah / Terroir Spesifik',
    addAltitudeLabel: 'Ketinggian Tanam (mdpl)',
    addVarietalLabel: 'Varietas / Kultivar Botani',
    addProducerLabel: 'Petani / Koperasi / Roaster',
    addFlavourNotesLabel: 'Nuansa Rasa (Pisahkan dengan koma)',
    addGeneralCharacterLabel: 'Karakter Rasa Singkat (1 Kalimat)',
    addCasualDescriptionLabel: 'Analogi Rasa Santai (Gaya Orang Biasa)',
    addBestWayToDrinkLabel: 'Saran Cara Minum Paling Nikmat',
    addCaffeineFeelLabel: 'Sensasi Kafein',
    addScaScoreLabel: 'Estimasi Skor Cupping SCA (0-100)',
    addSaveBtn: 'Simpan Kartu Identitas Kopi',
    addCancelBtn: 'Batal',

    // Offline & PWA
    offlineMsg: 'Mode Offline: Membaca arsip lokal',
    pwaInstallTooltip: 'Pasang aplikasi di layar utama perangkat Anda',
  },

  en: {
    // Brand & Header
    appTitle: 'COFFEE ID — PASSPORT',
    appSubtitle: 'Global Specialty Coffee Provenance & Identity Archive',
    officialArchiveTag: 'GLOBAL SPECIALTY COFFEE ARCHIVE',
    newCardBtn: 'Register New Coffee Passport',
    settingsBtn: 'Settings',
    pwaInstall: 'Install App',
    activeModeLabel: 'View Mode:',
    totalCardsSummary: (total, indo) => `Archive: ${total} Passports (${indo} Nusantara)`,
    brandTitle: 'COFFEE ID',
    brandBadge: 'PASSPORT',
    brandTagline: 'Global Specialty Coffee Provenance & Identity Archive',
    navSettings: 'Settings',
    navCreateBtn: 'New Passport',
    footerResetBtn: 'Reset Sample Data',

    // Language Switcher
    langToggleLabel: 'Language / Pilihan Bahasa',
    langIndonesian: 'Bahasa Indonesia',
    langEnglish: 'English (Specialty)',
    langToneDescription: 'International specialty coffee passport, origin cupping lexicon, and barista craft rituals.',

    // View Modes
    modeCasualTitle: 'Casual',
    modeCasualSubtitle: 'Everyday Sipper',
    modeCasualDesc: 'Approachable taste analogies & serving rituals without chemistry jargon.',
    modeCasualBanner: 'Casual Mode: Approachable flavor analogies, serving rituals (iced/latte/black), no confusing jargon.',

    modeBeginnerTitle: 'Beginner',
    modeBeginnerSubtitle: 'Coffee Explorer',
    modeBeginnerDesc: 'Terroir origins, processing craft, roast spectrum, and sensory balance.',
    modeBeginnerBanner: 'Beginner Mode: Provenance origins, post-harvest processing (Natural/Washed/Honey), roast levels, acidity & body.',

    modeEnthusiastTitle: 'Enthusiast',
    modeEnthusiastSubtitle: 'Specialty Passport',
    modeEnthusiastDesc: 'Official provenance credentials, MASL elevation, cultivars, SCA score, and barista brew specs.',
    modeEnthusiastBanner: 'Enthusiast Mode: Full coffee passport with registration code, MASL elevation, botanical cultivars, SCA score, and precision extraction.',

    // Search & Filters
    searchPlaceholder: 'Search coffee name, terroir, cultivar, or notes (e.g. Yirgacheffe, Jasmine, Peach)...',
    searchLabel: 'Search Coffee Archive',
    filterSpeciesLabel: 'Botanical Species',
    filterRoastLabel: 'Roast Profile',
    filterProcessLabel: 'Processing Method',
    filterRatingLabel: 'Minimum Rating',
    groupByLabel: 'Group By',
    groupByNone: 'No Grouping',
    groupByCountry: 'Country of Origin',
    groupByProcess: 'Processing Method',
    groupByRoast: 'Roast Profile',
    allOption: 'All',
    filterAllSpecies: 'All Botanical Species',
    filterAllProcesses: 'All Processes',
    filterAllRoasts: 'All Roast Profiles',
    filterAllRatings: 'All Star Ratings',
    filterGroupLabel: 'Group By',
    filterGroupNone: 'No Grouping',
    filterGroupOrigin: 'Country of Origin',
    filterGroupProcess: 'Processing Craft',
    filterGroupRoast: 'Roast Profile',
    clearFilterBtn: 'Clear Filters',
    filterActivePrefix: 'Active filters:',
    filterResetAll: 'Reset All Filters',
    emptyNotFoundTitle: 'No Matching Coffee Passports',
    emptyNotFoundDesc: 'Try adjusting your search terms or relaxing your active filter criteria above.',
    emptyShowAllBtn: 'Display All Passports',
    starsAndAbove: (n) => `${n} Stars & Up`,
    resetFilterBtn: 'Reset Filters',
    showingCount: (count) => `Displaying ${count} Passports`,
    emptySearchTitle: 'No matching coffee passports found',
    emptySearchDesc: 'Try adjusting your search terms or relaxing your active filter criteria.',

    // Card Content & Passport Labels
    passportHeaderTop: 'GLOBAL SPECIALTY COFFEE REGISTRY',
    passportHeaderSub: 'OFFICIAL COFFEE PROVENANCE PASSPORT',
    passportNumberLabel: 'PASSPORT NO.',
    provenanceStamp: 'CERTIFIED ORIGIN',
    watermarkText: 'VERIFIED PROVENANCE ARCHIVE',
    casualImpressionLabel: 'Primary Flavor Impression:',
    flavourNotesLabel: 'Distinct Tasting Notes:',
    servingRitualLabel: 'Serving Ritual:',
    caffeinePunchLabel: 'Caffeine Punch:',
    viewDetailsBtn: 'Inspect Passport →',
    exportBtn: 'Export',
    exportPng: 'Image (PNG)',
    exportPdf: 'Document (PDF)',
    exportTxt: 'Text Passport (TXT)',

    // Technical Specs
    specProcess: 'PROCESS:',
    specElevation: 'ELEVATION:',
    specVarietal: 'CULTIVAR:',
    specProducer: 'PRODUCER / STATION:',
    specRoast: 'ROAST:',
    specAcidity: 'Acidity',
    specBody: 'Body Depth',
    specSweetness: 'Natural Sweetness',
    specBrewFormula: 'BARISTA EXTRACTION SPECS',
    specRatio: 'Brew Ratio',
    specTemp: 'Water Temp',
    specGrind: 'Grind Size',
    specTime: 'Total Time',
    specBaristaNote: 'Barista Tip',
    specRecommendedBrew: 'Recommended Extraction:',
    specScaCupScore: 'SCA CUPPING SCORE',
    specHarvest: 'Crop Year:',
    specIssued: 'Registered:',

    // Caffeine Feel
    caffeineGentle: 'Gentle & Breezy',
    caffeineBalanced: 'Balanced & Crisp',
    caffeineBold: 'Bold & Electric',

    // Modals
    settingsTitle: 'Settings & Preferences',
    settingsSubtitle: 'Configure visual presentation depth, dual language styling, and data storage',
    settingsSectionViewMode: 'View Mode: Information Depth & Archetype',
    settingsSectionLanguage: 'Language & Styling Interpretation',
    settingsSectionData: 'Data Archive & Backup',
    settingsResetBtn: 'Restore Default Coffees',
    settingsResetConfirm: 'Are you sure you want to restore the 6 default heritage coffees? Any custom passports you created will be reset unless previously backed up.',
    settingsBackupJsonBtn: 'Backup Archive (Export JSON)',
    settingsActiveBadge: 'Active',
    settingsLanguageIntro: 'Select the linguistic tone and cultural interpretation for the application:',
    settingsLangIdName: 'Bahasa Indonesia (Nuansa KTP & Nusantara)',
    settingsLangIdTone: 'Authentic Indonesian "KTP Kopi" civil registry metaphor, local heritage tasting notes (nangka, gula aren, melati), and traditional tubruk/pour-over recipes.',
    settingsLangEnName: 'English (Specialty Passport & Terroir)',
    settingsLangEnTone: 'International Specialty Coffee Passport terminology, MASL elevation scales, origin provenance stamps, and professional barista brew specs.',

    // Detail Modal
    detailPreviewBadge: 'Coffee Passport Inspection',
    detailDeleteBtn: 'Delete Passport',
    detailDeleteConfirm: (name) => `Permanently delete coffee passport "${name}"?`,
    detailTastingLogTitle: "Curator's Tasting Log & Personal Notes",
    detailTastingLogPlaceholder: 'Record your sensory reflections after brewing this lot (e.g., "radiant jasmine aroma in the morning cup with sweet honey body...")...',
    detailSaveNoteBtn: 'Save Notes',
    detailEditNoteBtn: 'Edit Notes',
    detailRatingLabel: 'Your Satisfaction Rating:',
    detailCloseBtn: 'Close',

    // Add Coffee Modal
    addModalTitle: 'Register New Coffee Passport',
    addModalSubtitle: 'Input provenance manually or allow AI to auto-complete botanical & brewing parameters',
    addAiBannerTitle: 'Smart AI Auto-Complete (Gemini)',
    addAiBannerDesc: 'Enter the Coffee Name or Origin Region. AI will automatically complete elevation MASL, cultivars, SCA score, brew specs, and flavor analogies.',
    addNameLabel: 'Coffee Lot / Name *',
    addNamePlaceholder: 'e.g. Yirgacheffe Chelchele, Huila Pink Bourbon, or Gesha...',
    addOriginLabel: 'Terroir / Country of Origin *',
    addOriginPlaceholder: 'e.g. Gedeb, Yirgacheffe, Ethiopia or Aceh, Indonesia...',
    addProcessLabel: 'Processing Craft',
    addProcessPlaceholder: 'e.g. Anaerobic Slow Dry, Extended Washed, Honey...',
    addRoastLabel: 'Roast Profile',
    addAiBtn: 'Auto-Complete with AI',
    addAiBtnLoading: 'Analyzing botanical provenance & flavor spectrum...',
    addAiSuccess: 'Provenance auto-completed by AI! Review and tune specifications before saving.',
    addRegionLabel: 'Specific Micro-Region / Washing Station',
    addAltitudeLabel: 'Elevation Range (MASL)',
    addVarietalLabel: 'Botanical Cultivar / Variety',
    addProducerLabel: 'Grower / Washing Station / Roaster',
    addFlavourNotesLabel: 'Flavor Notes (comma-separated)',
    addGeneralCharacterLabel: 'Concise Sensory Profile (1 Sentence)',
    addCasualDescriptionLabel: 'Everyday Sipper Analogy (Friendly Description)',
    addBestWayToDrinkLabel: 'Optimal Serving Ritual',
    addCaffeineFeelLabel: 'Caffeine Punch',
    addScaScoreLabel: 'Estimated SCA Cupping Score (0-100)',
    addSaveBtn: 'Save & Issue Coffee Passport',
    addCancelBtn: 'Cancel',

    // Offline & PWA
    offlineMsg: 'Offline Mode: Browsing local archive',
    pwaInstallTooltip: 'Install application to your device home screen',
  },
};
