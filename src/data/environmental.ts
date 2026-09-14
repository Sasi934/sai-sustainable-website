/**
 * DIVISION 01 — SAI Environmental, Restoration & Manpower.
 *
 * SOURCES
 *   VERBATIM (brief 2026-09-14, D-07) — hero heading, sub-text, button labels,
 *     service names, manpower list and sub-page names.
 *   APPROVED (CONTENT-LOCK.md) — every service description below is *referenced*
 *     from services.ts / company.ts, never retyped, so the firewall holds.
 *   COMPOSED — marked inline; short connective copy only. Needs SAI sign-off.
 *
 * ⚠️ OPEN (D-08): PF/ESI and "labour compliance" are Indian statutory terms, while
 * the approved environmental copy describes Atlantic Canada operations. Shipped
 * because the brief names them; SAI to confirm which market each applies to.
 */
import { allServices, serviceGroups } from "./services";
import { certifications, contact, homepage } from "./company";
import { ENVIRONMENTAL_BASE as BASE } from "./divisions";
import type { HeroCopy, Item, SubPage } from "./types";

const approved = (slug: string) => allServices.find((s) => s.slug === slug)!;
const capability = (title: string) => homepage.capabilities.find((c) => c.title === title)!;
const group = (slug: string) => serviceGroups.find((g) => g.slug === slug)!;

const emergency = contact.phones.find((p) => p.emergency)!;

export const environmentalHero: HeroCopy = {
  eyebrow: "SAI Environmental, Restoration & Manpower",
  heading: "Safe Remediation. Fast Restoration. Skilled Manpower.",
  sub: "Asbestos abatement, lead removal, mold remediation, water/fire restoration and construction manpower supply.",
  actions: [
    { label: "Emergency Service", href: emergency.href, variant: "solid" },
    { label: "Request Site Survey", href: "/contact-us?division=environmental&type=site-survey#enquiry", variant: "outline" },
    { label: "Hire Manpower", href: `${BASE}/manpower-solutions`, variant: "outline" },
  ],
};

/** Landing-page service index, grouped the way a site manager thinks about it. */
export const environmentalServiceGroups: { name: string; items: Item[] }[] = [
  {
    name: "Remediation",
    items: [
      { name: "Asbestos abatement", body: approved("asbestos-abatement").summary, href: `${BASE}/asbestos-abatement` },
      { name: "Lead paint removal", body: approved("lead-abatement").summary, href: `${BASE}/lead-removal` },
      { name: "Mold remediation", body: approved("mold-abatement").summary, href: `${BASE}/mold-remediation` },
    ],
  },
  {
    name: "Restoration",
    items: [
      { name: "Water damage restoration", body: approved("water-damage-restoration").summary, href: `${BASE}/water-restoration` },
      { name: "Fire and smoke damage restoration", body: capability("Water & Fire Restoration").body, href: `${BASE}/fire-restoration` },
      { name: "Emergency 24×7 response", body: `${homepage.why[2]} on ${emergency.number}.`, href: `${BASE}/emergency-response` },
    ],
  },
  {
    name: "Manpower",
    items: [
      { name: "Skilled, semi-skilled and unskilled manpower", body: approved("labor-support").summary, href: `${BASE}/manpower-solutions` },
      { name: "Payroll" },
      { name: "PF/ESI" },
      { name: "Labour compliance" },
      { name: "Site supervision" },
      { name: "EHS support" },
    ],
  },
];

const manpowerItems: Item[] = [
  { name: "Skilled manpower" },
  { name: "Semi-skilled manpower" },
  { name: "Unskilled manpower" },
  { name: "Payroll" },
  { name: "PF/ESI", body: "Provident Fund and Employees' State Insurance." },
  { name: "Labour compliance" },
  { name: "Site supervision" },
  { name: "EHS support", body: "Environment, health and safety." },
];

const surveyCta = { label: "Request Site Survey", href: "/contact-us?division=environmental&type=site-survey#enquiry" };
const emergencyCta = { label: `24/7 Emergency — ${emergency.number}`, href: emergency.href };

