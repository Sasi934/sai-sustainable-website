/** Shared shapes for division content. */

export type Action = {
  label: string;
  href: string;
  variant?: "solid" | "outline";
};

export type Item = { name: string; body?: string; href?: string };

export type HeroCopy = {
  eyebrow: string;
  heading: string;
  /** Optional second line set beneath the H1 (homepage only). */
  supporting?: string;
  sub: string;
  actions: Action[];
};

export type SubPage = {
  slug: string;
  /** Short label for cards and navigation. */
  name: string;
  /** The page's single H1. */
  heading: string;
  metaTitle: string;
  metaDescription: string;
  intro: string;
  image?: string;
  imageAlt?: string;
  sections: { heading: string; body?: string; items?: Item[] }[];
  /** Internal links that carry context — e.g. the ranked Atlantic Canada route. */
  related?: { label: string; href: string; note?: string }[];
  actions: Action[];
  keywords?: string[];
};
