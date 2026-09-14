/**
 * DIVISION 03 — SAI IT Solutions (strategic focus).
 *
 * SOURCES
 *   VERBATIM (brief 2026-09-14, D-07) — hero heading, sub-text, button labels, the
 *     13 service names, road-defect detections / capabilities / target users,
 *     industries, the seven process stages, tech-stack labels, portfolio sections
 *     and sub-page names.
 *   APPROVED (CONTENT-LOCK.md §10, via it.ts / team.ts) — referenced, not retyped.
 *   COMPOSED — one-line descriptions, marked inline. Needs SAI sign-off.
 *
 * D-07 supersedes D-01 *only* for terms the 2026-09-14 brief names explicitly
 * (Python, computer vision, cybersecurity, mobile apps, e-commerce, databases,
 * cloud and hosting). The D-01 exclusion list still stands: no Figma, TensorFlow,
 * PyTorch, scikit-learn, NLP, LLMs, AWS, GCP, Docker, CI/CD, PostgreSQL, MySQL,
 * ETL or Web3 anywhere on the site.
 *
 * HONESTY RULE for this file: the AI road defect system is presented as a product
 * and a pilot programme open to road owners — never as a completed deployment,
 * and never with accuracy figures, client names or results.
 */
import { IT_BASE as BASE } from "./divisions";
import { itIntro, itDifference } from "./it";
import type { HeroCopy, Item, SubPage } from "./types";
import { withSharajman } from "./partners";

const approvedCapability = (needle: string) => itIntro.capabilities.find((c) => c.includes(needle))!;
const approvedPoint = (needle: string) => itDifference.points.find((c) => c.includes(needle))!;

export const itHero: HeroCopy = {
  eyebrow: "SAI IT Solutions",
  heading: "Web. Software. AI. Built for Real Business.",
  sub: "Web development, IT consulting, AI solutions and AI-based road defect detection.",
  actions: [
    { label: "Book Free Consultation", href: "/contact-us?division=it&type=consultation#enquiry", variant: "solid" },
    { label: "Request Demo", href: `${BASE}/request-demo`, variant: "outline" },
  ],
};

export const itServices: Item[] = [
  { name: "Website design and development", body: "Fast, responsive business websites built to be found and easy to run.", href: `${BASE}/web-development` },
  { name: "E-commerce development", body: "Online stores with clear product discovery and checkout.", href: `${BASE}/web-development` },
  { name: "Mobile app development", body: "Apps for customers, field teams and operations.", href: `${BASE}/software-development` },
  { name: "Custom software", body: "Applications shaped around how your business actually works.", href: `${BASE}/software-development` },
  { name: "Cloud and hosting", body: "Cloud-ready deployment, hosting and environments.", href: `${BASE}/cloud-it-consulting` },
  { name: "IT consulting", body: "Business-first technology planning before anything is built.", href: `${BASE}/cloud-it-consulting` },
  { name: "AI / ML solutions", body: "Machine learning where it removes repetitive work or improves decisions.", href: `${BASE}/ai-ml` },
  { name: "Computer vision", body: "Systems that detect and classify what cameras see.", href: `${BASE}/ai-ml` },
  { name: "AI road defect detection", body: "Potholes, cracks and surface distress found, classified and mapped — with IRIS by DigiInfra.", href: `${BASE}/ai-road-defect-detection` },
  { name: "Smart city dashboards", body: "Operational data for city and infrastructure teams in one view.", href: `${BASE}/ai-ml` },
  { name: "Data analytics", body: "Reports, dashboards and decision-support tools.", href: `${BASE}/ai-ml` },
  { name: "Cybersecurity", body: "Security built into applications, access and hosting.", href: `${BASE}/cloud-it-consulting` },
  { name: "AMC and support", body: "Annual maintenance contracts and ongoing support.", href: `${BASE}/support-amc` },
];

export const itIntroStatement = {
  eyebrow: "IT Solutions",
  heading: "Technology that works in the real world, not just in a demo.",
  body: itIntro.body[0],
  principle: itDifference.principle,
};

export type RoadCapability = Item & { stage: "Capture" | "Analyse" | "Act" };

/**
 * D-09 (2026-09-14): delivered in collaboration with DigiInfra's IRIS platform.
 * Items marked IRIS below are paraphrased from iris.digiinfra.ai; the rest are the
 * 2026-09-14 brief. No accuracy, savings or coverage figures — IRIS's own page
 * shows unfinished placeholder numbers, so none are republished.
 */
