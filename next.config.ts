import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "rrdevs.net",
        port: '',
        pathname: '/**',
      },
    ]
  },
  sassOptions:{
    quietDeps: true,
  }
};

export default nextConfig;
