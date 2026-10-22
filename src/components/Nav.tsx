"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { navLinks, profile, socials } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Nav.module.css";

const sectionIds = navLinks.map((l) => l.id);

function useActiveSection() {
  const [active, setActive] = useState<string>("top");

  useEffect(() => {
    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.intersectionRatio);
        let best = "top";
        let bestRatio = 0;
        for (const id of sectionIds) {
          const ratio = visible.get(id) ?? 0;
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (bestRatio > 0) setActive(best);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.01, 0.5, 1] },
    );
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Nav() {
  const active = useActiveSection();
  const [compact, setCompact] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 80));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.div className={styles.progress} style={{ scaleX: progress }} aria-hidden="true" />

      <header className={styles.header} data-compact={compact}>
        <a href="#top" className={styles.brand} aria-label={`${profile.name} — back to top`}>
          <span className={styles.brandMark} aria-hidden="true">
            T<span>.</span>
          </span>
          <span className={styles.brandText}>
            <span>{profile.name}</span>
            <span className="mono">Full stack · AI automation</span>
          </span>
        </a>

        <nav className={`${styles.pill} glass`} aria-label="Primary">
          <ul>
            {navLinks.slice(1).map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={styles.link}
                  aria-current={active === link.id ? "location" : undefined}
                >
                  {active === link.id && (
                    <motion.span
                      layoutId="nav-active"
                      className={styles.activeBg}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className={styles.linkText}>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <a href={profile.cv.href} download={profile.cv.fileName} className={`${styles.cv} btn`}>
            <span>CV</span>
            <span className="btn__arrow btn__arrow--down" aria-hidden="true">↓</span>
            <span className="sr-only">Download Muhammad Talha’s CV (PDF)</span>
          </a>
          <button
            type="button"
            className={`${styles.menuBtn} glass`}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={styles.burger} data-open={open} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className={styles.sheet}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav aria-label="Mobile">
              <ol className={styles.sheetList}>
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <a href={`#${link.id}`} onClick={() => setOpen(false)} aria-current={active === link.id ? "location" : undefined}>
                      <span className="mono">{String(i).padStart(2, "0")}</span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ol>
            </nav>
            <div className={styles.sheetFoot}>
              <a href={profile.cv.href} download={profile.cv.fileName} className="btn">
                Download CV <span className="btn__arrow btn__arrow--down" aria-hidden="true">↓</span>
              </a>
              <ul className={styles.sheetSocials}>
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target={s.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="mono link-underline">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
