"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";
import styles from "./SiteEffects.module.css";

type Particle = { x: number; y: number; vx: number; vy: number; alpha: number; start: number };

// Adapted from jatin-yadav05/vapour-text-effect: sample text pixels, then
// dissolve them with a left-to-right wave. One bounded cycle for the splash.
export function SplashScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const overlay = overlayRef.current;
    const canvas = canvasRef.current;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    if (!overlay || !canvas || reduced.matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let frame = 0;
    let stopped = false;
    let started = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    const finish = () => {
      stopped = true;
      cancelAnimationFrame(frame);
      overlay.removeAttribute("data-active");
    };
    const onKey = () => finish();
    // Keyboard navigation immediately reveals the page; no focus trap.
    window.addEventListener("keydown", onKey);
    reduced.addEventListener("change", finish);
    const timeout = window.setTimeout(finish, 4200);

    const prepare = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const sample = document.createElement("canvas");
      sample.width = Math.round(width);
      sample.height = Math.round(height);
      const source = sample.getContext("2d", { willReadFrequently: true });
      if (!source) return;
      const family = getComputedStyle(overlay).fontFamily;
      let size = Math.min(84, width * 0.09);
      source.font = `600 ${size}px ${family}`;
      size *= Math.min(1, (width - 48) / source.measureText(profile.name).width);
      source.font = `600 ${size}px ${family}`;
      source.textAlign = "center";
      source.textBaseline = "middle";
      source.fillStyle = "white";
      source.fillText(profile.name, width / 2, height / 2);
      const textWidth = source.measureText(profile.name).width;
      const left = (width - textWidth) / 2;
      const pixels = source.getImageData(0, 0, sample.width, sample.height).data;
      particles = [];
      for (let y = 0; y < sample.height; y += 2) {
        for (let x = 0; x < sample.width; x += 2) {
          const alpha = pixels[(y * sample.width + x) * 4 + 3] / 255;
          if (!alpha) continue;
          const angle = Math.random() * Math.PI * 2;
          const speed = 20 + Math.random() * 65;
          particles.push({ x, y, alpha, vx: Math.cos(angle) * speed + 30,
            vy: Math.sin(angle) * speed - 25, start: (x - left) / textWidth * 1000 });
        }
      }
    };
    const draw = (now: number) => {
      if (stopped) return;
      if (!started) started = now;
      const elapsed = now - started;
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = getComputedStyle(overlay).color;
      for (const p of particles) {
        const age = Math.max(0, (elapsed - 850 - p.start) / 1000);
        ctx.globalAlpha = p.alpha * Math.min(1, elapsed / 250) * Math.max(0, 1 - age / 1.2);
        ctx.fillRect(p.x + p.vx * age, p.y + p.vy * age - age * age * 16, 1.7, 1.7);
      }
      ctx.globalAlpha = 1;
      overlay.style.opacity = String(Math.max(0, 1 - Math.max(0, elapsed - 2900) / 400));
      if (elapsed >= 3300) finish();
      else frame = requestAnimationFrame(draw);
    };
    overlay.dataset.active = "true";
    overlay.style.opacity = "1";
    prepare();
    frame = requestAnimationFrame(draw);
    const resize = () => prepare();
    window.addEventListener("resize", resize);
    return () => {
      finish();
      clearTimeout(timeout);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKey);
      reduced.removeEventListener("change", finish);
    };
  }, []);

  return (
    <div ref={overlayRef} className={styles.splash} aria-hidden="true" onPointerDown={() => overlayRef.current?.removeAttribute("data-active")}>
      <span className={styles.eyebrow}>PORTFOLIO / {new Date().getFullYear()}</span>
      <canvas ref={canvasRef} className={styles.vapour} />
      <span className={styles.skip}>Click or press any key to skip</span>
    </div>
  );
}
