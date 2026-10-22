import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0c0c0b",
          color: "#edeae2",
          fontFamily: "sans-serif",
          backgroundImage:
            "radial-gradient(circle at 82% 30%, rgba(255,90,42,0.55), transparent 42%), radial-gradient(circle at 95% 85%, rgba(47,184,173,0.25), transparent 35%)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, color: "#b4b0a6", letterSpacing: 2 }}>
          <span>PORTFOLIO — 2026</span>
          <span>LAHORE, PK</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 148, fontWeight: 700, letterSpacing: -6, lineHeight: 0.9 }}>Muhammad</div>
          <div style={{ fontSize: 148, fontWeight: 700, letterSpacing: -6, lineHeight: 0.9, color: "#ff5a2a" }}>Talha.</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 30 }}>
          <span>{profile.role}</span>
          <span style={{ fontSize: 22, color: "#b4b0a6" }}>React · Next.js · Node.js · AI automation</span>
        </div>
      </div>
    ),
    size,
  );
}
