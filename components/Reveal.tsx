"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import useInView from "@/lib/useInView";

interface RevealProps {
  children: ReactNode;
  className?: string;
  /** Atraso em milissegundos para escalonar a entrada de vários blocos. */
  delay?: number;
}

/**
 * Anima a entrada do conteúdo (fade in + slide up) quando ele aparece na tela.
 * Respeita "prefers-reduced-motion".
 */
export default function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className={[className, inView ? "is-visible" : ""].filter(Boolean).join(" ")}
      data-reveal
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
