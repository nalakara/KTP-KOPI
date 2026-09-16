import React from 'react';

interface SensoryBarProps {
  label: string;
  value: number; // 1 to 5
  leftLabel?: string;
  rightLabel?: string;
  color?: 'amber' | 'orange' | 'stone' | 'emerald';
}

export const SensoryBar: React.FC<SensoryBarProps> = ({
  label,
  value,
  leftLabel,
  rightLabel,
}) => {
  return (
    <div className="space-y-1 text-xs">
      <div className="flex items-center justify-between text-[#332B1C] font-mono-code">
        <span className="font-medium text-[11px] uppercase tracking-wider">{label}</span>
        <span className="text-[#332B1C]/70 text-[10px]">[{value}/5]</span>
      </div>
      <div className="grid grid-cols-5 gap-1 py-0.5">
        {[1, 2, 3, 4, 5].map((lvl) => (
          <div
            key={lvl}
            className={`h-2 border border-[#332B1C] transition-all duration-150 ${
              lvl <= value ? 'bg-[#332B1C]' : 'bg-[#332B1C]/10'
            }`}
          />
        ))}
      </div>
      {(leftLabel || rightLabel) && (
        <div className="flex justify-between text-[9px] font-mono-code text-[#332B1C]/60">
          <span>{leftLabel}</span>
          <span>{rightLabel}</span>
        </div>
      )}
    </div>
  );
};

