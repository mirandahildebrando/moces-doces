import Image from "next/image";
import styles from "./HowToOrder.module.css";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";
import { IFoodIcon, SparkleIcon, WhatsAppIcon } from "./icons";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";

const steps = [
  {
    title: "Escolha seus doces na vitrine",
    text: "Navegue pelas fotos, escolha seus favoritos e toque em “Pedir pelo WhatsApp” ou “Pedir no iFood”.",
  },
  {
    title: "Chame no WhatsApp ou no iFood",
    text: "Enviamos os valores e a disponibilidade do dia pelo WhatsApp, ou você pede direto no app do iFood.",
  },
  {
    title: "Combine a retirada ou entrega",
    text: "Retirada em Vila Matilde, SP, ou entrega local combinada diretamente na conversa.",
  },
];

/**
 * Seção de encomendas: como pedir em 3 passos + destaque dos canais de
 * atendimento (WhatsApp e iFood).
 */
export default function HowToOrder() {
  return (
    <section id="encomendas" className="section section--bg-alt">
      <div className={`container ${styles.layout}`}>
        <Reveal>
          <div>
            <SectionHeader
              eyebrow="Encomendas"
              title="Como pedir é simples"
              lead="Sem carrinho e sem complicação: você pede pelo WhatsApp ou pelo iFood e fala diretamente com quem faz os seus doces."
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
                src="/img/caixa-doces.jpg"
                alt="Caixa vermelha da Moces com brigadeiros, brownies, morangos, uvas, marshmallows, cookies e potes de recheio"
                fill
                sizes="(max-width: 960px) 92vw, 430px"
                className={`${styles.archImage} enhance-img`}
              />
            </div>

            <div className={styles.highlight}>
              <h3 className={styles.highlightTitle}>
                <SparkleIcon size={18} className={styles.highlightIcon} />
                WhatsApp e iFood
              </h3>
              <p className={styles.highlightText}>
                Você pode pedir direto pelo WhatsApp ou pelo iFood. Cada pedido é atendido
                pessoalmente, do primeiro “oi” até a combinação da retirada ou entrega.
              </p>
              <div className={styles.highlightActions}>
                <a
                  className="btn btn--primary"
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={17} />
                  Falar no WhatsApp
                </a>
                <a
                  className="btn btn--primary"
                  href={site.iFoodUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IFoodIcon size={17} />
                  Pedir no iFood
                </a>
              </div>
            </div>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}
