import Image from "next/image";
import { hostOf, type Project } from "@/data/projects";
import styles from "./ProjectVisual.module.css";

type Props = {
  project: Project;
  /** Show the phone screenshot layered over the browser window. */
  withPhone?: boolean;
  sizes: string;
  className?: string;
};

/** A browser window with the live-site screenshot, optionally layered with the mobile view. */
export function ProjectVisual({ project, withPhone = false, sizes, className = "" }: Props) {
  const showPhone = withPhone && project.media.mobile;
  return (
    <div
      className={`${styles.visual} ${showPhone ? styles.hasPhone : ""} ${className}`}
      style={{ "--tint": project.tint } as React.CSSProperties}
    >
      <div className={styles.glow} aria-hidden="true" />
      <BrowserFrame host={hostOf(project.url)}>
        <Image
          src={`/work/${project.slug}.webp`}
          alt={`Homepage of ${project.name}`}
          width={1440}
          height={900}
          sizes={sizes}
          className={styles.shot}
        />
      </BrowserFrame>
      {showPhone && (
        <div className={styles.phone}>
          <Image
            src={`/work/${project.slug}-mobile.webp`}
            alt={`${project.name} on a phone`}
            width={390}
            height={844}
            sizes="(max-width: 760px) 30vw, 180px"
            className={styles.phoneShot}
          />
        </div>
      )}
    </div>
  );
}

export function BrowserFrame({ host, children, className = "" }: { host: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`${styles.browser} ${className}`}>
      <div className={styles.bar} aria-hidden="true">
        <span className={styles.dots}>
          <i />
          <i />
          <i />
        </span>
        <span className={styles.url}>
          <svg viewBox="0 0 12 12" width="9" height="9">
            <path d="M3.5 5V3.8a2.5 2.5 0 0 1 5 0V5M2.5 5h7v5.5h-7z" fill="none" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          {host}
        </span>
      </div>
      <div className={styles.viewport}>{children}</div>
    </div>
  );
}
