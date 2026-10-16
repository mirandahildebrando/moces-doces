# Moces Doces — Landing Page

Vitrine sofisticada para a confeitaria artesanal **Moces Doces** (Vila Matilde, SP).
O site **não tem banco de dados, carrinho de compras nem preços**: ele apresenta os doces
e direciona 100% dos pedidos para o **WhatsApp**.

## Stack

- **Next.js 16** (App Router + Turbopack) — pronto para deploy na Vercel
- **React 19** + **TypeScript**
- **CSS Modules** + tokens de design em `app/globals.css` (sem framework de CSS)
- **next/image** (fotos otimizadas em AVIF/WebP na Vercel) e `next/font` (Playfair Display + Inter)

## Rodando localmente

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de produção (rotas estáticas)
npm start       # serve o build
```

## Regras de negócio (importantes)

1. **Nenhum preço aparece no site.** Valores e disponibilidade só pelo WhatsApp — a vitrine
   tem até uma observação explicando isso ao cliente.
2. **Todo pedido vai para o WhatsApp:** `https://wa.me/5511915957904?text=...`
   (centralizado em `lib/whatsapp.ts`; cada card já preenche a mensagem com o nome do doce).
3. **Não estamos em aplicativos de delivery** — atendimento exclusivo e personalizado pelo WhatsApp
   (destacado na seção "Como pedir").
