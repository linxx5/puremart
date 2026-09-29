import { colors, fontSize } from '@puremart/tokens';
import { Button } from './Button.js';

export function EmptyState({ title, hint, actionLabel, onAction }: { title: string; hint?: string; actionLabel?: string; onAction?: () => void }) {
  return (
    <div role="status" style={{ textAlign: 'center', padding: 32, maxWidth: 420 }}>
      <div style={{ fontSize: 40 }} aria-hidden="true">🛒</div>
      <h3 style={{ margin: '8px 0 4px', fontSize: fontSize.h2 }}>{title}</h3>
      {hint ? <p style={{ margin: 0, fontSize: fontSize.small, color: colors.slate }}>{hint}</p> : null}
      {actionLabel && onAction ? (
        <div style={{ marginTop: 12 }}>
          <Button size="sm" onClick={onAction}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  );
}

export function LoadingState({ label = 'Loading…' }: { label?: string }) {
  return (
    <div role="status" aria-busy="true" aria-label={label} style={{ maxWidth: 560 }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ height: 18, borderRadius: 6, background: colors.mist, marginBottom: 10, opacity: 0.6 - i * 0.15 }} />
      ))}
    </div>
  );
}

export function ErrorState({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div role="alert" style={{ border: `2px solid ${colors.red}`, borderRadius: 10, padding: 16, maxWidth: 560 }}>
      <strong>Something went wrong.</strong>
      <p style={{ margin: '4px 0 12px', fontSize: fontSize.small }}>{message}</p>
      {onRetry ? (
        <Button size="sm" variant="secondary" onClick={onRetry}>Try again</Button>
      ) : null}
    </div>
  );
}
