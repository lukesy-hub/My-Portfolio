import type { Metadata } from "next";
import { Skills } from "@/components/Skills";

export const metadata: Metadata = {
  title: "Skills",
  description:
    "Technical skills of Muhammad Talha — React, Next.js, TypeScript, Node.js, Python, Flutter, n8n, Make.com, OpenAI and Groq APIs, GSAP, Three.js, Docker and more.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <div className="page-top">
      <Skills level={1} />
    </div>
  );
}
