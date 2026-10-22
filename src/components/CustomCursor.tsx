"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import styles from "./SiteEffects.module.css";

// Adapted from skyleen77's 21st Cursor. CursorFollow is intentionally omitted.
export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  useEffect(() => {
    const media = matchMedia("(hover: hover) and (pointer: fine)");
    const hide = () => {
      document.documentElement.removeAttribute("data-custom-cursor");
      if (ref.current) ref.current.style.opacity = "0";
    };
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse") return hide();
      const target = event.target;
      if (target instanceof Element && target.closest("input, textarea, [contenteditable], iframe")) return hide();
      x.set(event.clientX - 2);
      y.set(event.clientY - 2);
      document.documentElement.dataset.customCursor = "true";
      if (ref.current) ref.current.style.opacity = "1";
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) hide(); };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerout", leave);
    window.addEventListener("blur", hide);
    media.addEventListener("change", hide);
    return () => {
      hide();
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      window.removeEventListener("blur", hide);
      media.removeEventListener("change", hide);
    };
  }, [x, y]);

  return (
    <motion.div ref={ref} className={styles.cursor} style={{ x, y }} aria-hidden="true">
      <svg width="26" height="26" viewBox="0 0 40 40" fill="none">
        <path fill="currentColor" stroke="white" strokeWidth="1.5" d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z" />
      </svg>
    </motion.div>
  );
}
