import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Formatos modernos para as fotos da vitrine (AVIF/WebP servidos pelo otimizador).
    formats: ["image/avif", "image/webp"],
  },
  // Fotos, vídeos e o padrão de fundo vivem em /public sem hash no nome.
  // Sem isto eles saem com "max-age=0" e são rebaixados (~22 MB) a cada visita.
  async headers() {
    return [
      {
        source: "/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
