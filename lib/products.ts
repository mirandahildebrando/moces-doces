/**
 * Catálogo da vitrine (SEM PREÇOS — regra de negócio).
 * Cada item aponta para uma foto real em /public/img e gera um link de WhatsApp
 * com a mensagem já preenchida com o nome do doce.
 *
 * Para incluir/remover doces, basta editar esta lista.
 * Para trocar uma foto, substitua o arquivo correspondente em /public/img.
 */

export type CategoryId = "trufas" | "potes" | "encomendas" | "caixas" | "sazonais";

export interface Product {
  slug: string;
  name: string;
  description: string;
  /** Caminho da imagem dentro de /public (ex.: /img/trufa.jpg). */
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
  { id: "encomendas", label: "Encomendas" },
  { id: "caixas", label: "Caixas & Brigadeiros" },
  { id: "sazonais", label: "Sazonais" },
];

export const categoryLabels: Record<CategoryId, string> = {
  trufas: "Trufas & Morangos",
  potes: "Bolos no Pote",
  encomendas: "Encomendas",
  caixas: "Caixas & Brigadeiros",
  sazonais: "Sazonais",
};

export const products: Product[] = [
  {
    slug: "trufa-de-morango",
    name: "Trufa de Morango",
    description:
      "Chocolate ao leite com recheio cremoso de morango fresco e um toque de chocolate branco.",
    image: "/img/trufa.jpg",
    alt: "Trufa de chocolate ao leite recheada com morango fresco e chocolate branco",
    category: "trufas",
    badge: "Favorito da casa",
  },
  {
    slug: "trufa-de-oreo",
    name: "Trufa de Oreo",
    description:
      "Camadas de chocolate branco, ganache e Oreo triturado — crocância e cremosidade na mesma mordida.",
    image: "/img/trufa3.jpg",
    alt: "Trufa cremosa de chocolate branco com camadas de Oreo e ganache",
    category: "trufas",
  },
  {
    slug: "trufas-recheadas-sortidas",
    name: "Trufas Recheadas Sortidas",
    description:
      "Sortimento autoral: pistache com frutas vermelhas, Nutella, paçoca e doce de leite.",
    image: "/img/trufa4.jpg",
    alt: "Trufas artesanais abertas mostrando recheios de pistache, Nutella, paçoca e doce de leite",
    category: "trufas",
  },
  {
    slug: "morango-cravejado",
    name: "Morango Cravejado",
    description:
      "Morangos frescos mergulhados em chocolate branco com crocante de morango e framboesa.",
    image: "/img/morangocravejado.jpg",
    alt: "Morangos frescos cobertos com chocolate branco cravejado de morango e framboesa",
    category: "trufas",
    badge: "Novidade",
  },
  {
    slug: "bolo-no-pote-de-morango",
    name: "Bolo no Pote de Morango",
    description: "Bolo fofinho, morangos frescos e chantilly cremoso em camadas generosas.",
    image: "/img/bolopote2.jpg",
    alt: "Bolo no pote com morangos frescos e chantilly",
    category: "potes",
  },
  {
    slug: "bolo-no-pote-trufado",
    name: "Bolo no Pote Trufado",
    description:
      "Bolo de chocolate, ganache trufada, creme de ninho e morango — o clássico da casa.",
    image: "/img/pote.jpg",
    alt: "Pote trufado com camadas de chocolate, creme de ninho e morango",
    category: "potes",
  },
  {
    slug: "bolo-no-pote-de-kitkat",
    name: "Bolo no Pote de KitKat",
    description: "Chocolate meio amargo, creme de ninho e pedaços crocantes de KitKat.",
    image: "/img/doce1.jpg",
    alt: "Bolo no pote de chocolate com pedaços crocantes de KitKat",
    category: "potes",
  },
  {
    slug: "cheesecake-de-limao-no-pote",
    name: "Cheesecake de Limão no Pote",
    description: "Base de biscoito amanteigado, creme aveludado de limão e chantilly.",
    image: "/img/bolopote3.jpg",
    alt: "Cheesecake de limão no pote com base de biscoito e chantilly",
    category: "potes",
  },
  {
    slug: "pote-de-frutas-vermelhas",
    name: "Pote de Frutas Vermelhas",
    description: "Compota artesanal de frutas vermelhas com creme de ninho e bolo fofinho.",
    image: "/img/pote3.jpg",
    alt: "Pote com compota de frutas vermelhas, creme de ninho e bolo, com o rótulo Moces Doces",
    category: "potes",
  },
  {
    slug: "bolo-trufado-com-morango",
    name: "Bolo Trufado com Morango",
    description:
      "Bolo de chocolate trufado, morangos frescos, paçoca triturada e fios de Nutella. Ideal para festas e datas especiais.",
    image: "/img/trufado.jpg",
    alt: "Bolo trufado de chocolate com morangos, paçoca e Nutella",
    category: "encomendas",
    badge: "Sob encomenda",
  },
  {
    slug: "coracao-de-chocolate-com-castanhas",
    name: "Coração de Chocolate com Castanhas",
    description:
      "Para presentear: coração de chocolate ao leite recheado com crocante de castanhas.",
    image: "/img/coracao.jpg",
    alt: "Corações de chocolate ao leite com castanhas picadas",
    category: "encomendas",
  },
  {
    slug: "brigadeiros-classicos",
    name: "Brigadeiros Clássicos",
    description: "Caixa de brigadeiros artesanais enrolados à mão, no ponto perfeito de chocolate.",
    image: "/img/brigadeiro.jpg",
    alt: "Caixa de brigadeiros gourmet clássicos enrolados à mão",
    category: "caixas",
  },
  {
    slug: "caixa-de-brigadeiros-sortidos",
    name: "Caixa de Brigadeiros Sortidos",
    description: "Brigadeiro, beijinho, churros e KitKat: sortimento para agradar todo mundo.",
    image: "/img/brigadeiro2.jpg",
    alt: "Caixa de brigadeiros gourmet sortidos com beijinho, churros e KitKat",
    category: "caixas",
  },
  {
    slug: "ovo-de-pascoa-de-colher",
    name: "Ovo de Páscoa de Colher",
    description: "Casca de chocolate ao leite com recheio cremoso e brigadeiros artesanais.",
    image: "/img/ovopascoa.jpg",
    alt: "Ovo de Páscoa de colher com recheio cremoso e brigadeiros",
    category: "sazonais",
    badge: "Sazonal",
  },
  {
    slug: "mini-chocotone",
    name: "Mini Chocotone",
    description: "Mini chocotones artesanais com gotas de chocolate — perfeitos para presentear.",
    image: "/img/chocotone.jpg",
    alt: "Mini chocotones artesanais com gotas de chocolate",
    category: "sazonais",
    badge: "Sazonal",
  },
];
