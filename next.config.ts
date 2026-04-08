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
      {
        source: '/foreign-domestic-helper-under-12/foreign-domestic-form',
        destination: '/foreign-domestic-helper-under-12/form',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
