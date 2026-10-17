import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Showcase from "@/components/Showcase";
import MotionGallery from "@/components/MotionGallery";
import HowToOrder from "@/components/HowToOrder";
import Footer from "@/components/Footer";
import { site, siteUrl } from "@/lib/site";

/**
 * Dados estruturados (Schema.org) para busca local e compartilhamento.
 * Sem preços: apenas contato, endereço de retirada e redes sociais.
 */
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: site.name,
  description:
    "Confeitaria artesanal com docinhos a pronta entrega e encomendas exclusivas. Pedidos pelo WhatsApp.",
  url: siteUrl,
  telephone: "+55 11 91595-7904",
  image: `${siteUrl}/img/trufas.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Vila Matilde",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    addressCountry: "BR",
  },
  areaServed: "Vila Matilde e região, São Paulo — SP",
  sameAs: [site.instagramUrl],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <a className="skip-link" href="#vitrine">
        Pular para a vitrine
      </a>

      <Header />

      <main id="inicio">
        <Hero />
        <Showcase />
        <MotionGallery />
        <HowToOrder />
      </main>

      <Footer />
    </>
  );
}
