"use client";

import { useRef } from "react";
import { featuredProjects, type Project } from "@/data/projects";
import { gsap, useGSAP } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";
import { ProjectVisual } from "./ProjectVisual";
import styles from "./FeaturedReel.module.css";

type Props = { onOpen: (project: Project) => void };

/**
 * Horizontal storytelling for the featured projects.
 * Desktop + motion allowed: the section pins and vertical scroll drives the track.
 * Otherwise: a native, swipeable scroll-snap row — no scroll hijacking on touch.
 */
export function FeaturedReel({ onOpen }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference) and (hover: hover)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - el.clientWidth;
        root.current!.dataset.pinned = "true";

        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => gsap.set(bar.current, { scaleX: self.progress }),
          },
        });

        // Each panel's visual drifts slightly against the track for depth.
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((visual) => {
          gsap.fromTo(
            visual,
            { xPercent: 6 },
            {
              xPercent: -6,
              ease: "none",
              scrollTrigger: {
                trigger: visual.closest("li"),
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        });

        // Keyboard users: focusing a link in an off-screen panel scrolls the page to it.
        const onFocus = (event: FocusEvent) => {
          const panel = (event.target as Element).closest("li");
          const st = tween.scrollTrigger;
          if (!panel || !st) return;
          el.scrollLeft = 0;
          const ratio = Math.min(1, panel.offsetLeft / distance());
          const y = st.start + (st.end - st.start) * ratio;
          const lenis = getLenis();
          if (lenis) lenis.scrollTo(y, { immediate: true });
          else window.scrollTo(0, y);
        };
        el.addEventListener("focusin", onFocus);

        return () => {
          el.removeEventListener("focusin", onFocus);
          delete root.current!.dataset.pinned;
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={styles.reel}>
      <div className={`${styles.hud} container mono`} aria-hidden="true">
        <span>Featured — {String(featuredProjects.length).padStart(2, "0")} projects</span>
        <span className={styles.rail}>
          <span ref={bar} className={styles.railFill} />
        </span>
        <span className={styles.hint}>Scroll →</span>
      </div>

      <ol ref={track} className={styles.track} aria-label="Featured projects">
        {featuredProjects.map((project, i) => (
          <li key={project.slug} className={styles.panel} style={{ "--tint": project.tint } as React.CSSProperties}>
            <div className={styles.caption}>
              <p className={`${styles.index} mono`}>
                {String(i + 1).padStart(2, "0")}
                <span> / {String(featuredProjects.length).padStart(2, "0")}</span>
              </p>
              <h3 className={styles.name}>{project.name}</h3>
              <p className={`${styles.sector} mono`}>
                {project.sector}
                {project.location ? ` — ${project.location}` : ""}
              </p>
              <p className={styles.summary}>{project.summary}</p>
              <ul className={styles.tags} aria-label="Technologies">
                {project.tech.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
                {project.context && <li className="tag">@ {project.context}</li>}
              </ul>
              <div className={styles.actions}>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn">
                  Visit live site <span className="btn__arrow" aria-hidden="true">↗</span>
                  <span className="sr-only">: {project.name} (opens in a new tab)</span>
                </a>
                <button type="button" className="btn btn--ghost" onClick={() => onOpen(project)}>
                  Case study<span className="sr-only">: {project.name}</span>
                </button>
              </div>
            </div>
            <button
              type="button"
              className={styles.visualBtn}
              onClick={() => onOpen(project)}
              aria-label={`Open case study: ${project.name}`}
            >
              <span data-parallax className={styles.parallax}>
                <ProjectVisual project={project} withPhone sizes="(max-width: 900px) 86vw, 52vw" />
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
