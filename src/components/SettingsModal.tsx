import React from 'react';
import { ViewMode } from '../types';
import { X, Settings, Sliders, Database, Info, Check, RefreshCw, Download, Eye } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalCards: number;
  indonesianCards: number;
  onResetData: () => void;
  onExportJson?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  viewMode,
  onViewModeChange,
  totalCards,
  indonesianCards,
  onResetData,
  onExportJson,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121212]/75 backdrop-blur-xs p-4 overflow-y-auto font-mono-code">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-none bg-[#F0E5C5] p-5 md:p-6 shadow-2xl border border-[#332B1C] text-[#332B1C] my-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#332B1C]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-none border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] flex items-center justify-center">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-medium font-display tracking-tight text-[#332B1C] uppercase">
                Pengaturan (Settings)
              </h2>
              <p className="text-[11px] text-[#332B1C]/75">
                Sesuaikan preferensi tampilan dan konfigurasi aplikasi Coffee ID
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] rounded-full border border-[#332B1C] transition"
            title="Tutup Pengaturan"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-6">
          {/* SECTION 1: MODE TAMPILAN (TINGKAT PEMAHAMAN KOPI) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-[#332B1C]/30">
              <Eye className="w-4 h-4 text-[#332B1C]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#332B1C]">
                Mode Tampilan: Tingkat Pemahaman Kopi
              </h3>
            </div>
            <p className="text-[11px] text-[#332B1C]/80 leading-relaxed">
              Pilih tingkat kedalaman informasi kartu yang ingin Anda lihat di halaman utama:
            </p>

            {/* Mode Option Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* Casual */}
              <button
                type="button"
                onClick={() => onViewModeChange('casual')}
                className={`p-3 text-left border transition relative flex flex-col justify-between ${
                  viewMode === 'casual'
                    ? 'bg-[#332B1C] text-[#F0E5C5] border-[#332B1C]'
                    : 'bg-[#F0E5C5] text-[#332B1C] border-[#332B1C] hover:bg-[#332B1C]/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-lg">😊</span>
                    {viewMode === 'casual' && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-[#E2F4CB] text-[#332B1C] border border-[#332B1C]">
                        Aktif
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">Casual</h4>
                  <p className={`text-[10px] mt-0.5 ${viewMode === 'casual' ? 'text-[#E2F4CB]' : 'text-[#332B1C]/70'}`}>
                    Orang Biasa
                  </p>
                </div>
                <p className={`text-[10px] mt-2.5 leading-snug ${viewMode === 'casual' ? 'text-[#F0E5C5]/90' : 'text-[#332B1C]/75'}`}>
                  Analogi rasa sehari-hari &amp; cara minum santai tanpa istilah teknis.
                </p>
              </button>

              {/* Beginner */}
              <button
                type="button"
                onClick={() => onViewModeChange('beginner')}
                className={`p-3 text-left border transition relative flex flex-col justify-between ${
                  viewMode === 'beginner'
                    ? 'bg-[#332B1C] text-[#F0E5C5] border-[#332B1C]'
                    : 'bg-[#F0E5C5] text-[#332B1C] border-[#332B1C] hover:bg-[#332B1C]/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-lg">🌱</span>
                    {viewMode === 'beginner' && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-[#E2F4CB] text-[#332B1C] border border-[#332B1C]">
                        Aktif
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">Beginner</h4>
                  <p className={`text-[10px] mt-0.5 ${viewMode === 'beginner' ? 'text-[#E2F4CB]' : 'text-[#332B1C]/70'}`}>
                    Penikmat Pemula
                  </p>
                </div>
                <p className={`text-[10px] mt-2.5 leading-snug ${viewMode === 'beginner' ? 'text-[#F0E5C5]/90' : 'text-[#332B1C]/75'}`}>
                  Asal daerah, proses kopi, tingkat sangrai, dan skala sensorik.
                </p>
              </button>

              {/* Enthusiast */}
              <button
                type="button"
                onClick={() => onViewModeChange('enthusiast')}
                className={`p-3 text-left border transition relative flex flex-col justify-between ${
                  viewMode === 'enthusiast'
                    ? 'bg-[#332B1C] text-[#F0E5C5] border-[#332B1C]'
                    : 'bg-[#F0E5C5] text-[#332B1C] border-[#332B1C] hover:bg-[#332B1C]/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-lg">📜</span>
                    {viewMode === 'enthusiast' && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-full bg-[#E2F4CB] text-[#332B1C] border border-[#332B1C]">
                        Aktif
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">Enthusiast</h4>
                  <p className={`text-[10px] mt-0.5 ${viewMode === 'enthusiast' ? 'text-[#E2F4CB]' : 'text-[#332B1C]/70'}`}>
                    KTP Kopi Resmi
                  </p>
                </div>
                <p className={`text-[10px] mt-2.5 leading-snug ${viewMode === 'enthusiast' ? 'text-[#F0E5C5]/90' : 'text-[#332B1C]/75'}`}>
                  Paspor KTP Kopi lengkap, NIK kopi, mdpl, varietal, SCA score &amp; resep.
                </p>
              </button>
            </div>

            {/* Active Mode Notice */}
            <div className="p-2.5 bg-[#E2F4CB] border border-[#332B1C] text-[11px] text-[#332B1C] flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-[#332B1C] mt-1 shrink-0" />
              <div>
                <strong>Mode Terpilih: {viewMode.toUpperCase()}</strong>
                <p className="mt-0.5 text-[10px] text-[#332B1C]/80">
                  {viewMode === 'casual' &&
                    'Kartu kopi akan menampilkan penjelasan rasa yang santai, rekomendasi penyajian (es/susu/panas), serta kesan kafein.'}
                  {viewMode === 'beginner' &&
                    'Kartu kopi menampilkan proses pengolahan, tingkat sangrai, indikator rasa sederhana, dan alat seduh yang disarankan.'}
                  {viewMode === 'enthusiast' &&
                    'Kartu kopi menampilkan paspor lengkap: NIK KTP Kopi, elevasi mdpl, kultivar varietal, rating SCA, dan panduan ekstraksi suhu/rasio.'}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 2: DATA & PENYIMPANAN (READY FOR MORE SETTINGS) */}
          <section className="space-y-3 pt-2">
            <div className="flex items-center gap-2 pb-1 border-b border-[#332B1C]/30">
              <Database className="w-4 h-4 text-[#332B1C]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#332B1C]">
                Data &amp; Penyimpanan Lokal
              </h3>
            </div>
            
            <div className="p-3 border border-[#332B1C] bg-[#F0E5C5] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span>Total Kartu Tersimpan:</span>
                <span className="font-bold text-[#332B1C] bg-[#E2F4CB] px-2 py-0.5 border border-[#332B1C] text-[10px]">
                  {totalCards} Kartu ({indonesianCards} Nusantara)
                </span>
              </div>
              <p className="text-[10px] text-[#332B1C]/75">
                Semua kartu tersimpan secara offline di browser Anda melalui Web Storage.
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Kembalikan semua kartu kopi ke daftar bawaan? Data custom Anda akan digantikan.')) {
                      onResetData();
                      onClose();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-xs transition"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset ke Data Bawaan</span>
                </button>

                {onExportJson && (
                  <button
                    type="button"
                    onClick={onExportJson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-xs transition"
                  >
                    <Download className="w-3 h-3" />
                    <span>Cadangkan Data (JSON)</span>
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 3: INFO SISTEM & APLIKASI */}
          <section className="space-y-2 pt-2">
            <div className="flex items-center gap-2 pb-1 border-b border-[#332B1C]/30">
              <Info className="w-4 h-4 text-[#332B1C]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#332B1C]">
                Tentang Coffee ID (KTP Kopi)
              </h3>
            </div>
            <div className="text-[10px] text-[#332B1C]/70 space-y-1">
              <div>Aplikasi: Coffee ID v1.2 • Progressive Web App (PWA)</div>
              <div>Mesin AI: Google Gemini 3.8 Flash (Auto-Complete Profil Kopi)</div>
              <div>Standar Penilaian: SCA (Specialty Coffee Association) Protocol</div>
            </div>
          </section>

          {/* PLACEHOLDER UNTUK PENGATURAN LAINNYA DI MASA DEPAN */}
          {/* Anda dapat menambahkan pengaturan baru di sini sesuai kebutuhan */}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-[#332B1C] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 rounded-full border border-[#332B1C] bg-[#332B1C] text-[#F0E5C5] text-xs hover:opacity-90 transition font-medium"
          >
            Selesai &amp; Simpan Pengaturan
          </button>
        </div>
      </div>
    </div>
  );
};
