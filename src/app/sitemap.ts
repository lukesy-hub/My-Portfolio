import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: profile.siteUrl,
      lastModified: new Date("2026-10-22"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
