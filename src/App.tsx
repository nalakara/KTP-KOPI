import React, { useState, useEffect, useMemo } from 'react';
import {
  CoffeeCardItem,
  ViewMode,
  CoffeeType,
  RoastLevel,
  Language,
} from './types';
import { INITIAL_COFFEE_CARDS } from './data/defaultCoffees';
import { CasualCoffeeCard } from './components/CasualCoffeeCard';
import { BeginnerCoffeeCard } from './components/BeginnerCoffeeCard';
import { EnthusiastCoffeeCard } from './components/EnthusiastCoffeeCard';
import { AddCoffeeModal } from './components/AddCoffeeModal';
import { CoffeeDetailModal } from './components/CoffeeDetailModal';
import { SettingsModal } from './components/SettingsModal';
import { PWAInstallButton } from './components/PWAInstallButton';
import { OfflineIndicator } from './components/OfflineIndicator';
import { TRANSLATIONS } from './i18n/translations';
import {
  Coffee,
  Search,
  Plus,
  SlidersHorizontal,
  Sparkles,
  Layers,
  Star,
  RefreshCw,
  Eye,
  Filter,
  Flame,
  Globe,
  Tag,
  BookOpen,
  Award,
  Settings,
  Languages,
} from 'lucide-react';

const STORAGE_KEY = 'coffee_id_ktp_cards_v1';
const VIEW_MODE_KEY = 'coffee_id_view_mode_v1';
const LANG_STORAGE_KEY = 'coffee_id_lang_v1';