4. **Retirada em Vila Matilde, SP** com entrega local combinada na conversa.
5. **Instagram:** [@mocesdoces](https://www.instagram.com/mocesdoces)
6. **Contato:** 11 9 1595-7904

## Estrutura

```
app/
  layout.tsx            → fontes, metadata (SEO) e idioma pt-BR
  page.tsx              → monta as seções + dados estruturados (Schema.org Bakery)
  globals.css           → design tokens, reset, botões, .enhance-img, animações
  not-found.tsx         → página 404 com a identidade da marca
  robots.ts / sitemap.ts
  opengraph-image.tsx   → imagem de compartilhamento gerada no build
  icon.svg              → favicon
components/
  Header.tsx            → navbar fixa (transparente no topo, sólida ao rolar) + menu mobile
  Hero.tsx              → cena de 100vh com vídeo em autoplay silencioso + overlay
  Showcase.tsx          → vitrine com filtros por categoria (SEM PREÇOS)
  ProductCard.tsx       → card do doce + botão "Pedir pelo WhatsApp"
  MotionGallery.tsx     → galeria de vídeos (tocam só quando visíveis)
  HowToOrder.tsx        → "Como pedir" em 3 passos + destaque do atendimento exclusivo
  Footer.tsx            → redes sociais, endereço, contato e copyright
  Reveal.tsx            → animação de entrada (fade in / slide up) via IntersectionObserver
  LazyVideo.tsx         → vídeo que só reproduz quando entra na tela
  SectionHeader.tsx / icons.tsx
lib/
  site.ts               → nome, telefone, Instagram, endereço, URL pública
  whatsapp.ts           → geração dos links wa.me com mensagem pré-preenchida
  products.ts           → catálogo da vitrine (edite aqui para add/remover doces)
  useInView.ts          → hook compartilhado do Intersection Observer
public/img/             → fotos, vídeos e a logo usados pelo site
scripts/
  make-logo.ps1         → gera as duas versões transparentes da logo do header (ver abaixo)
```

## Como editar o conteúdo

- **Adicionar/remover/reordenar doces:** edite `lib/products.ts` (nome, descrição, categoria,
  selo e caminho da imagem). Nenhum preço deve ser adicionado.
- **Trocar uma foto:** substitua o arquivo em `public/img/` mantendo o mesmo nome,
  ou aponte um caminho novo em `lib/products.ts`.
- **Trocar o vídeo do hero:** substitua `public/img/hero-moces.mp4` (mantenha o mesmo nome).
- **Textos das seções:** `components/Hero.tsx`, `Showcase.tsx`, `HowToOrder.tsx`, `Footer.tsx`.
- **Telefone/Instagram/endereço:** `lib/site.ts` (um único lugar).

## Deploy grátis na Vercel

**Opção A — pelo painel (recomendado):**

1. Crie um repositório no GitHub e envie este projeto (o `git` já está inicializado aqui):
   ```bash
   git remote add origin https://github.com/SEU_USUARIO/moces-doces.git
   git push -u origin main
   ```
2. Em [vercel.com/new](https://vercel.com/new), importe o repositório. A Vercel detecta o
   Next.js automaticamente — não precisa mudar nenhuma configuração. Clique em **Deploy**.
3. Depois do primeiro deploy, em **Settings → Environment Variables**, adicione
   `NEXT_PUBLIC_SITE_URL` com o domínio final (ex.: `https://mocesdoces.vercel.app`) e faça
   um novo deploy. Isso ajusta canonical, sitemap e a imagem de compartilhamento.

**Opção B — pela CLI:**

```bash
npx vercel        # primeiro deploy (preview)
npx vercel --prod # deploy de produção
```

## Notas sobre os assets

- A pasta original `img/` foi **mantida intacta como backup**; o site usa a cópia em `public/img/`.
  Se preferir ter uma única fonte de verdade, mova os arquivos para `public/img/` e apague `img/`.
- **Logo da marca:** o novo header não usa mais o emblema "M" — ele mostra a logo oficial
  em duas versões **transparentes** (sem fundo), geradas por `scripts/make-logo.ps1`:
  - `public/img/logo-moces-header.png` → cores originais, aparece quando o header fica sólido (creme);
  - `public/img/logo-moces-header-light.png` → silhueta clara, aparece sobre o vídeo escuro do hero
    (a troca entre as duas é um fade suave conforme a rolagem).
  O script detecta o conteúdo, corta a base do lockup (a linha miúda "DOCINHOS ARTESANAIS" fica
  ilegível em tamanho de navbar — o lettering "Moces" fica grande e nítido), recorta com margem mínima
  (deixando os enfeites rosas dos cantos de fora) e remove o fundo creme criando canal alfa com
  anti-aliasing suave. Para regenerar após trocar a logo original: `powershell -File scripts\make-logo.ps1`.
  Ele aceita `-DropTaglinePct` (0 = mantém o lockup completo), `-MarginPct`, `-T0`/`-T1` (limiares do
  alfa), `-LightHex` (cor da versão clara), `-OutHeight` e `-RealDarkH`/`-RealLightH`, e salva uma prévia
  de conferência em `%TEMP%\moces-logo-preview.jpg` (as duas versões ampliadas + uma faixa no tamanho
  real do header para checar a legibilidade).
- Os vídeos foram renomeados para nomes amigáveis na web (ex.: `motion-cake-slice.mp4`).
- O vídeo `From Klickpin.com- ... herb garden ... .mp4` foi **intencionalmente ignorado**:
  o conteúdo é sobre jardins, não sobre doces.
- O realce das fotos é feito via CSS (`.enhance-img` em `app/globals.css`), então os arquivos
  originais não são modificados.
- Nenhum vídeo passa por compressão/reencode neste momento (não há ffmpeg no ambiente).
  Se quiser arquivos menores, rode `ffmpeg -i entrada.mp4 -crf 28 -preset slow saida.mp4`
  antes de subir, ou hospede os vídeos em um serviço externo.

## Validação já realizada

- `npm run build` sem erros, todas as rotas prerenderizadas como estáticas
- HTML de produção verificado: vídeo do hero, 15 cards da vitrine, 0 ocorrências de "R$",
  links `wa.me/5511915957904` corretos, imagem OG (1200×630) gerada, `robots.txt` e `sitemap.xml` OK
- Animações de entrada com `prefers-reduced-motion` respeitado em todos os componentes
