"use client";

import { useEffect, useRef } from "react";

interface LazyVideoProps {
  src: string;
  className?: string;
}

/**
 * Vídeo decorativo da galeria: só reproduz quando está visível na tela
 * (economiza banda e evita processamento desnecessário no celular).
 */
export default function LazyVideo({ src, className }: LazyVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      muted
      loop
      playsInline
      preload="metadata"
      tabIndex={-1}
    />
  );
}
