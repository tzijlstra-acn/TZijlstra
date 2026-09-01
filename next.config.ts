import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const isCI = Boolean(process.env.GITHUB_ACTIONS);

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: isCI ? '/TZijlstra' : '',
  trailingSlash: true,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  experimental: {
    // Serialize static generation to avoid webpack chunk race conditions
    // that occur when parallel workers require dynamic chunks simultaneously.
    workerThreads: false,
    cpus: 1,
  } as Record<string, unknown>,
};

export default withNextIntl(nextConfig);
