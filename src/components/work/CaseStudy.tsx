"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { hostOf, projects, type Project } from "@/data/projects";
import { getLenis } from "@/lib/scroll";
import { BrowserFrame } from "./ProjectVisual";
import styles from "./CaseStudy.module.css";

type Props = {
  project: Project | null;
  onClose: () => void;
  onNavigate: (project: Project) => void;
};

export function CaseStudy({ project, onClose, onNavigate }: Props) {
  return (
    <AnimatePresence>
      {project && <Dialog key="dialog" project={project} onClose={onClose} onNavigate={onNavigate} />}
    </AnimatePresence>
  );
}

function Dialog({ project, onClose, onNavigate }: { project: Project; onClose: () => void; onNavigate: (p: Project) => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const shotScroller = useRef<HTMLDivElement>(null);
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  // Lock page scroll, restore focus on close, trap Tab inside the dialog.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = "hidden";
    panel.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !panel.current) return;
      const focusables = panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])');
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
      lenis?.start();
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [onClose]);

  // Reset scroll positions when moving to the next project.
  useEffect(() => {
    panel.current?.scrollTo({ top: 0 });
    shotScroller.current?.scrollTo({ top: 0 });
  }, [project.slug]);

  return (
    <motion.div
      className={styles.backdrop}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      onClick={onClose}
    >
      <motion.div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        tabIndex={-1}
        data-lenis-prevent
        className={styles.panel}
        style={{ "--tint": project.tint } as React.CSSProperties}
        initial={{ y: "6%", opacity: 0, clipPath: "inset(8% 4% 0% 4% round 28px)" }}
        animate={{ y: 0, opacity: 1, clipPath: "inset(0% 0% 0% 0% round 28px)" }}
        exit={{ y: "4%", opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.top}>
          <p className="mono">
            Case study — {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </p>
          <button type="button" className={`${styles.close} glass`} onClick={onClose} aria-label="Close case study">
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <motion.div
          key={project.slug}
          className={styles.body}
          initial={{ opacity: 0, filter: "blur(8px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.shotCol}>
            <BrowserFrame host={hostOf(project.url)} className={styles.browser}>
              <div ref={shotScroller} className={styles.shotScroller} data-lenis-prevent tabIndex={0} aria-label={`Scrollable full-page screenshot of ${project.name}`}>
                <Image
                  src={project.media.long ? `/work/${project.slug}-long.webp` : `/work/${project.slug}.webp`}
                  alt={`Full-page screenshot of the ${project.name} website`}
                  width={960}
                  height={project.media.long ? (project.longHeight ?? 3200) : 600}
                  sizes="(max-width: 900px) 92vw, 56vw"
                  className={styles.longShot}
                />
              </div>
            </BrowserFrame>
            {project.media.long && <p className={`${styles.hint} mono`}>Scroll inside the window to see the full page</p>}
          </div>

          <div className={styles.info}>
            <p className={`${styles.kicker} mono`}>
              {project.category} — {project.sector}
            </p>
            <h2 id="case-title" className={styles.title}>
              {project.name}
            </h2>
            <p className={styles.summary}>{project.summary}</p>

            <dl className={styles.facts}>
              {project.location && (
                <div>
                  <dt className="mono">Location</dt>
                  <dd>{project.location}</dd>
                </div>
              )}
              <div>
                <dt className="mono">Built with</dt>
                <dd>{project.tech.join(", ")}</dd>
              </div>
              {project.context && (
                <div>
                  <dt className="mono">Delivered at</dt>
                  <dd>{project.context}</dd>
                </div>
              )}
              <div>
                <dt className="mono">Live at</dt>
                <dd>{hostOf(project.url)}</dd>
              </div>
            </dl>

            <h3 className={`${styles.subhead} mono`}>On the site</h3>
            <ul className={styles.highlights}>
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            <div className={styles.links}>
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn">
                Visit live site <span className="btn__arrow" aria-hidden="true">↗</span>
              </a>
              {project.altLinks?.map((alt) => (
                <a key={alt.url} href={alt.url} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                  {alt.label} <span className="btn__arrow" aria-hidden="true">↗</span>
                </a>
              ))}
            </div>

            {project.media.mobile && (
              <div className={styles.phone}>
                <Image src={`/work/${project.slug}-mobile.webp`} alt={`${project.name} on mobile`} width={390} height={844} sizes="160px" />
              </div>
            )}

            <button type="button" className={styles.next} onClick={() => onNavigate(next)}>
              <span className="mono">Next project</span>
              <span className={styles.nextName}>
                {next.name} <span aria-hidden="true">→</span>
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
