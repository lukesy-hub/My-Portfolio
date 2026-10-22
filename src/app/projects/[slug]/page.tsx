import type { Metadata } from "next";
import Image from "next/image";
import { Link } from "@/components/IntentLink";
import { notFound } from "next/navigation";
import { BrowserFrame } from "@/components/work/ProjectVisual";
import { profile } from "@/data/profile";
import { hostOf, projects } from "@/data/projects";
import styles from "./case.module.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

// Only the known project slugs exist; anything else is a 404.
export const dynamicParams = false;

const find = (slug: string) => projects.find((p) => p.slug === slug);

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = find(slug);
  if (!project) return {};
  const title = `${project.name} — ${project.sector}`;
  return {
    title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title,
      description: project.summary,
      images: [{ url: `/work/${project.slug}.webp`, width: 1440, height: 900, alt: `${project.name} homepage` }],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = find(slug);
  if (!project) notFound();

  const index = projects.indexOf(project);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: project.name,
    url: project.url,
    description: project.summary,
    creator: { "@type": "Person", name: profile.name, url: profile.siteUrl },
  };

  return (
    <article className={`section page-top ${styles.case}`} style={{ "--tint": project.tint } as React.CSSProperties}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className={styles.wash} aria-hidden="true" />

      <div className="container">
        <nav aria-label="Breadcrumb" className={`${styles.crumbs} mono`}>
          <Link href="/projects" className="link-underline">
            Projects
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{project.name}</span>
        </nav>

        <header className={styles.head}>
          <p className={`${styles.kicker} mono`}>
            {String(index + 1).padStart(2, "0")} — {project.category} · {project.sector}
          </p>
          <h1 className={styles.title}>{project.name}</h1>
          <p className={styles.summary}>{project.summary}</p>
          <div className={styles.links}>
            <a href={project.url} target="_blank" rel="noopener noreferrer" className="btn">
              Visit live site <span className="btn__arrow" aria-hidden="true">↗</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            {project.altLinks?.map((alt) => (
              <a key={alt.url} href={alt.url} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                {alt.label} <span className="btn__arrow" aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </div>
        </header>

        <div className={styles.body}>
          <div className={styles.shotCol}>
            <BrowserFrame host={hostOf(project.url)}>
              <div
                className={styles.scroller}
                data-lenis-prevent
                tabIndex={0}
                role="region"
                aria-label={`Full-page screenshot of ${project.name} — scrollable`}
              >
                <Image
                  src={project.media.long ? `/work/${project.slug}-long.webp` : `/work/${project.slug}.webp`}
                  alt={`Full-page screenshot of the ${project.name} website`}
                  width={project.media.long ? 960 : 1440}
                  height={project.media.long ? (project.longHeight ?? 3200) : 900}
                  sizes="(max-width: 960px) 92vw, 58vw"
                  preload
                  className={styles.longShot}
                />
              </div>
            </BrowserFrame>
            {project.media.long && <p className={`${styles.hint} mono`}>Scroll inside the window to see the full page ↕</p>}
          </div>

          <div className={styles.info}>
            <dl className={styles.facts}>
              <div>
                <dt className="mono">Category</dt>
                <dd>{project.category}</dd>
              </div>
              {project.location && (
                <div>
                  <dt className="mono">Location</dt>
                  <dd>{project.location}</dd>
                </div>
              )}
              <div>
                <dt className="mono">Built with</dt>
                <dd>{project.tech.join(", ")}</dd>
              </div>
              {project.context && (
                <div>
                  <dt className="mono">Delivered at</dt>
                  <dd>{project.context}</dd>
                </div>
              )}
              <div>
                <dt className="mono">Live at</dt>
                <dd>{hostOf(project.url)}</dd>
              </div>
            </dl>

            <h2 className={`${styles.subhead} mono`}>On the site</h2>
            <ul className={styles.highlights}>
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>

            {project.media.mobile && (
              <figure className={styles.phone}>
                <Image src={`/work/${project.slug}-mobile.webp`} alt={`${project.name} homepage on mobile`} width={390} height={844} sizes="180px" />
                <figcaption className="mono">Mobile · 390px</figcaption>
              </figure>
            )}
          </div>
        </div>

        <nav className={styles.pager} aria-label="More projects">
          <Link href={`/projects/${prev.slug}`} className={styles.pagerLink}>
            <span className="mono">← Previous</span>
            <span className={styles.pagerName}>{prev.name}</span>
          </Link>
          <Link href={`/projects/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span className="mono">Next →</span>
            <span className={styles.pagerName}>{next.name}</span>
          </Link>
        </nav>
      </div>
    </article>
  );
}
