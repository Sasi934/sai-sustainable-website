/**
 * APPROVED CONTENT — do not edit wording. See docs/CONTENT-LOCK.md.
 * 15 named services across 5 divisions, matching brief §14 exactly.
 *
 * `summary` is the short form used on the /services index (source: /services page).
 * `body` is the long form used on the division detail page (source: that page).
 * Where the source publishes only one length, both fields carry the same string.
 */

export type Service = {
  slug: string;
  name: string;
  summary: string;
  body: string;
  image?: string;
  imageAlt?: string;
};

export type ServiceGroup = {
  slug: string;
  /** Preserved exactly — these paths carry the local-search rankings. */
  path: string;
  name: string;
  heading: string;
  intro: string;
  division: "environmental" | "construction";
  image: string;
  imageAlt: string;
  services: Service[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "environmental-abatement",
    path: "/environmental-abatement-halifax-dartmouth-nova-scotia",
    name: "Environmental Abatement",
    heading: "Environmental Abatement",
    intro:
      "Safe, certified abatement solutions for residential, commercial, and industrial properties. Headquartered in Dartmouth, Nova Scotia we offer services across Atlantic Canada.",
    division: "environmental",
    image: "/img/asbestos-abatement-halifax-dartmouth-nova-scotia-UghGgfqJEbpdqSqM.jpg",
    imageAlt: "Asbestos abatement work in progress on a Halifax property",
    services: [
      {
        slug: "asbestos-abatement",
        image: "/img/asbestos-abatement-renovations-contractore-21KmBWd6JvLpTeQU.jpg",
        imageAlt: "Asbestos abatement under containment during a renovation",
        name: "Asbestos Abatement",
        summary:
          "Safe, certified asbestos removal for residential, commercial, and industrial properties. Our team follows strict regulatory guidelines to identify, contain, and eliminate asbestos hazards, ensuring a healthier and safer environment.",
        body:
          "Safe, certified asbestos removal for residential, commercial, and industrial properties. Our team follows strict regulatory guidelines to identify, contain, and eliminate asbestos hazards, ensuring a healthier and safer environment.",
      },
      {
        slug: "mold-abatement",
        image: "/img/attic-mold-removal-and-clean-up-halifax-dartmouth-nova-scotia-ai9gKihPNkX7ZA2k.jpg",
        imageAlt: "Mold contamination being located and contained at its source",
        name: "Mold Abatement",
        summary:
          "We locate, contain, and remove mold at its source while addressing underlying moisture issues. Our comprehensive remediation process helps restore indoor air quality and protects your property from future mold growth.",
        body:
          "We locate, contain, and remove mold at its source while addressing underlying moisture issues. Our comprehensive remediation process helps restore indoor air quality and protects your property from future mold growth.",
      },
      {
        slug: "lead-abatement",
        image: "/img/renovation-services-halifax-dartmouth-nova-scotia-QfjVnMi9BrOfIuG6.jpg",
        imageAlt: "Interior stripped back during certified lead paint removal",
        name: "Lead Abatement",
        summary:
          "Certified lead paint removal to protect your health. Protect your family, employees, and occupants from the dangers of lead exposure. Our trained professionals safely remove lead-based materials and ensure compliance with environmental and safety standards.",
        body:
          "Certified lead paint removal to protect your health. Protect your family, employees, and occupants from the dangers of lead exposure. Our trained professionals safely remove lead-based materials and ensure compliance with environmental and safety standards.",
      },
    ],
  },
  {
    slug: "restoration-and-cleaning",
    path: "/restoration-and-cleaning-dartmouth-halifax-nova-scotia",
    name: "Restoration & Cleaning",
    heading: "Full Service Restoration & Cleaning",
    // D-04: "managment" → "management", "skilfull craftmanship" → "skilful craftsmanship"
    intro:
      "Professional, discreet cleanup services for all hazards and disaster management. Our trained team follows strict safety protocols to restore affected areas with care and skilful craftsmanship",
    division: "environmental",
    image: "/img/trauma-and-disaster-clean-up-dartmouth-halifax-nova-scotia-G2vfVZQwKrSvPrkd.jpg",
    imageAlt: "Restoration crew preparing a site for cleanup",
    services: [
      {
        slug: "trauma-scene-cleanup",
        name: "Trauma Scene Cleanup",
        summary:
          "Professional, discreet cleanup services for biohazard and trauma situations. Our trained team follows strict safety protocols to restore affected areas with care and compassion",
        body:
          "Professional, discreet cleanup services for biohazard and trauma situations. Our trained team follows strict safety protocols to restore affected areas with care and compassion",
      },
      {
        slug: "water-damage-restoration",
        name: "Water Damage Restoration",
        summary:
          "Extraction, drying, and structure recovery. From emergency water extraction and structural drying to full restoration, we respond quickly to minimize damage, prevent mold growth, and restore your property to its original condition.",
        body:
          "Extraction, drying, and structure recovery. From emergency water extraction and structural drying to full restoration, we respond quickly to minimize damage, prevent mold growth, and restore your property to its original condition.",
        image: "/img/commercial-office-property-renovation-halifax-dartmouth-nova-scotia-canada-F07nVAAhdmb72jzS.jpg",
        imageAlt: "Interior undergoing structural drying and restoration",
      },
      {
        slug: "attic-mold-removal",
        name: "Attic Mold Removal",
        summary:
          "Specialized treatment for mold and discoloration in attics. Protect your home from hidden mold growth with professional attic mold removal services. Our team identifies the source of moisture, safely removes mold contamination, treats affected surfaces, and helps prevent future growth through proper ventilation and moisture control.",
        // Long form as published on /services.
        body:
          "Specialized treatment for mold and discoloration in attics. Protect your home from hidden mold growth with professional attic mold removal services. Our team identifies the source of moisture, safely removes mold contamination, treats affected surfaces, and helps prevent future growth through proper ventilation and moisture control. Restore a healthier indoor environment while protecting the structural integrity and value of your property. Schedule your attic mold inspection today and safeguard your home from costly damage and poor indoor air quality.",
        image: "/img/attic-mold-removal-and-clean-up-halifax-dartmouth-nova-scotia-ai9gKihPNkX7ZA2k.jpg",
        imageAlt: "Attic space treated for mold contamination",
      },
    ],
  },
  {
    slug: "waste-and-disposal",
    path: "/waste-and-disposal-services-halifax-dartmouth-nova-scotia",
    name: "Waste & Disposal Services",
    heading: "Waste & Disposal Services",
    intro:
      "Maintain a clean, safe, and environmentally responsible property with our comprehensive waste management and disposal solutions. We provide reliable collection, removal, transportation, and disposal services for residential, commercial, industrial, and construction projects. Our team follows all applicable environmental and safety regulations, ensuring waste is handled efficiently, responsibly, and in compliance with industry standards. Whether you need hazardous material disposal, junk removal, or post-construction cleanup, we deliver prompt service that helps keep your property organized, compliant, and clutter-free.",
    division: "environmental",
    image: "/img/waste-disposal-services-halifax-dartmouth-xtPi7eVZpYV0teA6.jpg",
    imageAlt: "Waste and disposal operation at a Dartmouth site",
    services: [
      {
        slug: "hazardous-waste-disposal",
        name: "Hazardous Waste Disposal",
        summary:
          "Proper packing, labeling, and compliant transport. We handle the collection, transportation, and disposal of hazardous materials in accordance with environmental regulations, ensuring safety and compliance every step of the way.",
        body:
          "Proper packing, labeling, and compliant transport. We handle the collection, transportation, and disposal of hazardous materials in accordance with environmental regulations, ensuring safety and compliance every step of the way.",
        image: "/img/environmental-drums-florida-scaled-YKbJQoW8D3HGyKZb.jpg",
        imageAlt: "Labelled drums staged for compliant hazardous waste transport",
      },
      {
        slug: "junk-removal",
        name: "Junk Removal",
        summary: "Fast and affordable debris and waste removal for homes and businesses.",
        body:
          "Fast, efficient, and affordable removal of unwanted items, debris, and waste from homes, offices, retail spaces, and construction sites.",
        image: "/img/junk-removal-halifax-darmouth-nova-scotia-1uyaVNuahGbyg8b5.jpg",
        imageAlt: "Junk removal crew clearing a property",
      },
      {
        slug: "construction-site-cleanup",
        name: "Construction Site Cleanup",
        summary:
          "Removal of debris and materials post-renovation or demolition. Keep your project on schedule with thorough post-construction cleanup services. We remove debris, dust, and waste materials, leaving your site clean, safe, and ready for occupancy",
        body:
          "Removal of debris and materials post-renovation or demolition. Keep your project on schedule with thorough post-construction cleanup services. We remove debris, dust, and waste materials, leaving your site clean, safe, and ready for occupancy",
        image: "/img/construction-site-clean-up-halifax-dartmouth-f9thjAfxv0hP54fy.jpg",
        imageAlt: "Post-construction cleanup underway",
      },
    ],
  },
  {
    slug: "demolition-and-labor-support",
    path: "/demolition-and-labor-support-halifax-dartmouth-nova-scotia",
    name: "Demolition & Labor Support",
    heading: "Demolition & Labor Support",
    intro:
      "Whether it's selective interior demolition or complete structural removal, we deliver safe, efficient demolition services with responsible waste management and site cleanup",
    division: "construction",
    image: "/img/best-and-affordable-demolition-services-halifax-dartmouth-nova-scotia-VjLaDOvin7dtt5sx.jpg",
    imageAlt: "Demolition work on a Nova Scotia structure",
    services: [
      {
        slug: "full-house-demolition",
        image: "/img/best-and-affordable-demolition-services-halifax-dartmouth-nova-scotia-VjLaDOvin7dtt5sx.jpg",
        imageAlt: "Structural demolition with waste separated on site",
        name: "Full House Demolition",
        summary: "Safe tear-downs with responsible waste separation.",
        body: "Safe tear-downs with responsible waste separation.",
      },
      {
        slug: "interior-demolition",
        name: "Interior Demolition",
        summary: "Kitchen, bathroom, or selective demolition for renovations.",
        body: "Kitchen, bathroom, or selective demolition for renovations.",
      },
      {
        slug: "labor-support",
        image: "/img/untitled-design-3-m6Lve8GaPjFjDeWW.png",
        imageAlt: "SAI Sustainable Services vehicle on site",
        name: "Labor Support",
        summary:
          "Reliable, skilled labor for restoration, remediation, demolition, and construction projects. Our experienced workforce helps keep projects moving efficiently and safely.",
        body:
          "Reliable, skilled labor for restoration, remediation, demolition, and construction projects. Our experienced workforce helps keep projects moving efficiently and safely.",
      },
    ],
  },
  {
    slug: "renovation-and-construction",
    path: "/renovation-and-construction-dartmouth-halifax-general-contractors",
    name: "Renovation & Construction",
    heading: "Full Service Renovation & Construction Services.",
    intro:
      "Transform your space with expert renovation solutions tailored to your needs. From kitchens and bathrooms to offices and retail spaces, we deliver quality craftsmanship and lasting value.",
    division: "construction",
    image: "/img/home-renovations-services-halifax-dartmouth-nova-scotia-general-contractors-s4EJy3knOMjGfGZt.jpg",
    imageAlt: "Completed home renovation in Halifax",
    services: [
      {
        slug: "home-renovations",
        name: "Home Renovations",
        summary: "Complete remodeling, additions, and basement finishing.",
        body:
          "Transform your house into the home you've always envisioned with complete renovation solutions tailored to your lifestyle and needs. From full home remodels and room additions to basement development and finishing, we handle every stage of the project with quality craftsmanship, attention to detail, and professional project management. Whether you're updating a single space or reimagining your entire home, we create functional, beautiful, and lasting results.",
        image: "/img/dartmouth-remodelling-services-home-experts-2GynYVeO3awhD5jK.jpg",
        imageAlt: "Residential remodelling project in Dartmouth",
      },
      {
        slug: "commercial-renovations",
        name: "Commercial Renovations",
        summary: "Office, retail, and industrial build-outs.",
        body:
          "Enhance the functionality, appearance, and value of your commercial property with professional renovation services. We specialize in office renovations, retail space upgrades, tenant improvements, and industrial build-outs designed to support your business goals. Our team works efficiently to minimize disruption while delivering modern, code-compliant spaces that improve productivity, customer experience, and operational efficiency.",
        image: "/img/office-renovations-halifax-darmouth-nova-scotia-s0txrkxhpqIk9ZpH.jpg",
        imageAlt: "Commercial office renovation in Halifax",
      },
      {
        slug: "interior-exterior-upgrades",
        name: "Interior & Exterior Upgrades",
        summary: "Drywall, painting, flooring, roofing, and siding.",
        body:
          "Refresh and protect your property with comprehensive interior and exterior improvement services. From drywall installation and repairs to professional painting, flooring upgrades, roofing replacements, and siding installations, we help maintain and enhance the appearance, durability, and value of your home or business. Our skilled team delivers high-quality finishes that improve curb appeal, comfort, and long-term performance.",
        image: "/img/interior-exterior-renovations-halifax-dartmouth-nova-scotia-TBQO6cLMFJ9ByMBb.jpg",
        imageAlt: "Interior and exterior upgrade work on a Nova Scotia property",
      },
    ],
  },
];

export const getGroup = (path: string) => serviceGroups.find((g) => g.path === path);
export const allServices = serviceGroups.flatMap((g) => g.services);
