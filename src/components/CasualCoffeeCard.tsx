import React, { useState } from 'react';
import { CoffeeCardItem } from '../types';
import { RatingStars } from './RatingStars';
import { exportCardAsImage, exportCardAsPDF, exportCardAsTXT } from '../utils/exportCard';
import {
  Sparkles,
  Download,
  FileText,
  FileCode,
  Image as ImageIcon,
  Heart,
  Coffee,
  Sun,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface CasualCoffeeCardProps {
  coffee: CoffeeCardItem;
  onRate: (id: string, rating: number) => void;
  onSelect: (coffee: CoffeeCardItem) => void;
}

export const CasualCoffeeCard: React.FC<CasualCoffeeCardProps> = ({
  coffee,
  onRate,
  onSelect,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const cardId = `casual-card-${coffee.id}`;

  const handleExport = async (format: 'png' | 'jpeg' | 'pdf' | 'txt') => {
    setIsExporting(true);
    setShowExportMenu(false);
    if (format === 'pdf') {
      await exportCardAsPDF(cardId, `${coffee.name}_Casual`, coffee, 'casual');
    } else if (format === 'txt') {
      exportCardAsTXT(`${coffee.name}_Casual`, coffee, 'casual');
    } else {
      await exportCardAsImage(cardId, `${coffee.name}_Casual`, format);
    }
    setIsExporting(false);
  };

  return (
    <div
      id={cardId}
      className="group relative card-shell flex flex-col justify-between"
    >
      <div className="card-surface flex-1 flex flex-col justify-between">
        <div>
          {/* Top Banner Tag */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-normal uppercase tracking-wider bg-[#E2F4CB] text-[#332B1C] border border-[#332B1C]">
              <Coffee className="w-3 h-3 text-[#332B1C]" />
              <span>{coffee.originCountry} • {coffee.type}</span>
            </span>

            {/* Rating */}
            <div className="flex items-center gap-1 bg-[#F0E5C5] px-2 py-0.5 rounded-full border border-[#332B1C]">
              <RatingStars
                value={coffee.rating}
                onChange={(newRating) => onRate(coffee.id, newRating)}
                size="sm"
              />
            </div>
          </div>

          {/* Coffee Title */}
          <h3
            onClick={() => onSelect(coffee)}
            className="text-2xl font-medium text-[#332B1C] font-display cursor-pointer hover:opacity-80 transition tracking-tight leading-tight"
          >
            {coffee.name}
          </h3>
          <p className="text-[11px] font-mono-code text-[#332B1C]/70 mt-0.5 uppercase tracking-wide">
            {coffee.region}
          </p>

          {/* Casual Description Quote Box */}
          <div className="mt-3 p-2.5 rounded-none bg-[#F0E5C5] border border-[#332B1C] relative">
            <div className="text-[10px] font-mono-code uppercase tracking-wider text-[#332B1C] mb-1 flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-[#332B1C]" />
              <span>Kesan Rasa Utama:</span>
            </div>
            <p className="text-xs font-mono-code text-[#332B1C] leading-normal font-light">
              "{coffee.casualDescription || coffee.generalCharacter}"
            </p>
          </div>

          {/* Visual Flavour Chips */}
          <div className="mt-3">
            <p className="text-[10px] font-mono-code font-medium text-[#332B1C]/70 uppercase tracking-wider mb-1.5">
              Nuansa Rasa yang Terasa:
            </p>
            <div className="flex flex-wrap gap-1">
              {coffee.flavourNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono-code font-light bg-[#F0E5C5] text-[#332B1C] border border-[#332B1C]"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#332B1C]" />
                  {note}
                </span>
              ))}
            </div>
          </div>

          {/* Best Way to Drink */}
          <div className="mt-3 pt-2 border-t border-[#332B1C]/30 flex items-start gap-1.5 text-[11px] font-mono-code text-[#332B1C]">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#332B1C] shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Saran Minum: </span>
              <span className="font-light">{coffee.bestWayToDrink || 'Enak diseduh hangat santai'}</span>
            </div>
          </div>

          {/* Caffeine & Vibe Feel */}
          <div className="mt-2 flex items-center justify-between text-[11px] font-mono-code text-[#332B1C]/80">
            <span>Efek Kafein:</span>
            <span className="font-normal px-2 py-0.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] text-[10px]">
              {coffee.caffeineFeel || 'Sedang & Pas'}
            </span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-3 pt-2 border-t border-[#332B1C] flex items-center justify-between gap-2 no-print">
          <button
            onClick={() => onSelect(coffee)}
            className="text-[11px] font-mono-code font-medium text-[#332B1C] hover:underline transition"
          >
            Lihat Selengkapnya →
          </button>

          {/* Export dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-[10px] font-mono-code transition"
              title="Ekspor kartu ini"
            >
              <Download className="w-3 h-3" />
              <span>{isExporting ? '...' : 'Ekspor'}</span>
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
                  <span>Dokumen (PDF)</span>
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
  );
};
