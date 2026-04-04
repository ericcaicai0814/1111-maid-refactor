import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  basePath: '/foreign-domestic-helper-under-12',
  output: 'standalone',
  images: {
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
};

export default nextConfig;
