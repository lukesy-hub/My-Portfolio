"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import styles from "./Contact.module.css";

const topics = ["Website", "Web application", "AI automation", "Mobile app", "Something else"] as const;

/**
 * No backend is connected, so this form does not "send" anything itself.
 * It composes the message and opens the visitor's email app with it ready —
 * and says so plainly, before and after.
 */
export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "opened">("idle");

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const topic = String(data.get("topic") ?? "");
    const message = String(data.get("message") ?? "").trim();

    const subject = `${topic} enquiry from ${name}`;
    const body = `${message}\n\n— ${name}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("opened");
  };

  return (
    <form className={styles.form} onSubmit={onSubmit} aria-describedby="form-note">
      <p id="form-note" className={`${styles.formNote} mono`}>
        Composes an email in your mail app — nothing is stored or sent from this site.
      </p>

      <div className={styles.field}>
        <label htmlFor="cf-name">Your name</label>
        <input id="cf-name" name="name" autoComplete="name" required maxLength={80} />
      </div>

      <fieldset className={styles.topics}>
        <legend>What are we building?</legend>
        {topics.map((t, i) => (
          <label key={t} className={styles.topic}>
            <input type="radio" name="topic" value={t} defaultChecked={i === 0} />
            <span>{t}</span>
          </label>
        ))}
      </fieldset>

      <div className={styles.field}>
        <label htmlFor="cf-message">Project details</label>
        <textarea id="cf-message" name="message" rows={5} required minLength={10} maxLength={3000} />
      </div>

      <button type="submit" className="btn">
        Open in my email app <span className="btn__arrow" aria-hidden="true">↗</span>
      </button>

      <p className={styles.formStatus} role="status">
        {status === "opened" && (
          <>
            Your email app should now be open with the message ready to send. If nothing opened, write to{" "}
            <a href={`mailto:${profile.email}`} className="link-underline">
              {profile.email}
            </a>
            .
          </>
        )}
      </p>
    </form>
  );
}
