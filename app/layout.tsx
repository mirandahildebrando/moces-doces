import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { site, siteUrl } from "@/lib/site";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
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
  themeColor: "#2c1d13",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${playfair.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
