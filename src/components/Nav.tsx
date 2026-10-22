"use client";

import { useEffect, useState } from "react";
import { Link } from "@/components/IntentLink";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { navLinks, profile, socials } from "@/data/profile";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Nav.module.css";

/** "/projects/dopamine" belongs to "/projects"; "/" only matches itself. */
const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`));

export function Nav() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);
  const [openPath, setOpenPath] = useState<string | null>(null);
  // The menu is "open" only for the route it was opened on, so navigating closes it.
  const open = openPath === pathname;
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setCompact(y > 80));

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenPath(null);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header className={styles.header} data-compact={compact}>
        <Link href="/" className={styles.brand} aria-label={`${profile.name} — home`}>
          <span className={styles.brandMark} aria-hidden="true">
            T<span>.</span>
          </span>
          <span className={styles.brandText}>
            <span>{profile.name}</span>
            <span className="mono">Full stack · AI automation</span>
          </span>
        </Link>

        <nav className={`${styles.pill} glass`} aria-label="Primary">
          <ul>
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link href={link.href} className={styles.link} aria-current={active ? "page" : undefined}>
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className={styles.activeBg}
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className={styles.linkText}>{link.label}</span>
                  </Link>
                </li>
              );
            })}
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
            onClick={() => setOpenPath(open ? null : pathname)}
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
                    key={link.href}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpenPath(null)}
                      aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    >
                      <span className="mono">{String(i).padStart(2, "0")}</span>
                      {link.label}
                    </Link>
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
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="mono link-underline"
                    >
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
