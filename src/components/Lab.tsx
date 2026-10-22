"use client";

import { useCallback, useId, useMemo, useState } from "react";
import { useTheme } from "@/lib/hooks";
import type { ReededGlass, ReededParams } from "@/lib/reededGlass";
import { SectionHead } from "./SectionHead";
import { ShaderCanvas } from "./ShaderCanvas";
import styles from "./Lab.module.css";

const palettes = {
  Signal: ["#ff5a2a", "#f2b33d", "#2fb8ad"],
  Forest: ["#7d8a55", "#c9a46a", "#2c3a2a"],
  Lagoon: ["#3e8c7e", "#9fd8cb", "#1d4b63"],
  Dusk: ["#e2357a", "#6c63e0", "#f2b33d"],
} as const satisfies Record<string, ReededParams["colors"]>;

type PaletteName = keyof typeof palettes;

export function Lab() {
  const theme = useTheme();
  const [ribs, setRibs] = useState(18);
  const [refraction, setRefraction] = useState(0.14);
  const [speed, setSpeed] = useState(0.8);
  const [palette, setPalette] = useState<PaletteName>("Signal");
  const [status, setStatus] = useState<"loading" | "live" | "static">("loading");
  const id = useId();

  const params = useMemo<ReededParams>(
    () => ({
      ribs,
      refraction,
      speed,
      colors: [...palettes[palette]] as ReededParams["colors"],
      background: theme === "dark" ? "#100f0d" : "#e3dccd",
    }),
    [ribs, refraction, speed, palette, theme],
  );

  const onReady = useCallback((engine: ReededGlass | null) => setStatus(engine ? "live" : "static"), []);

  return (
    <section id="lab" className={`section ${styles.lab}`} aria-labelledby="lab-title">
      <div className="container">
        <SectionHead
          index="02"
          label="Lab"
          id="lab-title"
          aside="The reeded-glass shader from the hero, opened up. A small, self-contained WebGL piece — move your pointer over it and tune the uniforms."
        >
          A small <em>playground</em>.
        </SectionHead>

        <div className={styles.stage}>
          <div className={styles.canvasWrap}>
            <div className={styles.fallback} aria-hidden="true" />
            <ShaderCanvas params={params} loadOn="view" onReady={onReady} className={styles.canvas} />
            <p className={`${styles.status} mono`} aria-live="polite">
              <span data-status={status} />
              {status === "live" && "WebGL · live"}
              {status === "loading" && "Loading shader…"}
              {status === "static" && "Static preview — WebGL is off on this device"}
            </p>
          </div>

          <div className={`${styles.panel} glass`}>
            <fieldset className={styles.controls} disabled={status === "static"}>
              <legend className="mono">Uniforms</legend>
              <Slider id={`${id}-ribs`} label="Ribs" value={ribs} min={4} max={36} step={1} onChange={setRibs} format={(v) => String(v)} />
              <Slider
                id={`${id}-refraction`}
                label="Refraction"
                value={refraction}
                min={0}
                max={0.3}
                step={0.01}
                onChange={setRefraction}
                format={(v) => v.toFixed(2)}
              />
              <Slider id={`${id}-speed`} label="Speed" value={speed} min={0} max={2} step={0.05} onChange={setSpeed} format={(v) => v.toFixed(2)} />

              <div className={styles.palettes} role="radiogroup" aria-label="Palette">
                {(Object.keys(palettes) as PaletteName[]).map((name) => (
                  <button
                    key={name}
                    type="button"
                    role="radio"
                    aria-checked={palette === name}
                    className={styles.swatch}
                    onClick={() => setPalette(name)}
                  >
                    <span className={styles.swatchDots} aria-hidden="true">
                      {palettes[name].map((c) => (
                        <i key={c} style={{ background: c }} />
                      ))}
                    </span>
                    {name}
                  </button>
                ))}
              </div>
            </fieldset>

            <pre className={styles.code} aria-label="Current shader uniforms">
              <code>
                <span className={styles.c}>{"// reeded-glass.frag"}</span>
                {"\n"}
                <Uniform type="float" name="uRibs" value={ribs.toFixed(1)} />
                <Uniform type="float" name="uRefract" value={refraction.toFixed(2)} />
                <Uniform type="float" name="uSpeed" value={speed.toFixed(2)} />
                {palettes[palette].map((c, i) => (
                  <Uniform key={c} type="vec3" name={`uC${i + 1}`} value={`"${c}"`} />
                ))}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function Uniform({ type, name, value }: { type: string; name: string; value: string }) {
  return (
    <>
      <span className={styles.k}>uniform</span> <span className={styles.t}>{type}</span> <span className={styles.f}>{name}</span> ={" "}
      <span className={styles.s}>{value}</span>;{"\n"}
    </>
  );
}

type SliderProps = {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
};

function Slider({ id, label, value, min, max, step, onChange, format }: SliderProps) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={styles.slider}>
      <label htmlFor={id} className={styles.sliderLabel}>
        <span>{label}</span>
        <output htmlFor={id} className="mono">
          {format(value)}
        </output>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
    </div>
  );
}
