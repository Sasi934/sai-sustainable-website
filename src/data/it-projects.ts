/**
 * APPROVED CONTENT — SAI-delivered projects only. Source: SAI_Experience_Web Dev.docx.
 *
 * ⚠️ Benchmarks live in it-benchmarks.ts and MUST NOT be added to this array.
 * The separation is structural so that no single map can render an SAI project and
 * a reference benchmark identically. See docs/DECISIONS.md, constraint 3.
 */

export type ItProject = {
  slug: string;
  name: string;
  url: string;
  body: string;
  points: string[];
  approach: string;
  journey: string[];
  /** Captured from the live site, 2026-09-11, with SAI's permission. */
  shot: string;
  shotAlt: string;
};

export const itProjects: ItProject[] = [
  {
    slug: "bhumi-old-school-foods",
    name: "Bhumi Old School Foods",
    url: "https://www.bhumioldschoolfoods.com/",
    body: "Bhumi Old School Foods is a consumer-facing digital experience built around the story of traditional and organic food products from Andhra and Telangana. SAI's work focuses on presenting the brand, products and value proposition through a clean, responsive web experience that supports discovery and customer engagement.",
    points: [
      "Responsive consumer-facing website experience.",
      "Structured presentation of products and brand information.",
      "Mobile-first content and visual hierarchy.",
      "Clear calls to action and customer-oriented navigation.",
      "Content structure designed for future expansion into stronger commerce and digital engagement features.",
    ],
    approach:
      "modern responsive frontend development, structured content, optimized media, API-ready architecture and UX practices focused on clear product discovery.",
    journey: ["Brand Story", "Product Discovery", "Clear Information", "Mobile Experience", "Customer Action"],
    shot: "/img/work/bhumi.png",
    shotAlt: "Bhumi Old School Foods homepage — editorial hero introducing traditional harvesting and milling",
  },
  {
    slug: "the-script-craft",
    name: "The Script Craft",
    url: "https://thescriptcraft.com/",
    body: "The Script Craft is a digital platform positioned as an AI-powered environment for creative-industry connections. The platform supports user accounts, profiles, creative content, collaboration and discovery, making it a strong example of SAI's capability beyond a conventional informational website.",
    points: [
      "User registration, login and account verification workflows.",
      "Profile and member-oriented digital experience.",
      "Secure handling of user-generated content and platform interactions.",
      "Creative content and synopsis management.",
      "Collaboration and discovery features for writers, producers and filmmakers.",
      "Responsive public-facing website and application-style user journeys.",
      "AI-oriented product positioning and digital community experience.",
    ],
    approach:
      "responsive web application development, authentication and verification workflows, database-backed content management, REST/API integration, user-facing workflows and AI-enabled platform architecture.",
    journey: ["Register", "Verify", "Build Profile", "Create / Manage Content", "Collaborate", "Get Discovered"],
    shot: "/img/work/scriptcraft.png",
    // The live site presents this entry screen to signed-out visitors, which is
    // the registration and verification workflow the capability document describes.
    shotAlt: "The Script Craft entry screen — login, sign up and federated sign-in for the creative community",
  },
  {
    slug: "aurea-interiors",
    name: "AUREA Interiors",
    url: "https://aurea-interiors-peach.vercel.app/",
    body: "AUREA Interiors demonstrates SAI's ability to create a premium, visually led experience rather than a conventional brochure website. The experience combines strong project storytelling with interactive material exploration, project navigation and clear consultation calls to action.",
    points: [
      "Immersive visual storytelling for premium projects.",
      "Interactive project showcase and project-level navigation.",
      "Interactive material library designed around user movement and exploration.",
      "Clear consultation and conversion paths.",
      "Responsive presentation of project, service and brand content.",
      "Content architecture covering projects, services, materials, visualizer and journal content.",
      "Modern visual hierarchy designed to make the website feel like an experience, not a document.",
    ],
    approach:
      "modern responsive frontend, interactive visual components, motion/interaction patterns, optimized media, structured content and an experience-led information architecture.",
    journey: ["Visual Identity", "Storytelling", "Explore", "Interact", "Build Confidence", "Book Consultation"],
    shot: "/img/work/aurea.png",
    shotAlt: "AUREA Interiors homepage — full-bleed interior with editorial display typography",
  },
];

export const itProjectsIntro =
  "The following three projects demonstrate different parts of SAI's technology and design capability—from consumer-facing digital commerce and content presentation, to AI-enabled platforms and highly visual interactive experiences.";
