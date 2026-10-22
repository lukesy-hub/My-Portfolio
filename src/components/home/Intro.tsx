"use client";

import { useRef } from "react";
import { Link } from "@/components/IntentLink";
import { gsap, useGSAP } from "@/lib/gsap";
import { GlitchLabel } from "../SectionHead";
import styles from "./Intro.module.css";

const statement =
  "I’m a full stack developer who cares how things feel as much as how they work. I build the website a client’s customers see, the database and APIs behind it, and the automations that quietly remove hours of manual work.";

/** Home: a one-paragraph introduction that brightens word by word as it scrolls into view. */
export function Intro() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-word]",
          { opacity: 0.16 },
          {
            opacity: 1,
            stagger: 0.05,
            ease: "none",
            scrollTrigger: { trigger: "[data-statement]", start: "top 78%", end: "bottom 45%", scrub: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`section ${styles.intro}`} aria-labelledby="intro-title">
      <div className={`container ${styles.grid}`}>
        <div className={`${styles.index} mono`}>
          <span>02</span>
          <GlitchLabel text="Introduction" />
        </div>
        <div className={styles.main}>
          <h2 id="intro-title" className="sr-only">
            Introduction
          </h2>
          <p className={styles.statement} data-statement>
            {statement.split(" ").map((word, i) => (
              <span key={i} data-word>
                {word}{" "}
              </span>
            ))}
          </p>
          <div className={styles.links}>
            <Link href="/about" className="btn btn--ghost">
              More about me <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
            <Link href="/experience" className={`${styles.textLink} link-underline`}>
              Career journey →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
