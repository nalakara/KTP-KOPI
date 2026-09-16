import React, { useState } from 'react';
import { CoffeeCardItem } from '../types';
import { RatingStars } from './RatingStars';
import { RoastLevelBadge } from './RoastLevelBadge';
import { SensoryBar } from './SensoryBar';
import { exportCardAsImage, exportCardAsPDF, exportCardAsTXT } from '../utils/exportCard';
import {
  Download,
  FileText,
  FileCode,
  Image as ImageIcon,
  Award,
  Compass,
  Mountain,
  Dna,
  ShieldCheck,
  Timer,
  Thermometer,
  Scale,
  Sparkles,
} from 'lucide-react';

interface EnthusiastCoffeeCardProps {
  coffee: CoffeeCardItem;
  onRate: (id: string, rating: number) => void;
  onSelect: (coffee: CoffeeCardItem) => void;
}

export const EnthusiastCoffeeCard: React.FC<EnthusiastCoffeeCardProps> = ({
  coffee,
  onRate,
  onSelect,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const cardId = `ktp-card-${coffee.id}`;

  const handleExport = async (format: 'png' | 'jpeg' | 'pdf' | 'txt') => {
    setIsExporting(true);
    setShowExportMenu(false);
    if (format === 'pdf') {
      await exportCardAsPDF(cardId, `${coffee.name}_KTP_Kopi_Enthusiast`, coffee, 'enthusiast');
    } else if (format === 'txt') {
      exportCardAsTXT(`${coffee.name}_KTP_Kopi_Enthusiast`, coffee, 'enthusiast');
    } else {
      await exportCardAsImage(cardId, `${coffee.name}_KTP_Kopi_Enthusiast`, format);
    }
    setIsExporting(false);
  };

  return (
    <div
      id={cardId}
      className="group relative card-shell flex flex-col justify-between"
    >
      <div className="card-surface flex-1 flex flex-col justify-between !p-0 overflow-hidden">
        {/* Official Top Header Banner (KTP Style) */}
        <div className="bg-[#332B1C] p-3 text-[#F0E5C5] border-b border-[#332B1C]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#F0E5C5]/10 border border-[#F0E5C5]/40 flex items-center justify-center font-bold text-xs text-[#E2F4CB]">
                ☕
              </div>
              <div>
                <h4 className="text-[11px] uppercase tracking-wider font-display font-medium text-[#E2F4CB] leading-tight">
                  REPUBLIK KOPI INDONESIA
                </h4>
                <p className="text-[9px] uppercase tracking-wide text-[#F0E5C5]/75 font-mono-code leading-tight">
                  KARTU TANDA PENGENAL KOPI
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-mono-code block text-[#F0E5C5]/70 uppercase">
                NO. KTP
              </span>
              <span className="font-mono-code text-[11px] font-normal tracking-wider text-[#F0E5C5]">
                {coffee.ktpNumber || 'ID-SPEC-001'}
              </span>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-2.5 relative z-10 space-y-3 flex-1 flex flex-col justify-between bg-[#F0E5C5]">
          <div>
            {/* Title, Origin & SCA Cup Score Badge */}
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-0.5">
                <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-mono-code font-normal uppercase tracking-wider bg-[#E2F4CB] text-[#332B1C] border border-[#332B1C]">
                  {coffee.type} • {coffee.originCountry}
                </span>
                <h3
                  onClick={() => onSelect(coffee)}
                  className="text-2xl font-medium text-[#332B1C] font-display cursor-pointer hover:opacity-80 transition tracking-tight leading-tight pt-0.5"
                >
                  {coffee.name}
                </h3>
                <p className="text-[11px] text-[#332B1C]/75 flex items-center gap-1 font-mono-code">
                  <Compass className="w-3 h-3 text-[#332B1C]" />
                  <span>{coffee.region}</span>
                </p>
              </div>

              {/* SCA Score Badge */}
              {coffee.scaScore && (
                <div className="shrink-0 text-center px-2 py-1 rounded-none bg-[#E2F4CB] border border-[#332B1C]">
                  <div className="flex items-center justify-center text-[#332B1C] mb-0.5">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span className="block text-sm font-semibold font-mono-code text-[#332B1C] leading-none">
                    {coffee.scaScore.toFixed(2)}
                  </span>
                  <span className="text-[8px] font-mono-code uppercase tracking-wider text-[#332B1C] block mt-0.5">
                    SCA SCORE
                  </span>
                </div>
              )}
            </div>

            {/* Micro-Lot Spec Grid (Table Style) */}
            <div className="mt-2.5 border border-[#332B1C] bg-[#F0E5C5] divide-y divide-[#332B1C] text-[11px] font-mono-code">
              <div className="grid grid-cols-2 divide-x divide-[#332B1C] p-2">
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#332B1C]/70 block flex items-center gap-1">
                    <Mountain className="w-2.5 h-2.5" /> Altitude
                  </span>
                  <p className="font-normal text-[#332B1C]">
                    {coffee.altitudeRange}
                  </p>
                </div>
                <div className="pl-2 space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#332B1C]/70 block flex items-center gap-1">
                    <Dna className="w-2.5 h-2.5" /> Varietal
                  </span>
                  <p className="font-normal text-[#332B1C] truncate" title={coffee.varietal}>
                    {coffee.varietal || 'Heirloom / Typica'}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-[#332B1C] p-2">
                <div className="space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#332B1C]/70 block">
                    Proses Pasca Panen
                  </span>
                  <p className="font-normal text-[#332B1C]">
                    {coffee.process}
                  </p>
                </div>
                <div className="pl-2 space-y-0.5">
                  <span className="text-[9px] uppercase tracking-wider text-[#332B1C]/70 block">
                    Tingkat Sangrai
                  </span>
                  <RoastLevelBadge level={coffee.roastLevel} />
                </div>
              </div>

              {(coffee.producer || coffee.roaster) && (
                <div className="grid grid-cols-2 divide-x divide-[#332B1C] p-2">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-[#332B1C]/70 block">
                      Produser / Farm
                    </span>
                    <p className="font-normal text-[#332B1C] truncate" title={coffee.producer}>
                      {coffee.producer || '-'}
                    </p>
                  </div>
                  <div className="pl-2 space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-[#332B1C]/70 block">
                      Roastery / Crop
                    </span>
                    <p className="font-normal text-[#332B1C] truncate">
                      {coffee.roaster || 'Specialty Roaster'} {coffee.harvestYear ? `(${coffee.harvestYear})` : ''}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Flavour Matrix Notes */}
            <div className="mt-2.5">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] font-mono-code uppercase tracking-wider text-[#332B1C]/70 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5 text-[#332B1C]" /> Cupping Flavour Profile
                </span>
                <div className="flex items-center gap-1">
                  <RatingStars
                    value={coffee.rating}
                    onChange={(newRating) => onRate(coffee.id, newRating)}
                    size="sm"
                  />
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {coffee.flavourNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="px-2 py-0.5 rounded-full text-[10px] font-mono-code font-light bg-[#332B1C] text-[#F0E5C5] border border-[#332B1C]"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Dial-in Brew Parameters (Barista Recipe) */}
            {coffee.brewRecipe && (
              <div className="mt-2.5 p-2 border border-[#332B1C] bg-[#F0E5C5] space-y-1.5 font-mono-code">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-medium text-[#332B1C] flex items-center gap-1">
                    <Timer className="w-3 h-3 text-[#332B1C]" /> Dial-in Recipe
                  </span>
                  <span className="text-[10px] text-[#332B1C]/80">
                    {coffee.recommendedBrew?.[0] || 'Filter V60'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 text-[10px] text-[#332B1C] text-center pt-1 border-t border-[#332B1C]/30">
                  <div className="p-1 border border-[#332B1C] bg-[#F0E5C5]">
                    <span className="text-[8px] uppercase text-[#332B1C]/70 block">Rasio</span>
                    <span className="font-medium text-[#332B1C]">{coffee.brewRecipe.ratio}</span>
                  </div>
                  <div className="p-1 border border-[#332B1C] bg-[#F0E5C5]">
                    <span className="text-[8px] uppercase text-[#332B1C]/70 block">Suhu Air</span>
                    <span className="font-medium text-[#332B1C]">{coffee.brewRecipe.temperature}</span>
                  </div>
                  <div className="p-1 border border-[#332B1C] bg-[#F0E5C5]">
                    <span className="text-[8px] uppercase text-[#332B1C]/70 block">Waktu</span>
                    <span className="font-medium text-[#332B1C]">{coffee.brewRecipe.time}</span>
                  </div>
                </div>
                {coffee.brewRecipe.note && (
                  <p className="text-[10px] text-[#332B1C]/80 italic mt-0.5">
                    💡 {coffee.brewRecipe.note}
                  </p>
                )}
              </div>
            )}

            {/* Sensory Scales */}
            <div className="grid grid-cols-3 gap-2 pt-2">
              <SensoryBar label="Acidity" value={coffee.acidity} />
              <SensoryBar label="Body" value={coffee.body} />
              <SensoryBar label="Sweetness" value={coffee.sweetness} />
            </div>
          </div>

          {/* Official Bottom Bar */}
          <div className="pt-2 border-t border-[#332B1C] flex items-center justify-between gap-2 no-print">
            <div className="flex items-center gap-1 text-[10px] font-mono-code text-[#332B1C] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#332B1C]" />
              <span>VERIFIED SPECIALTY IDENTITY</span>
            </div>

            {/* Export dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowExportMenu(!showExportMenu)}
                disabled={isExporting}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-[10px] font-mono-code transition"
              >
                <Download className="w-3 h-3 text-[#332B1C]" />
                <span>{isExporting ? '...' : 'Ekspor KTP'}</span>
              </button>

              {showExportMenu && (
                <div className="absolute right-0 bottom-full mb-1 w-44 rounded-none bg-[#F0E5C5] p-1 border border-[#332B1C] shadow-lg z-20 space-y-1 font-mono-code">
                  <button
                    onClick={() => handleExport('png')}
                    className="w-full flex items-center gap-2 px-2 py-1 text-[11px] text-left text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] transition"
                  >
                    <ImageIcon className="w-3 h-3" />
                    <span>Gambar (PNG)</span>
                  </button>
                  <button
                    onClick={() => handleExport('pdf')}
                    className="w-full flex items-center gap-2 px-2 py-1 text-[11px] text-left text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] transition"
                  >
                    <FileText className="w-3 h-3" />
                    <span>Paspor KTP (PDF)</span>
                  </button>
                  <button
                    onClick={() => handleExport('txt')}
                    className="w-full flex items-center gap-2 px-2 py-1 text-[11px] text-left text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] transition"
                  >
                    <FileCode className="w-3 h-3" />
                    <span>Teks Kopi (TXT)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
