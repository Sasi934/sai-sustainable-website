/**
 * TECHNOLOGY PARTNERS — D-09.
 *
 * SOURCE: relationship confirmed by Aravind Annaya (SAI), 2026-09-14: "We are
 * collaborating with https://iris.digiinfra.ai/ … we can use some info from this"
 * and "We are also collaborating with https://sharajman.com/ may incl their services".
 * Descriptions are PARAPHRASED from each partner's own website (fetched 2026-09-14).
 *
 * Deliberately EXCLUDED, pending the partners' own confirmation:
 *   - statistics (IRIS's page shows unfinished placeholders such as "0%" and "0k+";
 *     Sharajman's project/client counts are unverified),
 *   - client names (they would read as SAI's clients),
 *   - technology stacks (several terms fall under the D-01 exclusion list),
 *   - certifications and empanelments,
 *   - logos (no permission on file).
 * Partner offerings are always attributed to the partner — never presented as
 * SAI's in-house capability.
 */
import type { Item } from "./types";

export type Partner = {
  slug: string;
  name: string;
  legalName: string;
  location: string;
  url: string;
  relationship: string;
  summary: string;
  groups: { name: string; items: Item[] }[];
  /** SAI pages where this partner's work shows up. */
  related: { label: string; href: string }[];
};

export const partnersIntro = {
  eyebrow: "Partners",
  heading: "Technology Partners",
  intro:
    "SAI IT Solutions works with specialist technology companies so clients get proven platforms and extra delivery capacity behind a single point of contact.",
};

export const iris: Partner = {
  slug: "digiinfra-iris",
  name: "IRIS by DigiInfra",
  legalName: "DigiInfra Agentic AI Technologies Pvt. Ltd.",
  location: "Gurgaon, Haryana, India",
  url: "https://iris.digiinfra.ai/",
  relationship: "AI road inspection partner",
  summary:
    "IRIS (Intelligent Road Inspection System) turns dashcam footage from patrol vehicles into road inspection data. It detects defects, scores pavement condition and road safety, inventories roadside assets, and produces work orders, GIS maps and reports for road agencies.",
  groups: [
    {
      name: "Capture",
      items: [
        { name: "Dashcam footage", body: "Geo-tagged video from patrol vehicles." },
        { name: "Drone data" },
        { name: "Survey data" },
      ],
    },
    {
      name: "Analyse",
      items: [
        { name: "Road defect detection", body: "Including potholes, alligator cracking, rutting, faded markings, edge drop-offs and damaged signage." },
        { name: "Pavement condition", body: "International Roughness Index (IRI) scoring." },
        { name: "Road safety", body: "Risk assessment and compliance scoring." },
        { name: "Roadside asset inventory", body: "Signs, guardrails and lights." },
      ],
    },
    {
      name: "Act",
      items: [
        { name: "Prioritised work orders" },
        { name: "Budget estimates" },
        { name: "GIS maps", body: "With ArcGIS and QGIS integration." },
        { name: "Web dashboard" },
        { name: "PDF and Excel reports", body: "NHAI- and PWD-compatible reporting." },
      ],
    },
  ],
  related: [{ label: "AI Road Defect Detection", href: "/it-services/ai-road-defect-detection" }],
};

export const sharajman: Partner = {
  slug: "sharajman-technologies",
  name: "Sharajman Technologies",
  legalName: "Sharajman Technologies (STPL)",
  location: "Noida, Uttar Pradesh, India",
  url: "https://sharajman.com/",
  relationship: "Software, AI and digital transformation partner",
  summary:
    "An AI-driven IT solutions company that builds custom software for enterprises and government — spanning AI, web and mobile, cloud, business automation and data — including platforms for the power and energy sector.",
  groups: [
    {
      name: "AI & machine learning",
      items: [
        { name: "Generative AI solutions" },
        { name: "AI agents and workflow automation" },
        { name: "Chatbots and virtual assistants" },
        { name: "AI document intelligence" },
        { name: "AI integration and APIs" },
        { name: "AI consulting and strategy" },
      ],
    },
    {
      name: "Web & mobile",
      items: [
        { name: "Custom web applications" },
        { name: "CMS development" },
        { name: "Native, hybrid and cross-platform apps" },
        { name: "AR and VR apps" },
      ],
    },
    {
      name: "Cloud & DevOps",
      items: [
        { name: "DevOps strategy and assessment" },
        { name: "Cloud setup, migration and monitoring" },
        { name: "Security integration (DevSecOps)" },
        { name: "Disaster recovery and backup" },
      ],
    },
    {
      name: "Business automation",
      items: [
        { name: "ERP systems" },
        { name: "CRM solutions" },
        { name: "Document management systems" },
        { name: "Business process automation" },
      ],
    },
    {
      name: "Data & insights",
      items: [
        { name: "Data engineering and integration" },
        { name: "Predictive analytics" },
        { name: "Business intelligence and reporting" },
      ],
    },
    {
      name: "UI/UX & sector platforms",
      items: [
        { name: "UX strategy, audits and prototyping" },
        { name: "Product design" },
        { name: "Power and energy platforms" },
      ],
    },
  ],
  related: [
    { label: "AI & ML", href: "/it-services/ai-ml" },
    { label: "Software Development", href: "/it-services/software-development" },
    { label: "Cloud & IT Consulting", href: "/it-services/cloud-it-consulting" },
  ],
};

export const partners: Partner[] = [iris, sharajman];

/** Short attribution used inside SAI service pages. */
export const withSharajman = (items: string[]) => ({
  heading: "With Sharajman Technologies",
  body: `Delivered in collaboration with ${sharajman.name}, ${sharajman.location}.`,
  items: items.map((name) => ({ name })),
});
