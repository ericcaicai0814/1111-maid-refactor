import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'standalone',
  async redirects() {
    return [
      {
        source: '/foreign-domestic-helper-under-12/form',
        destination: '/foreign-domestic-helper-under-12/foreign-domestic-form',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
