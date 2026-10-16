import Image from "next/image";
import styles from "./HowToOrder.module.css";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { SparkleIcon, WhatsAppIcon } from "./icons";
import { whatsappLink } from "@/lib/whatsapp";

const steps = [
  {
    title: "Escolha seus doces na vitrine",
    text: "Navegue pelas fotos, escolha seus favoritos e toque em “Pedir pelo WhatsApp”.",
  },
  {
    title: "Chame no WhatsApp",
    text: "Enviamos os valores, a disponibilidade do dia e ajudamos a montar o pedido ideal.",
  },
  {
    title: "Combine a retirada ou entrega",
    text: "Retirada em Vila Matilde, SP, ou entrega local combinada diretamente na conversa.",
  },
];

/**
 * Seção de encomendas: como pedir em 3 passos + destaque de atendimento
 * exclusivo pelo WhatsApp (não estamos em aplicativos de delivery).
 */
export default function HowToOrder() {
  return (
    <section id="encomendas" className={`section ${styles.section}`}>
      <div className={`container ${styles.layout}`}>
        <Reveal>
          <div>
            <SectionHeader
              eyebrow="Encomendas"
              title="Como pedir é simples"
              lead="Sem aplicativos, sem carrinho e sem complicação: você fala diretamente com quem faz os seus doces."
            />

            <ol className={styles.steps}>
              {steps.map((step, index) => (
                <li key={step.title} className={styles.step}>
                  <span className={styles.num} aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepText}>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <aside className={styles.aside}>
            <div className={styles.arch}>
              <Image
                src="/img/bolo.png"
                alt="Fatia de bolo de chocolate trufado com morangos e castanhas"
                fill
                sizes="(max-width: 960px) 92vw, 430px"
                className={`${styles.archImage} enhance-img`}
              />
            </div>

            <div className={styles.highlight}>
              <h3 className={styles.highlightTitle}>
                <SparkleIcon size={18} className={styles.highlightIcon} />
                Atendimento exclusivo pelo WhatsApp
              </h3>
              <p className={styles.highlightText}>
                Não estamos em aplicativos de delivery no momento. Cada pedido é atendido
                pessoalmente, do primeiro “oi” até a combinação da retirada ou entrega.
              </p>
              <a
                className="btn btn--primary"
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={17} />
                Falar no WhatsApp
              </a>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
