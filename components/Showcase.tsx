"use client";

import { useMemo, useRef, useState } from "react";
import styles from "./Showcase.module.css";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { SparkleIcon } from "./icons";
import { categories, products, type CategoryId } from "@/lib/products";
import useInView from "@/lib/useInView";

type FilterId = CategoryId | "todos";

/**
 * Vitrine de produtos — SEM PREÇOS (regra de negócio).
 * Filtros por categoria + animação escalonada dos cards ao entrar na tela.
 * O `key` de cada card inclui o filtro atual: trocar de categoria remonta a grade
 * e repete a animação de entrada, enquanto a classe .is-visible da grade permanece.
 */
export default function Showcase() {
  const [filter, setFilter] = useState<FilterId>("todos");
  const gridRef = useRef<HTMLDivElement>(null);
  // threshold 0 de propósito: no celular a grade passa de 10.000px de altura e
  // qualquer fração mínima (ex.: 5%) exigiria centenas de px de rolagem até revelar os cards.
  const revealed = useInView(gridRef, { threshold: 0, rootMargin: "0px 0px -6% 0px" });

  const filtered = useMemo(
    () => (filter === "todos" ? products : products.filter((item) => item.category === filter)),
    [filter]
  );

  return (
    <section id="vitrine" className="section section--bg">
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

        <div
          ref={gridRef}
          className={[styles.grid, revealed ? "is-visible" : ""].filter(Boolean).join(" ")}
        >
          {filtered.map((product, index) => (
            <ProductCard key={`${filter}-${product.slug}`} product={product} index={index} />
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
