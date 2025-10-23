import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone", // Enable standalone output for Docker

  // Experimental features for better SSR
  experimental: {
    // Enable server actions
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  // Logging for better debugging
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  typescript: {
    // Ignore TypeScript errors during build (for Docker deployment)
    ignoreBuildErrors: true,
  },

  eslint: {
    // Ignore ESLint errors during build (for Docker deployment)
    ignoreDuringBuilds: true,
  },

  // Headers for better security and caching
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },

  webpack: (config, { isServer }) => {
    // Fix para el problema de case-sensitivity en Windows
    config.resolve = {
      ...config.resolve,
      symlinks: false,
    };

    return config;
  },
};

export default nextConfig;
