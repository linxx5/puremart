import { TrustScoreChip, VerifiedBadge } from './Badges';
import { DeliveryTimeline } from './DeliveryTimeline';
import { ErrorState, EmptyState, LoadingState } from './States';
import { EscrowBanner } from './EscrowBanner';
import { PriceBlock } from './PriceBlock';
import { ProductCard } from './ProductCard';
import { SafetyPill } from './SafetyPill';
import { StarRating } from './StarRating';

export const TrustSignals = () => (
  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
    <VerifiedBadge />
    <TrustScoreChip score={95} />
    <SafetyPill status="passed" />
    <SafetyPill status="under-review" />
    <SafetyPill status="rejected" />
  </div>
);

export const Escrow = () => <EscrowBanner amount="₦24,500" />;

export const Tracking = () => <DeliveryTimeline current={4} />;

export const Prices = () => <PriceBlock retail="₦8,200" wholesale="₦7,600/carton" />;

export const Stars = () => <StarRating value={4} />;

export const Card = () => (
  <ProductCard
    title="Nivea Soft Cream 200ml"
    seller="Musa Provisions"
    retailPrice="₦8,200"
    wholesalePrice="₦7,600/carton"
    status="passed"
    trustScore={95}
    verified
  />
);

export const States = () => (
  <div style={{ display: 'grid', gap: 16 }}>
    <EmptyState title="No orders yet" hint="When you buy something, it will show up here." actionLabel="Browse products" />
    <LoadingState />
    <ErrorState message="Could not load your orders. Check your connection." />
  </div>
);

export default { title: 'Marketplace/Components' };
