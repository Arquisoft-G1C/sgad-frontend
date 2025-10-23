import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    output: 'standalone', // Enable standalone output for Docker
    typescript: {
        // Ignore TypeScript errors during build (for Docker deployment)
        ignoreBuildErrors: true,
    },
    eslint: {
        // Ignore ESLint errors during build (for Docker deployment)
        ignoreDuringBuilds: true,
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