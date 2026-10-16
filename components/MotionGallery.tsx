import styles from "./MotionGallery.module.css";
import LazyVideo from "./LazyVideo";
import Reveal from "./Reveal";
import SectionHeader from "./SectionHeader";

const clips = [
  { src: "/img/video-moces-1080p.mp4", caption: "Feito à mão, todos os dias" },
  { src: "/img/motion-cake-slice.mp4", caption: "Camadas de bolo trufado" },
  { src: "/img/motion-dessert.mp4", caption: "Texturas que dão água na boca" },
  { src: "/img/motion-gourmet.mp4", caption: "Chocolate em primeiro plano" },
];

/**
 * Galeria em vídeo: os clipes só rodam quando entram na tela (LazyVideo).
 */
export default function MotionGallery() {
  return (
    <section id="galeria" className={`section ${styles.section}`} aria-label="Galeria em vídeo">
      <div className="container">
        <Reveal>
          <SectionHeader
            tone="light"
            eyebrow="Galeria"
            title="Doces em movimento"
            lead="Um close nos detalhes: camadas, texturas e chocolate derretendo — do jeitinho que sai da nossa cozinha."
          />
        </Reveal>

        <Reveal delay={110}>
          <div className={styles.grid}>
            {clips.map((clip) => (
              <figure key={clip.src} className={styles.tile}>
                <LazyVideo src={clip.src} className={styles.video} />
                <figcaption className={styles.caption}>{clip.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
