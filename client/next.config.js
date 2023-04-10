const path = require('path');
/** @type {import('next').NextConfig} */

const withOptimizedImages = require('next-optimized-images');

const nextConfig = withOptimizedImages({
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: true,
  env: {
    APP_URL: process.env.NEXT_PUBLIC_API_URL
  },
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    config.resolve.alias['@public'] = path.resolve(__dirname, 'public');
    config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components');
    config.resolve.alias['@data'] = path.resolve(__dirname, 'src/data');
    config.resolve.alias['@utils'] = path.resolve(__dirname, 'src/utils');
    config.resolve.alias['@hooks'] = path.resolve(__dirname, 'src/hooks');
    config.resolve.alias['@http'] = path.resolve(__dirname, 'src/http');
    config.resolve.alias['@types'] = path.resolve(__dirname, 'src/types');
    config.resolve.alias['@features'] = path.resolve(__dirname, 'src/store/features');
    config.resolve.alias['@store'] = path.resolve(__dirname, 'src/store');
    config.resolve.alias['@styles'] = path.resolve(__dirname, 'src/styles');
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    )
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
        use: ['@svgr/webpack'],
      },
    )
    fileLoaderRule.exclude = /\.svg$/i
    return config;
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path`
      },
      {
        source: '/uploads/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/uploads/:path`
      },
    ]
  }
});

module.exports = nextConfig;
