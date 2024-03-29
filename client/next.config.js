const path = require('path');
/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  poweredByHeader: true,
  env: {
    APP_URL: process.env.NEXT_PUBLIC_API_URL
  },
  webpack(config) {
    config.resolve.alias['@public'] = path.resolve(__dirname, 'public');
    config.resolve.alias['@components'] = path.resolve(__dirname, 'src/components');
    config.resolve.alias['@data'] = path.resolve(__dirname, 'src/data');
    config.resolve.alias['@utils'] = path.resolve(__dirname, 'src/utils');
    config.resolve.alias['@hooks'] = path.resolve(__dirname, 'src/hooks');
    config.resolve.alias['@services'] = path.resolve(__dirname, 'src/services');
    config.resolve.alias['@types'] = path.resolve(__dirname, 'src/types');
    config.resolve.alias['@features'] = path.resolve(__dirname, 'src/store/features');
    config.resolve.alias['@store'] = path.resolve(__dirname, 'src/store');
    config.resolve.alias['@styles'] = path.resolve(__dirname, 'src/styles');
    return config;
  },
  images: {
   domains: ['localhost'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path*`
      },
      {
        source: '/uploads/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL}/uploads/:path*`
      },
    ]
  }
};

module.exports = nextConfig;
