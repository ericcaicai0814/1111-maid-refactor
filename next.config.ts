import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/',
        destination: '/foreign-domestic-helper-under-12',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
