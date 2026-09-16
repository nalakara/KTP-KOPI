import React from 'react';
import { RoastLevel, Language } from '../types';

interface RoastLevelBadgeProps {
  level: RoastLevel;
  showBar?: boolean;
  lang?: Language;
}

export const RoastLevelBadge: React.FC<RoastLevelBadgeProps> = ({
  level,
  showBar = false,
  lang = 'id',
}) => {
  const configs: Record<
    RoastLevel,
    { labelId: string; labelEn: string; bg: string; text: string; fillPercent: string }
  > = {
    Light: {
      labelId: 'Light (Muda)',
      labelEn: 'Light Roast',
      bg: 'bg-[#E2F4CB]',
      text: 'text-[#332B1C]',
      fillPercent: 'w-1/5',
    },
    'Light-Medium': {
      labelId: 'Light-Medium',
      labelEn: 'Light-Medium',
      bg: 'bg-[#F0E5C5]',
      text: 'text-[#332B1C]',
      fillPercent: 'w-2/5',
    },
    Medium: {
      labelId: 'Medium (Sedang)',
      labelEn: 'Medium Roast',
      bg: 'bg-[#F0E5C5]',
      text: 'text-[#332B1C]',
      fillPercent: 'w-3/5',
    },
    'Medium-Dark': {
      labelId: 'Medium-Dark',
      labelEn: 'Medium-Dark',
      bg: 'bg-[#332B1C]/15',
      text: 'text-[#332B1C]',
      fillPercent: 'w-4/5',
    },
    Dark: {
      labelId: 'Dark (Gelap)',
      labelEn: 'Dark Roast',
      bg: 'bg-[#332B1C]',
      text: 'text-[#F0E5C5]',
      fillPercent: 'w-full',
    },
  };

  const current = configs[level] || configs['Medium'];
  const label = lang === 'en' ? current.labelEn : current.labelId;

  return (
    <div className="inline-flex flex-col gap-1">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#332B1C] text-[11px] font-mono-code font-normal uppercase tracking-wider ${current.bg} ${current.text}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#332B1C] shrink-0" />
        {label}
      </span>
      {showBar && (
        <div className="w-full h-1 bg-[#332B1C]/20 rounded-full overflow-hidden border border-[#332B1C]/30">
          <div className={`h-full bg-[#332B1C] ${current.fillPercent}`} />
        </div>
      )}
    </div>
  );
};
