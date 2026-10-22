"use client";

import { useCallback, useState } from "react";
import { otherWork, projects, type Project } from "@/data/projects";
import { Reveal } from "../Reveal";
import { SectionHead } from "../SectionHead";
import { CaseStudy } from "./CaseStudy";
import { FeaturedReel } from "./FeaturedReel";
import { WorkIndex } from "./WorkIndex";
import styles from "./Work.module.css";

export function Work() {
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);

  return (
    <section id="work" className={`section ${styles.work}`} aria-labelledby="work-title">
      <div className="container">
        <SectionHead
          index="01"
          label="Selected work"
          id="work-title"
          aside={
            <>
              {projects.length} live websites and web apps — automotive, commerce, professional services and healthcare —
              each shown as it appears today, captured from the live site.
            </>
          }
        >
          Websites that <em>work</em> for real businesses.
        </SectionHead>
      </div>

      <FeaturedReel onOpen={setOpen} />

      <div className="container">
        <WorkIndex onOpen={setOpen} />

        <div className={styles.other}>
          <Reveal>
            <h3 className={styles.otherTitle}>
              Beyond the browser <span className="serif italic">— systems & apps</span>
            </h3>
            <p className={styles.otherLede}>
              Products from my CV that live behind logins, in app stores or inside client teams, so there is no public link.
            </p>
          </Reveal>
          <ul className={styles.otherList}>
            {otherWork.map((item, i) => (
              <Reveal as="li" key={item.name} delay={i * 0.04} className={styles.otherRow}>
                <span className="mono">{String(i + 1).padStart(2, "0")}</span>
                <span className={styles.otherName}>{item.name}</span>
                <span className={styles.otherDetail}>{item.detail}</span>
                <span className={styles.otherTech}>
                  {item.tech.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <CaseStudy project={open} onClose={close} onNavigate={setOpen} />
    </section>
  );
}
