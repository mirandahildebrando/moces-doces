"use client";

import { useEffect, useState, type RefObject } from "react";

interface InViewOptions {
  /** Fração do elemento que precisa estar visível. */
  threshold?: number;
  /** Margem virtual do viewport (ex.: "0px 0px -8% 0px"). */
  rootMargin?: string;
}

/**
 * Observa um elemento e retorna true quando ele entra na tela (Intersection Observer).
 * Com "prefers-reduced-motion: reduce" retorna true imediatamente, sem observar nada —
 * mesmo comportamento das animações de entrada do site.
 */
export default function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { threshold = 0.12, rootMargin = "0px 0px -8% 0px" }: InViewOptions = {}
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return inView;
}
