import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Puremart — Buy with Confidence. Sell with Trust.',
  description: 'A trusted wholesale and retail marketplace with escrow and AI product safety.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: 'Inter,system-ui,sans-serif' }}>{children}</body>
    </html>
  );
}
