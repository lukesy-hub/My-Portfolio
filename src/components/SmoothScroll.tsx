"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { scrollToId, setLenis } from "@/lib/scroll";

/**
 * Lenis smoothing driven by GSAP's ticker so ScrollTrigger and Lenis share one
 * clock. Disabled entirely for reduced-motion users (native scrolling remains).
 * In-page anchor clicks are routed through `scrollToId` to respect the nav offset.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let lenis: Lenis | null = null;
    let tick: ((time: number) => void) | null = null;

    const start = () => {
      lenis = new Lenis({ lerp: 0.11, wheelMultiplier: 1, touchMultiplier: 1.2 });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (time) => lenis?.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      setLenis(lenis);
    };

    const stop = () => {
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      lenis = null;
      setLenis(null);
    };

    if (!reduce.matches) start();
    const onChange = () => (reduce.matches ? stop() : start());
    reduce.addEventListener("change", onChange);

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return;
      const anchor = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href")!.slice(1) || "top";
      if (id !== "top" && !document.getElementById(id)) return;
      event.preventDefault();
      scrollToId(id);
    };
    document.addEventListener("click", onClick);

    // Honour a hash in the URL on first load, after layout settles.
    if (location.hash.length > 1) {
      const id = decodeURIComponent(location.hash.slice(1));
      requestAnimationFrame(() => setTimeout(() => scrollToId(id), 120));
    }

    // Recompute trigger positions once fonts and images change layout.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      reduce.removeEventListener("change", onChange);
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      stop();
    };
  }, []);

  return null;
}
