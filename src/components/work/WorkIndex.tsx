"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { categories, hostOf, projects, type Project, type ProjectCategory } from "@/data/projects";
import { BrowserFrame } from "./ProjectVisual";
import styles from "./WorkIndex.module.css";

type Filter = "All" | ProjectCategory;
type Props = { onOpen: (project: Project) => void };

// Rows of 12 columns: wide + tall, three-up, tall + wide — an editorial rhythm
// that survives filtering because it is applied to the filtered order.
const rhythm: { span: number; shape: "wide" | "tall" | "square" }[] = [
  { span: 7, shape: "wide" },
  { span: 5, shape: "tall" },
  { span: 4, shape: "square" },
  { span: 4, shape: "square" },
  { span: 4, shape: "square" },
  { span: 5, shape: "tall" },
  { span: 7, shape: "wide" },
];

export function WorkIndex({ onOpen }: Props) {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = useMemo(() => (filter === "All" ? projects : projects.filter((p) => p.category === filter)), [filter]);
  const counts = useMemo(
    () => Object.fromEntries(categories.map((c) => [c, projects.filter((p) => p.category === c).length])),
    [],
  );

  return (
    <div className={styles.index}>
      <div className={styles.toolbar}>
        <h3 className={styles.heading}>
          The full index <span className="mono">({projects.length})</span>
        </h3>
        <LayoutGroup id="filters">
          <div className={styles.filters} role="group" aria-label="Filter projects by category">
            {(["All", ...categories] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                className={styles.filter}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {filter === f && (
                  <motion.span layoutId="filter-active" className={styles.filterBg} transition={{ type: "spring", stiffness: 400, damping: 34 }} />
                )}
                <span className={styles.filterText}>
                  {f}
                  <sup className="mono">{f === "All" ? projects.length : counts[f]}</sup>
                </span>
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} {visible.length === 1 ? "project" : "projects"}
        {filter === "All" ? "" : ` in ${filter}`}.
      </p>

      <motion.ul layout className={styles.grid}>
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project, i) => {
            const slot = rhythm[i % rhythm.length];
            const tall = slot.shape === "tall" && project.media.mobile;
            return (
              <motion.li
                layout
                key={project.slug}
                className={styles.cell}
                data-shape={tall ? "tall" : slot.shape === "tall" ? "wide" : slot.shape}
                style={{ "--span": slot.span, "--tint": project.tint } as React.CSSProperties}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <ProjectCard project={project} number={projects.indexOf(project) + 1} tall={tall} onOpen={onOpen} />
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

function ProjectCard({ project, number, tall, onOpen }: { project: Project; number: number; tall: boolean; onOpen: (p: Project) => void }) {
  return (
    <article className={styles.card}>
      <button
        type="button"
        className={styles.media}
        onClick={() => onOpen(project)}
        aria-label={`Open case study: ${project.name}`}
      >
        <span className={styles.tintWash} aria-hidden="true" />
        {tall ? (
          <span className={styles.tallStage}>
            <BrowserFrame host={hostOf(project.url)} className={styles.tallBrowser}>
              <Image src={`/work/${project.slug}.webp`} alt="" width={1440} height={900} sizes="(max-width: 760px) 70vw, 28vw" className={styles.img} />
            </BrowserFrame>
            <span className={styles.tallPhone}>
              <Image
                src={`/work/${project.slug}-mobile.webp`}
                alt={`${project.name} mobile homepage`}
                width={390}
                height={844}
                sizes="(max-width: 760px) 40vw, 16vw"
              />
            </span>
          </span>
        ) : (
          <BrowserFrame host={hostOf(project.url)} className={styles.browser}>
            <Image
              src={`/work/${project.slug}.webp`}
              alt={`${project.name} homepage`}
              width={1440}
              height={900}
              sizes="(max-width: 760px) 92vw, (max-width: 1100px) 46vw, 40vw"
              className={styles.img}
            />
          </BrowserFrame>
        )}

        {/* Hover/focus reveal: summary on a glass panel. Same info stays in the caption on touch. */}
        <span className={`${styles.reveal} glass`} aria-hidden="true">
          <span className={styles.revealText}>{project.summary}</span>
          <span className={`${styles.revealCta} mono`}>Open case study →</span>
        </span>
      </button>

      <div className={styles.caption}>
        <span className={`${styles.num} mono`}>{String(number).padStart(2, "0")}</span>
        <div className={styles.captionMain}>
          <h4 className={styles.name}>{project.name}</h4>
          <p className={`${styles.meta} mono`}>
            {project.sector}
            {project.location ? ` · ${project.location}` : ""}
          </p>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.visit}
          aria-label={`Visit ${project.name} live site (opens in a new tab)`}
        >
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
