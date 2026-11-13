/*
 * Ink-bleed theme transition — adapted from "ink-bleed-theme-changer" by Codemure (MIT).
 * https://github.com/codemure-official/ink-bleed-theme-changer
 *
 * How it works here:
 *  1. The View Transitions API snapshots the page before the theme flips and keeps a
 *     live view of the page after it (no html2canvas, so every modern CSS feature,
 *     WebGL canvas and image renders exactly).
 *  2. Each frame, the ink shader renders a coverage mask into a small offscreen WebGL
 *     canvas; it is applied to ::view-transition-new(root) through `--ink-mask`, so
 *     the new theme bleeds through the old one along the ink.
 *  3. The same canvas then draws the pigment rim and is shown on top of the transition
 *     as its own view-transition group.
 */
import { createNoiseTexture } from "./noiseTexture";
import { createProgram, type Program } from "./program";
import { FULLSCREEN_VERT, INK_FRAG } from "./shaders";

export type Theme = "light" | "dark";
export type Point = { x: number; y: number };

/** Look of the ink (same defaults as the original). */
const PARAMS = { duration: 1.4, tendril: 1, noiseScale: 1, softness: 1.4, drift: 1 };

/**
 * Spread shape over time. `growth`: base radius at progress 1 relative to the farthest
 * corner. After `cleanupFrom` of the duration, a uniform extra reach eats whatever the
 * noise left behind, so the page is fully covered exactly at the end.
 */
const SPREAD = { growth: 0.7, cleanupFrom: 0.45, cleanupReach: 0.4, cleanupPow: 2 };

/** Pigment pooled at the frontier, keyed by the theme being revealed. */
const RIM_COLOR: Record<Theme, [number, number, number]> = {
  dark: [0.0, 0.0, 0.0],
  light: [1.0, 0.995, 0.98],
};

/** Mask resolution cap (CSS px wide). The mask is scaled up smoothly by the browser. */
const MAX_MASK_WIDTH = 560;

type Frame = {
  center: Point;
  radius: number;
  cleanup: number;
  time: number;
  seed: { x: number; y: number; angle: number };
  to: Theme;
};

class InkRenderer {
  readonly canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: Program;
  private vao: WebGLVertexArrayObject;
  private noise: WebGLTexture;
  private scale = 1;

  static create(): InkRenderer | null {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
    });
    if (!gl) return null;
    try {
      return new InkRenderer(canvas, gl);
    } catch (err) {
      console.error("[ink]", err);
      return null;
    }
  }

  private constructor(canvas: HTMLCanvasElement, gl: WebGL2RenderingContext) {
    this.canvas = canvas;
    this.gl = gl;
    this.program = createProgram(gl, FULLSCREEN_VERT, INK_FRAG);
    const vao = gl.createVertexArray();
    if (!vao) throw new Error("createVertexArray failed");
    this.vao = vao;
    this.noise = createNoiseTexture(gl);
    canvas.className = "ink-rim";
    canvas.setAttribute("aria-hidden", "true");
  }

  get isLost() {
    return this.gl.isContextLost();
  }

  resize(width: number, height: number) {
    this.scale = Math.min(1, MAX_MASK_WIDTH / width);
    const w = Math.max(1, Math.round(width * this.scale));
    const h = Math.max(1, Math.round(height * this.scale));
    if (this.canvas.width !== w) this.canvas.width = w;
    if (this.canvas.height !== h) this.canvas.height = h;
  }

  draw(frame: Frame, mode: 0 | 1) {
    const gl = this.gl;
    const { program, uniform } = this.program;
    const { width, height } = this.canvas;
    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);
    gl.bindVertexArray(this.vao);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.noise);

    gl.uniform1i(uniform("uNoise"), 0);
    gl.uniform1i(uniform("uMode"), mode);
    gl.uniform1f(uniform("uCanvasScale"), this.scale);
    gl.uniform2f(uniform("uRes"), width, height);
    gl.uniform2f(uniform("uCenter"), frame.center.x, frame.center.y);
    gl.uniform1f(uniform("uRadius"), frame.radius);
    gl.uniform1f(uniform("uCleanup"), frame.cleanup);
    gl.uniform1f(uniform("uTime"), frame.time);
    gl.uniform1f(uniform("uRef"), Math.max(width, height) / this.scale);
    gl.uniform2f(uniform("uSeed"), frame.seed.x, frame.seed.y);
    const cos = Math.cos(frame.seed.angle);
    const sin = Math.sin(frame.seed.angle);
    gl.uniformMatrix2fv(uniform("uSeedRot"), false, [cos, sin, -sin, cos]);
    gl.uniform1f(uniform("uTendril"), PARAMS.tendril);
    gl.uniform1f(uniform("uNoiseScale"), PARAMS.noiseScale);
    // The mask is rendered below screen resolution; widen the frontier by about half a
    // mask pixel so the browser's upscale stays smooth instead of stair-stepped.
    gl.uniform1f(uniform("uSoftness"), PARAMS.softness + 0.5 / this.scale);
    gl.uniform1f(uniform("uDrift"), PARAMS.drift);
    gl.uniform3fv(uniform("uRimColor"), RIM_COLOR[frame.to]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
}

