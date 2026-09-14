/**
 * DIVISION 02 — SAI EXIM.
 *
 * SOURCES
 *   VERBATIM (brief 2026-09-14, D-07) — hero heading, sub-text, button labels,
 *     the eight service names and six product categories.
 *   COMPOSED — the one-line descriptions and the sourcing sequence. They describe
 *     what each named service is, and deliberately claim nothing else: no
 *     countries, ports, volumes, partners or lead times. Needs SAI sign-off.
 */
import type { HeroCopy, Item } from "./types";

export const eximHero: HeroCopy = {
  eyebrow: "SAI EXIM",
  heading: "Global Sourcing. Smooth Trade. Reliable Delivery.",
  sub: "Import, export, sourcing, documentation and logistics coordination.",
  actions: [
    { label: "Request Quote", href: "/contact-us?division=exim&type=quote#enquiry", variant: "solid" },
    { label: "Become a Supplier", href: "/vendor-registration", variant: "outline" },
  ],
};

export const eximIntro = {
  eyebrow: "International trade",
  heading: "One partner from requirement to delivery.",
  body: "SAI EXIM handles the import and export of goods for businesses that need the right product, from a verified supplier, with the paperwork and logistics coordinated end to end.",
};

export const eximServices: Item[] = [
  { name: "Import of goods", body: "Bringing goods in from international suppliers, coordinated from enquiry to delivery." },
  { name: "Export of goods", body: "Preparing and moving goods to buyers in international markets." },
  { name: "Global sourcing", body: "Finding suppliers that match your specification, quantity and budget." },
  { name: "Vendor verification", body: "Checking a supplier before you commit to an order." },
  { name: "Product inspection", body: "Inspecting goods against the agreed specification." },
  { name: "Quality check", body: "Quality checks before goods are released for shipment." },
  { name: "Customs documentation", body: "Preparing the documentation import and export shipments require." },
  { name: "Logistics coordination", body: "Coordinating movement between supplier, carrier and buyer." },
];

export const eximCategories: Item[] = [
  { name: "Industrial goods", body: "Equipment, components and supplies for industrial operations." },
  { name: "Construction materials", body: "Materials for construction and infrastructure projects." },
  { name: "Safety equipment", body: "Protective and site-safety equipment." },
  { name: "IT hardware", body: "Computing and networking hardware." },
  { name: "Consumer goods", body: "Products for retail and distribution." },
  { name: "Custom sourcing", body: "Anything outside these categories, sourced to your specification." },
];

/** The order the services naturally run in — shown as a sequence, not a promise of timing. */
export const eximSequence: Item[] = [
  { name: "Requirement", body: "Specification, quantity and destination." },
  { name: "Sourcing", body: "Suppliers identified and compared." },
  { name: "Verification", body: "Vendors checked before commitment." },
  { name: "Inspection", body: "Product inspection and quality check." },
  { name: "Documentation", body: "Customs documentation prepared." },
  { name: "Delivery", body: "Logistics coordinated through to arrival." },
];

export const supplierPage = {
  eyebrow: "SAI EXIM",
  heading: "Vendor Registration",
  intro:
    "Manufacturers, distributors and service providers can register interest in supplying SAI EXIM. Tell us what you supply and we'll be in touch when there's a fit.",
  checklist: [
    "Company name and country",
    "Product categories you supply",
    "Relevant certifications or quality standards",
    "Typical order quantities",
    "Contact person and phone number",
  ],
  hint: "Include your company name, product categories, certifications and typical order quantities.",
};
