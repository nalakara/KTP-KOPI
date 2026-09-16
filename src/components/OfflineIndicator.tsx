import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../hooks/usePWAInstall';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <aside
      aria-label="Status koneksi offline"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-full bg-[#332B1C] text-[#F0E5C5] px-3.5 py-1.5 text-xs font-mono-code shadow-xl border border-[#332B1C] no-print"
    >
      <WifiOff className="w-3.5 h-3.5 text-[#E2F4CB] animate-pulse" />
      <span>Mode Offline — Data tersimpan lokal siap diakses tanpa internet.</span>
    </aside>
  );
};
