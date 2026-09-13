import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { serviceGroups } from "@/data/services";
import { posts } from "@/data/insights";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core = [
    { url: "/", priority: 1.0, changeFrequency: "monthly" as const },
    { url: "/services", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/it-services", priority: 0.9, changeFrequency: "monthly" as const },
    { url: "/it-services/work", priority: 0.7, changeFrequency: "monthly" as const },
    { url: "/about-us", priority: 0.7, changeFrequency: "yearly" as const },
    { url: "/contact-us", priority: 0.8, changeFrequency: "yearly" as const },
    { url: "/blog-list", priority: 0.6, changeFrequency: "monthly" as const },
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
