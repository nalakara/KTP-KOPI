import React, { useState } from 'react';
import { Download, Smartphone, X, Check } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);

  // If already installed, don't show
  if (isInstalled) {
    return null;
  }

  if (isInstallable) {
    return (
      <button
        id="btn-pwa-install"
        onClick={install}
        className="inline-flex items-center gap-1.5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] active:scale-95 px-3 py-1.5 text-xs font-mono-code font-medium transition"
        title="Pasang aplikasi Coffee ID di perangkat Anda"
      >
        <Download className="w-3.5 h-3.5" />
        <span>Install PWA</span>
      </button>
    );
  }

  if (isIOS) {
    return (
      <>
        <button
          id="btn-pwa-install-ios"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 rounded-full border border-[#332B1C] bg-[#F0E5C5] hover:bg-[#332B1C] hover:text-[#F0E5C5] px-3 py-1.5 text-xs font-mono-code font-medium transition"
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Pasang di iOS</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121212]/75 backdrop-blur-xs p-4 font-mono-code">
            <div className="w-full max-w-sm rounded-none bg-[#F0E5C5] p-5 shadow-2xl border border-[#332B1C] text-[#332B1C]">
              <div className="flex items-center justify-between pb-3 border-b border-[#332B1C]">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-none border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] flex items-center justify-center font-bold text-sm">
                    ☕
                  </div>
                  <div>
                    <h3 className="text-sm font-bold font-display uppercase tracking-wide">Install Coffee ID</h3>
                    <p className="text-[10px] text-[#332B1C]/75">Akses cepat offline di iPhone/iPad</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1 text-[#332B1C] hover:bg-[#332B1C] hover:text-[#F0E5C5] rounded-full border border-[#332B1C]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-xs leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] font-bold flex items-center justify-center shrink-0 text-[10px]">
                    1
                  </span>
                  <p>
                    Buka halaman ini di browser <strong>Safari</strong>, lalu tekan tombol <strong>Share</strong> di bilah bawah.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] font-bold flex items-center justify-center shrink-0 text-[10px]">
                    2
                  </span>
                  <p>
                    Gulir menu ke bawah lalu pilih <strong>Add to Home Screen</strong>.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full border border-[#332B1C] bg-[#E2F4CB] text-[#332B1C] font-bold flex items-center justify-center shrink-0 text-[10px]">
                    3
                  </span>
                  <p>
                    Tekan <strong>Tambah</strong> di pojok kanan atas.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full rounded-full border border-[#332B1C] bg-[#332B1C] py-2 text-xs font-medium text-[#F0E5C5] hover:opacity-90 transition"
              >
                Mengerti
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
