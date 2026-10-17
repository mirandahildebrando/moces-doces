import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

/* Títulos e subtítulos de cena: serifa elegante, pesos 500/600.
   O itálico é usado apenas no subtítulo do hero. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

/* Texto, navegação, botões e subtítulos: geométrica neutra e muito legível. */
const jost = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jost",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Moces Doces — Confeitaria Artesanal em Vila Matilde, SP",
    template: "%s | Moces Doces",
  },
  description:
    "Docinhos a pronta entrega e encomendas exclusivas: trufas, bolos no pote, brigadeiros gourmet, morango cravejado e bolos trufados. Pedidos e valores exclusivamente pelo WhatsApp. Retirada em Vila Matilde, SP.",
  keywords: [
    "doceria artesanal",
    "bolo no pote",
    "trufa de morango",
    "brigadeiros gourmet",
    "morango cravejado",
    "encomendas de doces",
    "Vila Matilde",
    "São Paulo",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: siteUrl,
    siteName: site.name,
    title: "Moces Doces — Confeitaria Artesanal em Vila Matilde, SP",
    description:
      "Docinhos a pronta entrega e encomendas exclusivas. Escolha na vitrine e peça pelo WhatsApp — retirada em Vila Matilde, SP.",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#2a1810",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${cormorant.variable} ${jost.variable}`}>
      <body>{children}</body>
    </html>
  );
}
