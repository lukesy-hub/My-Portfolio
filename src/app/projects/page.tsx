import type { Metadata } from "next";
import { OtherWork } from "@/components/work/OtherWork";
import { ProjectsExplorer } from "@/components/work/ProjectsExplorer";
import { ProjectsHero } from "@/components/work/ProjectsHero";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: `${projects.length} live websites and web apps by Muhammad Talha — automotive, commerce, professional services and healthcare — with case studies, technologies and links to each live site.`,
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <div className="section page-top">
      <div className="container">
        <ProjectsHero />
        <ProjectsExplorer />
        <OtherWork />
      </div>
    </div>
  );
}