export const roadDefect = {
  eyebrow: "AI Road Defect Detection",
  heading: "AI-Powered Road Defect Detection",
  // COMPOSED — describes the system named in the brief and IRIS; no performance claims.
  intro:
    "A computer-vision system that finds and classifies road defects from dashcam and vehicle-mounted camera footage, a mobile app, and drone or survey data — then maps each one by GPS and turns the results into dashboards, work orders, reports and API data road teams can act on.",
  partner: {
    label: "Delivered in collaboration with",
    name: "IRIS by DigiInfra",
    long: "IRIS (Intelligent Road Inspection System) by DigiInfra Agentic AI Technologies",
    url: "https://iris.digiinfra.ai/",
  },
  detects: [
    { name: "Potholes", body: "Depressions and breaks in the surface." },
    { name: "Cracks", body: "Linear, networked and alligator cracking." },
    { name: "Ruts", body: "Wheel-path deformation." },
    { name: "Patches", body: "Previous repairs and their condition." },
    { name: "Surface distress", body: "Wear, ravelling and general deterioration." },
    { name: "Faded markings", body: "Worn lane and road markings." }, // IRIS
    { name: "Edge drop-offs", body: "Height breaks at the pavement edge." }, // IRIS
    { name: "Damaged signage", body: "Missing or damaged road signs." }, // IRIS
  ] satisfies Item[],
  capabilities: [
    { stage: "Capture", name: "Vehicle-mounted camera", body: "Geo-tagged dashcam footage from patrol vehicles." },
    { stage: "Capture", name: "Mobile app", body: "Capture and review from a phone in the field." },
    { stage: "Capture", name: "Drone & survey data", body: "Drone and survey data brought into the same view." }, // IRIS
    { stage: "Capture", name: "GPS mapping", body: "Every defect pinned to its location." },
    { stage: "Analyse", name: "Severity classification", body: "Defects graded so repairs can be prioritised." },
    { stage: "Analyse", name: "Pavement condition", body: "International Roughness Index (IRI) scoring." }, // IRIS
    { stage: "Analyse", name: "Safety & compliance scoring", body: "Road safety risks assessed and scored." }, // IRIS
    { stage: "Analyse", name: "Asset inventory", body: "Signs, guardrails and lights recorded with their condition." }, // IRIS
    { stage: "Act", name: "Dashboard", body: "Network-wide view of defects and severity." },
    { stage: "Act", name: "Work orders & budget estimates", body: "Prioritised repair lists with estimated cost." }, // IRIS
    { stage: "Act", name: "Reports", body: "PDF and Excel reports, NHAI- and PWD-compatible." },
    { stage: "Act", name: "GIS maps", body: "ArcGIS and QGIS integration." }, // IRIS
    { stage: "Act", name: "API integration", body: "Defect data delivered into existing asset and works systems." },
  ] satisfies RoadCapability[],
  users: [
    { name: "Municipal corporations" },
    { name: "NHAI", body: "National Highways Authority of India" },
    { name: "Smart cities" },
    { name: "PWDs", body: "Public Works Departments" }, // IRIS
    { name: "Highway concessionaires" }, // IRIS
    { name: "Contractors" },
    { name: "Road agencies" },
    { name: "Central ministries" }, // IRIS
  ] satisfies Item[],
  pipeline: ["Capture", "Detect", "Classify", "Map", "Report"],
  pilot: {
    heading: "Pilot programme",
    // COMPOSED — an offer, not a claim of a completed deployment.
    body: "SAI offers pilot deployments to road owners, run with DigiInfra's IRIS platform. A pilot covers a defined stretch of your network so your engineers can judge the output against their own inspections.",
  },
};

export const itIndustries: Item[] = [
  { name: "Government" },
  { name: "Municipalities" },
  { name: "Smart Cities" },
  { name: "Construction / Infrastructure" },
  { name: "Healthcare" },
  { name: "Retail" },
  { name: "Education" },
  { name: "Manufacturing" },
];

export const itProcess: Item[] = [
  { name: "Discovery", body: "Understand the business, the users and the problem worth solving." },
  { name: "Requirement & Scope", body: "Agree what gets built, what doesn't, and how success is judged." },
  { name: "UI/UX Design", body: "Design the journey before writing the code." },
  { name: "Development", body: "Build in reusable components and modular services." },
  { name: "Testing", body: "Test for function, performance, accessibility and security." },
  { name: "Deployment", body: "Release to cloud-ready infrastructure." },
  { name: "Support & Maintenance", body: "Keep it running, secure and improving." },
];

export const itTechStack = ["React", "Node.js", "Python", "AI / ML", "Cloud", "Computer Vision", "Databases", "APIs"];

