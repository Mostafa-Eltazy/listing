/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['storage.googleapis.com'],
    serverRuntimeConfig: {
      apiURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api',
    },
    publicRuntimeConfig: {
      apiURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api',
    },
  },
  reactStrictMode: true,
  swcMinify: true,
};

module.exports = nextConfig;
