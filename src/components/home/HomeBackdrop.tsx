"use client";

import { useRef } from "react";
import { useTheme } from "@/lib/hooks";
import { gsap, prefersReducedMotion, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Home page only: eases the page background to a new tint as each section
 * reaches the middle of the viewport. Tints are the `--home-bg-N` tokens in
 * globals.css (one per section, light and dark), so the theme toggle re-reads them.
 */
export function HomeBackdrop({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const theme = useTheme();

  useGSAP(
    () => {
      const tokens = getComputedStyle(document.documentElement);
      const duration = prefersReducedMotion() ? 0 : 0.9;
      const sections = Array.from(root.current?.children ?? []);

      const paint = (i: number) => {
        const color = tokens.getPropertyValue(`--home-bg-${i}`).trim();
        if (color) gsap.to(document.body, { backgroundColor: color, duration, ease: "power2.out", overwrite: true });
      };

      const triggers = sections.map((section, i) =>
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && paint(i),
        }),
      );

      return () => {
        triggers.forEach((t) => t.kill());
        gsap.killTweensOf(document.body);
        gsap.set(document.body, { clearProps: "backgroundColor" });
      };
    },
    { scope: root, dependencies: [theme], revertOnUpdate: true },
  );

  return <div ref={root}>{children}</div>;
}
