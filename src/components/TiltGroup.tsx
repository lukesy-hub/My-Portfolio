"use client";

import { useEffect, useRef } from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  /** Maximum tilt in degrees. */
  max?: number;
};

/**
 * Pointer-driven 3D tilt for every `[data-tilt]` descendant.
 *
 * One listener on the group writes CSS variables to the hovered card:
 * `--tilt-x / --tilt-y / --tilt-a` feed the CSS `rotate` property (an axis + angle,
 * so it composes with Motion's `transform` instead of fighting it), and
 * `--mx / --my` drive glare and spotlight layers. Fine pointers only; respects
 * reduced motion.
 */
export function TiltGroup({ max = 8, children, ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let active: HTMLElement | null = null;

    const reset = (el: HTMLElement | null) => {
      if (!el) return;
      el.classList.remove("is-tilting");
      el.style.setProperty("--tilt-a", "0deg");
    };

    const onMove = (event: PointerEvent) => {
      if (!fine.matches || reduce.matches) return;
      const card = (event.target as HTMLElement).closest<HTMLElement>("[data-tilt]");
      if (card !== active) {
        reset(active);
        active = card;
      }
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width; // 0 → 1
      const py = (event.clientY - rect.top) / rect.height;
      const dx = px - 0.5;
      const dy = py - 0.5;
      const strength = Math.min(1, Math.hypot(dx, dy) * 2);
      const limit = Number(card.dataset.tilt) || max;
      // Rotate around the axis perpendicular to the pointer offset so the card leans toward it.
      card.classList.add("is-tilting");
      card.style.setProperty("--tilt-x", (-dy).toFixed(3));
      card.style.setProperty("--tilt-y", dx.toFixed(3));
      card.style.setProperty("--tilt-a", `${(strength * limit).toFixed(2)}deg`);
      card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
    };

    const onLeave = () => {
      reset(active);
      active = null;
    };

    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerleave", onLeave);
    return () => {
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return (
    <div ref={ref} {...rest}>
      {children}
    </div>
  );
}
