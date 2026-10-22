"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";

type Props = {
  index: string;
  label: string;
  id: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
  /** 1 for a page's main heading, 2 for sections within a page. */
  level?: 1 | 2;
};

/** Swiss section header: numbered index column + headline, with a one-shot glitch on the label. */
export function SectionHead({ index, label, id, children, aside, level = 2 }: Props) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <header className="section-head">
      <div className="section-head__index mono">
        <span>{index}</span>
        <GlitchLabel text={label} />
      </div>
      <div className="section-head__title">
        {level === 1 ? (
          // Page headings animate with CSS so they paint (and count for LCP) before hydration.
          <Heading id={id} className="h-section h-page">
            {children}
          </Heading>
        ) : (
          <Reveal>
            <Heading id={id} className="h-section">
              {children}
            </Heading>
          </Reveal>
        )}
        {aside && (
          <Reveal delay={0.1}>
            <div className="lede" style={{ marginTop: 24 }}>
              {aside}
            </div>
          </Reveal>
        )}
      </div>
    </header>
  );
}

/** A short chromatic glitch the first time the label scrolls into view, and on hover. */
export function GlitchLabel({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 1 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className="glitch"
      data-text={text}
      data-active={active}
      onAnimationEnd={() => setActive(false)}
      onMouseEnter={() => setActive(true)}
    >
      {text}
    </span>
  );
}
