import { colors } from '@puremart/tokens';

export interface StarRatingProps {
  value: number;
  max?: number;
  onRate?: (value: number) => void;
  label?: string;
}

export function StarRating({ value, max = 5, onRate, label = 'Rating' }: StarRatingProps) {
  return (
    <div role={onRate ? 'radiogroup' : 'img'} aria-label={onRate ? label : `${label}: ${value} out of ${max}`}>
      {Array.from({ length: max }, (_, i) => {
        const star = i + 1;
        const filled = star <= value;
        const style = {
          background: 'none',
          border: 'none',
          cursor: onRate ? 'pointer' : 'default',
          fontSize: 22,
          color: filled ? colors.amber : colors.mist,
          padding: 2,
        } as const;
        return onRate ? (
          <button key={star} type="button" role="radio" aria-checked={filled} aria-label={`${star} star${star > 1 ? 's' : ''}`} style={style} onClick={() => onRate(star)}>
            ★
          </button>
        ) : (
          <span key={star} aria-hidden="true" style={style}>
            ★
          </span>
        );
      })}
    </div>
  );
}
