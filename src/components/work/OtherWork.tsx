import { otherWork } from "@/data/projects";
import { Reveal } from "../Reveal";
import styles from "./OtherWork.module.css";

/** CV projects that have no public URL — listed as a typographic index, never with invented links. */
export function OtherWork() {
  return (
    <div className={styles.other}>
      <Reveal>
        <h2 className={styles.otherTitle}>
          Beyond the browser <span className="serif italic">— systems &amp; apps</span>
        </h2>
        <p className={styles.otherLede}>
          Work from my CV with no public link to show — internal systems, mobile apps and client platforms.
        </p>
      </Reveal>
      <ul className={styles.otherList}>
        {otherWork.map((item, i) => (
          <Reveal as="li" key={item.name} delay={i * 0.04} className={styles.otherRow}>
            <span className="mono">{String(i + 1).padStart(2, "0")}</span>
            <span className={styles.otherName}>{item.name}</span>
            <span className={styles.otherDetail}>{item.detail}</span>
            <span className={styles.otherTech}>
              {item.tech.map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
