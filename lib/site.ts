/**
 * Dados institucionais da Moces Doces.
 *
 * Regras de negócio da cliente:
 * - O site é uma vitrine: NÃO exibe preços e NÃO tem carrinho.
 * - Todo pedido é fechado exclusivamente pelo WhatsApp.
 * - Não há aplicativos de delivery no momento.
 * - Retirada em Vila Matilde (SP), entrega local combinada na conversa.
 */

export const site = {
  name: "Moces Doces",
  tagline: "Confeitaria Artesanal",
  /** Número exibido no site (formato como a cliente divulgou). */
  phoneDisplay: "11 9 1595-7904",
  /** Número no formato internacional para a API do WhatsApp (sem +, sem espaços). */
  whatsappNumber: "5511915957904",
  instagramHandle: "@mocesdoces",
  instagramUrl: "https://www.instagram.com/mocesdoces",
  pickupLocation: "Vila Matilde, SP",
} as const;

/** URL pública do site (usada em SEO). Configure NEXT_PUBLIC_SITE_URL na Vercel com o domínio final. */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mocesdoces.vercel.app";

/** Mensagem padrão usada em todos os botões principais de pedido. */
export const defaultWhatsAppMessage = "Olá, gostaria de fazer um pedido!";
