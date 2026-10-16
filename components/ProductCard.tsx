import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./ProductCard.module.css";
import { WhatsAppIcon } from "./icons";
import { categoryLabels, type Product } from "@/lib/products";
import { productWhatsAppLink } from "@/lib/whatsapp";

interface ProductCardProps {
  product: Product;
  index: number;
}

/**
 * Card da vitrine: foto real do doce (com o realce .enhance-img),
 * nome, descrição curta e botão "Pedir pelo WhatsApp". Nenhum preço é exibido.
 */
export default function ProductCard({ product, index }: ProductCardProps) {
  return (
    <article
      className={styles.card}
      data-card
      style={{ "--card-delay": `${Math.min(index, 8) * 65}ms` } as CSSProperties}
    >
      <div className={styles.media}>
        <Image
          src={product.image}
          alt={product.alt}
          fill
          sizes="(max-width: 560px) 92vw, (max-width: 1024px) 44vw, 285px"
          className={`${styles.image} enhance-img`}
        />
        {product.badge ? <span className={styles.badge}>{product.badge}</span> : null}
      </div>

      <div className={styles.body}>
        <p className={styles.tag}>{categoryLabels[product.category]}</p>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.desc}>{product.description}</p>

        <a
          className={`btn btn--wa btn--sm btn--block ${styles.cta}`}
          href={productWhatsAppLink(product.name)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon size={16} />
          Pedir pelo WhatsApp
        </a>
      </div>
    </article>
  );
}
