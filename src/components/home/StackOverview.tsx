import { Link } from "@/components/IntentLink";
import { skillGroups } from "@/data/skills";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";
import styles from "./StackOverview.module.css";

const rows = [
  { label: "Build", items: skillGroups.frontend.slice(0, 4) },
  { label: "Server", items: ["Node.js", "Python · Flask", "MySQL", "PostgreSQL", "Supabase"] },
  { label: "Automate", items: ["n8n", "Make.com", "OpenAI API", "Groq API"] },
  { label: "Move", items: ["GSAP", "Framer Motion", "Lenis", "Three.js"] },
  { label: "Ship", items: ["Docker", "Git", "CI/CD", "Vercel", "cPanel"] },
];

/** Home: the stack at a glance as an editorial index; the full bento lives on /skills. */
export function StackOverview() {
  return (
    <section className={`section ${styles.stack}`} aria-labelledby="stack-title">
      <div className="container">
        <SectionHead index="03" label="Stack" id="stack-title">
          Tools I reach for, <em>daily</em>.
        </SectionHead>
        <ol className={styles.rows}>
          {rows.map((row, i) => (
            <Reveal as="li" key={row.label} delay={i * 0.05} className={styles.row}>
              <span className={`${styles.verb} serif italic`}>{row.label}</span>
              <span className={styles.items}>
                {row.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </span>
            </Reveal>
          ))}
        </ol>
        <Link href="/skills" className={`${styles.more} btn btn--ghost`}>
          All skills &amp; tools <span className="btn__arrow" aria-hidden="true">→</span>
        </Link>
      </div>
    </section>
  );
}
