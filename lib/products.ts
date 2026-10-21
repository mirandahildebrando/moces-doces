/**
 * Catálogo da vitrine (SEM PREÇOS — regra de negócio).
 * Cada item aponta para uma foto profissional em /public/img e gera um link de
 * WhatsApp com a mensagem já preenchida com o nome do doce.
 *
 * Para incluir/remover doces, basta editar esta lista.
 * Para trocar uma foto, substitua o arquivo correspondente em /public/img.
 * Ao trocar a foto mantendo o MESMO nome de arquivo, acrescente/atualize um
 * sufixo ?v=2 (v=3, ...) na URL para o navegador baixar a versão nova.
 */

export type CategoryId = "trufas" | "potes" | "brownies" | "encomendas" | "caixas" | "sazonais";

export interface Product {
  slug: string;
  name: string;
  description: string;
  /** Caminho da imagem dentro de /public (ex.: /img/trufas.jpg). */
  image: string;
  /** Texto alternativo da imagem (acessibilidade + SEO). */
  alt: string;
  category: CategoryId;
  /** Selo opcional exibido sobre a foto (ex.: "Favorito da casa"). */
  badge?: string;
}

export const categories: { id: CategoryId | "todos"; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "trufas", label: "Trufas & Morangos" },
  { id: "potes", label: "Bolos no Pote" },
  { id: "brownies", label: "Brownies & Bombons" },
  { id: "encomendas", label: "Encomendas" },
  { id: "caixas", label: "Caixas & Brigadeiros" },
  { id: "sazonais", label: "Sazonais" },
];

export const categoryLabels: Record<CategoryId, string> = {
  trufas: "Trufas & Morangos",
  potes: "Bolos no Pote",
  brownies: "Brownies & Bombons",
  encomendas: "Encomendas",
  caixas: "Caixas & Brigadeiros",
  sazonais: "Sazonais",
};

