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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Optimisation des chunks pour éviter les erreurs de chargement
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: "all",
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: "framework",
              chunks: "all",
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test: /[\\/]node_modules[\\/]/,
              name(module: { context: string | null }) {
                if (!module.context) return "npm.unknown";
                const match = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/);
                if (match && match[1]) {
                  return `npm.${match[1].replace("@", "")}`;
                }
                return "npm.unknown";
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: "commons",
              minChunks: 2,
              priority: 20,
            },
          },
        },
      };
    }
    return config;
  },
};

export default nextConfig;