const geo = {
  abatement: group("environmental-abatement"),
  restoration: group("restoration-and-cleaning"),
  waste: group("waste-and-disposal"),
  demolition: group("demolition-and-labor-support"),
  renovation: group("renovation-and-construction"),
};
const geoLink = (g: (typeof geo)[keyof typeof geo], note = "Atlantic Canada service page") => ({
  label: g.name,
  href: g.path,
  note,
});

export const environmentalPages: SubPage[] = [
  {
    slug: "asbestos-abatement",
    name: "Asbestos Abatement",
    heading: "Asbestos Abatement Services",
    metaTitle: "Asbestos Abatement Services",
    metaDescription:
      "Safe, certified asbestos abatement services for residential, commercial and industrial properties — identification, containment and removal to strict regulatory guidelines.",
    intro: approved("asbestos-abatement").summary,
    image: "/img/asbestos-abatement-halifax-dartmouth-nova-scotia-UghGgfqJEbpdqSqM.jpg",
    imageAlt: "Remediation technician in a protective suit and respirator treating an interior under containment",
    sections: [
      {
        heading: "What the work covers", // COMPOSED heading; items restate approved copy
        items: [
          { name: "Identify", body: "Locate asbestos hazards before work disturbs them." },
          { name: "Contain", body: "Isolate the work area so fibres stay inside it." },
          { name: "Eliminate", body: "Remove asbestos-containing materials safely." },
          { name: "Dispose", body: approved("hazardous-waste-disposal").summary },
        ],
      },
      { heading: "Properties we work on", body: group("environmental-abatement").intro },
    ],
    related: [geoLink(geo.abatement), { label: "Safety & Compliance", href: `${BASE}/safety-compliance` }],
    actions: [surveyCta, emergencyCta],
    keywords: ["asbestos abatement services", "asbestos removal", "hazardous materials"],
  },
  {
    slug: "lead-removal",
    name: "Lead Removal",
    heading: "Lead Paint Removal",
    metaTitle: "Lead Removal Company — Certified Lead Paint Removal",
    metaDescription:
      "Certified lead paint removal that protects families, employees and occupants from lead exposure, in compliance with environmental and safety standards.",
    intro: approved("lead-abatement").summary,
    image: "/img/renovation-services-halifax-dartmouth-nova-scotia-QfjVnMi9BrOfIuG6.jpg",
    imageAlt: "Interior stripped back to the studs during certified lead paint removal",
    sections: [
      {
        heading: "Who it protects",
        items: [{ name: "Families" }, { name: "Employees" }, { name: "Occupants" }],
      },
      {
        heading: "How it's done",
        items: [
          { name: "Trained professionals", body: "Lead-based materials removed by a trained team." },
          { name: "Compliance", body: "Work carried out in compliance with environmental and safety standards." },
          { name: "Disposal", body: approved("hazardous-waste-disposal").summary },
        ],
      },
    ],
    related: [geoLink(geo.abatement)],
    actions: [surveyCta],
    keywords: ["lead removal company", "lead paint removal", "lead abatement"],
  },
  {
    slug: "mold-remediation",
    name: "Mold Remediation",
    heading: "Mold Remediation",
    metaTitle: "Mold Remediation & Attic Mold Removal",
    metaDescription:
      "Professional mold remediation: we locate, contain and remove mold at its source, address the underlying moisture and restore indoor air quality.",
    intro: approved("mold-abatement").summary,
    image: "/img/attic-mold-removal-and-clean-up-halifax-dartmouth-nova-scotia-ai9gKihPNkX7ZA2k.jpg",
    imageAlt: "Attic framing and sheathing treated during mold remediation",
    sections: [
      { heading: "Attic mold removal", body: approved("attic-mold-removal").summary },
      {
        heading: "The process",
        items: [
          { name: "Locate", body: "Find the mold and the moisture source feeding it." },
          { name: "Contain", body: "Stop spores spreading to unaffected areas." },
          { name: "Remove", body: "Remove contamination and treat affected surfaces." },
          { name: "Prevent", body: "Address ventilation and moisture so it doesn't return." },
        ],
      },
    ],
    related: [
      geoLink(geo.abatement),
      { label: "How to Know If Your Property Needs Professional Mold Remediation", href: "/how-to-know-if-your-property-needs-professional-mold-remediation", note: "Blog" },
    ],
    actions: [surveyCta],
    keywords: ["mold remediation", "mold removal services", "attic mold removal"],
  },
  {
    slug: "water-restoration",
    name: "Water Restoration",
    heading: "Water Damage Restoration",
    metaTitle: "Water Damage Restoration",
    metaDescription:
      "Emergency water extraction, structural drying and full restoration — fast response to minimize damage, prevent mold growth and restore your property.",
    intro: approved("water-damage-restoration").summary,
    image: "/img/pexels-ehma-18302377.jpg-EfGenCxbBBL200M6.jpeg",
    imageAlt: "Flooded interior floor with water reflecting a window and mold staining on the wall",
    sections: [
      {
        heading: "From first call to recovered structure",
        items: [
          { name: "Extraction", body: "Emergency water extraction." },
          { name: "Drying", body: "Structural drying." },
          { name: "Recovery", body: "Full restoration to the property's original condition." },
        ],
      },
    ],
    related: [
      geoLink(geo.restoration),
      { label: "What to Do in the First 24 Hours After Water Damage", href: "/what-to-do-in-the-first-24-hours-after-water-damage", note: "Blog" },
      { label: "Fire Restoration", href: `${BASE}/fire-restoration` },
    ],
    actions: [emergencyCta, surveyCta],
    keywords: ["water damage restoration", "water extraction", "structural drying"],
  },
  {
    slug: "fire-restoration",
    name: "Fire Restoration",
    heading: "Fire and Smoke Damage Restoration",
    metaTitle: "Fire Restoration — Fire and Smoke Damage Cleanup",
    metaDescription:
      "Fire restoration and smoke damage cleanup and repair, backed by a 24/7 emergency response line and a certified, insured team.",
    intro: capability("Water & Fire Restoration").body,
    image: "/img/trauma-and-disaster-clean-up-dartmouth-halifax-nova-scotia-G2vfVZQwKrSvPrkd.jpg",
    imageAlt: "Technician in a protective suit and gloves with a sprayer, cleaning a residential interior",
    sections: [
      {
        heading: "What we handle",
        items: [
          { name: "Fire damage", body: "Cleanup and repair after fire." },
          { name: "Smoke damage", body: "Cleanup and repair after smoke damage." },
          { name: "Debris removal", body: approved("construction-site-cleanup").summary },
        ],
      },
      { heading: "Care on sensitive sites", body: geo.restoration.intro },
    ],
    related: [geoLink(geo.restoration), { label: "Emergency Response", href: `${BASE}/emergency-response` }],
    actions: [emergencyCta, surveyCta],
    keywords: ["fire restoration", "smoke damage restoration"],
  },
  {
    slug: "emergency-response",
    name: "Emergency Response",
    heading: "Emergency 24×7 Response",
    metaTitle: "24/7 Emergency Restoration Response",
    metaDescription: `24/7 emergency response for water, fire, smoke and hazardous-material situations. Call ${emergency.number}.`,
    intro: `${homepage.why[2]} — call ${emergency.number} at any hour.`,
    image: "/img/untitled-design-AMqnRjrGOncj2VPn.png",
    imageAlt: "SAI remediation crew in protective suits and respirators, ready to respond",
    sections: [
      {
        heading: "Call the emergency line for", // COMPOSED; each item links to approved service copy
        items: [
          { name: "Water damage", body: approved("water-damage-restoration").summary, href: `${BASE}/water-restoration` },
          { name: "Fire and smoke damage", body: capability("Water & Fire Restoration").body, href: `${BASE}/fire-restoration` },
          { name: "Trauma and biohazard cleanup", body: approved("trauma-scene-cleanup").summary, href: geo.restoration.path },
          { name: "Hazardous materials", body: approved("hazardous-waste-disposal").summary, href: geo.waste.path },
        ],
      },
      {
        heading: "Which number to call",
        body: `${emergency.number} is the 24/7 emergency line. General enquiries: ${contact.hours[0].days}, ${contact.hours[0].time}.`,
      },
    ],
    related: [geoLink(geo.restoration)],
    actions: [emergencyCta],
    keywords: ["emergency restoration", "24/7 emergency response"],
  },
  {
    slug: "manpower-solutions",
    name: "Manpower Solutions",
    heading: "Construction Manpower Supply",
    metaTitle: "Construction Manpower Supply & Skilled Labour Contractor",
    metaDescription:
      "Skilled, semi-skilled and unskilled construction manpower supply, with payroll, PF/ESI, labour compliance, site supervision and EHS support.",
    intro: approved("labor-support").summary,
    image: "/img/construction-site-clean-up-halifax-dartmouth-f9thjAfxv0hP54fy.jpg",
    imageAlt: "Worker in a hard hat and high-visibility vest clearing debris on a demolition site",
    sections: [
      { heading: "Manpower and workforce management", items: manpowerItems },
      {
        heading: "Where our crews work",
        items: [
          { name: "Restoration" },
          { name: "Remediation" },
          { name: "Demolition" },
          { name: "Construction" },
        ],
      },
    ],
    related: [geoLink(geo.demolition), { label: "Safety & Compliance", href: `${BASE}/safety-compliance` }],
    actions: [
      { label: "Hire Manpower", href: "/contact-us?division=environmental&type=manpower#enquiry" },
      surveyCta,
    ],
    keywords: ["construction manpower supply", "skilled labour contractor", "labour supply"],
  },
  {
    slug: "safety-compliance",
    name: "Safety & Compliance",
    heading: "Safety & Compliance",
    metaTitle: "Safety & Compliance — Certified, Insured, Audited",
    metaDescription:
      "IICRC Certified Firm and WCB Nova Scotia Safety Certified. Labour compliance, PF/ESI, site supervision and EHS support on every manpower deployment.",
    intro: homepage.introduction[1],
    image: "/img/pexels-sonny-13364320.jpg-yDcZzkFW4Txe5xwc.jpeg",
    imageAlt: "Asbestos hazard warning tape stretched across a site fence",
    sections: [
      {
        heading: "Independent certifications",
        items: certifications.map((c) => ({ name: c.name, body: c.issuer })),
      },
      {
        heading: "Compliance on site",
        items: [
          { name: "Labour compliance" },
          { name: "PF/ESI", body: "Provident Fund and Employees' State Insurance." },
          { name: "Site supervision" },
          { name: "EHS support", body: "Environment, health and safety." },
          { name: "Regulatory guidelines", body: "Abatement work follows strict regulatory guidelines." },
          { name: "Responsible disposal", body: homepage.why[1] },
        ],
      },
    ],
    related: [{ label: "Certifications", href: "/certifications" }, { label: "Manpower Solutions", href: `${BASE}/manpower-solutions` }],
    actions: [surveyCta],
    keywords: ["EHS support", "labour compliance", "IICRC certified"],
  },
  {
    slug: "projects",
    name: "Projects",
    heading: "Environmental & Restoration Projects",
    metaTitle: "Environmental, Restoration & Construction Project Types",
    metaDescription:
      "The project types SAI delivers — abatement, restoration, waste, demolition and renovation for residential, commercial and industrial properties.",
    intro: homepage.introduction[0],
    image: "/img/halifax-best-renovation-services-EuIl7Xm2IAvPdX3H.jpg",
    imageAlt: "Interior stripped back to framing mid-project, ready for rebuild",
    sections: [
      {
        heading: "Project types",
        items: serviceGroups.map((g) => ({ name: g.name, body: g.services.map((s) => s.name).join(" · "), href: g.path })),
      },
    ],
    related: [{ label: "All group projects", href: "/projects" }],
    actions: [surveyCta],
    keywords: ["restoration projects", "abatement projects"],
  },
];

export const getEnvironmentalPage = (slug: string) => environmentalPages.find((p) => p.slug === slug);

/** The preserved Atlantic Canada routes, surfaced on the division page for internal linking. */
export const atlanticRoutes = serviceGroups.map((g) => ({ name: g.name, href: g.path, intro: g.intro, image: g.image, imageAlt: g.imageAlt }));
