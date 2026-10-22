"use client";

import { useMemo, useRef } from "react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { useLocalTime, useTheme } from "@/lib/hooks";
import { gsap, useGSAP } from "@/lib/gsap";
import type { ReededParams } from "@/lib/reededGlass";
import { ShaderCanvas } from "./ShaderCanvas";
import styles from "./Hero.module.css";

const palettes: Record<"light" | "dark", ReededParams> = {
  light: { ribs: 14, refraction: 0.11, speed: 0.55, colors: ["#ef5124", "#f4b740", "#36b5aa"], background: "#e3dccd" },
  dark: { ribs: 14, refraction: 0.11, speed: 0.55, colors: ["#ff5a2a", "#c98a1f", "#1f8f87"], background: "#100f0d" },
};

const terminal = [
  { cmd: "whoami", out: "muhammad talha — full stack · ai automation · team lead" },
  { cmd: "cat stack.txt", out: "react  next.js  typescript  node  flutter  n8n" },
  { cmd: "ls ./work --live | wc -l", out: `${projects.length} live sites ↓` },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const theme = useTheme();
  const time = useLocalTime(profile.timeZone);
  const params = useMemo(() => palettes[theme], [theme]);

  // Scroll-scrubbed parallax: the name drifts apart and the arch rises as you leave.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 761px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        tl.to("[data-line='1']", { xPercent: -6 }, 0)
          .to("[data-line='2']", { xPercent: 5 }, 0)
          .to("[data-arch]", { yPercent: -14, scale: 0.94 }, 0)
          .to("[data-fade]", { opacity: 0, y: -40 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="top" ref={root} className={styles.hero} aria-labelledby="hero-title">
      <div className="grid-lines" aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={`${styles.meta} mono`} data-fade>
          <span>Portfolio ’26 — Index 00</span>
          <span className={styles.metaMid}>
            Lahore, PK <span className={styles.dot} aria-hidden="true" /> {time ? `${time} PKT` : "PKT"}
          </span>
          <span className={styles.metaEnd}>Now — Team Lead, Syncognix</span>
        </div>

        <h1 id="hero-title" className={styles.title}>
          <span className={styles.line} data-line="1">
            <span className={styles.lineInner}>{profile.firstName}</span>
          </span>
          <span className={`${styles.line} ${styles.lineTwo}`} data-line="2">
            <span className={styles.lineInner}>
              <span className="serif italic">{profile.lastName}</span>
              <span className={styles.stop}>.</span>
            </span>
          </span>
          <span className="sr-only"> — {profile.role}</span>
        </h1>

        <figure className={styles.arch} data-arch aria-hidden="true">
          <div className={styles.archGlass}>
            <div className={styles.archFallback} />
            <div className={`${styles.archRibs} reeded`} />
            <ShaderCanvas params={params} loadOn="idle" className={styles.archCanvas} />
          </div>
          <figcaption className={`${styles.archCaption} mono`}>
            <span>Fig. 01</span>
            <span>Reeded glass — WebGL</span>
          </figcaption>
          <span className={`${styles.tick} ${styles.tickTl}`} />
          <span className={`${styles.tick} ${styles.tickBr}`} />
        </figure>

        <div className={styles.bottom}>
          <div className={styles.intro}>
            <p className={styles.role}>
              Full Stack Developer <em className="serif italic">&amp;</em> AI&nbsp;Automation Engineer
            </p>
            <p className={styles.value}>
              I build production websites, web apps and AI-driven automations — owning the whole path from database
              and APIs to typography, motion and deployment.
            </p>
            <div className={styles.ctas}>
              <a href="#work" className="btn">
                Explore selected work <span className="btn__arrow" aria-hidden="true">↗</span>
              </a>
              <a href={profile.cv.href} download={profile.cv.fileName} className="btn btn--ghost">
                Download CV <span className="btn__arrow btn__arrow--down" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className={`${styles.terminal} glass`} aria-label="Terminal summary">
            <div className={styles.termBar} aria-hidden="true">
              <span />
              <span />
              <span />
              <p className="mono">zsh — talha@lahore</p>
            </div>
            <ol className={styles.termBody}>
              {terminal.map((row, i) => (
                <li key={row.cmd} style={{ "--i": i } as React.CSSProperties}>
                  <p className={styles.cmd} style={{ "--chars": row.cmd.length } as React.CSSProperties}>
                    <span className={styles.prompt} aria-hidden="true">~ %</span>
                    <span className={styles.typed}>{row.cmd}</span>
                  </p>
                  <p className={styles.out}>{row.out}</p>
                </li>
              ))}
            </ol>
            <span className={styles.cursor} aria-hidden="true" />
          </div>
        </div>
      </div>

      <a href="#work" className={`${styles.scrollCue} mono`} aria-label="Scroll to selected work">
        <span>Scroll</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}
