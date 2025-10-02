import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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