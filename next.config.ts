import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF en priorité, WebP sinon (négocié via l'en-tête Accept).
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Page 404 unique malgré les deux layouts racines (fr) et (en).
    globalNotFound: true,
  },
};

export default nextConfig;
