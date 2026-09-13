/**
 * APPROVED CONTENT — four published posts. Source: Horizons export + live site.
 * Slugs preserved exactly; they carry local-search value.
 *
 * The source renders a trailing "Keywords: …" line as visible body copy on every
 * post. That is SEO metadata leaked into the page (survey finding F-03b). It is
 * carried here as `keywords` and emitted in <meta>, never rendered on the page.
 */

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  cover: string;
  coverAlt: string;
  body: string[];
  cta: string;
  keywords: string[];
};

export const posts: Post[] = [
  {
    slug: "how-to-know-if-your-property-needs-professional-mold-remediation",
    title: "How to Know If Your Property Needs Professional Mold Remediation",
    description:
      "Learn the warning signs of mold growth, health risks, and when to call professional mold remediation experts to protect your home or business.",
    date: "2024-08-12",
    readingTime: "1 min read",
    cover: "/img/pexels-deadbird-29701042-1-.jpg-1-jRt68BTxLDaQh4ug.jpeg",
    coverAlt: "Damp interior wall showing early signs of mold growth",
    body: [
      "Mold can develop quietly behind walls, under flooring, and in areas affected by moisture. While some property owners attempt DIY solutions, hidden mold often continues to spread, affecting indoor air quality and potentially causing structural damage.",
      "Common signs include persistent musty odors, visible discoloration on walls or ceilings, unexplained allergy symptoms, and recurring moisture issues. Left untreated, mold can compromise both property value and occupant health. Professional mold remediation goes beyond surface cleaning.",
      "Experts identify the source of moisture, contain affected areas, safely remove contaminated materials, and restore healthy indoor conditions. Whether you're managing a commercial facility or protecting your family home, early intervention can save thousands in future repairs.",
    ],
    cta: "Suspect mold in your property? Contact SAI Sustainable Services today for a professional assessment and customized remediation plan.",
    keywords: ["Mold remediation", "mold removal services", "mold inspection", "indoor air quality", "professional mold remediation"],
  },
  {
    slug: "what-to-do-in-the-first-24-hours-after-water-damage",
    title: "What to Do in the First 24 Hours After Water Damage",
    description:
      "Quick action after water damage can minimize repair costs and prevent mold growth. Learn the critical steps property owners should take.",
    date: "2024-08-12",
    readingTime: "1 min read",
    cover: "/img/pexels-ehma-18302377.jpg-EfGenCxbBBL200M6.jpeg",
    coverAlt: "Water pooling across a damaged interior floor",
    body: [
      "Water damage can result from burst pipes, flooding, roof leaks, or appliance failures. The first 24 hours are crucial in preventing extensive structural damage and secondary issues such as mold growth.",
      "Immediate priorities include stopping the water source, ensuring safety, removing standing water, and documenting the damage for insurance purposes.",
      "Professional restoration teams use specialized drying equipment, moisture detection technology, and restoration techniques to return properties to pre-loss condition quickly and efficiently. Delaying restoration often leads to higher repair costs and longer recovery times.",
    ],
    cta: "Experiencing water damage? Contact SAI Sustainable Services for fast, professional restoration services and emergency response support.",
    keywords: ["Water damage restoration", "emergency water damage", "flood restoration", "property restoration", "water damage repair"],
  },
  {
    slug: "the-hidden-dangers-of-asbestos-during-renovation-projects",
    title: "The Hidden Dangers of Asbestos During Renovation Projects",
    description:
      "Planning a renovation? Discover why asbestos testing and abatement are essential before demolition or remodeling begins.",
    date: "2024-08-12",
    readingTime: "1 min read",
    cover: "/img/pexels-sonny-13364320.jpg-yDcZzkFW4Txe5xwc.jpeg",
    coverAlt: "Stripped interior during a renovation project",
    body: [
      "Many buildings constructed before the 1990s may contain asbestos in insulation, flooring, ceiling materials, and wall systems. Disturbing these materials during renovations can release microscopic fibers into the air.",
      "Exposure to asbestos has been linked to serious long-term health risks, making professional asbestos abatement a critical first step in many renovation projects.",
      "Certified asbestos professionals follow strict safety protocols to identify, contain, and remove hazardous materials while ensuring compliance with local regulations.",
      "Before starting any demolition, remodeling, or property upgrade, understanding your asbestos risks can protect workers, occupants, and your investment.",
    ],
    cta: "Planning a renovation? Schedule an asbestos assessment with SAI Sustainable Services before your project begins.",
    keywords: ["Asbestos abatement", "asbestos removal", "asbestos testing", "renovation safety", "asbestos remediation"],
  },
  {
    slug: "renovation-upgrades-that-increase-property-value-and-energy-efficiency",
    title: "Renovation Upgrades That Increase Property Value and Energy Efficiency",
    description:
      "Smart renovations deliver long-term financial benefits. Learn which upgrades improve property performance, comfort and resale appeal.",
    date: "2024-08-12",
    readingTime: "1 min read",
    cover: "/img/pexels-curtis-adams-1694007-4258279.jpg-RuCEWu2K2sAEWETi.jpeg",
    coverAlt: "Renovated modern interior with updated finishes",
    body: [
      "Smart renovations do more than improve aesthetics—they deliver long-term financial benefits. Upgrades such as modern insulation, energy-efficient flooring, updated kitchens, bathroom remodels, fresh paint, and drywall improvements can significantly improve property performance.",
      "Well-planned renovations not only attract buyers and tenants but can also reduce maintenance costs and improve occupant satisfaction.",
      "Modern kitchens remain one of the highest-return investments for property owners, while bathroom renovations can dramatically improve both functionality and resale appeal. Upgraded insulation and flooring contribute to lower utility costs and improved comfort throughout the year.",
      "Working with experienced renovation professionals ensures projects are completed efficiently, safely, and with lasting quality.",
    ],
    cta: "Ready to transform your space? Contact SAI Sustainable Services to discuss renovation solutions tailored to your property and goals.",
    keywords: ["Kitchen renovation", "bathroom remodeling", "energy-efficient renovations", "property improvement", "commercial renovations"],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
