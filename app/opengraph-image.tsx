import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";
import { site } from "@/lib/site";

export const alt = "Moces Doces — Confeitaria Artesanal em Vila Matilde, SP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* A mesma logo do topo do site (variante clara, usada sobre o vídeo do hero).
   O Satori — motor do ImageResponse — não lê arquivos do disco, só imagem remota
   ou data URI, então o PNG é lido no build e embutido em base64. */
const logoData = await readFile(
  join(process.cwd(), "public/img/logo-moces-header-light.png"),
  "base64"
);
const logoSrc = `data:image/png;base64,${logoData}`;

/* Mesmos tokens de `app/globals.css` — o card acompanha a identidade do site.
   A tipografia do card fica na fonte padrão do Satori: ele só aceita TTF/OTF
   embarcado, e as fontes da marca são carregadas via `next/font`. */
const palette = {
  choco: "#2a1810",
  cream: "#fff8ee",
  creamDeep: "#f0dcb0",
  gold: "#d4a94f",
} as const;

/**
 * Imagem de compartilhamento (Open Graph / WhatsApp / Instagram),
 * gerada no build com a identidade da marca.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: palette.choco,
          color: palette.cream,
          padding: 64,
          textAlign: "center",
        }}
      >
        <img src={logoSrc} width={430} height={261} alt="" />

        <div
          style={{
            display: "flex",
            width: 170,
            height: 2,
            backgroundColor: palette.gold,
            margin: "34px 0 38px",
          }}
        />

        <div style={{ display: "flex", fontSize: 38, color: palette.creamDeep }}>
          Docinhos a pronta entrega e encomendas exclusivas
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 27,
            marginTop: 24,
            letterSpacing: 1,
            color: palette.gold,
          }}
        >
          {site.name} · Pedidos pelo WhatsApp · Vila Matilde, SP
        </div>
      </div>
    ),
    size
  );
}
