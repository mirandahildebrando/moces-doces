import Link from "next/link";
import styles from "./not-found.module.css";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * 404 da vitrine: mantém a identidade da marca e devolve um caminho de volta
 * (vitrine ou WhatsApp). Nenhum preço e nenhuma API de delivery são citados.
 */
export default function NotFound() {
  return (
    <main className="section">
      <div className="container">
        <div className={styles.wrap}>
          <p className={styles.code}>404</p>
          <p className="eyebrow">Página não encontrada</p>
          <h1 className={styles.title}>Esse doce saiu da fornada.</h1>
          <p className={styles.text}>
            O endereço que você tentou abrir não existe ou mudou de lugar. Volte para a vitrine
            para ver os doces do dia — ou fale com a gente no WhatsApp, respondemos rapidinho.
          </p>

          <div className={styles.actions}>
            <Link className="btn btn--primary" href="/">
              Ver a vitrine
            </Link>
            <a
              className="btn btn--wa"
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon size={16} />
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
