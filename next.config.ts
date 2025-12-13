import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
      },
      {
        protocol: "https",
        hostname: "uploadthing.com",
      },
    ],
    qualities: [75, 90, 95, 100],
  },
  output: "standalone",
  turbopack: {},
};

export default nextConfig;
