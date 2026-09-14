import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { serviceGroups } from "@/data/services";
import { posts } from "@/data/insights";
import { divisions } from "@/data/divisions";
import { environmentalPages } from "@/data/environmental";
import { itPages } from "@/data/it-solutions";

export const dynamic = "force-static";

type Entry = { url: string; priority: number; changeFrequency: "monthly" | "yearly" };

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const [environmental, , it] = divisions;

  const core: Entry[] = [
    { url: "/", priority: 1.0, changeFrequency: "monthly" },
    // Divisions
    ...divisions.map((d) => ({ url: d.href, priority: d.focus ? 1.0 : 0.9, changeFrequency: "monthly" as const })),
    // IT Solutions — strategic focus
    { url: `${it.href}/ai-road-defect-detection`, priority: 0.9, changeFrequency: "monthly" },
    ...itPages.map((p) => ({ url: `${it.href}/${p.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    { url: `${it.href}/work`, priority: 0.7, changeFrequency: "monthly" },
    { url: `${it.href}/request-demo`, priority: 0.6, changeFrequency: "yearly" },
    { url: "/partners", priority: 0.7, changeFrequency: "monthly" },
    // Environmental, Restoration & Manpower
    ...environmentalPages.map((p) => ({ url: `${environmental.href}/${p.slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
    // Group
    { url: "/services", priority: 0.9, changeFrequency: "monthly" },
    { url: "/about-us", priority: 0.7, changeFrequency: "yearly" },
    { url: "/projects", priority: 0.7, changeFrequency: "monthly" },
    { url: "/careers", priority: 0.5, changeFrequency: "monthly" },
    { url: "/contact-us", priority: 0.8, changeFrequency: "yearly" },
    { url: "/blog-list", priority: 0.6, changeFrequency: "monthly" },
    { url: "/sectors", priority: 0.6, changeFrequency: "yearly" },
    { url: "/certifications", priority: 0.6, changeFrequency: "yearly" },
    { url: "/vendor-registration", priority: 0.6, changeFrequency: "yearly" },
    { url: "/downloads", priority: 0.4, changeFrequency: "yearly" },
    { url: "/privacy-policy", priority: 0.3, changeFrequency: "yearly" },
    { url: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  return [
    ...core.map((c) => ({
      url: `${SITE_URL}${c.url}`,
      lastModified: now,
      changeFrequency: c.changeFrequency,
      priority: c.priority,
    })),
    ...serviceGroups.map((g) => ({
      url: `${SITE_URL}${g.path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    ...posts.map((p) => ({
      url: `${SITE_URL}/${p.slug}`,
      lastModified: new Date(p.date),
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
