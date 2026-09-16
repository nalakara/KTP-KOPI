import React from 'react';
import { RoastLevel } from '../types';

interface RoastLevelBadgeProps {
  level: RoastLevel;
  showBar?: boolean;
}

export const RoastLevelBadge: React.FC<RoastLevelBadgeProps> = ({ level, showBar = false }) => {
  const configs: Record<
    RoastLevel,
    { label: string; bg: string; text: string; fillPercent: string }
  > = {
    Light: {
      label: 'Light Roast',
      bg: 'bg-[#E2F4CB]',
      text: 'text-[#332B1C]',
      fillPercent: 'w-1/5',
    },
    'Light-Medium': {
      label: 'Light-Medium',
      bg: 'bg-[#F0E5C5]',
      text: 'text-[#332B1C]',
      fillPercent: 'w-2/5',
    },
    Medium: {
      label: 'Medium Roast',
      bg: 'bg-[#F0E5C5]',
      text: 'text-[#332B1C]',
      fillPercent: 'w-3/5',
    },
    'Medium-Dark': {
      label: 'Medium-Dark',
      bg: 'bg-[#332B1C]/15',
      text: 'text-[#332B1C]',
      fillPercent: 'w-4/5',
    },
    Dark: {
      label: 'Dark Roast',
      bg: 'bg-[#332B1C]',
      text: 'text-[#F0E5C5]',
      fillPercent: 'w-full',
    },
  };

  const current = configs[level] || configs['Medium'];

  return (
    <div className="inline-flex flex-col gap-1">
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-[#332B1C] text-[11px] font-mono-code font-normal uppercase tracking-wider ${current.bg} ${current.text}`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#332B1C] shrink-0" />
        {current.label}
      </span>
      {showBar && (
        <div className="w-full h-1 bg-[#332B1C]/20 rounded-full overflow-hidden border border-[#332B1C]/30">
          <div className={`h-full bg-[#332B1C] ${current.fillPercent}`} />
        </div>
      )}
    </div>
  );
};

