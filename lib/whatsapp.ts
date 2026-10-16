import { defaultWhatsAppMessage, site } from "./site";

/**
 * Monta um link da API oficial do WhatsApp (wa.me) com mensagem pré-preenchida.
 * Ex.: https://wa.me/5511915957904?text=Ol%C3%A1%2C%20gostaria%20de%20fazer%20um%20pedido!
 */
export function whatsappLink(message: string = defaultWhatsAppMessage): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Link de pedido já citando o doce escolhido na vitrine (sem preços em nenhum momento). */
export function productWhatsAppLink(productName: string): string {
  return whatsappLink(`Olá, gostaria de fazer um pedido de ${productName}. Ainda está disponível?`);
}
