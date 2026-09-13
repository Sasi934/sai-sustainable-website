import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/* Static export: resolved once at build time. Set ALLOW_INDEXING=false in the
   build environment when producing a staging bundle. */
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Staging must never be indexed and compete with production (survey §18).
  const isProduction = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";
  const allowIndexing = isProduction && process.env.ALLOW_INDEXING !== "false";

  return {
    rules: allowIndexing
      ? { userAgent: "*", allow: "/", disallow: "/api/" }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
