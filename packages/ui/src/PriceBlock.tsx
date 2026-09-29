import { colors } from '@puremart/tokens';

export function PriceBlock({ retail, wholesale }: { retail: string; wholesale?: string }) {
  return (
    <div>
      <div style={{ fontSize: 20, fontWeight: 800, color: colors.blue }}>{retail}</div>
      {wholesale ? (
        <div style={{ fontSize: 14, color: colors.slate }}>· {wholesale} wholesale</div>
      ) : null}
    </div>
  );
}
