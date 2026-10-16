"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./Showcase.module.css";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { SparkleIcon } from "./icons";
import { categories, products, type CategoryId } from "@/lib/products";

type FilterId = CategoryId | "todos";

/**
 * Vitrine de produtos — SEM PREÇOS (regra de negócio).
 * Filtros por categoria + animação escalonada dos cards ao entrar na tela.
 */
export default function Showcase() {
  const [filter, setFilter] = useState<FilterId>("todos");
  const gridRef = useRef<HTMLDivElement>(null);
  const revealedRef = useRef(false);

  const filtered = useMemo(
    () => (filter === "todos" ? products : products.filter((item) => item.category === filter)),
    [filter]
  );

  // Revela os cards quando a vitrine entra na tela.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      grid.classList.add("is-visible");
      revealedRef.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          grid.classList.add("is-visible");
          revealedRef.current = true;
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 }
    );

    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  // Reanima os cards sempre que o filtro muda.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !revealedRef.current) return;

    grid.classList.remove("is-visible");
    const frame = requestAnimationFrame(() => grid.classList.add("is-visible"));
    return () => cancelAnimationFrame(frame);
  }, [filter]);

  return (
    <section id="vitrine" className={`section ${styles.section}`}>
      <div className="container">
        <Reveal>
          <SectionHeader
            eyebrow="Vitrine"
            title="Escolha seus favoritos"
            lead="Trufas, bolos no pote, brigadeiros gourmet e encomendas especiais — tudo feito à mão, em pequenas fornadas, com ingredientes selecionados e chocolate de verdade."
          />
        </Reveal>

        <Reveal delay={80}>
          <div className={styles.filters} role="group" aria-label="Filtrar doces por categoria">
            {categories.map((category) => {
              const active = filter === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  className={`${styles.chip} ${active ? styles.chipActive : ""}`}
                  aria-pressed={active}
                  onClick={() => setFilter(category.id)}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <p className="sr-only" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "doce exibido" : "doces exibidos"}
        </p>

        <div ref={gridRef} className={styles.grid}>
          {filtered.map((product, index) => (
            <ProductCard key={product.slug} product={product} index={index} />
          ))}
        </div>

        <Reveal delay={60}>
          <p className={styles.note}>
            <SparkleIcon size={18} className={styles.noteIcon} />
            <span>
              <strong>Sem valores no site.</strong> A disponibilidade do dia e os valores são
              informados pelo WhatsApp, para cuidarmos de cada pedido pessoalmente.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
