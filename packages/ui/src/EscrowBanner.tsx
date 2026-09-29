import { colors, fontSize } from '@puremart/tokens';

export function EscrowBanner({ amount, detail }: { amount: string; detail?: string }) {
  return (
    <div
      role="status"
      style={{
        border: `2px solid ${colors.blue}`,
        background: colors.iceBg,
        borderRadius: 10,
        padding: '14px 16px',
        fontSize: fontSize.small,
        maxWidth: 560,
      }}
    >
      🔒 <strong>{amount} held in Puremart Escrow.</strong>{' '}
      {detail ?? 'Released when you confirm delivery, when protection expires, or when a dispute is resolved.'}
    </div>
  );
}
