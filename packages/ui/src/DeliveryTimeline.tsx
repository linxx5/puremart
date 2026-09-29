import { colors, deliveryStages, fontSize } from '@puremart/tokens';

export function DeliveryTimeline({ current }: { current: number }) {
  return (
    <ol style={{ listStyle: 'none', margin: 0, padding: 0, maxWidth: 560 }}>
      {deliveryStages.map((stage, i) => {
        const done = i < current;
        const now = i === current;
        return (
          <li
            key={stage}
            aria-current={now ? 'step' : undefined}
            style={{ display: 'flex', gap: 12, padding: '8px 0', fontSize: fontSize.small }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 22,
                height: 22,
                borderRadius: 999,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                fontWeight: 700,
                background: done || now ? colors.blue : colors.mist,
                color: colors.white,
                flexShrink: 0,
              }}
            >
              {done ? '✓' : i + 1}
            </span>
            <span style={{ fontWeight: now ? 700 : 400, color: now ? colors.midnight : colors.ink }}>
              {stage}
              {now ? ' — current' : ''}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
