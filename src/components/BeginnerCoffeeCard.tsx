import React, { useState } from 'react';
import { CoffeeCardItem, Language } from '../types';
import { RatingStars } from './RatingStars';
import { RoastLevelBadge } from './RoastLevelBadge';
import { SensoryBar } from './SensoryBar';
import { exportCardAsImage, exportCardAsPDF, exportCardAsTXT } from '../utils/exportCard';
import { getLocalizedCoffee } from '../utils/cardLocalization';
import { TRANSLATIONS } from '../i18n/translations';
import {
  Download,
  FileText,
  FileCode,
  Image as ImageIcon,
  Compass,
  Layers,
  Flame,
  Award,
} from 'lucide-react';

interface BeginnerCoffeeCardProps {
  coffee: CoffeeCardItem;
  onRate: (id: string, rating: number) => void;
  onSelect: (coffee: CoffeeCardItem) => void;
  lang?: Language;
}

export const BeginnerCoffeeCard: React.FC<BeginnerCoffeeCardProps> = ({
  coffee,
  onRate,
  onSelect,
  lang = 'id',
}) => {
  const currentLang: Language = lang as Language;
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const cardId = `beginner-card-${coffee.id}`;

  const t = TRANSLATIONS[currentLang];
  const item = getLocalizedCoffee(coffee, currentLang);

  const handleExport = async (format: 'png' | 'jpeg' | 'pdf' | 'txt') => {
    setIsExporting(true);
    setShowExportMenu(false);
    if (format === 'pdf') {
      await exportCardAsPDF(cardId, `${item.name}_Beginner`, coffee, 'beginner', currentLang);
    } else if (format === 'txt') {
      exportCardAsTXT(`${item.name}_Beginner`, coffee, 'beginner', currentLang);
    } else {
      await exportCardAsImage(cardId, `${item.name}_Beginner`, format);
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
          {/* Header Badges */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2 py-0.5 rounded-full border border-[#332B1C] text-[10px] font-mono-code uppercase tracking-wider bg-[#F0E5C5] text-[#332B1C]">
                {item.typeFormatted}
              </span>
              <span className="px-2 py-0.5 rounded-full border border-[#332B1C] text-[10px] font-mono-code uppercase tracking-wider bg-[#E2F4CB] text-[#332B1C]">
                {item.process}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-[#F0E5C5] px-2 py-0.5 rounded-full border border-[#332B1C]">
              <RatingStars
                value={coffee.rating}
                onChange={(newRating) => onRate(coffee.id, newRating)}
                size="sm"
              />
            </div>
          </div>

          {/* Title and Origin */}
          <h3
            onClick={() => onSelect(coffee)}
            className="text-2xl font-medium text-[#332B1C] font-display cursor-pointer hover:opacity-80 transition tracking-tight leading-tight"
          >
            {item.name}
          </h3>
          <p className="text-[11px] text-[#332B1C]/75 flex items-center gap-1 mt-0.5 font-mono-code">
            <Compass className="w-3 h-3 text-[#332B1C]" />
            <span>
              {item.region}, {item.originCountry}
            </span>
          </p>

          {/* Key Specs Pills Grid */}
          <div className="mt-3 grid grid-cols-2 gap-2 p-2 rounded-none bg-[#F0E5C5] border border-[#332B1C] text-xs font-mono-code">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase text-[#332B1C]/60 flex items-center gap-1 font-medium">
                <Flame className="w-3 h-3 text-[#332B1C]" />
                <span>{t.specRoast}</span>
              </span>
              <RoastLevelBadge level={coffee.roastLevel} lang={lang} />
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] uppercase text-[#332B1C]/60 flex items-center gap-1 font-medium">
                <Layers className="w-3 h-3 text-[#332B1C]" />
                <span>{t.specProcess}</span>
              </span>
              <p className="font-medium text-[#332B1C] truncate text-[11px]">{item.process}</p>
            </div>
          </div>

          {/* Sensory Balance Sliders */}
          <div className="mt-3 space-y-2 p-2.5 rounded-none bg-[#F0E5C5] border border-[#332B1C]">
            <SensoryBar
              label={t.specAcidity}
              value={coffee.acidity}
              leftLabel={lang === 'en' ? 'Smooth' : 'Rendah'}
              rightLabel={lang === 'en' ? 'Vibrant' : 'Tinggi'}
            />
            <SensoryBar
              label={t.specBody}
              value={coffee.body}
              leftLabel={lang === 'en' ? 'Light' : 'Tipis'}
              rightLabel={lang === 'en' ? 'Heavy' : 'Tebal'}
            />
            <SensoryBar
              label={t.specSweetness}
              value={coffee.sweetness}
              leftLabel={lang === 'en' ? 'Mild' : 'Halus'}
              rightLabel={lang === 'en' ? 'Intense' : 'Manis'}
            />
          </div>

          {/* General Character & Flavour Notes */}
          <div className="mt-3">
            <p className="text-xs font-mono-code text-[#332B1C] leading-snug line-clamp-2">
              "{item.generalCharacter}"
            </p>

            <div className="flex flex-wrap gap-1 mt-2">
              {item.flavourNotes.map((note, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-full border border-[#332B1C] text-[10px] font-mono-code bg-[#F0E5C5] text-[#332B1C]"
                >
                  {note}
                </span>
              ))}
            </div>
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
