"use client";

import { motion } from "motion/react";
import { useTheme, type Theme } from "@/lib/hooks";
import styles from "./ThemeToggle.module.css";

function applyTheme(next: Theme) {
  const root = document.documentElement;
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* storage unavailable — theme still applies for this visit */
  }
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useTheme();
  const next: Theme = theme === "dark" ? "light" : "dark";

  const toggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = document.documentElement;

    if (!document.startViewTransition || reduce) {
      root.classList.add("theme-transition");
      applyTheme(next);
      window.setTimeout(() => root.classList.remove("theme-transition"), 520);
      return;
    }

    // Circular reveal from the toggle — the new theme expands like light through a lens.
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => applyTheme(next));
    transition.ready.then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 650, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  };

  return (
    <button
      type="button"
      className={`${styles.toggle} glass ${className}`}
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
    >
      <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" className={styles.icon}>
        {/* A masked "bite" turns the sun into a moon; rays fade out in dark mode. */}
        <mask id="theme-moon-mask">
          <rect width="24" height="24" fill="#fff" />
          <motion.circle
            r="5.5"
            fill="#000"
            initial={false}
            animate={{ cx: theme === "dark" ? 16 : 26, cy: theme === "dark" ? 8 : -2 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
          />
        </mask>
        <motion.circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#theme-moon-mask)"
          initial={false}
          animate={{ r: theme === "dark" ? 6.5 : 4.2 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        />
        <motion.g
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={false}
          animate={{ opacity: theme === "dark" ? 0 : 1, rotate: theme === "dark" ? -45 : 0, scale: theme === "dark" ? 0.6 : 1 }}
          style={{ originX: "12px", originY: "12px" }}
          transition={{ duration: 0.4 }}
        >
          <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4" />
        </motion.g>
      </svg>
    </button>
  );
}