export const products: Product[] = [
  {
    slug: "trufas-recheadas-sortidas",
    name: "Trufas Recheadas Sortidas",
    description:
      "Sortimento autoral: pistache com frutas vermelhas, doce de leite, ninho e brigadeiro com castanhas.",
    image: "/img/trufas.jpg",
    alt: "Trufas de chocolate cortadas ao meio mostrando recheios de pistache com frutas vermelhas, doce de leite e castanhas",
    category: "trufas",
    badge: "Favorito da casa",
  },
  {
    slug: "morango-cravejado",
    name: "Morango Cravejado",
    description:
      "Morangos frescos mergulhados em chocolate branco com crocante de morango e framboesa.",
    image: "/img/morango-cravejado.jpg",
    alt: "Morangos frescos cortados, cobertos com chocolate branco cravejado de morango e framboesa",
    category: "trufas",
    badge: "Novidade",
  },
  {
    slug: "surpresa-de-brownie",
    name: "Surpresa de Brownie - Sabores diversos",
    description:
      "Cubos de brownie e brigadeiro cremoso em camadas de creme e chocolate — a cada pedido, um sabor diferente.",
    image: "/img/bolo-pote-brigadeiro.jpg",
    alt: "Pote com cubos de brownie, brigadeiro cremoso e camadas de chocolate meio amargo",
    category: "potes",
  },
  {
    slug: "tortinha-de-kitkat",
    name: "Tortinha de kitkat",
    description:
      "Tortinha cremosa de chocolate meio amargo e creme de ninho com pedaços crocantes de KitKat.",
    image: "/img/bolo-pote-kitkat.jpg",
    alt: "Tortinha de chocolate com pedaços crocantes de KitKat",
    category: "potes",
  },
  {
    slug: "tortinha-de-ouro-branco",
    name: "Tortinha de ouro branco",
    description:
      "Camadas de creme de ninho e brigadeiro sobre base crocante, coroadas com um bombom Ouro Branco.",
    image: "/img/bolo-pote-bombom.jpg",
    alt: "Tortinha com chantilly e um bombom Ouro Branco cortado ao meio no topo",
    category: "potes",
  },
  {
    slug: "surpresa-de-uva",
    name: "Surpresa de uva",
    description:
      "Sobremesa fresca: uvas verdes entre camadas de creme leve e chocolate cremoso com pedacinhos crocantes.",
    image: "/img/bolo-pote-uva.jpg",
    alt: "Sobremesa com uvas verdes frescas, creme branco e cobertura de chocolate",
    category: "potes",
  },
  {
    slug: "bolo-no-pote-de-frutas-vermelhas",
    name: "Bolo no Pote de Frutas Vermelhas",
    description: "Compota artesanal de frutas vermelhas com creme de ninho e bolo fofinho.",
    image: "/img/pote.jpg?v=2",
    alt: "Bolo no pote com compota de frutas vermelhas, creme e o rótulo Moces Doces",
    category: "potes",
  },
  {
    slug: "mousse-de-limao",
    name: "Mousse de limão",
    description: "Mousse de limão aveludado, finalizado com raspas frescas e chantilly leve.",
    image: "/img/bolo-limao.jpg",
    alt: "Potes com creme aveludado de limão decorado com raspas frescas",
    category: "brownies",
  },
  {
    slug: "bolos-no-pote-sortidos",
    name: "Bolos no Pote Sortidos",
    description:
      "Seleção com os sabores mais pedidos da casa: surpresa de brownie, tortinha de ouro branco, surpresa de uva, morango e mousse de limão.",
    image: "/img/bolosd.jpg",
    alt: "Fileiras de bolos no pote variados com morango, uva, chocolate e chantilly",
    category: "potes",
  },
  {
    slug: "bombom-de-morango",
    name: "Bombom de morango",
    description:
      "Morangos frescos envolvidos em creme de ninho e cobertura de chocolate meio amargo.",
    image: "/img/brownie-chocolate.jpg",
    alt: "Bombons de morango com creme de ninho e cobertura de chocolate meio amargo",
    category: "brownies",
  },
  {
    slug: "bites-de-brownie-com-nutella",
    name: "Bites de Brownie com Nutella",
    description:
      "Bites de brownie denso mergulhados em chocolate ao leite com recheio cremoso de Nutella e avelãs.",
    image: "/img/bombom-brownie.jpg",
    alt: "Bites de brownie com casca de chocolate ao leite e recheio de Nutella, um cortado ao meio",
    category: "brownies",
  },
  {
    slug: "bombom-de-galak-negresco",
    name: "Bombom de galak negresco",
    description:
      "Bombom de brownie com creme de Negresco e cobertura de chocolate branco Galak.",
    image: "/img/brownie-negresco.jpg",
    alt: "Bombons de brownie com creme de Negresco e cobertura de chocolate branco Galak",
    category: "brownies",
  },
  {
    slug: "coracao-de-chocolate-com-castanhas",
    name: "Coração de Chocolate com Castanhas",
    description:
      "Coração de chocolate ao leite recheado e coberto com crocante de castanhas — perfeito para presentear.",
    image: "/img/coracao.jpg?v=2",
    alt: "Corações de chocolate ao leite decorados com castanhas picadas sobre tábua de madeira",
    category: "encomendas",
    badge: "Para presentear",
  },
  {
    slug: "docinhos-para-festa",
    name: "Docinhos para Festa",
    description:
      "Beijinhos, brigadeiros gourmet e docinhos delicados para deixar a sua festa ainda mais doce.",
    image: "/img/doces-festa.jpg",
    alt: "Caixas abertas com centenas de beijinhos, brigadeiros e docinhos rosas para festa",
    category: "encomendas",
    badge: "Sob encomenda",
  },
  {
    slug: "brigadeiros-gourmet",
    name: "Brigadeiros Gourmet",
    description:
      "Brigadeiros artesanais enrolados à mão no ponto perfeito de chocolate — com granulado ou amendoim.",
    image: "/img/brigadeiros.jpg",
    alt: "Caixas de brigadeiros gourmet com granulado de chocolate e pedacinhos de amendoim",
    category: "caixas",
  },
  {
    slug: "caixa-especial-moces",
    name: "Caixa Especial Moces",
    description:
      "Caixa de presente com uma seleção especial: brigadeiros, brownies, morangos, uvas, marshmallows, cookies e recheios cremosos.",
    image: "/img/caixa-doces.jpg",
    alt: "Caixa vermelha de presente dividida com brigadeiros, brownies, morangos, uvas, marshmallows, cookies e potes de recheio",
    category: "caixas",
    badge: "Presente perfeito",
  },
  {
    slug: "ovo-de-pascoa-de-colher",
    name: "Ovo de Páscoa de Colher",
    description:
      "Casca de chocolate ao leite recheada com creme e coco fresco, acompanhada de brigadeiros artesanais.",
    image: "/img/ovo-pascoa.jpg",
    alt: "Ovo de Páscoa de colher com coco fresco e brigadeiros artesanais em caixa branca",
    category: "sazonais",
    badge: "Sazonal",
  },
  {
    slug: "chocotone",
    name: "Chocotone",
    description:
      "Chocotone artesanal com gotas de chocolate — perfeito para presentear.",
    image: "/img/chocotone.jpg?v=2",
    alt: "Chocotone artesanal com gotas de chocolate cortado ao meio sobre tábua de madeira",
    category: "sazonais",
    badge: "Sazonal",
  },
];
