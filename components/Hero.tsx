"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import { whatsappLink } from "@/lib/whatsapp";
import { ArrowDownIcon, WhatsAppIcon } from "./icons";

const badges = [
  "Docinhos a pronta entrega",
  "Encomendas exclusivas",
  "Retirada em Vila Matilde, SP",
];

/**
 * Cena principal: vídeo em tela cheia (100vh) com overlay para leitura do texto.
 * O vídeo entra com um fade suave sobre um fundo chocolate quando está pronto para tocar.
 */
export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Usuários que preferem menos movimento veem apenas o fundo elegante.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      return;
    }

    void video.play().catch(() => {
      /* autoplay bloqueado: mantemos o fundo e o overlay */
    });
  }, []);

  return (
    <section className={styles.hero} aria-label="Moces Doces — confeitaria artesanal">
      <div className={styles.videoWrap} aria-hidden="true">
        <video
          ref={videoRef}
          className={`${styles.video} ${ready ? styles.videoReady : ""}`}
          src="/img/hero-moces.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onCanPlay={() => setReady(true)}
        />
        <div className={styles.overlay} />
        <div className={styles.overlayGlow} />
      </div>

      <div className={`container ${styles.inner}`}>
        <p className={styles.eyebrow}>Confeitaria artesanal • Vila Matilde, SP</p>

        <h1 className={styles.title}>Adoçando seus momentos com arte e sabor.</h1>

        <p className={styles.lead}>Docinhos a pronta entrega e encomendas exclusivas.</p>

        <div className={styles.ctas}>
          <a className="btn btn--light" href="#vitrine">
            Ver Cardápio
          </a>
          <a
            className="btn btn--ghost-light"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={17} />
            Fazer Pedido
          </a>
        </div>

        <ul className={styles.badges}>
          {badges.map((badge) => (
            <li key={badge} className={styles.badge}>
              {badge}
            </li>
          ))}
        </ul>
      </div>

      <a className={styles.scrollCue} href="#vitrine" aria-label="Rolar para a vitrine">
        <span className={styles.cueLabel}>Vitrine</span>
        <ArrowDownIcon size={18} className={styles.cueIcon} />
      </a>
    </section>
  );
}
