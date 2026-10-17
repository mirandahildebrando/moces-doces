import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Esconde o selo do Next DevTools (canto inferior esquerdo do preview).
  // Vale só em desenvolvimento — erros de build/execução continuam aparecendo.
  devIndicators: false,
  images: {
    // Formatos modernos para as fotos da vitrine (AVIF/WebP servidos pelo otimizador).
    formats: ["image/avif", "image/webp"],
    // Next 16: imagens locais precisam de padrão explícito em localPatterns.
    // "/img/**" cobre todas as fotos do site, inclusive com query (?v=2) usado
    // para renovar o cache do navegador quando uma foto troca mantendo o nome.
    localPatterns: [{ pathname: "/img/**" }],
  },
  // Fotos, vídeos e o padrão de fundo vivem em /public sem hash no nome.
  // Sem isto eles saem com "max-age=0" e são rebaixados (~22 MB) a cada visita.
  // Em desenvolvimento, "no-cache" faz o navegador sempre revalidar (trocar uma
  // foto no mesmo nome aparece na hora); em produção, cache longo.
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    return [
      {
        source: "/img/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: isDev
              ? "no-cache"
              : "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
