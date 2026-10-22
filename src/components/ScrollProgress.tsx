"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import styles from "./ScrollProgress.module.css";

/**
 * Replaces the hidden native scrollbar visually. `useScroll` reads
 * scrollY / (scrollHeight − innerHeight) and updates a motion value outside
 * React's render cycle, so scrolling never re-renders the tree. Lives in the
 * root layout, so it persists across route changes and re-measures per page.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 220, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      className={styles.bar}
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
      role="presentation"
      aria-hidden="true"
    />
  );
}
