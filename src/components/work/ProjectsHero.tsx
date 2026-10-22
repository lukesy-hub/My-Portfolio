import Image from "next/image";
import { Link } from "@/components/IntentLink";
import { categories, projects } from "@/data/projects";
import { GlitchLabel } from "../SectionHead";
import styles from "./ProjectsHero.module.css";

const deckSlugs = ["natural-languages-1", "layaan", "rodo", "dopamine", "kariss-tax"];
const deck = deckSlugs.map((slug) => projects.find((p) => p.slug === slug)!);

// Counts derived from the data — nothing typed in by hand.
const stats = [
  { value: projects.length, label: "Live projects" },
  { value: categories.length, label: "Industries" },
  { value: new Set(projects.map((p) => p.location).filter(Boolean)).size, label: "Places served" },
];

/** /projects header: headline, data-driven counts and a fanned deck of real screenshots. */
export function ProjectsHero() {
  return (
    <header className={styles.hero}>
      <div className={styles.copy}>
        <p className={`${styles.kicker} mono`}>
          <span>01</span>
          <GlitchLabel text="Projects" />
        </p>
        <h1 id="projects-title" className={`${styles.title} h-page`}>
          The <em>work</em>,<br />
          in full.
        </h1>
        <p className={styles.lede}>
          Every site here is live. Filter by industry, search by city or stack, switch to the index view — or open a case
          study to scroll through the full page.
        </p>
        <dl className={styles.stats}>
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="mono">{s.label}</dt>
              <dd>{String(s.value).padStart(2, "0")}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className={styles.deckWrap}>
        <ul className={styles.deck} aria-label="A few recent projects">
          {deck.map((p, i) => (
            <li key={p.slug} className={styles.card} style={{ "--i": i - 2, "--tint": p.tint } as React.CSSProperties}>
              <Link href={`/projects/${p.slug}`} className={styles.cardLink}>
                <span className={styles.bar} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <Image
                  src={`/work/${p.slug}.webp`}
                  alt={`${p.name} homepage`}
                  width={1440}
                  height={900}
                  sizes="(max-width: 900px) 70vw, 420px"
                  preload={i === 2}
                />
                <span className={`${styles.label} mono`}>{p.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
