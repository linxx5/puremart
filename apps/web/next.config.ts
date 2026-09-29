import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@puremart/ui', '@puremart/tokens'],
};

export default nextConfig;
