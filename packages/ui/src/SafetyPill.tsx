import { statusMeta, type SafetyStatus } from '@puremart/tokens';

export function SafetyPill({ status }: { status: SafetyStatus }) {
  const meta = statusMeta[status];
  return (
    <span
      role="status"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: 13,
        fontWeight: 700,
        padding: '6px 12px',
        borderRadius: 999,
        background: meta.bg,
        color: meta.fg,
      }}
    >
      {meta.label}
    </span>
  );
}
