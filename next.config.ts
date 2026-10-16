import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formatos modernos para as fotos da vitrine (AVIF/WebP servidos pelo otimizador).
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
