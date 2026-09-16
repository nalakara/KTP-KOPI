import React from 'react';
import { ViewMode, Language } from '../types';
import { TRANSLATIONS } from '../i18n/translations';
import {
  X,
  Settings,
  Database,
  Info,
  RefreshCw,
  Download,
  Eye,
  Languages,
  Sparkles,
  ShieldCheck,
  Check,
} from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalCards: number;
  indonesianCards: number;
  onResetData: () => void;
  onExportJson?: () => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
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
  lang,
  onLanguageChange,
}) => {
  if (!isOpen) return null;

  const t = TRANSLATIONS[lang];

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
                {t.settingsTitle}
              </h2>
              <p className="text-[11px] text-[#332B1C]/75">{t.settingsSubtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] rounded-full border border-[#332B1C] transition"
            title={t.detailCloseBtn}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="mt-5 space-y-6">
          {/* SECTION 1: BAHASA & GAYA PENULISAN (INTERPRETATION & STYLING) */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 pb-1 border-b border-[#332B1C]/30">
              <Languages className="w-4 h-4 text-[#332B1C]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#332B1C]">
                {t.settingsSectionLanguage}
              </h3>
            </div>
            <p className="text-[11px] text-[#332B1C]/80 leading-relaxed">
              {t.settingsLanguageIntro}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Option Indonesian */}
              <button
                type="button"
                onClick={() => onLanguageChange('id')}
                className={`p-3 text-left border transition relative flex flex-col justify-between ${
                  lang === 'id'
                    ? 'bg-[#332B1C] text-[#F0E5C5] border-[#332B1C]'
                    : 'bg-[#F0E5C5] text-[#332B1C] border-[#332B1C] hover:bg-[#332B1C]/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">🇮🇩</span>
                    {lang === 'id' && (
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#E2F4CB] text-[#332B1C] border border-[#332B1C]">
                        {t.settingsActiveBadge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">
                    Bahasa Indonesia
                  </h4>
                  <div className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] border border-dashed border-current">
                    REPUBLIK KOPI INDONESIA
                  </div>
                </div>
                <p
                  className={`text-[10px] mt-2.5 leading-snug ${
                    lang === 'id' ? 'text-[#F0E5C5]/85' : 'text-[#332B1C]/75'
                  }`}
                >
                  {t.settingsLangIdTone}
                </p>
              </button>

              {/* Option English */}
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`p-3 text-left border transition relative flex flex-col justify-between ${
                  lang === 'en'
                    ? 'bg-[#332B1C] text-[#F0E5C5] border-[#332B1C]'
                    : 'bg-[#F0E5C5] text-[#332B1C] border-[#332B1C] hover:bg-[#332B1C]/5'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl">🇬🇧</span>
                    {lang === 'en' && (
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#E2F4CB] text-[#332B1C] border border-[#332B1C]">
                        {t.settingsActiveBadge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">
                    English (Specialty)
                  </h4>
                  <div className="inline-block mt-1 px-1.5 py-0.5 rounded text-[9px] border border-dashed border-current">
                    GLOBAL SPECIALTY ARCHIVE
                  </div>
                </div>
                <p
                  className={`text-[10px] mt-2.5 leading-snug ${
                    lang === 'en' ? 'text-[#F0E5C5]/85' : 'text-[#332B1C]/75'
                  }`}
                >
                  {t.settingsLangEnTone}
                </p>
              </button>
            </div>
          </section>

          {/* SECTION 2: MODE TAMPILAN (TINGKAT PEMAHAMAN KOPI) */}
          <section className="space-y-3 pt-2">
            <div className="flex items-center gap-2 pb-1 border-b border-[#332B1C]/30">
              <Eye className="w-4 h-4 text-[#332B1C]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#332B1C]">
                {t.settingsSectionViewMode}
              </h3>
            </div>
            <p className="text-[11px] text-[#332B1C]/80 leading-relaxed">
              {lang === 'en'
                ? 'Choose your desired information density and presentation archetype on the archive index:'
                : 'Pilih tingkat kedalaman informasi kartu yang ingin Anda lihat di halaman utama:'}
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
                        {t.settingsActiveBadge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">
                    {t.modeCasualTitle}
                  </h4>
                  <p
                    className={`text-[10px] mt-0.5 ${
                      viewMode === 'casual' ? 'text-[#E2F4CB]' : 'text-[#332B1C]/70'
                    }`}
                  >
                    {t.modeCasualSubtitle}
                  </p>
                </div>
                <p
                  className={`text-[10px] mt-2.5 leading-snug ${
                    viewMode === 'casual' ? 'text-[#F0E5C5]/90' : 'text-[#332B1C]/75'
                  }`}
                >
                  {t.modeCasualDesc}
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
                        {t.settingsActiveBadge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">
                    {t.modeBeginnerTitle}
                  </h4>
                  <p
                    className={`text-[10px] mt-0.5 ${
                      viewMode === 'beginner' ? 'text-[#E2F4CB]' : 'text-[#332B1C]/70'
                    }`}
                  >
                    {t.modeBeginnerSubtitle}
                  </p>
                </div>
                <p
                  className={`text-[10px] mt-2.5 leading-snug ${
                    viewMode === 'beginner' ? 'text-[#F0E5C5]/90' : 'text-[#332B1C]/75'
                  }`}
                >
                  {t.modeBeginnerDesc}
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
                        {t.settingsActiveBadge}
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-xs uppercase tracking-wide">
                    {t.modeEnthusiastTitle}
                  </h4>
                  <p
                    className={`text-[10px] mt-0.5 ${
                      viewMode === 'enthusiast' ? 'text-[#E2F4CB]' : 'text-[#332B1C]/70'
                    }`}
                  >
                    {t.modeEnthusiastSubtitle}
                  </p>
                </div>
                <p
                  className={`text-[10px] mt-2.5 leading-snug ${
                    viewMode === 'enthusiast' ? 'text-[#F0E5C5]/90' : 'text-[#332B1C]/75'
                  }`}
                >
                  {t.modeEnthusiastDesc}
                </p>
              </button>
            </div>

            {/* Active Mode Notice */}
            <div className="p-2.5 bg-[#E2F4CB] border border-[#332B1C] text-[11px] text-[#332B1C] flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-[#332B1C] mt-1 shrink-0" />
              <div>
                <strong>
                  {lang === 'en' ? 'Active Archetype: ' : 'Mode Terpilih: '}
                  {viewMode === 'casual'
                    ? t.modeCasualTitle
                    : viewMode === 'beginner'
                    ? t.modeBeginnerTitle
                    : t.modeEnthusiastTitle}
                </strong>
                <p className="mt-0.5 text-[10px] text-[#332B1C]/80">
                  {viewMode === 'casual' && t.modeCasualBanner}
                  {viewMode === 'beginner' && t.modeBeginnerBanner}
                  {viewMode === 'enthusiast' && t.modeEnthusiastBanner}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION 3: DATA & PENYIMPANAN */}
          <section className="space-y-3 pt-2">
            <div className="flex items-center gap-2 pb-1 border-b border-[#332B1C]/30">
              <Database className="w-4 h-4 text-[#332B1C]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#332B1C]">
                {t.settingsSectionData}
              </h3>
            </div>

            <div className="p-3 border border-[#332B1C] bg-[#F0E5C5] space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span>{lang === 'en' ? 'Stored Passports:' : 'Total Kartu Tersimpan:'}</span>
                <span className="font-bold text-[#332B1C] bg-[#E2F4CB] px-2 py-0.5 border border-[#332B1C] text-[10px]">
                  {t.totalCardsSummary(totalCards, indonesianCards)}
                </span>
              </div>
              <p className="text-[10px] text-[#332B1C]/75">
                {lang === 'en'
                  ? 'All passports persist locally on your client storage with offline capability.'
                  : 'Semua kartu tersimpan secara offline di browser Anda melalui Web Storage.'}
              </p>

              <div className="pt-2 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(t.settingsResetConfirm)) {
                      onResetData();
                      onClose();
                    }
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-xs transition"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>{t.settingsResetBtn}</span>
                </button>

                {onExportJson && (
                  <button
                    type="button"
                    onClick={onExportJson}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] text-xs transition"
                  >
                    <Download className="w-3 h-3" />
                    <span>{t.settingsBackupJsonBtn}</span>
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 4: INFO SISTEM & APLIKASI */}
          <section className="space-y-2 pt-2">
            <div className="flex items-center gap-2 pb-1 border-b border-[#332B1C]/30">
              <Info className="w-4 h-4 text-[#332B1C]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#332B1C]">
                {lang === 'en' ? 'System & Provenance Engine' : 'Tentang Coffee ID (KTP Kopi)'}
              </h3>
            </div>
            <div className="text-[10px] text-[#332B1C]/70 space-y-1">
              <div>
                {lang === 'en'
                  ? 'App: Coffee ID v1.3 • Bilingual Provenance Archive & PWA'
                  : 'Aplikasi: Coffee ID v1.3 • Bilingual KTP Kopi & PWA'}
              </div>
              <div>
                {lang === 'en'
                  ? 'AI Engine: Google Gemini 3.8 Flash (Dual-Language Autocomplete)'
                  : 'Mesin AI: Google Gemini 3.8 Flash (Auto-Complete Profil Kopi Dual-Language)'}
              </div>
              <div>
                {lang === 'en'
                  ? 'Standard: Specialty Coffee Association (SCA) Protocols'
                  : 'Standar Penilaian: SCA (Specialty Coffee Association) Protocol'}
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-3 border-t border-[#332B1C] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-1.5 rounded-full border border-[#332B1C] bg-[#332B1C] text-[#F0E5C5] text-xs hover:opacity-90 transition font-medium"
          >
            {lang === 'en' ? 'Done & Save Preferences' : 'Selesai & Simpan Pengaturan'}
          </button>
        </div>
      </div>
    </div>
  );
};
