import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "rrdevs.net",
        port: "",
        pathname: "/**",
      },
    ],
  },
  sassOptions: {
    quietDeps: true,
  },
};

export default nextConfig;
