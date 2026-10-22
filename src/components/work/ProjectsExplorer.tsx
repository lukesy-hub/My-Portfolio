"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Image from "next/image";
import { Link } from "@/components/IntentLink";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { categories, hostOf, projects, type Project, type ProjectCategory } from "@/data/projects";
import { ProjectList } from "./ProjectList";
import { BrowserFrame } from "./ProjectVisual";
import styles from "./ProjectsExplorer.module.css";

type Filter = "All" | ProjectCategory;
type View = "gallery" | "index";

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

const counts = Object.fromEntries(categories.map((c) => [c, projects.filter((p) => p.category === c).length]));

const haystack = (p: Project) =>
  [p.name, p.sector, p.location, p.category, p.context, ...p.tech].filter(Boolean).join(" ").toLowerCase();

/** /projects: filter by category, search by name/sector/stack, and switch between gallery and index views. */
export function ProjectsExplorer() {
  const [filter, setFilter] = useState<Filter>("All");
  const [view, setView] = useState<View>("gallery");
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const visible = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return projects.filter((p) => (filter === "All" || p.category === filter) && (!q || haystack(p).includes(q)));
  }, [filter, deferredQuery]);

  return (
    <div className={styles.explorer}>
      <div className={`${styles.toolbar} glass`}>
        <LayoutGroup id="filters">
          <div className={styles.filters} role="group" aria-label="Filter projects by category">
            {(["All", ...categories] as Filter[]).map((f) => (
              <button key={f} type="button" className={styles.filter} aria-pressed={filter === f} onClick={() => setFilter(f)}>
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

        <label className={styles.search}>
          <span className="sr-only">Search projects</span>
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            <path d="m11 11 3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, city or stack"
            autoComplete="off"
          />
        </label>

        <div className={styles.views} role="radiogroup" aria-label="Layout">
          {(["gallery", "index"] as View[]).map((v) => (
            <button key={v} type="button" role="radio" aria-checked={view === v} className={styles.viewBtn} onClick={() => setView(v)}>
              {view === v && <motion.span layoutId="view-active" className={styles.viewBg} transition={{ type: "spring", stiffness: 400, damping: 34 }} />}
              <span className={styles.viewText}>
                <ViewIcon view={v} />
                {v === "gallery" ? "Gallery" : "Index"}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className={`${styles.count} mono`} aria-live="polite">
        Showing {String(visible.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
        {filter === "All" ? "" : ` · ${filter}`}
        {deferredQuery.trim() ? ` · “${deferredQuery.trim()}”` : ""}
      </p>

      {visible.length === 0 ? (
        <div className={styles.empty}>
          <p>No project matches that search.</p>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setQuery("");
              setFilter("All");
            }}
          >
            Reset filters
          </button>
        </div>
      ) : view === "gallery" ? (
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
                  <ProjectCard project={project} number={projects.indexOf(project) + 1} tall={tall} />
                </motion.li>
              );
            })}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <ProjectList projects={visible} />
      )}
    </div>
  );
}

function ViewIcon({ view }: { view: View }) {
  return view === "gallery" ? (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
      <rect x="1.5" y="1.5" width="7" height="6" rx="1" fill="currentColor" />
      <rect x="10" y="1.5" width="4.5" height="6" rx="1" fill="currentColor" opacity=".55" />
      <rect x="1.5" y="9" width="4.5" height="5.5" rx="1" fill="currentColor" opacity=".55" />
      <rect x="7.5" y="9" width="7" height="5.5" rx="1" fill="currentColor" />
    </svg>
  ) : (
    <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
      <path d="M1.5 3.5h13M1.5 8h13M1.5 12.5h13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ProjectCard({ project, number, tall }: { project: Project; number: number; tall: boolean }) {
  return (
    <article className={styles.card}>
      <Link href={`/projects/${project.slug}`} className={styles.media} aria-label={`Case study: ${project.name}`}>
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
      </Link>

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
