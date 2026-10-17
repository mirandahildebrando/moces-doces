import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Moces Doces — Confeitaria Artesanal em Vila Matilde, SP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: 72,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: palette.gold,
            marginBottom: 26,
          }}
        >
          Confeitaria Artesanal
        </div>

        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>
          {site.name}
        </div>

        <div style={{ display: "flex", width: 170, height: 2, backgroundColor: palette.gold, margin: "38px 0" }} />

        <div style={{ display: "flex", fontSize: 36, color: palette.creamDeep }}>
          Docinhos a pronta entrega e encomendas exclusivas
        </div>

        <div style={{ display: "flex", fontSize: 27, marginTop: 22, color: palette.gold }}>
          Pedidos pelo WhatsApp · Vila Matilde, SP
        </div>
      </div>
    ),
    size
  );
}
