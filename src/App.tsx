import React, { useState, useEffect, useMemo } from 'react';
import {
  CoffeeCardItem,
  ViewMode,
  CoffeeType,
  RoastLevel,
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
} from 'lucide-react';

const STORAGE_KEY = 'coffee_id_ktp_cards_v1';
const VIEW_MODE_KEY = 'coffee_id_view_mode_v1';

export default function App() {
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
    if (confirm('Kembalikan data ke contoh awal identitas kopi?')) {
      setCoffees(INITIAL_COFFEE_CARDS);
    }
  };

  // Filtered coffee list
  const filteredCoffees = useMemo(() => {
    return coffees.filter((item) => {
      // Search query matches name, region, origin, flavour notes, varietal, process
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesRegion = item.region.toLowerCase().includes(q);
        const matchesOrigin = item.originCountry.toLowerCase().includes(q);
        const matchesProcess = item.process.toLowerCase().includes(q);
        const matchesVarietal = (item.varietal || '').toLowerCase().includes(q);
        const matchesNotes = item.flavourNotes.some((n) =>
          n.toLowerCase().includes(q)
        );
        const matchesGeneral = (item.generalCharacter || '')
          .toLowerCase()
          .includes(q);

        if (
          !matchesName &&
          !matchesRegion &&
          !matchesOrigin &&
          !matchesProcess &&
          !matchesVarietal &&
          !matchesNotes &&
          !matchesGeneral
        ) {
          return false;
        }
      }

      // Filter by type
      if (filterType !== 'all' && item.type !== filterType) {
        return false;
      }

      // Filter by roast
      if (filterRoast !== 'all' && item.roastLevel !== filterRoast) {
        return false;
      }

      // Filter by process
      if (filterProcess !== 'all') {
        if (!item.process.toLowerCase().includes(filterProcess.toLowerCase())) {
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
      return { 'Semua Kopi': filteredCoffees };
    }

    const groups: Record<string, CoffeeCardItem[]> = {};

    filteredCoffees.forEach((item) => {
      let key = 'Lainnya';
      if (groupBy === 'origin') {
        key = item.originCountry;
      } else if (groupBy === 'process') {
        const p = item.process.toLowerCase();
        if (p.includes('natural')) key = 'Natural Process';
        else if (p.includes('honey')) key = 'Honey Process';
        else if (p.includes('wash')) key = 'Washed Process';
        else if (p.includes('semi wash') || p.includes('giling basah'))
          key = 'Semi Wash (Giling Basah)';
        else key = item.process;
      } else if (groupBy === 'roast') {
        key = `${item.roastLevel} Roast`;
      }

      if (!groups[key]) groups[key] = [];
      groups[key].push(item);
    });

    return groups;
  }, [filteredCoffees, groupBy]);

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
                  Coffee ID
                </span>
                <span className="text-[9px] font-mono-code font-bold uppercase tracking-widest bg-[#E2F4CB] text-[#332B1C] px-2 py-0.5 rounded-full border border-[#332B1C]">
                  KTP KOPI
                </span>
              </div>
              <p className="text-[10px] text-[#332B1C]/75 hidden sm:block mt-0.5">
                Paspor &amp; Identitas Rasa Kopi Nusantara dan Dunia
              </p>
            </div>
          </div>

          {/* Right Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="btn-settings"
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] active:scale-95 text-[#332B1C] px-3 py-1.5 text-xs font-medium shadow-2xs transition"
              title="Buka Pengaturan"
            >
              <Settings className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Pengaturan</span>
            </button>

            <PWAInstallButton />

            <button
              id="btn-add-coffee"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-full border border-[#332B1C] bg-[#332B1C] hover:opacity-90 active:scale-95 text-[#F0E5C5] px-3.5 py-1.5 text-xs font-medium shadow-xs transition"
            >
              <Plus className="w-3.5 h-3.5 text-[#E2F4CB]" />
              <span className="hidden sm:inline">Buat KTP Kopi Baru</span>
              <span className="sm:hidden">+ KTP</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-5 space-y-4">
        {/* Compact Mode Status & Settings Link */}
        <div className="flex items-center justify-between gap-3 px-1 py-0.5 text-xs no-print flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#332B1C]/75">Mode Tampilan:</span>
            <button
              id="btn-active-mode-indicator"
              onClick={() => setIsSettingsOpen(true)}
              className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-[10px] font-bold transition"
              title="Klik untuk mengubah mode tampilan di Pengaturan"
            >
              <span>
                {viewMode === 'casual' && '😊 Casual (Orang Biasa)'}
                {viewMode === 'beginner' && '🌱 Beginner (Pemula)'}
                {viewMode === 'enthusiast' && '📜 Enthusiast (KTP Kopi)'}
              </span>
              <Settings className="w-2.5 h-2.5 ml-0.5" />
            </button>
          </div>
          <div className="text-[10px] text-[#332B1C]/70">
            Total: {totalCount} Kartu ({indonesianCount} Nusantara)
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
              placeholder="Cari kopi, daerah (Gayo, Puntang, Toraja), aroma rasa (nangka, peach, melati), atau proses..."
              className="w-full pl-9 pr-14 py-2 rounded-none border border-[#332B1C] bg-[#F0E5C5] text-xs text-[#332B1C] placeholder:text-[#332B1C]/50 focus:outline-none focus:ring-1 focus:ring-[#332B1C] transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#332B1C] underline hover:opacity-80"
              >
                Hapus
              </button>
            )}
          </div>

          {/* Quick Filter Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2 text-xs">
            {/* Type */}
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#332B1C]/70 mb-1">
                Spesies
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] px-2 py-1.5 text-[#332B1C] text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              >
                <option value="all">Semua Spesies</option>
                <option value="Arabika">Arabika</option>
                <option value="Robusta">Robusta</option>
                <option value="Liberika">Liberika</option>
                <option value="Excelsa">Excelsa</option>
              </select>
            </div>

            {/* Process */}
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#332B1C]/70 mb-1">
                Metode Proses
              </label>
              <select
                value={filterProcess}
                onChange={(e) => setFilterProcess(e.target.value)}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] px-2 py-1.5 text-[#332B1C] text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              >
                <option value="all">Semua Proses</option>
                <option value="Natural">Natural</option>
                <option value="Wash">Wash (Full / Wet)</option>
                <option value="Honey">Honey</option>
                <option value="Anaerobic">Anaerobic</option>
                <option value="Giling Basah">Semi Wash (Giling Basah)</option>
              </select>
            </div>

            {/* Roast Level */}
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#332B1C]/70 mb-1">
                Tingkat Sangrai
              </label>
              <select
                value={filterRoast}
                onChange={(e) => setFilterRoast(e.target.value)}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] px-2 py-1.5 text-[#332B1C] text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              >
                <option value="all">Semua Sangrai</option>
                <option value="Light">Light</option>
                <option value="Light-Medium">Light-Medium</option>
                <option value="Medium">Medium</option>
                <option value="Medium-Dark">Medium-Dark</option>
                <option value="Dark">Dark</option>
              </select>
            </div>

            {/* Minimum Rating */}
            <div>
              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#332B1C]/70 mb-1">
                Rating Minimal
              </label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full rounded-none border border-[#332B1C] bg-[#F0E5C5] px-2 py-1.5 text-[#332B1C] text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              >
                <option value={0}>Semua Rating</option>
                <option value={5}>★★★★★ (Bintang 5)</option>
                <option value={4}>★★★★☆ (Bintang 4+)</option>
                <option value={3}>★★★☆☆ (Bintang 3+)</option>
              </select>
            </div>

            {/* Group By Selector */}
            <div className="col-span-2 sm:col-span-4 lg:col-span-1">
              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#332B1C]/70 mb-1 flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#332B1C]" /> Kelompokkan
              </label>
              <select
                value={groupBy}
                onChange={(e) =>
                  setGroupBy(e.target.value as 'none' | 'origin' | 'process' | 'roast')
                }
                className="w-full rounded-none border border-[#332B1C] bg-[#E2F4CB] px-2 py-1.5 text-[#332B1C] font-semibold text-xs focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              >
                <option value="none">Tanpa Kelompok</option>
                <option value="origin">Asal (Negara)</option>
                <option value="process">Metode Proses</option>
                <option value="roast">Tingkat Sangrai</option>
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
                <span>Filter aktif: </span>
                {filterType !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] text-[10px]">
                    {filterType}
                  </span>
                )}
                {filterProcess !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] text-[10px]">
                    Proses: {filterProcess}
                  </span>
                )}
                {filterRoast !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] text-[10px]">
                    Roast: {filterRoast}
                  </span>
                )}
                {minRating > 0 && (
                  <span className="px-2 py-0.5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] text-[10px]">
                    Rating ≥ {minRating}★
                  </span>
                )}
                {groupBy !== 'none' && (
                  <span className="px-2 py-0.5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] text-[10px]">
                    Group: {groupBy}
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
                className="text-[#332B1C] underline font-medium hover:opacity-80"
              >
                Reset Semua Filter
              </button>
            </div>
          )}
        </section>

        {/* CARDS DISPLAY SECTION (GROUPED OR REGULAR) */}
        {filteredCoffees.length === 0 ? (
          <div className="text-center py-14 px-4 bg-[#F0E5C5] rounded-none border border-[#332B1C]">
            <div className="w-12 h-12 mx-auto rounded-none border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] flex items-center justify-center text-xl mb-3">
              ☕
            </div>
            <h3 className="text-xl font-medium text-[#332B1C] font-display">
              Tidak Ada Kopi yang Cocok
            </h3>
            <p className="text-xs text-[#332B1C]/75 mt-1 max-w-sm mx-auto leading-relaxed">
              Coba ubah kata kunci pencarian atau sesuaikan filter di atas untuk menemukan kartu kopi Anda.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterType('all');
                setFilterRoast('all');
                setFilterProcess('all');
                setMinRating(0);
              }}
              className="mt-4 px-4 py-1.5 text-xs font-medium rounded-full border border-[#332B1C] bg-[#332B1C] text-[#F0E5C5] hover:opacity-90 transition"
            >
              Tampilkan Semua Kopi
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
                      ({groupItems.length} kartu)
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
                        />
                      );
                    } else if (viewMode === 'beginner') {
                      return (
                        <BeginnerCoffeeCard
                          key={coffee.id}
                          coffee={coffee}
                          onRate={handleRateCoffee}
                          onSelect={setSelectedCoffee}
                        />
                      );
                    } else {
                      return (
                        <EnthusiastCoffeeCard
                          key={coffee.id}
                          coffee={coffee}
                          onRate={handleRateCoffee}
                          onSelect={setSelectedCoffee}
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
            <span className="font-bold">Coffee ID (KTP Kopi)</span>
            <span>•</span>
            <span>Progressive Web App Offline-Ready</span>
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="text-[#332B1C] hover:underline transition flex items-center gap-1 font-medium"
              title="Buka Pengaturan"
            >
              <Settings className="w-3 h-3" />
              <span>Pengaturan</span>
            </button>
            <span>•</span>
            <button
              onClick={handleResetData}
              className="text-[#332B1C] hover:underline transition flex items-center gap-1"
              title="Kembalikan kartu bawaan"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Data Sampel</span>
            </button>
            <span>•</span>
            <span>Ditenagai Gemini 3.8 Flash AI</span>
          </div>
        </div>
      </footer>

      {/* Add Coffee Modal with Smart AI Auto-Complete */}
      <AddCoffeeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleAddCoffee}
      />

      {/* Coffee Detail / Inspection Modal with Export & Tasting Notes */}
      <CoffeeDetailModal
        coffee={selectedCoffee}
        isOpen={Boolean(selectedCoffee)}
        onClose={() => setSelectedCoffee(null)}
        onUpdate={handleUpdateCoffee}
        onDelete={handleDeleteCoffee}
        initialMode={viewMode}
      />
      {/* Settings Modal (Mode Tampilan, Backup, & Pengaturan Tambahan) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        totalCards={totalCount}
        indonesianCards={indonesianCount}
        onResetData={handleResetData}
        onExportJson={handleExportJson}
      />
    </div>
  );
}
