"use client";

import { useEffect, useRef, useState } from "react";
import { Link } from "@/components/IntentLink";
import { featuredProjects } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import styles from "./FeaturedReel.module.css";

/**
 * Featured projects as a native horizontal scroller — no scroll hijacking.
 * Vertical wheel keeps scrolling the page; the row scrolls with trackpad/touch
 * swipes, shift+wheel, keyboard, the arrow buttons, or the always-visible
 * scrollbar below it (custom, because OS overlay scrollbars hide when idle).
 */
export function FeaturedReel() {
  const track = useRef<HTMLOListElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLSpanElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = el.scrollWidth - el.clientWidth;
      const progress = max > 0 ? el.scrollLeft / max : 1;
      // Thumb size and position are written directly — scrolling never re-renders React.
      if (thumb.current && bar.current) {
        const ratio = el.clientWidth / el.scrollWidth;
        const thumbWidth = Math.max(48, bar.current.clientWidth * ratio);
        thumb.current.style.width = `${thumbWidth}px`;
        thumb.current.style.transform = `translateX(${progress * (bar.current.clientWidth - thumbWidth)}px)`;
      }
      const start = el.scrollLeft <= 4;
      const end = el.scrollLeft >= max - 4;
      setEdges((prev) => (prev.start === start && prev.end === end ? prev : { start, end }));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Drag the thumb: pointer travel maps to scroll distance.
  const onThumbDown = (event: React.PointerEvent<HTMLSpanElement>) => {
    const el = track.current;
    if (!el || !bar.current || !thumb.current) return;
    event.preventDefault();
    event.stopPropagation();
    const startX = event.clientX;
    const startScroll = el.scrollLeft;
    const travel = bar.current.clientWidth - thumb.current.offsetWidth;
    const scale = (el.scrollWidth - el.clientWidth) / Math.max(travel, 1);
    const target = event.currentTarget;
    target.setPointerCapture(event.pointerId);
    el.style.scrollSnapType = "none";
    const move = (e: PointerEvent) => {
      el.scrollLeft = startScroll + (e.clientX - startX) * scale;
    };
    const up = () => {
      el.style.scrollSnapType = "";
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", up);
      target.removeEventListener("pointercancel", up);
    };
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", up);
    target.addEventListener("pointercancel", up);
  };

  // Click the track: jump so the thumb centres on the click point.
  const onBarDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = track.current;
    if (!el || !bar.current || !thumb.current) return;
    const rect = bar.current.getBoundingClientRect();
    const thumbWidth = thumb.current.offsetWidth;
    const ratio = (event.clientX - rect.left - thumbWidth / 2) / Math.max(rect.width - thumbWidth, 1);
    el.scrollTo({ left: Math.min(1, Math.max(0, ratio)) * (el.scrollWidth - el.clientWidth), behavior: "smooth" });
  };

  const step = (direction: 1 | -1) => {
    const el = track.current;
    const panel = el?.querySelector("li");
    if (!el || !panel) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (panel.getBoundingClientRect().width + gap), behavior: "smooth" });
  };

  return (
    <div className={styles.reel}>
      <div className={`${styles.hud} container`}>
        <span className="mono">Featured — {String(featuredProjects.length).padStart(2, "0")} projects</span>
        <span className={styles.rule} aria-hidden="true" />
        <div className={styles.arrows}>
          <button type="button" className={styles.arrow} onClick={() => step(-1)} disabled={edges.start} aria-label="Previous project">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className={styles.arrow} onClick={() => step(1)} disabled={edges.end} aria-label="Next project">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <ol ref={track} className={styles.track} aria-label="Featured projects" tabIndex={0}>
        {featuredProjects.map((project, i) => (
          <li key={project.slug} className={styles.panel} style={{ "--tint": project.tint } as React.CSSProperties}>
            <Link
              href={`/projects/${project.slug}`}
              className={styles.visualLink}
              aria-label={`Case study: ${project.name}`}
              tabIndex={-1}
            >
              <ProjectVisual project={project} withPhone sizes="(max-width: 900px) 84vw, 640px" />
            </Link>
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
              </ul>
              <div className={styles.actions}>
                <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn">
                  Visit live site <span className="btn__arrow" aria-hidden="true">↗</span>
                  <span className="sr-only"> — {project.name} (opens in a new tab)</span>
                </a>
                <Link href={`/projects/${project.slug}`} className="btn btn--ghost">
                  Case study<span className="sr-only">: {project.name}</span>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {/* Mouse/touch scrollbar; keyboard users scroll the focusable list itself with arrow keys. */}
      <div className="container">
        <div ref={bar} className={styles.scrollbar} onPointerDown={onBarDown} aria-hidden="true">
          <span ref={thumb} className={styles.thumb} onPointerDown={onThumbDown} />
        </div>
      </div>
    </div>
  );
}
