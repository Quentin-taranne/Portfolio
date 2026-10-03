import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Page 404 unique malgré les deux layouts racines (fr) et (en).
    globalNotFound: true,
  },
};

export default nextConfig;
