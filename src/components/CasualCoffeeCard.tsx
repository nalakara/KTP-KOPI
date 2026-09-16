import React, { useState } from 'react';
import { CoffeeCardItem, Language } from '../types';
import { RatingStars } from './RatingStars';
import { exportCardAsImage, exportCardAsPDF, exportCardAsTXT } from '../utils/exportCard';
import { getLocalizedCoffee } from '../utils/cardLocalization';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Sparkles,
  Download,
  FileText,
  FileCode,
  Image as ImageIcon,
  Coffee,
  CheckCircle2,
  Globe2,
} from 'lucide-react';

interface CasualCoffeeCardProps {
  coffee: CoffeeCardItem;
  onRate: (id: string, rating: number) => void;
  onSelect: (coffee: CoffeeCardItem) => void;
  lang?: Language;
}

export const CasualCoffeeCard: React.FC<CasualCoffeeCardProps> = ({
  coffee,
  onRate,
  onSelect,
  lang = 'id',
}) => {
  const currentLang: Language = lang as Language;
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const cardId = `casual-card-${coffee.id}`;

  const t = TRANSLATIONS[currentLang];
  const item = getLocalizedCoffee(coffee, currentLang);

  const handleExport = async (format: 'png' | 'jpeg' | 'pdf' | 'txt') => {
    setIsExporting(true);
    setShowExportMenu(false);
    if (format === 'pdf') {
      await exportCardAsPDF(cardId, `${item.name}_Casual`, coffee, 'casual', currentLang);
    } else if (format === 'txt') {
      exportCardAsTXT(`${item.name}_Casual`, coffee, 'casual', currentLang);
    } else {
      await exportCardAsImage(cardId, `${item.name}_Casual`, format);
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
          {/* Top Banner Tag & Origin Styling */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono-code font-normal uppercase tracking-wider bg-[#E2F4CB] text-[#332B1C] border border-[#332B1C]">
              {lang === 'en' ? (
                <Globe2 className="w-3 h-3 text-[#332B1C]" />
              ) : (
                <Coffee className="w-3 h-3 text-[#332B1C]" />
              )}
              <span>
                {item.originCountry} • {item.typeFormatted}
              </span>
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
            {item.name}
          </h3>
          <p className="text-[11px] font-mono-code text-[#332B1C]/70 mt-0.5 uppercase tracking-wide flex items-center justify-between">
            <span>{item.region}</span>
            {lang === 'en' && (
              <span className="text-[9px] text-[#332B1C]/60 tracking-normal lowercase italic font-mono-code">
                everyday sipper
              </span>
            )}
          </p>

          {/* Casual Description Quote Box */}
          <div className="mt-3 p-2.5 rounded-none bg-[#F0E5C5] border border-[#332B1C] relative">
            <div className="text-[10px] font-mono-code uppercase tracking-wider text-[#332B1C] mb-1 flex items-center gap-1 font-medium">
              <Sparkles className="w-3 h-3 text-[#332B1C]" />
              <span>{t.casualImpressionLabel}</span>
            </div>
            <p className="text-xs font-mono-code text-[#332B1C] leading-normal font-light">
              "{item.casualDescription || item.generalCharacter}"
            </p>
          </div>

          {/* Visual Flavour Chips */}
          <div className="mt-3">
            <p className="text-[10px] font-mono-code font-medium text-[#332B1C]/70 uppercase tracking-wider mb-1.5">
              {t.flavourNotesLabel}
            </p>
            <div className="flex flex-wrap gap-1">
              {item.flavourNotes.map((note, idx) => (
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
              <span className="font-medium">{t.servingRitualLabel} </span>
              <span className="font-light">{item.bestWayToDrink}</span>
            </div>
          </div>

          {/* Caffeine & Vibe Feel */}
          <div className="mt-2 flex items-center justify-between text-[11px] font-mono-code text-[#332B1C]/80">
            <span>{t.caffeinePunchLabel}</span>
            <span className="font-normal px-2 py-0.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] text-[#332B1C] text-[10px]">
              {item.caffeineFeel}
            </span>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-3 pt-2 border-t border-[#332B1C] flex items-center justify-between gap-2 no-print">
          <button
            onClick={() => onSelect(coffee)}
            className="text-[11px] font-mono-code font-medium text-[#332B1C] hover:underline transition"
          >
            {t.viewDetailsBtn}
          </button>

          {/* Export dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-[10px] font-mono-code transition"
              title={t.exportBtn}
            >
              <Download className="w-3 h-3" />
              <span>{isExporting ? '...' : t.exportBtn}</span>
            </button>

            {showExportMenu && (
              <div className="absolute right-0 bottom-full mb-1 w-44 rounded-none bg-[#F0E5C5] p-1 border border-[#332B1C] shadow-lg z-20 space-y-1 font-mono-code">
                <button
                  onClick={() => handleExport('png')}
                  className="w-full flex items-center gap-2 px-2 py-1 text-[11px] text-left text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] transition"
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>{t.exportPng}</span>
                </button>
                <button
                  onClick={() => handleExport('pdf')}
                  className="w-full flex items-center gap-2 px-2 py-1 text-[11px] text-left text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] transition"
                >
                  <FileText className="w-3 h-3" />
                  <span>{t.exportPdf}</span>
                </button>
                <button
                  onClick={() => handleExport('txt')}
                  className="w-full flex items-center gap-2 px-2 py-1 text-[11px] text-left text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] transition"
                >
                  <FileCode className="w-3 h-3" />
                  <span>{t.exportTxt}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
