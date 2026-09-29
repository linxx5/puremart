import type { CSSProperties } from 'react';
import { colors, fontSize } from '@puremart/tokens';

const pill: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 6,
  fontSize: 13,
  fontWeight: 700,
  padding: '6px 12px',
  borderRadius: 999,
};

export function VerifiedBadge() {
  return <span style={{ ...pill, background: colors.blue, color: colors.white }}>🟢 Verified Seller</span>;
}

export function TrustScoreChip({ score }: { score: number }) {
  const label = score >= 80 ? 'Trusted' : score >= 50 ? 'Fair' : 'New';
  return (
    <span style={{ ...pill, background: colors.midnight, color: colors.white }} aria-label={`Trust score ${score} out of 100, rated ${label}`}>
      🟢 {score}/100 {label}
    </span>
  );
}

export function MutedText({ children }: { children: React.ReactNode }) {
  return <span style={{ fontSize: fontSize.small, color: colors.slate }}>{children}</span>;
}
