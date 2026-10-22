"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/profile";
import styles from "./Contact.module.css";

export function CopyEmail() {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setState("copied");
    } catch {
      setState("failed");
    }
    window.setTimeout(() => setState("idle"), 2200);
  };

  return (
    <div className={styles.emailRow}>
      <a href={`mailto:${profile.email}`} className={styles.email}>
        {profile.email}
      </a>
      <button type="button" className={`${styles.copy} glass`} onClick={copy} aria-label="Copy email address">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={state}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="mono"
          >
            {state === "idle" ? "Copy" : state === "copied" ? "Copied ✓" : "Press ⌘/Ctrl+C"}
          </motion.span>
        </AnimatePresence>
      </button>
      <span className="sr-only" aria-live="polite">
        {state === "copied" ? "Email address copied to clipboard" : ""}
      </span>
    </div>
  );
}
