import styles from "./Footer.module.css";
import { site } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { InstagramIcon, WhatsAppIcon } from "./icons";

const navLinks = [
  { href: "#inicio", label: "Início" },
  { href: "#vitrine", label: "Vitrine" },
  { href: "#galeria", label: "Doces em movimento" },
  { href: "#encomendas", label: "Encomendas" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.top}`}>
        <div className={styles.brandCol}>
          <p className={styles.brandName}>{site.name}</p>
          <p className={styles.brandTag}>{site.tagline}</p>
          <p className={styles.brandText}>
            Docinhos a pronta entrega e encomendas exclusivas, feitos à mão em Vila Matilde, SP.
            Pedidos e informações somente pelo WhatsApp.
          </p>
        </div>

        <nav aria-label="Links do rodapé">
          <h3 className={styles.colTitle}>Navegue</h3>
          <ul className={styles.list}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <a className={styles.link} href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className={styles.colTitle}>Contato</h3>
          <ul className={styles.list}>
            <li>
              <a
                className={styles.link}
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon size={16} />
                Instagram {site.instagramHandle}
              </a>
            </li>
            <li>
              <a
                className={styles.link}
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon size={16} />
                {site.phoneDisplay}
              </a>
            </li>
            <li className={styles.address}>
              Retiradas em {site.pickupLocation} — entregas locais combinadas pelo WhatsApp.
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <p>
          © {year} {site.name} — {site.tagline}. Todos os direitos reservados.
        </p>
        <p>Feito com carinho em São Paulo.</p>
      </div>
    </footer>
  );
}
