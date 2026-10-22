import type { Metadata } from "next";
import { Experience } from "@/components/Experience";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Career of Muhammad Talha: Team Lead at Syncognix, Full Stack Developer at Ingenious Concepts, and internships at DirectFN and Lemon Studios — plus a BS in Computer Science.",
  alternates: { canonical: "/experience" },
};

export default function ExperiencePage() {
  return (
    <div className="page-top">
      <Experience level={1} />
    </div>
  );
}