export type PortfolioArea = {
  slug: string;
  name: string;
  status: "Delivered" | "Pilot programme" | "Capability";
  body: string;
  href: string;
};

export const itPortfolio: PortfolioArea[] = [
  {
    slug: "web-projects",
    name: "Web Projects",
    status: "Delivered",
    body: "Bhumi Old School Foods, The Script Craft and AUREA Interiors — three live projects, three different problems.",
    href: `${BASE}/work#web-projects`,
  },
  {
    slug: "ai-road-defect-pilot",
    name: "AI Road Defect Pilot",
    status: "Pilot programme",
    body: "Run with IRIS by DigiInfra — open to municipalities, road agencies and contractors who want to test detection on their own network.",
    href: `${BASE}/ai-road-defect-detection`,
  },
  {
    slug: "dashboards",
    name: "Dashboards",
    status: "Capability",
    body: "Tableau dashboards and visualization, data analytics and decision-support reporting.",
    href: `${BASE}/ai-ml`,
  },
  {
    slug: "mobile-apps",
    name: "Mobile Apps",
    status: "Capability",
    body: "Mobile apps for customers, field teams and operations — including field capture for road defect detection.",
    href: `${BASE}/software-development`,
  },
  {
    slug: "custom-software",
    name: "Custom Software",
    status: "Capability",
    body: "Authentication, REST APIs, CRUD workflows and database-backed applications built around your process.",
    href: `${BASE}/software-development`,
  },
];

const consult = { label: "Book Free Consultation", href: "/contact-us?division=it&type=consultation#enquiry" };
const demo = { label: "Request Demo", href: `${BASE}/request-demo` };

