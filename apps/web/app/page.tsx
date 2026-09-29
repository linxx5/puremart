import { colors } from '@puremart/tokens';
import { EscrowBanner, ProductCard, SearchInput } from '@puremart/ui';

export default function Home() {
  return (
    <main style={{ background: colors.paper, color: colors.ink, minHeight: '100vh', padding: 32 }}>
      <h1 style={{ color: colors.midnight }}>Puremart Marketplace</h1>
      <p>Buy with Confidence. Sell with Trust.</p>
      <SearchInput label="Search products" placeholder="Best toothpaste under ₦5,000" />
      <div style={{ marginTop: 16 }}>
        <ProductCard
          title="Nivea Soft Cream 200ml"
          seller="Musa Provisions"
          retailPrice="₦8,200"
          wholesalePrice="₦7,600/carton"
          status="passed"
          trustScore={95}
          verified
        />
      </div>
      <div style={{ marginTop: 16 }}>
        <EscrowBanner amount="₦24,500" />
      </div>
      <p>
        API health: <code>{process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'}/health</code>
      </p>
    </main>
  );
}
