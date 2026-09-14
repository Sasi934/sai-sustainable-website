/**
 * SAI GROUP — homepage and group-level copy.
 *
 * SOURCE: SAI brief supplied 2026-09-14 (recorded as D-07 in docs/DECISIONS.md).
 *   VERBATIM — hero heading, supporting line, sub-text, button labels, the
 *              three division names and the closing principle.
 *   COMPOSED — marked inline. Assembled only from facts stated in that brief or
 *              already approved in docs/CONTENT-LOCK.md. No statistics, clients,
 *              outcomes or certifications beyond those sources. Needs SAI sign-off.
 */
import type { HeroCopy, Item } from "./types";

export const groupHero: HeroCopy = {
  eyebrow: "SAI Group",
  heading: "One Group. Three Strengths.",
  supporting: "Environmental, Trade & Technology.",
  sub: "SAI delivers safe restoration, reliable manpower, global trade and IT/AI solutions.",
  actions: [
    { label: "Explore Divisions", href: "#divisions", variant: "solid" },
    { label: "Get a Quote", href: "/contact-us", variant: "outline" },
  ],
};

export const groupPrinciple = "Real business. Real technology. Real-world impact.";

export const groupStatement = {
  eyebrow: "About the group",
  heading: groupPrinciple,
  // COMPOSED
  body: [
    "SAI Group brings three divisions together under one standard of delivery: environmental remediation, restoration and manpower; import, export and global sourcing; and IT and AI solutions built for real business.",
    "Each division has its own specialists. Clients get one accountable group behind environmental, trade and technology work — with IT and AI solutions as the group's strategic focus.",
  ],
  /** Every figure is a count of something stated elsewhere on the site. */
  facts: [
    { value: "3", label: "Divisions in one group" },
    { value: "13", label: "IT & AI service lines" },
    { value: "24/7", label: "Emergency response line" },
    { value: "2", label: "Independent certifications — IICRC and WCB Nova Scotia" },
  ],
};

export const divisionsIntro = {
  eyebrow: "Three divisions",
  // COMPOSED
  heading: "Environmental. Trade. Technology.",
  body: "Three specialist divisions, one group — with IT Solutions as the strategic focus.",
};

export const capabilitiesIntro = {
  eyebrow: "Capabilities",
  // COMPOSED
  heading: "What each division delivers.",
};

export const whySai = {
  eyebrow: "Why SAI",
  // COMPOSED
  heading: "Built on work that has to hold up in the real world.",
  /** Each point is drawn from approved copy or the 2026-09-14 brief. */
  points: [
    {
      name: "Certified and insured",
      body: "IICRC Certified Firm and Workers' Compensation Board of Nova Scotia Safety Certified. Fully insured & certified team.",
    },
    {
      name: "24/7 emergency response",
      body: "A dedicated emergency line for water, fire and hazardous-material situations: +1(902) 452-7600.",
    },
    {
      name: "Technology that stays practical",
      body: "We combine web, AI, data and UX skills within one coordinated delivery team.",
    },
    {
      name: "Capacity on demand",
      body: "Flexible Canada-led and offshore delivery model — skilled, semi-skilled and unskilled manpower, and technical capacity when a project needs it.",
    },
    {
      name: "Checked before it ships",
      body: "Vendor verification, product inspection and quality checks are part of how EXIM sources goods, not an extra.",
    },
    {
      name: "Environmentally responsible",
      body: "Environmentally responsible disposal, and remediation carried out to strict regulatory guidelines.",
    },
  ] satisfies Item[],
};

export const projectsIntro = {
  eyebrow: "Projects & case studies",
  // COMPOSED
  heading: "Delivered work, and what's in the field next.",
};

export const finalCta = {
  eyebrow: "Start a conversation",
  heading: "Tell us what you need. We'll route it to the right team.",
  primary: { label: "Get a Quote", href: "/contact-us" },
};
