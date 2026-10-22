"use client";

import { Link } from "@/components/IntentLink";
import { navLinks, profile, socials } from "@/data/profile";
import { DotWordmark } from "./DotWordmark";
import { useLocalTime } from "@/lib/hooks";
import { scrollToId } from "@/lib/scroll";
import styles from "./Footer.module.css";

export function Footer() {
  const time = useLocalTime(profile.timeZone);

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.lead}>
            <p className={styles.leadText}>
              Open to freelance projects, product teams and collaborations.
            </p>
            <a href={`mailto:${profile.email}`} className={`${styles.mail} link-underline`}>
              {profile.email}
            </a>
          </div>

          <nav aria-label="Footer" className={styles.col}>
            <p className="mono">Pages</p>
            <ul>
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={styles.col}>
            <p className="mono">Elsewhere</p>
            <ul>
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="link-underline"
                    target={s.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                  >
                    {s.label}
                    {s.href.startsWith("http") && <span className="sr-only"> (opens in a new tab)</span>}
                  </a>
                </li>
              ))}
              <li>
                <a href={profile.cv.href} download={profile.cv.fileName} className="link-underline">
                  CV · PDF ↓
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={`${styles.bottom} mono`}>
          <span>© 2026 {profile.name}</span>
          <span>
            Lahore, PK{time ? ` · ${time} PKT` : ""}
          </span>
          <button type="button" className={styles.backTop} onClick={() => scrollToId("top")}>
            Back to top ↑
          </button>
        </div>
      </div>

      <DotWordmark text="muhammad talha" />
    </footer>
  );
}
