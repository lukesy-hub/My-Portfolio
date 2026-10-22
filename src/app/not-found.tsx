import type { Metadata } from "next";
import { Link } from "@/components/IntentLink";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="section page-top nf-wrap" aria-labelledby="nf-title">
      <div className="container nf-inner">
        <p className="nf-code mono">
          <span className="glitch" data-text="Error 404">
            Error 404
          </span>
        </p>
        <h1 id="nf-title" className="nf-title">
          This page <em className="serif italic">doesn’t exist</em>.
        </h1>
        <pre className="nf-term" aria-hidden="true">
          <code>
            <span>~ %</span> cd ./this-page{"\n"}
            cd: no such file or directory
          </code>
        </pre>
        <div className="nf-actions">
          <Link href="/" className="btn">
            Back home <span className="btn__arrow" aria-hidden="true">→</span>
          </Link>
          <Link href="/projects" className="btn btn--ghost">
            Browse projects
          </Link>
        </div>
      </div>
    </section>
  );
}
