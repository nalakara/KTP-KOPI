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
  Award,
  Compass,
  Mountain,
  Dna,
  ShieldCheck,
  Timer,
  Thermometer,
  Scale,
  Sparkles,
  Globe2,
} from 'lucide-react';

interface EnthusiastCoffeeCardProps {
  coffee: CoffeeCardItem;
  onRate: (id: string, rating: number) => void;
  onSelect: (coffee: CoffeeCardItem) => void;
  lang?: Language;
}

export const EnthusiastCoffeeCard: React.FC<EnthusiastCoffeeCardProps> = ({
  coffee,
  onRate,
  onSelect,
  lang = 'id',
}) => {
  const currentLang: Language = lang as Language;
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const cardId = `ktp-card-${coffee.id}`;

  const t = TRANSLATIONS[currentLang];
  const item = getLocalizedCoffee(coffee, currentLang);

  const handleExport = async (format: 'png' | 'jpeg' | 'pdf' | 'txt') => {
    setIsExporting(true);
    setShowExportMenu(false);
    if (format === 'pdf') {
      await exportCardAsPDF(
        cardId,
        `${item.name}_${currentLang === 'en' ? 'Passport_Enthusiast' : 'KTP_Kopi_Enthusiast'}`,
        coffee,
        'enthusiast',
        currentLang
      );
    } else if (format === 'txt') {
      exportCardAsTXT(
        `${item.name}_${currentLang === 'en' ? 'Passport_Enthusiast' : 'KTP_Kopi_Enthusiast'}`,
        coffee,
        'enthusiast',
        currentLang
      );
    } else {
      await exportCardAsImage(
        cardId,
        `${item.name}_${currentLang === 'en' ? 'Passport_Enthusiast' : 'KTP_Kopi_Enthusiast'}`,
        format
      );
    }
    setIsExporting(false);
  };

  return (
    <div
      id={cardId}
      className="group relative card-shell flex flex-col justify-between"
    >
      <div className="card-surface flex-1 flex flex-col justify-between !p-0 overflow-hidden">
        {/* Official Top Header Banner (KTP / Passport Style) */}
        <div className="bg-[#332B1C] p-3 text-[#F0E5C5] border-b border-[#332B1C]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#F0E5C5]/10 border border-[#F0E5C5]/40 flex items-center justify-center font-bold text-xs text-[#E2F4CB]">
                {lang === 'en' ? '🧭' : '☕'}
              </div>
              <div>
                <h4 className="text-[11px] uppercase tracking-wider font-display font-medium text-[#E2F4CB] leading-tight">
                  {item.passportHeaderTop}
                </h4>
                <p className="text-[9px] uppercase tracking-wide text-[#F0E5C5]/75 font-mono-code leading-tight">
                  {item.passportHeaderSub}
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-mono-code block text-[#F0E5C5]/70 uppercase">
                {item.passportNumberBadge}
              </span>
              <span className="font-mono-code text-[11px] font-normal tracking-wider text-[#F0E5C5]">
                {coffee.ktpNumber || (lang === 'en' ? 'CID-SPEC-001' : 'ID-SPEC-001')}
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
                  {item.typeFormatted} • {item.originCountry}
                </span>
                <h3
                  onClick={() => onSelect(coffee)}
                  className="text-2xl font-medium text-[#332B1C] font-display cursor-pointer hover:opacity-80 transition tracking-tight leading-tight pt-0.5"
                >
                  {item.name}
                </h3>
                <p className="text-[11px] text-[#332B1C]/75 flex items-center gap-1 font-mono-code">
                  <Compass className="w-3 h-3 text-[#332B1C]" />
                  <span>{item.region}</span>
                </p>
              </div>

              {/* SCA Score Badge */}
              {coffee.scaScore && (
                <div className="shrink-0 text-center px-2 py-1 rounded-none bg-[#E2F4CB] border border-[#332B1C]">
                  <div className="flex items-center justify-center text-[#332B1C] mb-0.5">
                    <Award className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-mono-code uppercase block text-[#332B1C]/80 font-medium">
                    SCA SCORE
                  </span>
                  <span className="text-base font-bold font-mono-code text-[#332B1C] leading-none">
                    {coffee.scaScore.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Official KTP / Passport Metadata Spec Table */}
            <div className="mt-2.5 border border-[#332B1C] divide-y divide-[#332B1C] text-[11px] font-mono-code bg-[#F0E5C5]">
              <div className="grid grid-cols-2 divide-x divide-[#332B1C]">
                <div className="p-1.5 flex items-center justify-between">
                  <span className="text-[10px] uppercase text-[#332B1C]/60 font-medium">
                    {t.specProcess}
                  </span>
                  <span className="font-medium text-[#332B1C] truncate max-w-[110px] text-right">
                    {item.process}
                  </span>
                </div>
                <div className="p-1.5 flex items-center justify-between">
                  <span className="text-[10px] uppercase text-[#332B1C]/60 font-medium flex items-center gap-1">
                    <Mountain className="w-3 h-3 text-[#332B1C]" />
                    <span>{t.specElevation}</span>
                  </span>
                  <span className="font-medium text-[#332B1C] text-right truncate">
                    {item.altitudeRange}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 divide-x divide-[#332B1C]">
                <div className="p-1.5 flex items-center justify-between">
                  <span className="text-[10px] uppercase text-[#332B1C]/60 font-medium flex items-center gap-1">
                    <Dna className="w-3 h-3 text-[#332B1C]" />
                    <span>{t.specVarietal}</span>
                  </span>
                  <span className="font-medium text-[#332B1C] truncate max-w-[110px] text-right">
                    {coffee.varietal}
                  </span>
                </div>
                <div className="p-1.5 flex items-center justify-between">
                  <span className="text-[10px] uppercase text-[#332B1C]/60 font-medium">
                    {t.specRoast}
                  </span>
                  <RoastLevelBadge level={coffee.roastLevel} lang={lang} />
                </div>
              </div>

              {coffee.producer && (
                <div className="p-1.5 flex items-center justify-between">
                  <span className="text-[10px] uppercase text-[#332B1C]/60 font-medium">
                    {t.specProducer}
                  </span>
                  <span className="font-medium text-[#332B1C] truncate max-w-[190px]">
                    {coffee.producer}
                  </span>
                </div>
              )}
            </div>

            {/* Sensory Balance Sliders */}
            <div className="mt-2.5 space-y-1.5 p-2 rounded-none bg-[#F0E5C5] border border-[#332B1C]">
              <SensoryBar label={t.specAcidity} value={coffee.acidity} />
              <SensoryBar label={t.specBody} value={coffee.body} />
              <SensoryBar label={t.specSweetness} value={coffee.sweetness} />
            </div>

            {/* Flavour Notes Badges */}
            <div className="mt-2.5">
              <span className="text-[10px] uppercase font-mono-code text-[#332B1C]/70 block mb-1 font-medium">
                {t.flavourNotesLabel}
              </span>
              <div className="flex flex-wrap gap-1">
                {item.flavourNotes.map((note, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono-code bg-[#E2F4CB] text-[#332B1C] border border-[#332B1C]"
                  >
                    <Sparkles className="w-2.5 h-2.5 text-[#332B1C]" />
                    <span>{note}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Barista Brew Recipe Specs Box */}
            {item.brewRecipe && (
              <div className="mt-2.5 p-2 rounded-none bg-[#F0E5C5] border border-[#332B1C] space-y-1">
                <div className="flex items-center justify-between text-[10px] font-mono-code uppercase font-bold text-[#332B1C] border-b border-[#332B1C]/40 pb-1">
                  <span className="flex items-center gap-1">
                    <Scale className="w-3 h-3 text-[#332B1C]" />
                    <span>{t.specBrewFormula}</span>
                  </span>
                  <span className="text-[9px] text-[#332B1C]/75 font-normal">
                    {coffee.recommendedBrew?.[0] || 'V60'}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1 pt-1 text-[10px] font-mono-code">
                  <div>
                    <span className="text-[#332B1C]/60 block text-[9px]">{t.specRatio}</span>
                    <span className="font-medium text-[#332B1C]">{item.brewRecipe.ratio}</span>
                  </div>
                  <div>
                    <span className="text-[#332B1C]/60 block text-[9px] flex items-center gap-0.5">
                      <Thermometer className="w-2.5 h-2.5 text-[#332B1C]" />
                      <span>{t.specTemp}</span>
                    </span>
                    <span className="font-medium text-[#332B1C]">{item.brewRecipe.temperature}</span>
                  </div>
                  <div>
                    <span className="text-[#332B1C]/60 block text-[9px] flex items-center gap-0.5">
                      <Timer className="w-2.5 h-2.5 text-[#332B1C]" />
                      <span>{t.specTime}</span>
                    </span>
                    <span className="font-medium text-[#332B1C]">{item.brewRecipe.time}</span>
                  </div>
                </div>
                {item.brewRecipe.note && (
                  <p className="text-[10px] font-mono-code text-[#332B1C]/80 italic pt-1 border-t border-[#332B1C]/20">
                    💡 {item.brewRecipe.note}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Bottom Security / Barcode & Registration Stamp */}
          <div className="pt-2 border-t border-[#332B1C] space-y-2">
            <div className="flex items-center justify-between gap-2">
              {/* Fake Decorative Barcode with KTP / Passport stamp */}
              <div className="flex items-center gap-2">
                <div className="h-6 flex items-end gap-[2px] opacity-70">
                  {[3, 7, 2, 5, 8, 3, 6, 2, 7, 4, 8, 3, 5, 6, 2].map((h, i) => (
                    <div
                      key={i}
                      className="w-[2px] bg-[#332B1C]"
                      style={{ height: `${h * 2.5}px` }}
                    />
                  ))}
                </div>
                <div className="text-[9px] font-mono-code text-[#332B1C]/60">
                  <span>{item.watermarkText}</span>
                  <br />
                  <span className="text-[#332B1C] font-semibold">{coffee.ktpNumber}</span>
                </div>
              </div>

              {/* Verified Stamp Badge */}
              <div className="px-2 py-0.5 border border-dashed border-[#332B1C] rounded-none text-[9px] font-mono-code uppercase font-bold text-[#332B1C] flex items-center gap-1 bg-[#E2F4CB]">
                <ShieldCheck className="w-3 h-3 text-[#332B1C]" />
                <span>{item.provenanceStampText}</span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="pt-1.5 flex items-center justify-between gap-2 no-print border-t border-[#332B1C]/30">
              <button
                onClick={() => onSelect(coffee)}
                className="text-[11px] font-mono-code font-medium text-[#332B1C] hover:underline transition"
              >
                {t.viewDetailsBtn}
              </button>

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
      </div>
    </div>
  );
};
