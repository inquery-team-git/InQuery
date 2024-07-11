/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  reactStrictMode: true,
  swcMinify: true,
  basePath: '',
  poweredByHeader: false,
  images: {
    domains: ['images.inquery.com', 'www.inquery.com', 'inquery.com'],
  },
  publicRuntimeConfig: {
    staticFolder: 'public',
  },
  transpilePackages: ['@mui/x-charts'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  cleanDistDir: true,
  output: 'standalone',
  env: {
    APP_VERSION: 'v1',
    MOCK_DATA_ENABLED: false,
    API_BASE_URL: 'http://localhost:3001',
    API_PORT: '3001',
  },
};

module.exports = nextConfig;
