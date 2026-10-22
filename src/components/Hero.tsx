"use client";

import { useRef } from "react";
import Image from "next/image";
import { Link } from "@/components/IntentLink";
import { portrait, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { useLocalTime } from "@/lib/hooks";
import { gsap, useGSAP } from "@/lib/gsap";
import styles from "./Hero.module.css";

export function Hero() {
  const root = useRef<HTMLElement>(null);
  const time = useLocalTime(profile.timeZone);

  // Leaving the hero: the photo drifts inside its frame, the copy lifts away.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 761px)", () => {
        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        tl.to("[data-photo]", { yPercent: 8, scale: 1.06 }, 0)
          .to("[data-frame]", { yPercent: -6 }, 0)
          .to("[data-fade]", { opacity: 0, y: -40 }, 0);
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hero} aria-labelledby="hero-title">
      <div className="grid-lines" aria-hidden="true" />

      <div className={`container ${styles.inner}`}>
        <div className={`${styles.meta} mono`}>
          <span>Portfolio ’26 — Index 00</span>
          <span className={styles.metaMid}>{profile.role}</span>
          <span className={styles.metaEnd}>{projects.length} live sites</span>
        </div>

        <div className={styles.copy} data-fade>
          <h1 id="hero-title" className={styles.title}>
            <span className={styles.line}>
              <span className={styles.lineInner}>{profile.firstName}</span>
            </span>
            <span className={`${styles.line} ${styles.lineTwo}`}>
              <span className={`${styles.lineInner} serif italic`}>{profile.lastName}</span>
            </span>
          </h1>

          <p className={styles.headline}>
            Full Stack Developer <em className="serif italic">&amp;</em> AI&nbsp;Automation Engineer
          </p>
          <p className={styles.intro}>
            I build production websites, web apps and AI-driven automations — owning the whole path from database and APIs
            to typography, motion and deployment. Currently leading a development team at Syncognix in Lahore.
          </p>

          <div className={styles.ctas}>
            <Link href="/projects" className="btn">
              View My Work <span className="btn__arrow" aria-hidden="true">↗</span>
            </Link>
            <Link href="/contact" className="btn btn--ghost">
              Contact Me <span className="btn__arrow" aria-hidden="true">→</span>
            </Link>
          </div>
          <a href={profile.cv.href} download={profile.cv.fileName} className={`${styles.cvLink} mono link-underline`}>
            Download CV · PDF ↓
          </a>
        </div>

        <figure className={styles.portrait} data-frame>
          <span className={styles.outline} aria-hidden="true" />
          <span className={styles.glow} aria-hidden="true" />
          <div className={styles.frame}>
            <div className={styles.photo} data-photo>
              <Image
                src={portrait.src}
                alt={portrait.alt}
                width={portrait.width}
                height={portrait.height}
                preload
                fetchPriority="high"
                sizes="(max-width: 760px) 86vw, (max-width: 1100px) 40vw, 440px"
                className={styles.img}
              />
            </div>
            <span className={`${styles.reeds} reeded`} aria-hidden="true" />
          </div>
          <span className={`${styles.tick} ${styles.tickTl}`} aria-hidden="true" />
          {/* Caption sits below the frame so nothing covers the photograph. */}
          <figcaption className={`${styles.caption} mono`}>
            <span>Fig. 01 — {profile.name}</span>
            <span className={styles.captionMeta}>
              <span className={styles.dot} aria-hidden="true" />
              Lahore, PK{time ? ` · ${time} PKT` : ""}
            </span>
          </figcaption>
        </figure>
      </div>

      <a href="#home-work" className={`${styles.scrollCue} mono`} aria-label="Scroll to selected work">
        <span>Scroll</span>
        <span className={styles.scrollLine} aria-hidden="true" />
      </a>
    </section>
  );
}
