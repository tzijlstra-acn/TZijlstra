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
  // ESLint was added in this PR; pre-existing warnings do not block the build.
  // Run `npx eslint src/` separately for a full lint report.
  eslint: { ignoreDuringBuilds: true },
};

export default withNextIntl(nextConfig);