let renderer: InkRenderer | null | undefined;
let running = false;

function getRenderer(): InkRenderer | null {
  if (renderer === undefined || renderer?.isLost) renderer = InkRenderer.create();
  return renderer;
}

/** True when the ink transition can run (View Transitions + WebGL2, motion allowed). */
export function canInk(): boolean {
  if (typeof document === "undefined" || !document.startViewTransition) return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return getRenderer() !== null;
}

export function isInkRunning() {
  return running;
}

/**
 * Flip the theme with ink spreading from `point` (viewport CSS px).
 * `apply` must switch the theme on the live DOM synchronously.
 */
export async function inkToggle(to: Theme, point: Point, apply: () => void): Promise<void> {
  const ink = getRenderer();
  if (!ink || running || !document.startViewTransition) {
    apply();
    return;
  }
  running = true;
  const root = document.documentElement;
  const width = root.clientWidth;
  const height = window.innerHeight;
  ink.resize(width, height);

  const center = point;
  const maxDist =
    Math.max(
      Math.hypot(center.x, center.y),
      Math.hypot(width - center.x, center.y),
      Math.hypot(center.x, height - center.y),
      Math.hypot(width - center.x, height - center.y),
    ) + 4;
  const seed = { x: Math.random() * 64 - 32, y: Math.random() * 64 - 32, angle: Math.random() * Math.PI * 2 };
  const duration = PARAMS.duration;

  const frameAt = (time: number): Frame => {
    const linear = Math.min(1, time / duration);
    const progress = 1 - Math.pow(1 - linear, 3); // power3.out
    const ramp = Math.max(0, (linear - SPREAD.cleanupFrom) / (1 - SPREAD.cleanupFrom));
    const cleanup =
      ramp ** SPREAD.cleanupPow * maxDist * SPREAD.cleanupReach + Math.max(0, (linear - 0.97) / 0.03) * maxDist;
    return { center, radius: progress * maxDist * SPREAD.growth, cleanup, time, seed, to };
  };

  // Render one frame: the mask goes to the new page, then the rim stays on the canvas.
  const render = (time: number) => {
    const frame = frameAt(time);
    ink.draw(frame, 0);
    root.style.setProperty("--ink-mask", `url(${ink.canvas.toDataURL("image/png")})`);
    ink.draw(frame, 1);
  };

  render(0);

  let raf = 0;
  try {
    const transition = document.startViewTransition(() => {
      apply();
      document.body.appendChild(ink.canvas);
    });
    await transition.ready;

    // The pseudo-elements have no animation of their own; this one keeps the transition
    // alive for exactly as long as the ink spreads.
    root.animate(
      { opacity: [1, 1] },
      { duration: duration * 1000 + 40, pseudoElement: "::view-transition-new(root)" },
    );

    const start = performance.now();
    const tick = () => {
      const time = Math.min(duration, (performance.now() - start) / 1000);
      render(time);
      if (time < duration) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    await transition.finished;
  } catch (err) {
    console.error("[ink]", err);
  } finally {
    cancelAnimationFrame(raf);
    ink.canvas.remove();
    root.style.removeProperty("--ink-mask");
    running = false;
  }
}
