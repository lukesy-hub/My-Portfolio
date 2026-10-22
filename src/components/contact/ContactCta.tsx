import { Link } from "@/components/IntentLink";
import { profile } from "@/data/profile";
import styles from "./Contact.module.css";

/** Home: closing invitation that hands off to the contact page. */
export function ContactCta() {
  return (
    <section className={`section ${styles.cta}`} aria-labelledby="cta-title">
      <div className={styles.ctaGlow} aria-hidden="true" />
      <div className={`container ${styles.ctaInner}`}>
        <p className="mono">04 — Next step</p>
        <h2 id="cta-title" className={styles.ctaTitle}>
          Have a project <em>in mind?</em>
        </h2>
        <div className={styles.ctaActions}>
          <Link href="/contact" className="btn">
            Contact Me <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
          <a href={`mailto:${profile.email}`} className="btn btn--ghost">
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  );
}
