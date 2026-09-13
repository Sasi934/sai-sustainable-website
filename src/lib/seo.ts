import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "./site";

const DEFAULT_OG = "/img/untitled-design-AMqnRjrGOncj2VPn.png";

/**
 * Every route gets a real title, description and canonical — six of the ten
 * live routes currently ship without a description (survey F-04).
 */
export function pageMeta(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}): Metadata {
  const url = `${SITE_URL}${opts.path}`;
  const image = opts.image ?? DEFAULT_OG;
  // The root layout's title.template appends "| SAI Sustainable Services Inc.",
  // so `title` stays bare here. Open Graph and Twitter have no template, so they
  // carry the full string.
  const title = `${opts.title} | ${SITE_NAME}`;

  return {
    title: opts.title,
    description: opts.description,
    alternates: { canonical: url },
    robots: opts.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title,
      description: opts.description,
      url,
      siteName: SITE_NAME,
      type: opts.type ?? "website",
      locale: "en_CA",
      images: [{ url: `${SITE_URL}${image}`, width: 1200, height: 630, alt: opts.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: opts.description,
      images: [`${SITE_URL}${image}`],
    },
  };
}
