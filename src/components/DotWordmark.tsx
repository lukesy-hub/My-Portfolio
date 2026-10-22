"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "@/lib/hooks";
import styles from "./DotWordmark.module.css";

type Dot = { hx: number; hy: number; x: number; y: number; vx: number; vy: number };

const SPRING = 0.07;
const DAMPING = 0.82;
const SETTLED = 0.05;

/**
 * Footer signature: the name drawn as a dot matrix on canvas. Dots assemble the
 * first time it scrolls into view, scatter away from the pointer and spring back,
 * tinting toward the accent colour while displaced. The loop sleeps once every
 * dot has settled and pauses off-screen. Reduced motion → static dots.
 */
export function DotWordmark({ text }: { text: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const theme = useTheme();
  const repaint = useRef<() => void>(() => {});

  useEffect(() => {
    const host = wrap.current;
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!host || !el || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let dots: Dot[] = [];
    let width = 0;
    let height = 0;
    let gap = 7;
    let radius = 2.4;
    let frame = 0;
    let visible = false;
    let assembled = reduce;
    const pointer = { x: -9999, y: -9999, active: false };
    let ink = "#121210";
    let accent = "#e8461e";

    const readColors = () => {
      const css = getComputedStyle(document.documentElement);
      ink = css.getPropertyValue("--ink").trim() || ink;
      accent = css.getPropertyValue("--accent").trim() || accent;
    };

    // Sample the rendered word into a grid of dot "home" positions.
    const build = () => {
      width = host.clientWidth;
      if (!width) return;
      gap = width < 600 ? 4.5 : width < 1100 ? 6 : 7;
      radius = gap * 0.36;

      const family = getComputedStyle(document.body).fontFamily;
      const probe = document.createElement("canvas").getContext("2d")!;
      probe.font = `700 100px ${family}`;
      const fontSize = (100 * width) / probe.measureText(text).width;
      // Visible band: the top ~78% of the letters — the rest bleeds off the page edge.
      height = Math.round(fontSize * 0.62);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      el.width = Math.round(width * dpr);
      el.height = Math.round(height * dpr);
      el.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const off = document.createElement("canvas");
      off.width = Math.ceil(width);
      off.height = height;
      const octx = off.getContext("2d", { willReadFrequently: true })!;
      octx.font = `700 ${fontSize}px ${family}`;
      octx.textBaseline = "alphabetic";
      octx.fillStyle = "#000";
      octx.fillText(text, 0, height + fontSize * 0.06);
      const data = octx.getImageData(0, 0, off.width, off.height).data;

      const next: Dot[] = [];
      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          if (data[(Math.floor(y) * off.width + Math.floor(x)) * 4 + 3] > 140) {
            const start = assembled
              ? { x, y }
              : { x: x + (Math.random() - 0.5) * 120, y: y + height * (0.6 + Math.random() * 0.8) };
            next.push({ hx: x, hy: y, x: start.x, y: start.y, vx: 0, vy: 0 });
          }
        }
      }
      dots = next;
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      // Settled dots in one batched path; displaced dots individually, tinted by displacement.
      ctx.fillStyle = ink;
      ctx.beginPath();
      const moving: Dot[] = [];
      for (const d of dots) {
        const off = Math.abs(d.x - d.hx) + Math.abs(d.y - d.hy);
        if (off > 1.5) {
          moving.push(d);
          continue;
        }
        ctx.moveTo(d.x + radius, d.y);
        ctx.arc(d.x, d.y, radius, 0, Math.PI * 2);
      }
      ctx.fill();
      for (const d of moving) {
        const off = Math.min(1, (Math.abs(d.x - d.hx) + Math.abs(d.y - d.hy)) / 40);
        ctx.globalAlpha = 1;
        ctx.fillStyle = off > 0.25 ? accent : ink;
        ctx.beginPath();
        ctx.arc(d.x, d.y, radius * (1 - off * 0.25), 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const step = () => {
      frame = 0;
      const reach = Math.max(70, width * 0.07);
      let energy = 0;
      for (const d of dots) {
        if (pointer.active) {
          const dx = d.x - pointer.x;
          const dy = d.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          if (dist < reach && dist > 0.01) {
            const force = (1 - dist / reach) * 7;
            d.vx += (dx / dist) * force;
            d.vy += (dy / dist) * force;
          }
        }
        d.vx = (d.vx + (d.hx - d.x) * SPRING) * DAMPING;
        d.vy = (d.vy + (d.hy - d.y) * SPRING) * DAMPING;
        d.x += d.vx;
        d.y += d.vy;
        energy += Math.abs(d.vx) + Math.abs(d.vy) + Math.abs(d.hx - d.x) * 0.1;
      }
      draw();
      // Keep running while the pointer is over it or anything is still moving.
      if (visible && (pointer.active || energy / Math.max(dots.length, 1) > SETTLED)) frame = requestAnimationFrame(step);
    };

    const wake = () => {
      if (!reduce && visible && !frame) frame = requestAnimationFrame(step);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      wake();
    };
    const onLeave = () => {
      pointer.active = false;
      wake();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !assembled) {
          assembled = true; // dots fly in once, then the build keeps them home
        }
        wake();
      },
      { threshold: 0.15 },
    );

    let resizeTimer = 0;
    const ro = new ResizeObserver(() => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (host.clientWidth !== width) build();
      }, 120);
    });

    repaint.current = () => {
      readColors();
      draw();
    };

    readColors();
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      build();
      io.observe(el);
      ro.observe(host);
    });

    if (!reduce) {
      el.addEventListener("pointermove", onMove);
      el.addEventListener("pointerleave", onLeave);
      el.addEventListener("pointercancel", onLeave);
    }

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      window.clearTimeout(resizeTimer);
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointercancel", onLeave);
    };
  }, [text]);

  // Theme switch: re-read the colour tokens and repaint.
  useEffect(() => {
    repaint.current();
  }, [theme]);

  return (
    <div ref={wrap} className={styles.wrap}>
      <canvas ref={canvas} className={styles.canvas} aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </div>
  );
}
