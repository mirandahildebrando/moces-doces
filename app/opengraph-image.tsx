import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = "Moces Doces — Confeitaria Artesanal em Vila Matilde, SP";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          backgroundColor: "#2c1d13",
          color: "#f8f2e9",
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
            color: "#c1974a",
            marginBottom: 26,
          }}
        >
          Confeitaria Artesanal
        </div>

        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>
          {site.name}
        </div>

        <div style={{ display: "flex", width: 170, height: 2, backgroundColor: "#c1974a", margin: "38px 0" }} />

        <div style={{ display: "flex", fontSize: 36, color: "#e8d7b2" }}>
          Docinhos a pronta entrega e encomendas exclusivas
        </div>

        <div style={{ display: "flex", fontSize: 27, marginTop: 22, color: "#c1974a" }}>
          Pedidos pelo WhatsApp · Vila Matilde, SP
        </div>
      </div>
    ),
    size
  );
}
