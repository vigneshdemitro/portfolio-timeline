import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config, { isServer }) {
    if (isServer) {
      // lucide-react references `self` at module level; set globalObject to
      // globalThis so the server bundle doesn't blow up during build evaluation
      config.output = { ...config.output, globalObject: 'globalThis' };
    }
    return config;
  },
};

export default nextConfig;