export default function App() {
  // Dual language state with local persistence
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === 'id' || saved === 'en') return saved;
    } catch (e) {
      console.error('Failed to load lang:', e);
    }
    return 'id';
  });

  useEffect(() => {
    try {
      localStorage.setItem(LANG_STORAGE_KEY, lang);
    } catch (e) {
      console.error('Failed to save lang:', e);
    }
  }, [lang]);

  const t = TRANSLATIONS[lang];

  // Coffee library state with local persistence
  const [coffees, setCoffees] = useState<CoffeeCardItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Failed to load coffees from localStorage:', e);
    }
    return INITIAL_COFFEE_CARDS;
  });

  // Save to localStorage whenever coffees change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(coffees));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, [coffees]);

  // View Mode: 'casual' | 'beginner' | 'enthusiast' (persisted in settings)
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    try {
      const saved = localStorage.getItem(VIEW_MODE_KEY);
      if (saved === 'casual' || saved === 'beginner' || saved === 'enthusiast') {
        return saved;
      }
    } catch (e) {
      console.error('Failed to load viewMode:', e);
    }
    return 'enthusiast';
  });

  // Save viewMode preference
  useEffect(() => {
    try {
      localStorage.setItem(VIEW_MODE_KEY, viewMode);
    } catch (e) {
      console.error('Failed to save viewMode:', e);
    }
  }, [viewMode]);

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterRoast, setFilterRoast] = useState<string>('all');
  const [filterProcess, setFilterProcess] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [groupBy, setGroupBy] = useState<'none' | 'origin' | 'process' | 'roast'>('none');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedCoffee, setSelectedCoffee] = useState<CoffeeCardItem | null>(null);

  // Backup data as JSON
  const handleExportJson = () => {
    try {
      const dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(coffees, null, 2));
      const downloadAnchor = document.createElement('a');
      downloadAnchor.setAttribute('href', dataStr);
      downloadAnchor.setAttribute(
        'download',
        `coffee_id_backup_${new Date().toISOString().slice(0, 10)}.json`
      );
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
    } catch (err) {
      console.error('Export failed:', err);
    }
  };

  // Quick Stats
  const totalCount = coffees.length;
  const indonesianCount = coffees.filter((c) =>
    c.originCountry.toLowerCase().includes('indonesia')
  ).length;

  // Rate handler
  const handleRateCoffee = (id: string, rating: number) => {
    setCoffees((prev) =>
      prev.map((c) => (c.id === id ? { ...c, rating } : c))
    );
  };

  // Add new coffee handler
  const handleAddCoffee = (newCoffee: CoffeeCardItem) => {
    setCoffees((prev) => [newCoffee, ...prev]);
  };

  // Update existing coffee handler
  const handleUpdateCoffee = (updated: CoffeeCardItem) => {
    setCoffees((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    setSelectedCoffee(updated);
  };

  // Delete coffee handler
  const handleDeleteCoffee = (id: string) => {
    setCoffees((prev) => prev.filter((c) => c.id !== id));
  };

  // Reset to default coffee cards
  const handleResetData = () => {
    if (confirm(t.settingsResetConfirm)) {
      setCoffees(INITIAL_COFFEE_CARDS);
    }
  };

  // Filtered coffee list
  const filteredCoffees = useMemo(() => {
    return coffees.filter((item) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesRegion =
          item.region.toLowerCase().includes(q) ||
          (item.regionEn && item.regionEn.toLowerCase().includes(q)) ||
          item.originCountry.toLowerCase().includes(q);
        const matchesFlavour =
          item.flavourNotes.some((n) => n.toLowerCase().includes(q)) ||
          (item.flavourNotesEn &&
            item.flavourNotesEn.some((n) => n.toLowerCase().includes(q)));
        const matchesProcess =
          item.process.toLowerCase().includes(q) ||
          (item.processEn && item.processEn.toLowerCase().includes(q));
        const matchesKtp = item.ktpNumber?.toLowerCase().includes(q);
        const matchesCasual =
          (item.casualDescription && item.casualDescription.toLowerCase().includes(q)) ||
          (item.casualDescriptionEn &&
            item.casualDescriptionEn.toLowerCase().includes(q));

        if (
          !matchesName &&
          !matchesRegion &&
          !matchesFlavour &&
          !matchesProcess &&
          !matchesKtp &&
          !matchesCasual
        ) {
          return false;
        }
      }

      // Filter by type
      if (filterType !== 'all') {
        if (item.type !== filterType) {
          return false;
        }
      }

      // Filter by roast level
      if (filterRoast !== 'all') {
        if (item.roastLevel !== filterRoast) {
          return false;
        }
      }

      // Filter by process
      if (filterProcess !== 'all') {
        const p = item.process.toLowerCase();
        const pEn = (item.processEn || '').toLowerCase();
        const fp = filterProcess.toLowerCase();
        if (!p.includes(fp) && !pEn.includes(fp)) {
          return false;
        }
      }

      // Filter by rating
      if (minRating > 0 && item.rating < minRating) {
        return false;
      }

      return true;
    });
  }, [coffees, searchQuery, filterType, filterRoast, filterProcess, minRating]);

  // Grouped coffees
  const groupedCoffees: Record<string, CoffeeCardItem[]> = useMemo(() => {
    if (groupBy === 'none') {
      return { [lang === 'en' ? 'All Curated Coffees' : 'Semua Kopi']: filteredCoffees };
    }

    const groups: Record<string, CoffeeCardItem[]> = {};

    filteredCoffees.forEach((item) => {
      let key = lang === 'en' ? 'Others' : 'Lainnya';
      if (groupBy === 'origin') {
        key = item.originCountry;
      } else if (groupBy === 'process') {
        const p = item.process.toLowerCase();
        if (p.includes('natural'))
          key = lang === 'en' ? 'Natural Process' : 'Natural Process';
        else if (p.includes('honey'))
          key = lang === 'en' ? 'Honey Process' : 'Honey Process';
        else if (p.includes('wash'))
          key = lang === 'en' ? 'Washed Process' : 'Washed Process';
        else if (p.includes('semi wash') || p.includes('giling basah'))
          key =
            lang === 'en'
              ? 'Semi-Washed (Wet-Hulled)'
              : 'Semi Wash (Giling Basah)';
        else key = item.process;
      } else if (groupBy === 'roast') {
        key = `${item.roastLevel} Roast`;
      }

      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });

    return groups;
  }, [filteredCoffees, groupBy, lang]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F0E5C5] text-[#332B1C] font-mono-code selection:bg-[#E2F4CB] selection:text-[#332B1C]">
      {/* Offline Status Indicator */}
      <OfflineIndicator />

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#F0E5C5]/95 backdrop-blur-md border-b border-[#332B1C] no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-none border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] flex items-center justify-center font-bold text-lg">
              ☕
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-medium text-2xl text-[#332B1C] tracking-tight leading-none">
                  {t.brandTitle}
                </span>
                <span className="text-[9px] font-mono-code font-bold uppercase tracking-widest bg-[#E2F4CB] text-[#332B1C] px-2 py-0.5 rounded-full border border-[#332B1C]">
                  {t.brandBadge}
                </span>
              </div>
              <p className="text-[10px] text-[#332B1C]/75 hidden sm:block mt-0.5">
                {t.brandTagline}
              </p>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick Language Toggle Button */}
            <button
              id="btn-quick-language-toggle"
              onClick={() => setLang((prev) => (prev === 'id' ? 'en' : 'id'))}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] active:scale-95 text-[#332B1C] px-2.5 py-1.5 text-xs font-bold shadow-2xs transition"
              title={
                lang === 'id'
                  ? 'Switch language to English (Specialty Passport Mode)'
                  : 'Ganti ke Bahasa Indonesia (KTP Kopi Nusantara)'
              }
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{lang === 'id' ? '🇮🇩 ID' : '🇬🇧 EN'}</span>
            </button>

            <button
              id="btn-settings"
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] active:scale-95 text-[#332B1C] px-3 py-1.5 text-xs font-medium shadow-2xs transition"
              title={t.settingsTitle}
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.navSettings}</span>
            </button>

            <PWAInstallButton />

            <button
              id="btn-add-coffee"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#332B1C] bg-[#332B1C] hover:opacity-90 active:scale-95 text-[#F0E5C5] px-3.5 py-1.5 text-xs font-medium shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5 text-[#E2F4CB]" />
              <span className="hidden sm:inline">{t.navCreateBtn}</span>
              <span className="sm:hidden">
                {lang === 'en' ? '+ Passport' : '+ KTP'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 space-y-4">
        {/* Compact Mode Status & Settings Link (Mode selection is organized in Settings) */}
        <div className="flex items-center justify-between gap-3 px-1 py-0.5 text-xs no-print flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#332B1C]/75">
              {t.activeModeLabel}
            </span>
            <button
              id="btn-active-mode-indicator"
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-[10px] font-bold transition"
              title={
                lang === 'en'
                  ? 'Click to adjust presentation archetype in Settings'
                  : 'Klik untuk mengubah mode tampilan di Pengaturan'
              }
            >
              <span>
                {viewMode === 'casual' && `😊 ${t.modeCasualTitle}`}
                {viewMode === 'beginner' && `🌱 ${t.modeBeginnerTitle}`}
                {viewMode === 'enthusiast' && `📜 ${t.modeEnthusiastTitle}`}
              </span>
              <Settings className="w-2.5 h-2.5 ml-0.5" />
            </button>
          </div>
          <div className="text-[10px] text-[#332B1C]/70">
            {t.totalCardsSummary(totalCount, indonesianCount)}
          </div>
        </div>

        {/* SEARCH & FILTERS SECTION */}
        <section
          aria-label="Pencarian dan Filter"
          className="bg-[#F0E5C5] rounded-none border border-[#332B1C] p-3 sm:p-4 space-y-3 no-print"
        >
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#332B1C]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-14 py-2 rounded-none border border-[#332B1C] bg-[#F0E5C5] text-xs text-[#332B1C] placeholder:text-[#332B1C]/50 focus:outline-none focus:ring-1 focus:ring-[#332B1C] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#332B1C] underline hover:opacity-80"
              >
                {t.clearFilterBtn}
              </button>
            )}
          </div>

          {/* Quick Filter Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 text-xs">
            {/* Type */}
            <div>
              <label htmlFor="filter-species-select" className="block text-[9px] font-bold uppercase tracking-wider text-[#332B1C]/70 mb-1">
                {t.filterSpeciesLabel}
              </label>
              <select
                id="filter-species-select"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] px-2 py-1.5 text-[#332B1C] text-xs font-mono-code focus:outline-none focus:ring-1 focus:ring-[#332B1C] cursor-pointer"
              >
                <option value="all" className="bg-[#F0E5C5] text-[#332B1C]">{t.filterAllSpecies}</option>
                <option value="Arabika" className="bg-[#F0E5C5] text-[#332B1C]">Arabika (Arabica)</option>
                <option value="Robusta" className="bg-[#F0E5C5] text-[#332B1C]">Robusta</option>
                <option value="Liberika" className="bg-[#F0E5C5] text-[#332B1C]">Liberika (Liberica)</option>
                <option value="Excelsa" className="bg-[#F0E5C5] text-[#332B1C]">Excelsa</option>
              </select>
            </div>

            {/* Process */}
            <div>
              <label htmlFor="filter-process-select" className="block text-[9px] font-bold uppercase tracking-wider text-[#332B1C]/70 mb-1">
                {t.filterProcessLabel}
              </label>
              <select
                id="filter-process-select"
                value={filterProcess}
                onChange={(e) => setFilterProcess(e.target.value)}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] px-2 py-1.5 text-[#332B1C] text-xs font-mono-code focus:outline-none focus:ring-1 focus:ring-[#332B1C] cursor-pointer"
              >
                <option value="all" className="bg-[#F0E5C5] text-[#332B1C]">{t.filterAllProcesses}</option>
                <option value="Natural" className="bg-[#F0E5C5] text-[#332B1C]">Natural</option>
                <option value="Wash" className="bg-[#F0E5C5] text-[#332B1C]">Washed (Full / Wet)</option>
                <option value="Honey" className="bg-[#F0E5C5] text-[#332B1C]">Honey Process</option>
                <option value="Anaerobic" className="bg-[#F0E5C5] text-[#332B1C]">Anaerobic</option>
                <option value="Giling Basah" className="bg-[#F0E5C5] text-[#332B1C]">
                  {lang === 'en' ? 'Wet-Hulled (Giling Basah)' : 'Semi Wash (Giling Basah)'}
                </option>
              </select>
            </div>

            {/* Roast Level */}
            <div>
              <label htmlFor="filter-roast-select" className="block text-[9px] font-bold uppercase tracking-wider text-[#332B1C]/70 mb-1">
                {t.filterRoastLabel}
              </label>
              <select
                id="filter-roast-select"
                value={filterRoast}
                onChange={(e) => setFilterRoast(e.target.value)}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] px-2 py-1.5 text-[#332B1C] text-xs font-mono-code focus:outline-none focus:ring-1 focus:ring-[#332B1C] cursor-pointer"
              >
                <option value="all" className="bg-[#F0E5C5] text-[#332B1C]">{t.filterAllRoasts}</option>
                <option value="Light" className="bg-[#F0E5C5] text-[#332B1C]">Light Roast</option>
                <option value="Light-Medium" className="bg-[#F0E5C5] text-[#332B1C]">Light-Medium</option>
                <option value="Medium" className="bg-[#F0E5C5] text-[#332B1C]">Medium Roast</option>
                <option value="Medium-Dark" className="bg-[#F0E5C5] text-[#332B1C]">Medium-Dark</option>
                <option value="Dark" className="bg-[#F0E5C5] text-[#332B1C]">Dark Roast</option>
              </select>
            </div>

            {/* Minimum Rating */}
            <div>
              <label htmlFor="filter-rating-select" className="block text-[9px] font-bold uppercase tracking-wider text-[#332B1C]/70 mb-1">
                {t.filterRatingLabel}
              </label>
              <select
                id="filter-rating-select"
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] px-2 py-1.5 text-[#332B1C] text-xs font-mono-code focus:outline-none focus:ring-1 focus:ring-[#332B1C] cursor-pointer"
              >
                <option value={0} className="bg-[#F0E5C5] text-[#332B1C]">{t.filterAllRatings}</option>
                <option value={5} className="bg-[#F0E5C5] text-[#332B1C]">★★★★★ (5 {lang === 'en' ? 'Stars' : 'Bintang'})</option>
                <option value={4} className="bg-[#F0E5C5] text-[#332B1C]">★★★★☆ (4+ {lang === 'en' ? 'Stars' : 'Bintang'})</option>
                <option value={3} className="bg-[#F0E5C5] text-[#332B1C]">★★★☆☆ (3+ {lang === 'en' ? 'Stars' : 'Bintang'})</option>
              </select>
            </div>

            {/* Group By Selector */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-1">
              <label htmlFor="filter-groupby-select" className="block text-[9px] font-bold uppercase tracking-wider text-[#332B1C]/70 mb-1 flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#332B1C]" /> {t.filterGroupLabel}
              </label>
              <select
                id="filter-groupby-select"
                value={groupBy}
                onChange={(e) =>
                  setGroupBy(e.target.value as 'none' | 'origin' | 'process' | 'roast')
                }
                className="w-full rounded-none border border-[#332B1C] bg-[#E2F4CB] px-2 py-1.5 text-[#332B1C] font-semibold text-xs font-mono-code focus:outline-none focus:ring-1 focus:ring-[#332B1C] cursor-pointer"
              >
                <option value="none" className="bg-[#F0E5C5] text-[#332B1C]">{t.filterGroupNone}</option>
                <option value="origin" className="bg-[#F0E5C5] text-[#332B1C]">{t.filterGroupOrigin}</option>
                <option value="process" className="bg-[#F0E5C5] text-[#332B1C]">{t.filterGroupProcess}</option>
                <option value="roast" className="bg-[#F0E5C5] text-[#332B1C]">{t.filterGroupRoast}</option>
              </select>
            </div>
          </div>

          {/* Active Filter Indicators & Reset Action */}
          {(searchQuery ||
            filterType !== 'all' ||
            filterRoast !== 'all' ||
            filterProcess !== 'all' ||
            minRating > 0 ||
            groupBy !== 'none') && (
            <div className="flex items-center justify-between pt-2 border-t border-[#332B1C]/20 text-[11px] text-[#332B1C]/80 flex-wrap gap-2">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span>{t.filterActivePrefix}</span>
                {filterType !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] text-[10px]">
                    {filterType}
                  </span>
                )}
                {filterProcess !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] text-[10px]">
                    {filterProcess}
                  </span>
                )}
                {filterRoast !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] text-[10px]">
                    {filterRoast}
                  </span>
                )}
                {minRating > 0 && (
                  <span className="px-2 py-0.5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] text-[10px]">
                    ★ {minRating}+
                  </span>
                )}
                {searchQuery && (
                  <span className="px-2 py-0.5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] text-[10px]">
                    "{searchQuery}"
                  </span>
                )}
              </div>

              <button
                onClick={() => {
                  setSearchQuery('');
                  setFilterType('all');
                  setFilterRoast('all');
                  setFilterProcess('all');
                  setMinRating(0);
                  setGroupBy('none');
                }}
                className="text-[11px] font-medium text-[#332B1C] underline hover:opacity-80"
              >
                {t.filterResetAll}
              </button>
            </div>
          )}
        </section>

        {/* COFFEE CARDS LIST & GROUPS */}
        {filteredCoffees.length === 0 ? (
          <div className="text-center py-12 px-4 rounded-none border border-[#332B1C] bg-[#F0E5C5] space-y-3">
            <div className="w-12 h-12 rounded-none border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] flex items-center justify-center text-xl mx-auto">
              🔍
            </div>
            <h3 className="text-base font-bold text-[#332B1C]">
              {t.emptyNotFoundTitle}
            </h3>
            <p className="text-xs text-[#332B1C]/70 max-w-md mx-auto">
              {t.emptyNotFoundDesc}
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
                setFilterRoast('all');
                setFilterProcess('all');
                setMinRating(0);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#332B1C] bg-[#332B1C] text-[#F0E5C5] text-xs font-medium hover:opacity-90 transition"
            >
              {t.emptyShowAllBtn}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedCoffees).map(([groupTitle, groupItems]) => (
              <section key={groupTitle} className="space-y-3">
                {groupBy !== 'none' && (
                  <div className="flex items-center gap-2 pb-1 border-b border-[#332B1C]">
                    <span className="w-2 h-2 rounded-full bg-[#332B1C]" />
                    <h3 className="text-lg font-medium uppercase tracking-tight text-[#332B1C] font-display">
                      {groupTitle}
                    </h3>
                    <span className="text-xs text-[#332B1C]/70 font-mono-code">
                      ({groupItems.length} {lang === 'en' ? 'passports' : 'kartu'})
                    </span>
                  </div>
                )}

                {/* Grid of cards according to active View Mode */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupItems.map((coffee) => {
                    if (viewMode === 'casual') {
                      return (
                        <CasualCoffeeCard
                          key={coffee.id}
                          coffee={coffee}
                          onRate={handleRateCoffee}
                          onSelect={setSelectedCoffee}
                          lang={lang}
                        />
                      );
                    } else if (viewMode === 'beginner') {
                      return (
                        <BeginnerCoffeeCard
                          key={coffee.id}
                          coffee={coffee}
                          onRate={handleRateCoffee}
                          onSelect={setSelectedCoffee}
                          lang={lang}
                        />
                      );
                    } else {
                      return (
                        <EnthusiastCoffeeCard
                          key={coffee.id}
                          coffee={coffee}
                          onRate={handleRateCoffee}
                          onSelect={setSelectedCoffee}
                          lang={lang}
                        />
                      );
                    }
                  })}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-[#332B1C] bg-[#F0E5C5] py-4 text-center text-xs text-[#332B1C] no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="font-bold">Coffee ID ({t.brandBadge})</span>
            <span>•</span>
            <span>
              {lang === 'en'
                ? 'Progressive Web App Offline-Ready'
                : 'Progressive Web App Offline-Ready'}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="text-[#332B1C] hover:underline transition flex items-center gap-1 font-medium"
              title={t.settingsTitle}
            >
              <Settings className="w-3 h-3" />
              <span>{t.navSettings}</span>
            </button>
            <span>•</span>
            <button
              onClick={handleResetData}
              className="text-[#332B1C] hover:underline transition flex items-center gap-1"
              title={t.settingsResetBtn}
            >
              <RefreshCw className="w-3 h-3" />
              <span>{t.footerResetBtn}</span>
            </button>
            <span>•</span>
            <span>
              {lang === 'en'
                ? 'Powered by Gemini 2.5 Flash AI'
                : 'Ditenagai Gemini 2.5 Flash AI'}
            </span>
          </div>
        </div>
      </footer>

      {/* Add Coffee Modal with Smart AI Auto-Complete */}
      <AddCoffeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCoffee}
        lang={lang}
      />

      {/* Coffee Detail / Inspection Modal with Export & Tasting Notes */}
      <CoffeeDetailModal
        coffee={selectedCoffee}
        isOpen={Boolean(selectedCoffee)}
        onClose={() => setSelectedCoffee(null)}
        onUpdate={handleUpdateCoffee}
        onDelete={handleDeleteCoffee}
        initialMode={viewMode}
        lang={lang}
      />

      {/* Settings Modal (Mode Tampilan, Dual Language, Backup, & Pengaturan Tambahan) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCards={totalCount}
        indonesianCards={indonesianCount}
        onResetData={handleResetData}
        onExportJson={handleExportJson}
        lang={lang}
        onLanguageChange={setLang}
      />
    </div>
  );
}
