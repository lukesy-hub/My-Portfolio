"use client";

import { useRef } from "react";
import { education, roles, type Role } from "@/data/experience";
import { profile } from "@/data/profile";
import { gsap, useGSAP } from "@/lib/gsap";
import { Reveal } from "./Reveal";
import { SectionHead } from "./SectionHead";
import styles from "./Experience.module.css";

export function Experience({ level = 2 }: { level?: 1 | 2 }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          "[data-rail-fill]",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "[data-roles]", start: "top 60%", end: "bottom 60%", scrub: true },
          },
        );
        gsap.utils.toArray<HTMLElement>("[data-node]").forEach((node) => {
          gsap.to(node, {
            scrollTrigger: {
              trigger: node,
              start: "top 60%",
              toggleClass: { targets: node, className: styles.nodeOn },
            },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="experience" ref={root} className={`section ${styles.experience}`} aria-labelledby="experience-title">
      <div className="container">
        <SectionHead
          level={level}
          index="03"
          label="Experience"
          id="experience-title"
          aside="Four companies since 2023 — from MERN and Flutter internships to leading a development team."
        >
          From intern to <em>team lead</em>.
        </SectionHead>

        <div className={styles.layout}>
          <aside className={styles.side}>
            <div className={styles.sticky}>
              <p className={`${styles.span} serif`}>
                2023<span className={styles.arrow}>→</span>
                <span className="italic">now</span>
              </p>
              <dl className={styles.stats}>
                <div>
                  <dt className="mono">Roles</dt>
                  <dd>{roles.length}</dd>
                </div>
                <div>
                  <dt className="mono">Companies</dt>
                  <dd>{new Set(roles.map((r) => r.company)).size}</dd>
                </div>
              </dl>
              <div className={styles.edu}>
                <p className="mono">Education</p>
                <p className={styles.eduDegree}>{education.degree}</p>
                <p className={styles.eduSchool}>{education.school}</p>
                <p className="mono">
                  {education.start} — {education.end}
                </p>
              </div>
              <a href={profile.cv.href} download={profile.cv.fileName} className="btn btn--ghost">
                Full CV (PDF) <span className="btn__arrow btn__arrow--down" aria-hidden="true">↓</span>
              </a>
            </div>
          </aside>

          <div className={styles.roles} data-roles>
            <span className={styles.rail} aria-hidden="true">
              <span className={styles.railFill} data-rail-fill />
            </span>
            <ol className={styles.list}>
              {roles.map((role) => (
                <RoleItem key={`${role.company}-${role.start}`} role={role} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleItem({ role }: { role: Role }) {
  const current = role.end === "Present";
  return (
    <li className={styles.role}>
      <span className={styles.node} data-node aria-hidden="true" />
      <Reveal>
        <article className={styles.card}>
          <header className={styles.head}>
            <p className={`${styles.dates} mono`}>
              <time>{role.start}</time> — <time>{role.end}</time>
              {current && <span className={styles.now}>Current</span>}
            </p>
            <h3 className={styles.company}>{role.company}</h3>
            <p className={styles.title}>
              {role.title}
              {(role.type || role.location) && (
                <span className={styles.where}>
                  {[role.type, role.location].filter(Boolean).join(" · ")}
                </span>
              )}
            </p>
          </header>
          <ul className={styles.points}>
            {role.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <ul className={styles.stack} aria-label="Technologies used">
            {role.stack.map((s) => (
              <li key={s} className="tag">
                {s}
              </li>
            ))}
          </ul>
        </article>
      </Reveal>
    </li>
  );
}
