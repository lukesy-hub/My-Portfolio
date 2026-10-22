"use client";

import { useEffect, useRef, useState } from "react";
import type { ReededGlass, ReededParams } from "@/lib/reededGlass";

type Props = {
  params: ReededParams;
  /** Track the pointer over this element's parent. */
  interactive?: boolean;
  /** Defer loading until the browser is idle (hero) instead of until in view (lab). */
  loadOn?: "idle" | "view";
  className?: string;
  onReady?: (engine: ReededGlass | null) => void;
};

/**
 * Mounts the reeded-glass shader with graceful degradation:
 * - no WebGL or a constrained device → the CSS fallback behind it stays visible
 * - reduced motion → one still frame, no animation loop
 * - off-screen or hidden tab → loop paused
 */
export function ShaderCanvas({ params, interactive = true, loadOn = "view", className, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ReededGlass | null>(null);
  const paramsRef = useRef(params);
  const onReadyRef = useRef(onReady);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    paramsRef.current = params;
    onReadyRef.current = onReady;
    engineRef.current?.set(params);
  }, [params, onReady]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let visible = false;
    let cleanup = () => {};

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      const engine = engineRef.current;
      if (!engine) return;
      if (visible && !document.hidden && !reduce.matches) engine.start();
      else engine.stop();
      if (reduce.matches) engine.renderOnce();
    };

    const init = async () => {
      const mod = await import("@/lib/reededGlass");
      if (cancelled || !mod.supportsWebGL() || mod.isConstrainedDevice()) {
        onReadyRef.current?.(null);
        return;
      }
      const engine = mod.createReededGlass(canvas, paramsRef.current);
      engineRef.current = engine;
      engine.renderOnce();
      setReady(true);
      onReadyRef.current?.(engine);
      sync();
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !engineRef.current && loadOn === "view") void init();
        sync();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(canvas);

    if (loadOn === "idle") {
      const idle = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 600));
      const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
      const handle = idle(() => void init(), { timeout: 2500 });
      cleanup = () => cancelIdle(handle);
    }

    const host = canvas.parentElement;
    const onMove = (event: PointerEvent) => {
      if (!host) return;
      const rect = host.getBoundingClientRect();
      engineRef.current?.pointer((event.clientX - rect.left) / rect.width, 1 - (event.clientY - rect.top) / rect.height);
    };
    if (interactive && host) host.addEventListener("pointermove", onMove);

    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);

    return () => {
      cancelled = true;
      cleanup();
      io.disconnect();
      host?.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
      engineRef.current?.destroy();
      engineRef.current = null;
    };
  }, [interactive, loadOn]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ opacity: ready ? 1 : 0, transition: "opacity 1.2s var(--ease-out)" }}
    />
  );
}
