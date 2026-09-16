import React, { useState } from 'react';
import { CoffeeCardItem, ViewMode, Language } from '../types';
import { CasualCoffeeCard } from './CasualCoffeeCard';
import { BeginnerCoffeeCard } from './BeginnerCoffeeCard';
import { EnthusiastCoffeeCard } from './EnthusiastCoffeeCard';
import { exportCardAsImage, exportCardAsPDF, exportCardAsTXT } from '../utils/exportCard';
import { getLocalizedCoffee } from '../utils/cardLocalization';
import { TRANSLATIONS } from '../i18n/translations';
import {
  X,
  Download,
  FileText,
  FileCode,
  Image as ImageIcon,
  Trash2,
  Edit3,
} from 'lucide-react';

interface CoffeeDetailModalProps {
  coffee: CoffeeCardItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: CoffeeCardItem) => void;
  onDelete: (id: string) => void;
  initialMode?: ViewMode;
  lang?: Language;
}

export const CoffeeDetailModal: React.FC<CoffeeDetailModalProps> = ({
  coffee,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  initialMode = 'enthusiast',
  lang = 'id',
}) => {
  const currentLang: Language = lang as Language;
  const [modalMode, setModalMode] = useState<ViewMode>(initialMode);
  const [isExporting, setIsExporting] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState(coffee?.userNotes || '');

  if (!isOpen || !coffee) return null;

  const t = TRANSLATIONS[currentLang];
  const item = getLocalizedCoffee(coffee, currentLang);

  const exportElementId =
    modalMode === 'casual'
      ? `casual-card-${coffee.id}`
      : modalMode === 'beginner'
      ? `beginner-card-${coffee.id}`
      : `ktp-card-${coffee.id}`;

  const handleExport = async (format: 'png' | 'jpeg' | 'pdf' | 'txt') => {
    setIsExporting(true);
    if (format === 'pdf') {
      await exportCardAsPDF(exportElementId, `${item.name}_${modalMode}`, coffee, modalMode, currentLang);
    } else if (format === 'txt') {
      exportCardAsTXT(`${item.name}_${modalMode}`, coffee, modalMode, currentLang);
    } else {
      await exportCardAsImage(exportElementId, `${item.name}_${modalMode}`, format);
    }
    setIsExporting(false);
  };

  const handleSaveNotes = () => {
    onUpdate({
      ...coffee,
      userNotes: notesDraft,
    });
    setIsEditingNotes(false);
  };

  const handleRatingChange = (newRating: number) => {
    onUpdate({
      ...coffee,
      rating: newRating,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121212]/75 backdrop-blur-xs p-4 overflow-y-auto font-mono-code">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-none bg-[#F0E5C5] p-5 md:p-6 shadow-2xl border border-[#332B1C] text-[#332B1C] my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#332B1C] flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-[#332B1C] bg-[#E2F4CB] border border-[#332B1C] px-2.5 py-0.5 rounded-full">
              {t.detailPreviewBadge}
            </span>
            <span className="text-xs text-[#332B1C]/80 font-mono-code">
              {coffee.ktpNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm(t.detailDeleteConfirm(item.name))) {
                  onDelete(coffee.id);
                  onClose();
                }
              }}
              className="p-1.5 text-[#332B1C]/70 hover:text-red-700 rounded-full border border-transparent hover:border-[#332B1C] transition"
              title={t.detailDeleteBtn}
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] rounded-full border border-[#332B1C] transition"
              title={t.detailCloseBtn}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode Selector inside modal */}
        <div className="mt-3 flex items-center justify-between flex-wrap gap-2 p-2 bg-[#F0E5C5] border border-[#332B1C]">
          <span className="text-[11px] font-medium text-[#332B1C]">
            {t.activeModeLabel}
          </span>
          <div className="inline-flex rounded-none border border-[#332B1C] bg-[#F0E5C5] p-0.5 gap-0.5 text-xs">
            <button
              onClick={() => setModalMode('casual')}
              className={`px-3 py-1 font-medium transition text-[11px] ${
                modalMode === 'casual'
                  ? 'bg-[#332B1C] text-[#F0E5C5]'
                  : 'text-[#332B1C] hover:bg-[#332B1C]/10'
              }`}
            >
              {t.modeCasualTitle} ({t.modeCasualSubtitle})
            </button>
            <button
              onClick={() => setModalMode('beginner')}
              className={`px-3 py-1 font-medium transition text-[11px] ${
                modalMode === 'beginner'
                  ? 'bg-[#332B1C] text-[#F0E5C5]'
                  : 'text-[#332B1C] hover:bg-[#332B1C]/10'
              }`}
            >
              {t.modeBeginnerTitle} ({t.modeBeginnerSubtitle})
            </button>
            <button
              onClick={() => setModalMode('enthusiast')}
              className={`px-3 py-1 font-medium transition text-[11px] ${
                modalMode === 'enthusiast'
                  ? 'bg-[#332B1C] text-[#F0E5C5]'
                  : 'text-[#332B1C] hover:bg-[#332B1C]/10'
              }`}
            >
              {t.modeEnthusiastTitle} ({t.modeEnthusiastSubtitle})
            </button>
          </div>
        </div>

        {/* Active Card Preview Render */}
        <div className="mt-4 p-2 bg-[#F0E5C5] border border-[#332B1C]">
          {modalMode === 'casual' && (
            <CasualCoffeeCard
              coffee={coffee}
              onRate={(_, r) => handleRatingChange(r)}
              onSelect={() => {}}
              lang={lang}
            />
          )}
          {modalMode === 'beginner' && (
            <BeginnerCoffeeCard
              coffee={coffee}
              onRate={(_, r) => handleRatingChange(r)}
              onSelect={() => {}}
              lang={lang}
            />
          )}
          {modalMode === 'enthusiast' && (
            <EnthusiastCoffeeCard
              coffee={coffee}
              onRate={(_, r) => handleRatingChange(r)}
              onSelect={() => {}}
              lang={lang}
            />
          )}
        </div>

        {/* User Personal Tasting Notes */}
        <div className="mt-4 p-3 border border-[#332B1C] bg-[#F0E5C5]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#332B1C] flex items-center gap-1.5">
              <Edit3 className="w-3 h-3 text-[#332B1C]" />
              <span>{t.detailTastingLogTitle}</span>
            </span>
            {!isEditingNotes && (
              <button
                onClick={() => {
                  setNotesDraft(coffee.userNotes || '');
                  setIsEditingNotes(true);
                }}
                className="text-[11px] text-[#332B1C] underline hover:opacity-80"
              >
                {t.detailEditNoteBtn}
              </button>
            )}
          </div>

          {isEditingNotes ? (
            <div className="space-y-2">
              <textarea
                rows={3}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder={t.detailTastingLogPlaceholder}
                className="w-full border border-[#332B1C] p-2 text-xs bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingNotes(false)}
                  className="px-3 py-1 text-xs font-mono-code text-[#332B1C] border border-[#332B1C] rounded-full hover:bg-[#332B1C]/10"
                >
                  {t.addCancelBtn}
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="px-3.5 py-1 text-xs font-mono-code bg-[#332B1C] text-[#F0E5C5] border border-[#332B1C] rounded-full hover:opacity-90"
                >
                  {t.detailSaveNoteBtn}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-[#332B1C] italic">
              {coffee.userNotes ||
                (lang === 'en'
                  ? 'No personal tasting log yet. Click "Edit Notes" to record your brewing reflections.'
                  : 'Belum ada catatan seduh. Tekan "Edit Catatan" untuk menambahkan kesan rasa Anda.')}
            </p>
          )}
        </div>

        {/* Bottom Actions: Export PNG / PDF / TXT */}
        <div className="mt-4 pt-3 border-t border-[#332B1C] flex items-center justify-between flex-wrap gap-2">
          <div className="text-[10px] text-[#332B1C]/70">
            {t.specIssued} {coffee.createdAt}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport('txt')}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-[11px] transition"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>{t.exportTxt}</span>
            </button>
            <button
              onClick={() => handleExport('png')}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-[11px] transition"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>{t.exportPng}</span>
            </button>
            <button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#332B1C] text-[#F0E5C5] border border-[#332B1C] hover:bg-[#332B1C]/90 text-[11px] font-medium transition"
            >
              <FileText className="w-3.5 h-3.5 text-[#E2F4CB]" />
              <span>{t.exportPdf}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