export const itPages: SubPage[] = [
  {
    slug: "web-development",
    name: "Web Development",
    heading: "Website Design & Development",
    metaTitle: "Web Development — Website Design, E-commerce & Web Applications",
    metaDescription:
      "Web development for real business: responsive websites, e-commerce development and web applications built with React.js, Node.js and REST APIs.",
    intro: approvedCapability("Modern web"),
    sections: [
      {
        heading: "What we build",
        items: [itServices[0], itServices[1], { name: "Web applications", body: "Account-based platforms with authentication, profiles and user workflows." }],
      },
      {
        heading: "How we build it",
        items: [
          { name: "Responsive frontend development" },
          { name: "Reusable components" },
          { name: "Accessibility" },
          { name: "Performance" },
          { name: "Structured, search-friendly content" },
        ],
      },
      { heading: "Technology", items: ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "REST APIs"].map((name) => ({ name })) },
      { heading: "Design principle", body: approvedPoint("performance, accessibility") },
    ],
    related: [{ label: "Portfolio — Web Projects", href: `${BASE}/work#web-projects`, note: "Delivered work" }],
    actions: [consult],
    keywords: ["web development", "website design", "e-commerce development"],
  },
  {
    slug: "software-development",
    name: "Software Development",
    heading: "Custom Software & Mobile App Development",
    metaTitle: "Software Development — Custom Software & Mobile Apps",
    metaDescription:
      "Custom software development and mobile app development: authentication, REST APIs, CRUD workflows and database-backed applications built around your process.",
    intro: "Applications shaped around how your business actually works — for customers, staff and field teams.",
    sections: [
      { heading: "What we build", items: [itServices[3], itServices[2], { name: "APIs and integrations", body: approvedCapability("API integration") }] },
      {
        heading: "Application foundations",
        items: [
          { name: "Authentication and verification workflows" },
          { name: "REST APIs" },
          { name: "CRUD development and application workflows" },
          { name: "Database-backed applications" },
        ],
      },
      { heading: "Technology", items: ["React", "Node.js", "Express.js", "Java", "Sequelize", "Databases", "APIs"].map((name) => ({ name })) },
      { heading: "Built to extend", body: approvedPoint("reusable components") },
      withSharajman([
        "ERP systems",
        "CRM solutions",
        "Document management systems",
        "Business process automation",
        "Native, hybrid and cross-platform apps",
        "AR and VR apps",
      ]),
    ],
    related: [
      { label: "The Script Craft — application case study", href: `${BASE}/work#the-script-craft`, note: "Delivered work" },
      { label: "Technology Partners", href: "/partners", note: "Partners" },
    ],
    actions: [consult],
    keywords: ["software development", "mobile app development", "custom software"],
  },
  {
    slug: "ai-ml",
    name: "AI & ML",
    heading: "AI, Machine Learning & Data Analytics",
    metaTitle: "AI Solutions & AI Consulting — Machine Learning, Computer Vision & Data Analytics",
    metaDescription:
      "AI solutions and AI consulting: machine learning, computer vision, smart city dashboards and data analytics that turn operational data into decisions.",
    intro: approvedPoint("AI behind the experience"),
    sections: [
      { heading: "AI & ML solutions", items: [itServices[6], itServices[7], itServices[8]] },
      { heading: "Data & dashboards", items: [itServices[10], itServices[9], { name: "Tableau dashboards and visualization" }] },
      { heading: "Team capability", items: [{ name: approvedCapability("AI/ML") }, { name: approvedCapability("Data analytics") }] },
      { heading: "Technology", items: ["Python", "AI / ML", "SLM", "Computer Vision", "Tableau", "APIs"].map((name) => ({ name })) },
      withSharajman([
        "Generative AI solutions",
        "AI agents and workflow automation",
        "Chatbots and virtual assistants",
        "AI document intelligence",
        "Predictive analytics",
        "Business intelligence and reporting",
      ]),
    ],
    related: [
      { label: "AI Road Defect Detection", href: `${BASE}/ai-road-defect-detection`, note: "Product · with IRIS by DigiInfra" },
      { label: "Technology Partners", href: "/partners", note: "Partners" },
    ],
    actions: [consult, demo],
    keywords: ["AI solutions", "AI consulting", "computer vision", "data analytics", "smart city technology"],
  },
  {
    slug: "cloud-it-consulting",
    name: "Cloud & IT Consulting",
    heading: "Cloud Solutions & IT Consulting",
    metaTitle: "Cloud Solutions & IT Consulting — Hosting and Cybersecurity",
    metaDescription:
      "IT consulting, cloud solutions and hosting, and cybersecurity — business-first technology planning with Certified Azure Developer capability.",
    intro: approvedCapability("Business-first"),
    sections: [
      { heading: "Services", items: [itServices[5], itServices[4], itServices[11]] },
      {
        heading: "Cloud capability",
        items: [
          { name: "Azure development" },
          { name: "Certified Azure Developer capability" },
          { name: "Cloud-ready application development" },
          { name: "API integration" },
        ],
      },
      { heading: "Delivery model", body: approvedCapability("Canada-led") },
      withSharajman([
        "DevOps strategy and assessment",
        "Cloud setup, migration and monitoring",
        "Security integration (DevSecOps)",
        "Disaster recovery and backup",
      ]),
    ],
    related: [
      { label: "Support & AMC", href: `${BASE}/support-amc` },
      { label: "Technology Partners", href: "/partners", note: "Partners" },
    ],
    actions: [consult],
    keywords: ["IT consulting", "cloud solutions", "cybersecurity", "cloud hosting"],
  },
  {
    slug: "support-amc",
    name: "Support / AMC",
    heading: "Support & Annual Maintenance Contracts",
    metaTitle: "IT Support & AMC — Annual Maintenance Contracts",
    metaDescription:
      "IT support and AMC (annual maintenance contracts) for websites, applications and cloud environments — kept running, secure and improving.",
    intro: "Launch is the start. AMC and support keep your website, application or platform running, secure and improving.",
    sections: [
      {
        heading: "What support covers",
        items: [
          { name: "AMC", body: "Annual maintenance contracts with an agreed scope." },
          { name: "Maintenance", body: "Updates, fixes and routine care." },
          { name: "Hosting", body: "Cloud and hosting environments looked after." },
          { name: "Security", body: "Security updates and access reviews." },
          { name: "Enhancements", body: "New features added without rebuilding the platform." },
        ],
      },
      { heading: "Why it stays maintainable", body: approvedPoint("reusable components") },
    ],
    related: [{ label: "Cloud & IT Consulting", href: `${BASE}/cloud-it-consulting` }],
    actions: [consult],
    keywords: ["AMC", "IT support", "website maintenance"],
  },
];

export const getItPage = (slug: string) => itPages.find((p) => p.slug === slug);

export const demoPage = {
  eyebrow: "SAI IT Solutions",
  heading: "Request a Demo",
  intro:
    "See AI road defect detection, or talk through a web, software or data project. Tell us what you'd like to see and who should attend, and we'll set up a session.",
  hint: "Which demo would you like — AI road defect detection, dashboards, or a web/software walkthrough? Include your organisation and the number of attendees.",
  expect: [
    { name: "A short call first", body: "To understand your network, data or project." },
    { name: "A tailored walkthrough", body: "Focused on your use case, not a generic slideshow." },
    { name: "Clear next steps", body: "Including what a pilot or project would involve." },
  ] satisfies Item[],
};
