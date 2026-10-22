"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/components/IntentLink";
import { motion, useMotionValue, useSpring } from "motion/react";
import { hostOf, projects as allProjects, type Project } from "@/data/projects";
import { useMediaQuery } from "@/lib/hooks";
import styles from "./ProjectList.module.css";

/**
 * Index view: one large typographic row per project. On devices with a fine
 * pointer, a screenshot preview trails the cursor; on touch, each row carries
 * its own thumbnail instead, so nothing depends on hover.
 */
export function ProjectList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<string | null>(null);
  const finePointer = useMediaQuery("(hover: hover) and (pointer: fine)");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  const onMove = (event: React.PointerEvent) => {
    x.set(event.clientX);
    y.set(event.clientY);
  };

  return (
    <div className={styles.wrap} onPointerMove={finePointer ? onMove : undefined} onPointerLeave={() => setActive(null)}>
      <ol className={styles.list}>
        {projects.map((p) => (
          <li
            key={p.slug}
            className={styles.row}
            data-dim={active !== null && active !== p.slug}
            style={{ "--tint": p.tint } as React.CSSProperties}
            onPointerEnter={() => setActive(p.slug)}
          >
            <Link href={`/projects/${p.slug}`} className={styles.main} onFocus={() => setActive(p.slug)}>
              <span className={`${styles.num} mono`}>{String(allProjects.indexOf(p) + 1).padStart(2, "0")}</span>
              <span className={styles.thumb} aria-hidden="true">
                <Image src={`/work/${p.slug}.webp`} alt="" width={1440} height={900} sizes="96px" />
              </span>
              <span className={styles.name}>
                {p.name}
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </span>
              <span className={styles.sector}>{p.sector}</span>
              <span className={`${styles.where} mono`}>{p.location ?? p.category}</span>
              <span className={`${styles.stack} mono`}>{p.tech.join(" · ")}</span>
            </Link>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.live}
              aria-label={`Visit ${p.name} live site at ${hostOf(p.url)} (opens in a new tab)`}
            >
              <span aria-hidden="true">↗</span>
            </a>
          </li>
        ))}
      </ol>

      {finePointer && (
        <motion.div
          className={styles.preview}
          style={{ x: sx, y: sy }}
          initial={false}
          animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.85 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
        >
          {projects.map((p) => (
            <Image
              key={p.slug}
              src={`/work/${p.slug}.webp`}
              alt=""
              width={1440}
              height={900}
              sizes="360px"
              className={styles.previewImg}
              data-on={active === p.slug}
            />
          ))}
        </motion.div>
      )}
    </div>
  );
}
