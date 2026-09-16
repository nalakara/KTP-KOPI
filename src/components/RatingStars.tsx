import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  value: number;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

export const RatingStars: React.FC<RatingStarsProps> = ({
  value,
  onChange,
  size = 'md',
  readonly = false,
}) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const starSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  const activeRating = hoverRating !== null ? hoverRating : value;

  return (
    <div className="inline-flex items-center gap-1" aria-label={`Rating ${value} dari 5`}>
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= activeRating;
        return (
          <button
            key={star}
            type="button"
            disabled={readonly}
            onClick={(e) => {
              e.stopPropagation();
              if (onChange && !readonly) {
                onChange(star);
              }
            }}
            onMouseEnter={() => !readonly && setHoverRating(star)}
            onMouseLeave={() => !readonly && setHoverRating(null)}
            className={`transition-transform duration-150 ${
              readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'
            } focus:outline-none`}
            title={readonly ? `${value} Bintang` : `Beri rating ${star} Bintang`}
          >
            <Star
              className={`${starSizes[size]} ${
                isFilled
                  ? 'fill-[#332B1C] text-[#332B1C]'
                  : 'text-[#332B1C]/25'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};
