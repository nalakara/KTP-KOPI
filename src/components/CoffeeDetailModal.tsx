import React, { useState } from 'react';
import { CoffeeCardItem, ViewMode } from '../types';
import { RatingStars } from './RatingStars';
import { CasualCoffeeCard } from './CasualCoffeeCard';
import { BeginnerCoffeeCard } from './BeginnerCoffeeCard';
import { EnthusiastCoffeeCard } from './EnthusiastCoffeeCard';
import { exportCardAsImage, exportCardAsPDF, exportCardAsTXT } from '../utils/exportCard';
import {
  X,
  Download,
  FileText,
  FileCode,
  Image as ImageIcon,
  Printer,
  Trash2,
  Edit3,
  Check,
  Share2,
} from 'lucide-react';

interface CoffeeDetailModalProps {
  coffee: CoffeeCardItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (updated: CoffeeCardItem) => void;
  onDelete: (id: string) => void;
  initialMode?: ViewMode;
}

export const CoffeeDetailModal: React.FC<CoffeeDetailModalProps> = ({
  coffee,
  isOpen,
  onClose,
  onUpdate,
  onDelete,
  initialMode = 'enthusiast',
}) => {
  const [modalMode, setModalMode] = useState<ViewMode>(initialMode);
  const [isExporting, setIsExporting] = useState(false);
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [notesDraft, setNotesDraft] = useState(coffee?.userNotes || '');

  if (!isOpen || !coffee) return null;

  const exportElementId =
    modalMode === 'casual'
      ? `casual-card-${coffee.id}`
      : modalMode === 'beginner'
      ? `beginner-card-${coffee.id}`
      : `ktp-card-${coffee.id}`;

  const handleExport = async (format: 'png' | 'jpeg' | 'pdf' | 'txt') => {
    setIsExporting(true);
    if (format === 'pdf') {
      await exportCardAsPDF(exportElementId, `${coffee.name}_${modalMode}`, coffee, modalMode);
    } else if (format === 'txt') {
      exportCardAsTXT(`${coffee.name}_${modalMode}`, coffee, modalMode);
    } else {
      await exportCardAsImage(exportElementId, `${coffee.name}_${modalMode}`, format);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121212]/75 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-none bg-[#F0E5C5] p-5 md:p-6 shadow-2xl border border-[#332B1C] text-[#332B1C] my-auto">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-[#332B1C] flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono-code uppercase tracking-wider text-[#332B1C] bg-[#E2F4CB] border border-[#332B1C] px-2.5 py-0.5 rounded-full">
              Pratinjau Kartu
            </span>
            <span className="text-xs text-[#332B1C]/80 font-mono-code">
              {coffee.ktpNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (confirm(`Hapus kartu kopi "${coffee.name}"?`)) {
                  onDelete(coffee.id);
                  onClose();
                }
              }}
              className="p-1.5 text-[#332B1C]/70 hover:text-red-700 rounded-full border border-transparent hover:border-[#332B1C] transition"
              title="Hapus kartu ini"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] rounded-full border border-[#332B1C] transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* View Mode Selector inside modal */}
        <div className="mt-3 flex items-center justify-between flex-wrap gap-2 p-2 bg-[#F0E5C5] border border-[#332B1C]">
          <span className="text-[11px] font-mono-code font-medium text-[#332B1C]">
            Mode Tampilan:
          </span>
          <div className="inline-flex rounded-none border border-[#332B1C] bg-[#F0E5C5] p-0.5 gap-0.5 text-xs font-mono-code">
            <button
              onClick={() => setModalMode('casual')}
              className={`px-3 py-1 font-medium transition text-[11px] ${
                modalMode === 'casual'
                  ? 'bg-[#332B1C] text-[#F0E5C5]'
                  : 'text-[#332B1C] hover:bg-[#332B1C]/10'
              }`}
            >
              Casual (Orang Biasa)
            </button>
            <button
              onClick={() => setModalMode('beginner')}
              className={`px-3 py-1 font-medium transition text-[11px] ${
                modalMode === 'beginner'
                  ? 'bg-[#332B1C] text-[#F0E5C5]'
                  : 'text-[#332B1C] hover:bg-[#332B1C]/10'
              }`}
            >
              Beginner (Pemula)
            </button>
            <button
              onClick={() => setModalMode('enthusiast')}
              className={`px-3 py-1 font-medium transition text-[11px] ${
                modalMode === 'enthusiast'
                  ? 'bg-[#332B1C] text-[#F0E5C5]'
                  : 'text-[#332B1C] hover:bg-[#332B1C]/10'
              }`}
            >
              Enthusiast (KTP Kopi)
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
            />
          )}
          {modalMode === 'beginner' && (
            <BeginnerCoffeeCard
              coffee={coffee}
              onRate={(_, r) => handleRatingChange(r)}
              onSelect={() => {}}
            />
          )}
          {modalMode === 'enthusiast' && (
            <EnthusiastCoffeeCard
              coffee={coffee}
              onRate={(_, r) => handleRatingChange(r)}
              onSelect={() => {}}
            />
          )}
        </div>

        {/* User Personal Tasting Notes */}
        <div className="mt-4 p-3 border border-[#332B1C] bg-[#F0E5C5] font-mono-code">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#332B1C] flex items-center gap-1.5">
              <Edit3 className="w-3 h-3 text-[#332B1C]" />
              <span>Catatan Seduh Pribadi (Tasting Log)</span>
            </span>
            {!isEditingNotes && (
              <button
                onClick={() => {
                  setNotesDraft(coffee.userNotes || '');
                  setIsEditingNotes(true);
                }}
                className="text-[11px] text-[#332B1C] underline hover:opacity-80"
              >
                Edit Catatan
              </button>
            )}
          </div>

          {isEditingNotes ? (
            <div className="space-y-2">
              <textarea
                rows={3}
                value={notesDraft}
                onChange={(e) => setNotesDraft(e.target.value)}
                placeholder="Tuliskan pengalaman mencicipi kopi ini, grind size, alat seduh favorit, atau pairing makanan..."
                className="w-full border border-[#332B1C] p-2 text-xs bg-[#F0E5C5] text-[#332B1C] placeholder:text-[#332B1C]/50 focus:outline-none focus:ring-1 focus:ring-[#332B1C]"
              />
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setIsEditingNotes(false)}
                  className="px-3 py-1 text-xs font-mono-code text-[#332B1C] border border-[#332B1C] rounded-full hover:bg-[#332B1C]/10"
                >
                  Batal
                </button>
                <button
                  onClick={handleSaveNotes}
                  className="px-3.5 py-1 text-xs font-mono-code bg-[#332B1C] text-[#F0E5C5] border border-[#332B1C] rounded-full hover:opacity-90"
                >
                  Simpan Catatan
                </button>
              </div>
            </div>
          ) : (
            <p className="text-xs text-[#332B1C] italic">
              {coffee.userNotes || 'Belum ada catatan seduh. Tekan "Edit Catatan" untuk menambahkan kesan rasa Anda.'}
            </p>
          )}
        </div>

        {/* Bottom Actions: Export PNG / PDF / TXT */}
        <div className="mt-4 pt-3 border-t border-[#332B1C] flex items-center justify-between flex-wrap gap-2 font-mono-code">
          <div className="text-[10px] text-[#332B1C]/70">
            Dibuat: {coffee.createdAt}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExport('txt')}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-[11px] transition"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Simpan Teks (TXT)</span>
            </button>
            <button
              onClick={() => handleExport('png')}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-[11px] transition"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Unduh Gambar (PNG)</span>
            </button>
            <button
              onClick={() => handleExport('pdf')}
              disabled={isExporting}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#332B1C] text-[#F0E5C5] border border-[#332B1C] hover:bg-[#332B1C]/90 text-[11px] font-medium transition"
            >
              <FileText className="w-3.5 h-3.5 text-[#E2F4CB]" />
              <span>Ekspor Kartu (PDF)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
