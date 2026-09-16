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
  Compass,
  Layers,
  Flame,
  Droplets,
  Award,
} from 'lucide-react';

interface BeginnerCoffeeCardProps {
  coffee: CoffeeCardItem;
  onRate: (id: string, rating: number) => void;
  onSelect: (coffee: CoffeeCardItem) => void;
}

export const BeginnerCoffeeCard: React.FC<BeginnerCoffeeCardProps> = ({
  coffee,
  onRate,
  onSelect,
}) => {
  const [isExporting, setIsExporting] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const cardId = `beginner-card-${coffee.id}`;

  const handleExport = async (format: 'png' | 'jpeg' | 'pdf' | 'txt') => {
    setIsExporting(true);
    setShowExportMenu(false);
    if (format === 'pdf') {
      await exportCardAsPDF(cardId, `${coffee.name}_Beginner`, coffee, 'beginner');
    } else if (format === 'txt') {
      exportCardAsTXT(`${coffee.name}_Beginner`, coffee, 'beginner');
    } else {
      await exportCardAsImage(cardId, `${coffee.name}_Beginner`, format);
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
                {coffee.type}
              </span>
              <span className="px-2 py-0.5 rounded-full border border-[#332B1C] text-[10px] font-mono-code uppercase tracking-wider bg-[#E2F4CB] text-[#332B1C]">
                {coffee.process}
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

          {/* Title & Region */}
          <h3
            onClick={() => onSelect(coffee)}
            className="text-2xl font-medium text-[#332B1C] font-display cursor-pointer hover:opacity-80 transition tracking-tight leading-tight"
          >
            {coffee.name}
          </h3>
          <div className="flex items-center gap-1 text-[11px] font-mono-code text-[#332B1C]/70 mt-0.5 uppercase tracking-wide">
            <Compass className="w-3 h-3 text-[#332B1C]/60" />
            <span>{coffee.region}, {coffee.originCountry}</span>
          </div>

          {/* Roast Level & Character Panel */}
          <div className="mt-3 grid grid-cols-2 gap-2 p-2 border border-[#332B1C] bg-[#F0E5C5]">
            <div>
              <span className="text-[9px] font-mono-code uppercase tracking-wider text-[#332B1C]/70 block mb-1">
                Tingkat Sangrai
              </span>
              <RoastLevelBadge level={coffee.roastLevel} />
            </div>

            <div className="text-right">
              <span className="text-[9px] font-mono-code uppercase tracking-wider text-[#332B1C]/70 block mb-1">
                Metode Seduh
              </span>
              <span className="text-[11px] font-mono-code font-normal text-[#332B1C]">
                {coffee.recommendedBrew?.slice(0, 2).join(', ') || 'V60 / Tubruk'}
              </span>
            </div>
          </div>

          {/* Flavour Notes Badges */}
          <div className="mt-3">
            <p className="text-[10px] font-mono-code uppercase tracking-wider text-[#332B1C]/70 mb-1.5 font-medium">
              Flavour Notes (Profil Rasa):
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

          {/* Sensory Balance Mini Bars */}
          <div className="mt-3 pt-2 border-t border-[#332B1C]/30 space-y-2">
            <SensoryBar
              label="Keasaman (Acidity)"
              value={coffee.acidity}
              leftLabel="Rendah"
              rightLabel="Bright"
            />
            <SensoryBar
              label="Ketebalan Rasa (Body)"
              value={coffee.body}
              leftLabel="Tea-like"
              rightLabel="Bold"
            />
            <SensoryBar
              label="Rasa Manis (Sweetness)"
              value={coffee.sweetness}
              leftLabel="Halus"
              rightLabel="Manis"
            />
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-3 pt-2 border-t border-[#332B1C] flex items-center justify-between gap-2 no-print">
          <button
            onClick={() => onSelect(coffee)}
            className="text-[11px] font-mono-code font-medium text-[#332B1C] hover:underline transition"
          >
            Lihat KTP Lengkap →
          </button>

          {/* Export dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExportMenu(!showExportMenu)}
              disabled={isExporting}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-[10px] font-mono-code transition"
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
