/** The three divisions. Descriptive framing only — service copy lives in services.ts. */
export type DivisionKey = "environmental" | "technology" | "construction";

export const divisions = [
  {
    key: "environmental" as const,
    index: "01",
    name: "Environmental",
    title: "Environmental Services",
    line: "Abatement, restoration, cleaning and waste — handled safely and compliantly.",
    href: "/environmental-abatement-halifax-dartmouth-nova-scotia",
    image: "/img/asbestos-abatement-halifax-dartmouth-nova-scotia-UghGgfqJEbpdqSqM.jpg",
    imageAlt: "Certified abatement work under containment",
    groups: ["environmental-abatement", "restoration-and-cleaning", "waste-and-disposal"],
  },
  {
    key: "technology" as const,
    index: "02",
    name: "IT Services",
    title: "Technology & Digital",
    line: "Web, AI, data, UX and automation — delivered by a Canada-led team.",
    href: "/it-services",
    image: "/img/generated-YZ98xOPrOlUMEe57.png",
    imageAlt: "Abstract representation of connected digital systems",
    groups: [],
  },
  {
    key: "construction" as const,
    index: "03",
    name: "Construction",
    title: "Construction & Renovation",
    line: "Residential and commercial renovation, demolition and skilled labour.",
    href: "/renovation-and-construction-dartmouth-halifax-general-contractors",
    image: "/img/home-renovations-services-halifax-dartmouth-nova-scotia-general-contractors-s4EJy3knOMjGfGZt.jpg",
    imageAlt: "Completed renovation project",
    groups: ["renovation-and-construction", "demolition-and-labor-support"],
  },
];
