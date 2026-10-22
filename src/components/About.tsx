import Image from "next/image";
import { Link } from "@/components/IntentLink";
import { education } from "@/data/experience";
import { portrait, profile } from "@/data/profile";
import { Reveal } from "./Reveal";
import styles from "./About.module.css";

const approach = [
  {
    title: "End to end",
    body: "Server setup, database design and version control through UI, deployment and maintenance — one person accountable for the whole path.",
  },
  {
    title: "Design with intent",
    body: "Typography, motion and layout chosen for each brand — from a moody fragrance house to a 24/7 truck repair dispatch.",
  },
  {
    title: "Automate the boring",
    body: "n8n, Make.com and LLM APIs wired into CRMs, cloud workspaces and messaging so teams stop copying data by hand.",
  },
];

/** /about: background, approach and an at-a-glance spec sheet. */
export function About() {
  return (
    <div className={`container ${styles.grid}`}>
      <div className={styles.main}>
        <Reveal>
          <p className={styles.lead}>
            <span className="serif italic">Full stack developer</span> and AI automation engineer, based in Lahore.
          </p>
        </Reveal>
        <Reveal delay={0.05} className={styles.body}>
          <p>
            I deliver production web platforms, mobile applications and AI-driven workflow automations for clients across
            healthcare, finance and public-sector projects, along with websites for US local-service businesses and
            independent retail brands.
          </p>
          <p>
            Day to day that means React.js, Next.js, TypeScript and Node.js on the web, Flutter and React Native on mobile,
            and custom automation pipelines with n8n, Make.com and LLM APIs (OpenAI, Groq) that connect CRMs, cloud
            workspaces and messaging platforms.
          </p>
          <p>
            I’m comfortable owning a project end to end. Today I lead a development team at Syncognix — planning sprints,
            reviewing code and turning client requirements into technical decisions.
          </p>
        </Reveal>

        <ol className={styles.approach}>
          {approach.map((item, i) => (
            <Reveal as="li" key={item.title} delay={i * 0.08} className={styles.approachItem}>
              <span className={`${styles.approachNum} mono`}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className={styles.approachTitle}>{item.title}</h3>
              <p>{item.body}</p>
            </Reveal>
          ))}
        </ol>

        <div className={styles.links}>
          <Link href="/experience" className="btn">
            Career journey <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/projects" className="btn btn--ghost">
            See the work <span className="btn__arrow" aria-hidden="true">↗</span>
          </Link>
        </div>
      </div>

      <aside className={styles.spec} aria-label="Profile at a glance">
        <div className={styles.portrait}>
          <Image src={portrait.src} alt={portrait.alt} width={portrait.width} height={portrait.height} sizes="(max-width: 860px) 60vw, 300px" />
        </div>
        <div className={`${styles.specPanel} reeded`}>
          <p className={`${styles.specHead} mono`}>Spec sheet</p>
          <dl>
            <div>
              <dt className="mono">Based in</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt className="mono">Now</dt>
              <dd>Team Lead &amp; Full Stack Developer, Syncognix</dd>
            </div>
            <div>
              <dt className="mono">Studied</dt>
              <dd>
                {education.degree}
                <br />
                <span className={styles.muted}>
                  {education.school}, {education.start} – {education.end}
                </span>
              </dd>
            </div>
            <div>
              <dt className="mono">Works across</dt>
              <dd>Web · Mobile · AI automation</dd>
            </div>
            <div>
              <dt className="mono">Industries</dt>
              <dd>Healthcare, finance, automotive, retail, public sector</dd>
            </div>
          </dl>
        </div>
        <p className={`${styles.quote} serif italic`}>“Great software is invisible — it makes complex tasks feel effortless.”</p>
      </aside>
    </div>
  );
}
