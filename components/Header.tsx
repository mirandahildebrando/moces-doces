"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { CloseIcon, MenuIcon, WhatsAppIcon } from "./icons";

const navItems = [
  { href: "#inicio", label: "Início" },
  { href: "#vitrine", label: "Vitrine" },
  { href: "#encomendas", label: "Encomendas" },
];

/**
 * Cabeçalho fixo: transparente sobre o vídeo do hero e sólido ao rolar a página.
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    // Trava o scroll do fundo enquanto o painel mobile está aberto.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  const headerClass = [
    styles.header,
    scrolled || open ? styles.solid : styles.transparent,
  ].join(" ");

  return (
    <header className={headerClass}>
      <div className={`container ${styles.inner}`}>
        <a
          href="#inicio"
          className={styles.brand}
          onClick={() => setOpen(false)}
          aria-label={`${site.name} — voltar ao início`}
        >
          {/* Logo oficial da marca em duas versões transparentes (geradas por
              scripts/make-logo.ps1): a clara aparece sobre o vídeo do hero e a
              colorida quando o header fica sólido — troca com fade, sem "placa". */}
          <span className={styles.brandLogoWrap}>
            <Image
              src="/img/logo-moces-header.png"
              alt=""
              width={387}
              height={186}
              loading="eager"
              fetchPriority="low"
              className={`${styles.brandLogo} ${styles.brandLogoDark}`}
            />
            <Image
              src="/img/logo-moces-header-light.png"
              alt=""
              width={387}
              height={186}
              preload
              aria-hidden
              className={`${styles.brandLogo} ${styles.brandLogoLight}`}
            />
          </span>
        </a>

        <nav className={styles.nav} aria-label="Navegação principal">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className={styles.navLink}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <a
            className={`btn btn--primary btn--sm ${styles.cta}`}
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={16} />
            Fazer Pedido
          </a>

          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {open ? (
        <div id="menu-mobile" className={styles.panel}>
          <nav className={styles.panelNav} aria-label="Navegação (celular)">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={styles.panelLink}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#galeria"
              className={styles.panelLink}
              onClick={() => setOpen(false)}
            >
              Doces em movimento
            </a>
          </nav>

          <a
            className="btn btn--primary btn--block"
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
          >
            <WhatsAppIcon size={16} />
            Fazer Pedido pelo WhatsApp
          </a>
        </div>
      ) : null}
    </header>
  );
}
