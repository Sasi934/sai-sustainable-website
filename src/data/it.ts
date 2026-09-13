/**
 * APPROVED CONTENT — source: SAI_Experience_Web Dev.docx. See docs/CONTENT-LOCK.md.
 *
 * D-01 RESOLVED — document vocabulary only. The following terms appear in brief §17
 * but NOT in the source document and must never be added here:
 *   Figma, scikit-learn, TensorFlow, PyTorch, NLP, LLMs, AWS, GCP, Docker, CI/CD,
 *   PostgreSQL, MySQL, ETL, Web3.
 */

export const itIntro = {
  heading: "Who We Are",
  body: [
    "SAI Sustainable Services Inc. combines business leadership, project coordination and technology delivery to build practical digital solutions. Our technology experience includes websites, web applications, AI-enabled platforms, data analytics, user experience, APIs and cloud-ready solutions.",
    "Our work has been developed through projects in India and is supported by a flexible offshore technology team. The team is available on demand across software engineering, frontend and backend development, AI/ML, UI/UX, data analytics and cloud development, allowing SAI to bring the right capability to each assignment without unnecessary overhead.",
  ],
  capabilities: [
    "Business-first solution planning and client coordination.",
    "Modern web and application development.",
    "AI/ML, SLM and automation capability.",
    "Data analytics, dashboards and decision-support tools.",
    "UI/UX focused on simple, responsive and engaging experiences.",
    "API integration and cloud-ready application development.",
    "Flexible Canada-led and offshore delivery model.",
  ],
} as const;

/** Drives the technology WebGL scene. The scene renders this approved sequence. */
export const deliveryProcess = [
  "Business Need",
  "User Journey",
  "Experience Design",
  "Technology",
  "Build",
  "Test",
  "Deploy",
  "Improve",
] as const;

export const itDifference = {
  heading: "What Makes SAI Different",
  body: "SAI is not limited to building pages or implementing a standard web template. We look at the complete user journey and use technology where it creates a better experience for the end user and a simpler working environment for staff. Our goal is to make advanced technology feel simple.",
  points: [
    "We combine web, AI, data and UX skills within one coordinated delivery team.",
    "We use AI behind the experience where it can reduce repetitive work or improve information access.",
    "We can introduce interactive, visual and 3D/WebGL experiences where they add real value rather than adding technology for appearance alone.",
    "We design for performance, accessibility, responsive use and maintainability from the beginning.",
    "We build reusable components and modular services so future enhancements do not require rebuilding the platform.",
    "We can scale technical capacity on demand through our offshore team.",
  ],
  principle: "Simple for Users  +  Simple for Staff  +  Strong Technology Behind the Scenes",
} as const;

export const offshoreTeam = {
  heading: "Offshore Technology Team",
  body: "SAI is supported by a flexible offshore technology team of 3 people full time 6 people on-demand working across different technology areas. These resources support SAI on an on-demand basis depending on the project requirement, workload and technical specialization. This provides SAI with the ability to add development, AI, data or design capacity when needed while maintaining a single client-facing delivery structure.",
} as const;

/**
 * Delivery model, brief §18. Framing only — every capability word below is drawn
 * from the source document.
 */
export const deliveryModel = [
  {
    label: "Canada-led",
    title: "Business leadership and direction",
    points: [
      "Business-first solution planning and client coordination.",
      "Solution planning, commercial strategy and delivery alignment.",
      "UI/UX focused on simple, responsive and engaging experiences.",
    ],
  },
  {
    label: "Offshore",
    title: "Capacity on demand",
    points: [
      "Software engineering, frontend and backend development.",
      "AI/ML, UI/UX, data analytics and cloud development.",
      "Capacity added when the project requires it, without unnecessary overhead.",
    ],
  },
] as const;

/**
 * Capability areas. Every term below is present in the source document.
 * See the D-01 note at the top of this file before adding anything.
 */
export const itCapabilities = [
  { area: "UI / UX", items: ["UI/UX analysis and design", "Responsive user interfaces", "Simple, responsive and engaging experiences", "Accessibility", "Performance"] },
  { area: "Web", items: ["HTML", "CSS", "JavaScript", "React.js", "Responsive frontend development", "Reusable components"] },
  { area: "Backend", items: ["Node.js", "Express.js", "Java", "REST APIs", "Authentication", "CRUD development", "Sequelize"] },
  { area: "AI / ML", items: ["AI/ML", "SLM", "AI engineering and automation", "AI-enabled platform architecture"] },
  { area: "Data", items: ["Data analytics and reporting", "Tableau dashboards and visualization", "Database-backed applications", "Decision-support reporting"] },
  { area: "Cloud", items: ["Azure development", "Certified Azure Developer capability", "Cloud-ready application development", "API integration"] },
  { area: "Business systems", items: ["Salesforce development", "Business-system support", "Process analysis", "Workflow and application journeys"] },
  { area: "Interactive", items: ["Interactive, visual and 3D/WebGL experiences", "Motion and interaction patterns", "Optimized media"] },
] as const;
