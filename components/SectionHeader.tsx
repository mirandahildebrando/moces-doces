import styles from "./SectionHeader.module.css";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  lead?: string;
  /** "dark" para seções claras, "light" para seções escuras. */
  tone?: "dark" | "light";
  align?: "left" | "center";
}

export default function SectionHeader({
  eyebrow,
  title,
  lead,
  tone = "dark",
  align = "left",
}: SectionHeaderProps) {
  return (
    <header className={`${styles.header} ${styles[tone]} ${styles[align]}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      {lead ? <p className={styles.lead}>{lead}</p> : null}
    </header>
  );
}
