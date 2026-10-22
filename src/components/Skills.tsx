"use client";

import { skillGroups } from "@/data/skills";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import styles from "./Skills.module.css";

// Pointer spotlight: one listener on the grid writes the cursor position to the hovered card.
function onPointerMove(event: React.PointerEvent<HTMLDivElement>) {
  const card = (event.target as HTMLElement).closest<HTMLElement>("[data-card]");
  if (!card) return;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  card.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

export function Skills({ level = 2 }: { level?: 1 | 2 }) {
  return (
    <section id="skills" className={`section ${styles.skills}`} aria-labelledby="skills-title">
      <div className="container">
        <SectionHead
          level={level}
          index="04"
          label="Capabilities"
          id="skills-title"
          aside="The stack from my CV and shipped projects — grouped by what it is used for, not ranked by made-up percentages."
        >
          One stack, <em>front to back</em>.
        </SectionHead>

        <div className={styles.bento} onPointerMove={onPointerMove}>
          {/* Frontend — the largest card: type specimen + real-looking component code. */}
          <Reveal className={`${styles.card} ${styles.frontend}`} data-card>
            <CardHead index="A" title="Frontend" />
            <ul className={styles.specimen}>
              {skillGroups.frontend.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <pre className={styles.code} aria-label="Code sample">
              <code>
                <span className={styles.k}>export function</span> <span className={styles.f}>ProjectCard</span>({"{ "}project{" }"}) {"{"}
                {"\n"}  <span className={styles.k}>return</span> ({"\n"}    &lt;<span className={styles.f}>article</span> className=
                <span className={styles.s}>&quot;card&quot;</span>&gt;{"\n"}      &lt;<span className={styles.f}>BrowserFrame</span> host={"{"}project.url{"}"} /&gt;
                {"\n"}      &lt;<span className={styles.f}>h4</span>&gt;{"{"}project.name{"}"}&lt;/<span className={styles.f}>h4</span>&gt;{"\n"}    &lt;/
                <span className={styles.f}>article</span>&gt;{"\n"}  );{"\n"}
                {"}"} <span className={styles.c}>{"// typed, accessible, reusable"}</span>
              </code>
            </pre>
          </Reveal>

          {/* Motion — an easing curve that draws itself, with a ball riding it. */}
          <Reveal className={`${styles.card} ${styles.motion}`} delay={0.05} data-card>
            <CardHead index="B" title="Motion & creative dev" />
            <div className={styles.curveWrap} aria-hidden="true">
              <svg viewBox="0 0 200 120" className={styles.curve}>
                <path d="M10 110 C 70 110, 80 10, 190 10" className={styles.curveGuide} />
                <path d="M10 110 C 70 110, 80 10, 190 10" className={styles.curvePath} pathLength={1} />
                <circle r="5" className={styles.ball}>
                  <animateMotion
                    dur="2.8s"
                    repeatCount="indefinite"
                    path="M10 110 C 70 110, 80 10, 190 10"
                    keyPoints="0;1;1"
                    keyTimes="0;0.6;1"
                    calcMode="spline"
                    keySplines=".16 1 .3 1; 0 0 1 1"
                  />
                </circle>
              </svg>
              <span className={`${styles.curveLabel} mono`}>cubic-bezier(.16, 1, .3, 1)</span>
            </div>
            <TagList items={skillGroups.motion} />
          </Reveal>

          {/* AI & automation — a workflow graph in the style of n8n. */}
          <Reveal className={`${styles.card} ${styles.ai}`} delay={0.05} data-card>
            <CardHead index="C" title="AI & automation" />
            <svg viewBox="0 0 320 120" className={styles.flow} role="img" aria-label="Example automation: webhook to LLM to CRM and messaging">
              <path d="M66 60 H 120 M 196 60 C 220 60, 224 30, 250 30 M 196 60 C 220 60, 224 90, 250 90" className={styles.flowLine} />
              {[
                { x: 6, y: 44, label: "Webhook" },
                { x: 124, y: 44, label: "LLM" },
                { x: 252, y: 14, label: "CRM" },
                { x: 252, y: 74, label: "Notify" },
              ].map((n) => (
                <g key={n.label}>
                  <rect x={n.x} y={n.y} width={n.label === "LLM" ? 72 : 60} height="32" rx="8" className={n.label === "LLM" ? styles.nodeHot : styles.nodeBox} />
                  <text x={n.x + (n.label === "LLM" ? 36 : 30)} y={n.y + 20} textAnchor="middle" className={styles.nodeText}>
                    {n.label}
                  </text>
                </g>
              ))}
            </svg>
            <TagList items={skillGroups.ai} />
          </Reveal>

          <Reveal className={`${styles.card} ${styles.backend}`} delay={0.1} data-card>
            <CardHead index="D" title="Backend & data" />
            <div className={styles.twoCol}>
              <ul className={styles.monoList}>
                {skillGroups.backend.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <ul className={styles.monoList}>
                {skillGroups.data.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className={`${styles.card} ${styles.mobile}`} delay={0.15} data-card>
            <CardHead index="E" title="Mobile" />
            <div className={styles.phoneGlyph} aria-hidden="true">
              <span />
            </div>
            <TagList items={skillGroups.mobile} />
          </Reveal>

          {/* Design language — each style typeset in itself. */}
          <Reveal className={`${styles.card} ${styles.design}`} data-card>
            <CardHead index="F" title="Design language" />
            <ul className={styles.styles}>
              <li className={styles.sSwiss}>Swiss</li>
              <li className={styles.sNeo}>Neo-classical</li>
              <li className={`${styles.sGlass} glass`}>
                <span>Liquid glass</span>
              </li>
              <li className={styles.sBento}>
                <i />
                <i />
                <i />
                Bento
              </li>
              <li className={styles.sEditorial}>Editorial</li>
              <li className={styles.sTheme}>
                <span>Light</span>
                <span>Dark</span>
              </li>
            </ul>
          </Reveal>

          <Reveal className={`${styles.card} ${styles.tools}`} delay={0.05} data-card>
            <CardHead index="G" title="Tools & workflow" />
            <ol className={styles.gitlog}>
              {skillGroups.tools.map((t, i) => (
                <li key={t}>
                  <span className={styles.hash}>{(0x3fa2c1 + i * 0x1b7d3).toString(16).slice(0, 7)}</span> {t}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className={`${styles.card} ${styles.perf}`} delay={0.1} data-card>
            <CardHead index="H" title="Performance & SEO" />
            <ul className={styles.checks}>
              {skillGroups.performance.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CardHead({ index, title }: { index: string; title: string }) {
  return (
    <div className={styles.cardHead}>
      <h3>{title}</h3>
      <span className="mono">{index}</span>
    </div>
  );
}

function TagList({ items }: { items: string[] }) {
  return (
    <ul className={styles.tags}>
      {items.map((s) => (
        <li key={s} className="tag">
          {s}
        </li>
      ))}
    </ul>
  );
}
