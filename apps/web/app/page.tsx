import { colors } from '@puremart/tokens';

export default function Home() {
  return (
    <main style={{ background: colors.paper, color: colors.ink, minHeight: '100vh', padding: 32 }}>
      <h1 style={{ color: colors.midnight }}>Puremart Marketplace</h1>
      <p>Buy with Confidence. Sell with Trust.</p>
      <p>
        API health: <code>{process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/health</code>
      </p>
    </main>
  );
}
