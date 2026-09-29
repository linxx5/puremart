import type { SafetyStatus } from '@puremart/tokens';
import { colors, shadows } from '@puremart/tokens';
import { MutedText, TrustScoreChip, VerifiedBadge } from './Badges.js';
import { Button } from './Button.js';
import { PriceBlock } from './PriceBlock.js';
import { SafetyPill } from './SafetyPill.js';

export interface ProductCardProps {
  title: string;
  seller: string;
  retailPrice: string;
  wholesalePrice?: string;
  status: SafetyStatus;
  trustScore: number;
  verified: boolean;
  onAdd?: () => void;
  onQuote?: () => void;
}

export function ProductCard({ title, seller, retailPrice, wholesalePrice, status, trustScore, verified, onAdd, onQuote }: ProductCardProps) {
  return (
    <article style={{ border: `1.5px solid ${colors.mist}`, borderRadius: 10, padding: 16, maxWidth: 560, background: colors.white, boxShadow: shadows.card }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
        <h3 style={{ margin: 0, fontSize: 16 }}>{title}</h3>
        <PriceBlock retail={retailPrice} wholesale={wholesalePrice} />
      </div>
      <div style={{ marginTop: 8, display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <MutedText>{seller}</MutedText>
        {verified ? <VerifiedBadge /> : null}
        <TrustScoreChip score={trustScore} />
        <SafetyPill status={status} />
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 12 }}>
        <Button size="sm" onClick={onAdd}>Add to Cart</Button>
        <Button size="sm" variant="secondary" onClick={onQuote}>Request Quote</Button>
      </div>
    </article>
  );
}
