"use client";

import { useEffect, useRef } from "react";
import { skillGroups } from "@/data/skills";
import styles from "./SkillSphere.module.css";

type Family = "build" | "motion" | "ai" | "systems";

const families: { id: Family; label: string; groups: (keyof typeof skillGroups)[] }[] = [
  { id: "build", label: "Frontend & mobile", groups: ["frontend", "mobile"] },
  { id: "motion", label: "Motion & design", groups: ["motion", "design"] },
  { id: "ai", label: "AI & automation", groups: ["ai"] },
  { id: "systems", label: "Backend, data & tooling", groups: ["backend", "data", "tools", "performance"] },
];

const words: { text: string; family: Family }[] = [];
for (const fam of families) {
  for (const group of fam.groups) {
    for (const text of skillGroups[group]) {
      if (!words.some((w) => w.text === text)) words.push({ text, family: fam.id });
    }
  }
}

// Even spread over the sphere (Fibonacci lattice).
function fibonacciSphere(n: number) {
  const pts: [number, number, number][] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    pts.push([Math.cos(t) * r, y, Math.sin(t) * r]);
  }
  return pts;
}

/** A 3D globe of every skill — steer it with the pointer, drag it on touch. */
export function SkillSphere() {
  const stageRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pts = fibonacciSphere(words.length);
    let radius = stage.clientWidth * 0.43;
    const idle = { x: 0.0016, y: 0.0042 };
    const vel = { x: idle.x, y: idle.y };
    const target = { x: idle.x, y: idle.y };
    let dragging = false;
    let last = { x: 0, y: 0 };
    let visible = true;
    let raf = 0;

    const rotate = (ax: number, ay: number) => {
      const cx = Math.cos(ax), sx = Math.sin(ax), cy = Math.cos(ay), sy = Math.sin(ay);
      for (const p of pts) {
        // Around Y, then around X.
        const x1 = p[0] * cy + p[2] * sy;
        const z1 = -p[0] * sy + p[2] * cy;
        const y2 = p[1] * cx - z1 * sx;
        const z2 = p[1] * sx + z1 * cx;
        p[0] = x1;
        p[1] = y2;
        p[2] = z2;
      }
    };

    const draw = () => {
      pts.forEach((p, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        const depth = (p[2] + 1) / 2; // 0 back → 1 front
        const scale = 0.55 + depth * 0.65;
        el.style.transform = `translate(-50%, -50%) translate3d(${(p[0] * radius).toFixed(1)}px, ${(p[1] * radius).toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
        el.style.opacity = (0.18 + depth * 0.82).toFixed(3);
        el.style.zIndex = String(Math.round(depth * 100));
        el.style.filter = depth < 0.35 ? `blur(${((0.35 - depth) * 4).toFixed(2)}px)` : "none";
      });
    };

    const tick = () => {
      if (!dragging) {
        vel.x += (target.x - vel.x) * 0.05;
        vel.y += (target.y - vel.y) * 0.05;
      }
      rotate(vel.x, vel.y);
      draw();
      if (visible) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      if (dragging) {
        vel.y = (e.clientX - last.x) * 0.006;
        vel.x = -(e.clientY - last.y) * 0.006;
        last = { x: e.clientX, y: e.clientY };
        return;
      }
      if (e.pointerType !== "mouse") return;
      const dx = (e.clientX - rect.left) / rect.width - 0.5;
      const dy = (e.clientY - rect.top) / rect.height - 0.5;
      target.y = dx * 0.03;
      target.x = -dy * 0.03;
    };
    const onLeave = () => {
      target.x = idle.x;
      target.y = idle.y;
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      last = { x: e.clientX, y: e.clientY };
      stage.setPointerCapture(e.pointerId);
    };
    const onUp = () => {
      dragging = false;
      target.x = vel.x * 0.3 + idle.x;
      target.y = vel.y * 0.3 + idle.y;
      window.setTimeout(onLeave, 900);
    };

    const ro = new ResizeObserver(() => {
      radius = stage.clientWidth * 0.43;
      draw();
    });
    ro.observe(stage);

    draw();
    stage.dataset.ready = "true";
    if (reduce) return () => ro.disconnect();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(tick);
    });
    io.observe(stage);

    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
    };
  }, []);

  return (
    <div className={styles.band}>
      <div className={styles.copy}>
        <p className={`${styles.kicker} mono`}>The whole stack · in orbit</p>
        <h2 className={styles.title}>
          {words.length} tools, <em className="serif italic">one gravity</em>.
        </h2>
        <p className={styles.lede}>
          Everything I build with, on a single sphere. Move your cursor across it to steer — or drag it on touch.
        </p>
        <ul className={styles.legend}>
          {families.map((f) => (
            <li key={f.id} data-family={f.id}>
              <i aria-hidden="true" />
              {f.label}
              <span className="mono">{String(words.filter((w) => w.family === f.id).length).padStart(2, "0")}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.stage} ref={stageRef}>
        <div className={styles.core} aria-hidden="true" />
        <div className={`${styles.equator} ${styles.e1}`} aria-hidden="true" />
        <div className={`${styles.equator} ${styles.e2}`} aria-hidden="true" />
        <ul className={styles.words} aria-label="All skills">
          {words.map((w, i) => (
            <li
              key={w.text}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              data-family={w.family}
              className={styles.word}
            >
              {w.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
