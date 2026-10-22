// Reeded-glass shader: a slow chromatic light field seen through vertical
// glass ribs. Each rib bends the field and splits it into RGB at its edges.
// Loaded on demand (dynamic import) so Three.js never blocks first paint.
import {
  Color,
  LinearSRGBColorSpace,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";

export type ReededParams = {
  ribs: number;
  refraction: number;
  speed: number;
  colors: [string, string, string];
  background: string;
};

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform vec2 uRes;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uRibs;
  uniform float uRefract;
  uniform vec3 uC1;
  uniform vec3 uC2;
  uniform vec3 uC3;
  uniform vec3 uBg;

  // Soft light field: three drifting light sources plus the pointer.
  vec3 field(vec2 uv) {
    float aspect = uRes.x / uRes.y;
    vec2 p = vec2(uv.x * aspect, uv.y);
    float t = uTime;
    vec2 a = vec2((0.55 + 0.22 * sin(t * 0.31)) * aspect, 0.62 + 0.18 * cos(t * 0.27));
    vec2 b = vec2((0.30 + 0.20 * cos(t * 0.23)) * aspect, 0.28 + 0.16 * sin(t * 0.37));
    vec2 c = vec2((0.78 + 0.14 * sin(t * 0.19 + 1.7)) * aspect, 0.18 + 0.20 * sin(t * 0.21));
    vec2 m = vec2(uMouse.x * aspect, uMouse.y);

    // Gentle domain warp so light pools feel liquid rather than circular.
    p += 0.05 * vec2(sin(p.y * 6.0 + t * 0.6), cos(p.x * 5.0 - t * 0.5));

    float fa = exp(-pow(length(p - a) * 2.1, 2.0));
    float fb = exp(-pow(length(p - b) * 2.4, 2.0));
    float fc = exp(-pow(length(p - c) * 2.8, 2.0));
    float fm = exp(-pow(length(p - m) * 3.2, 2.0)) * 0.55;

    vec3 col = uBg;
    col = mix(col, uC1, clamp(fa + fm, 0.0, 1.0));
    col = mix(col, uC2, clamp(fb * 0.95, 0.0, 1.0));
    col = mix(col, uC3, clamp(fc * 0.85, 0.0, 1.0));
    return col;
  }

  void main() {
    vec2 uv = vUv;
    float x = uv.x * uRibs;
    float f = fract(x) - 0.5;            // position across one rib, -0.5..0.5
    float lens = f * abs(f) * 4.0;        // convex profile
    vec2 offset = vec2(lens * uRefract, lens * uRefract * 0.15);

    // Chromatic split grows toward rib edges.
    float split = 0.006 + abs(f) * 0.012 * (uRefract / 0.12);
    float r = field(uv - offset + vec2(split, 0.0)).r;
    float g = field(uv - offset).g;
    float b = field(uv - offset - vec2(split, 0.0)).b;
    vec3 col = vec3(r, g, b);

    // Specular highlight along each rib and a thin shadow at the seam.
    float spec = pow(1.0 - clamp(abs(f + 0.18) * 3.2, 0.0, 1.0), 6.0) * 0.18;
    float seam = smoothstep(0.47, 0.5, abs(f)) * 0.14;
    col += spec;
    col -= seam;

    // Fine film grain to avoid gradient banding.
    float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
    col += (n - 0.5) * 0.025;

    gl_FragColor = vec4(col, 1.0);
  }
`;

// The shader writes colours straight to the canvas, so keep CSS values as-is
// instead of letting Three convert them to linear space.
const raw = (css: string) => new Color().setStyle(css, LinearSRGBColorSpace);
const setRaw = (color: Color, css: string) => color.setStyle(css, LinearSRGBColorSpace);

export function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Low-power heuristic: skip the shader entirely on constrained devices. */
export function isConstrainedDevice() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 2) return true;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4) return true;
  return false;
}

export function createReededGlass(canvas: HTMLCanvasElement, params: ReededParams) {
  const renderer = new WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: "low-power" });
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, coarse ? 1 : 1.5));

  const scene = new Scene();
  const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = {
    uRes: { value: new Vector2(1, 1) },
    uTime: { value: 0 },
    uMouse: { value: new Vector2(0.6, 0.6) },
    uRibs: { value: params.ribs },
    uRefract: { value: params.refraction },
    uC1: { value: raw(params.colors[0]) },
    uC2: { value: raw(params.colors[1]) },
    uC3: { value: raw(params.colors[2]) },
    uBg: { value: raw(params.background) },
  };
  const material = new ShaderMaterial({ vertexShader, fragmentShader, uniforms });
  const geometry = new PlaneGeometry(2, 2);
  scene.add(new Mesh(geometry, material));

  let speed = params.speed;
  let time = Math.random() * 40;
  let last = performance.now();
  let frame = 0;
  let running = false;
  const target = new Vector2(0.6, 0.6);

  const resize = () => {
    const { clientWidth, clientHeight } = canvas;
    if (!clientWidth || !clientHeight) return;
    renderer.setSize(clientWidth, clientHeight, false);
    uniforms.uRes.value.set(clientWidth, clientHeight);
  };
  const ro = new ResizeObserver(() => {
    resize();
    if (!running) renderer.render(scene, camera);
  });
  ro.observe(canvas);
  resize();

  const loop = (now: number) => {
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    time += dt * speed;
    uniforms.uTime.value = time;
    uniforms.uMouse.value.lerp(target, 0.06);
    renderer.render(scene, camera);
    frame = requestAnimationFrame(loop);
  };

  return {
    start() {
      if (running) return;
      running = true;
      last = performance.now();
      frame = requestAnimationFrame(loop);
    },
    stop() {
      running = false;
      cancelAnimationFrame(frame);
    },
    renderOnce() {
      uniforms.uTime.value = time;
      renderer.render(scene, camera);
    },
    /** Pointer position in 0..1 UV space (y up). */
    pointer(x: number, y: number) {
      target.set(x, y);
    },
    set(next: Partial<ReededParams>) {
      if (next.ribs !== undefined) uniforms.uRibs.value = next.ribs;
      if (next.refraction !== undefined) uniforms.uRefract.value = next.refraction;
      if (next.speed !== undefined) speed = next.speed;
      if (next.colors) next.colors.forEach((c, i) => setRaw([uniforms.uC1, uniforms.uC2, uniforms.uC3][i].value, c));
      if (next.background) setRaw(uniforms.uBg.value, next.background);
      if (!running) renderer.render(scene, camera);
    },
    destroy() {
      this.stop();
      ro.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}

export type ReededGlass = ReturnType<typeof createReededGlass>;
