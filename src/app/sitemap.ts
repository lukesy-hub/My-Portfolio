import type { MetadataRoute } from "next";
import { navLinks, profile } from "@/data/profile";
import { projects } from "@/data/projects";

const lastModified = new Date("2026-10-22");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = navLinks.map((link) => ({
    url: `${profile.siteUrl}${link.href === "/" ? "" : link.href}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: link.href === "/" ? 1 : 0.8,
  }));
  const caseStudies = projects.map((p) => ({
    url: `${profile.siteUrl}/projects/${p.slug}`,
    lastModified,
    changeFrequency: "yearly" as const,
    priority: 0.6,
  }));
  return [...pages, ...caseStudies];
}
