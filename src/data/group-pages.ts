/**
 * Group utility pages — Projects, Careers, Sectors, Certifications, Downloads,
 * Privacy Policy, Terms. Required by the 2026-09-14 navigation and footer.
 *
 * COMPOSED copy throughout. It asserts nothing beyond approved content and the
 * brief: no vacancies, no documents that don't exist, no invented projects.
 *
 * ⚠️ LEGAL — privacyPolicy and terms describe what this website actually does
 * (the enquiry form and Google Analytics, as implemented in this codebase). They
 * are a factual starting point, NOT legal advice, and must be reviewed by SAI's
 * counsel before launch — including governing law, which is deliberately unstated.
 */
import { contact } from "./company";
import { divisions } from "./divisions";

const inbox = contact.emails[0].address;

export const projectsPage = {
  eyebrow: "Projects",
  heading: "Projects & Case Studies",
  intro:
    "Delivered technology projects, the AI road defect detection pilot programme, and the environmental, restoration and construction work SAI carries out across Atlantic Canada.",
  eximNote:
    "Trade engagements are handled confidentially for buyers and suppliers. Tell us what you need sourced and we'll explain how SAI EXIM would approach it.",
};

export const careersPage = {
  eyebrow: "Careers",
  heading: "Careers at SAI Group",
  intro:
    "SAI works across three divisions — environmental remediation, restoration and manpower; EXIM trade; and IT solutions — so the work, and the people we need, is varied.",
  areas: [
    {
      division: divisions[0],
      heading: "Site crews and supervision",
      body: "Skilled, semi-skilled and unskilled manpower for restoration, remediation, demolition and construction projects, with site supervision and EHS support.",
    },
    {
      division: divisions[1],
      heading: "Trade operations",
      body: "Sourcing, vendor verification, inspection, documentation and logistics coordination.",
    },
    {
      division: divisions[2],
      heading: "Technology",
      body: "Software engineering, frontend and backend development, AI/ML, UI/UX, data analytics and cloud development.",
    },
  ],
  vacancies: "No vacancies are listed on this page at the moment.",
  howTo: "To register your interest, send us a short note about your experience and the division you'd like to work in.",
  hint: "Tell us the role or trade you're interested in, your experience and where you're based.",
};

export const sectorsPage = {
  eyebrow: "Sectors",
  heading: "Sectors We Serve",
  intro: "Who each SAI division works with — from property owners and contractors to municipalities, smart cities and international buyers.",
  environmental: ["Residential properties", "Commercial properties", "Industrial properties", "Construction sites", "Offices and retail spaces"],
};

export const certificationsPage = {
  eyebrow: "Certifications",
  heading: "Certifications & Credentials",
  intro: "Independently awarded certifications held by SAI, and the credentials behind our technology capability.",
  teamHeading: "Technology team credentials",
  team: ["Certified Azure Developer capability.", "MNC software engineering experience."],
};

export const downloadsPage = {
  eyebrow: "Downloads",
  heading: "Downloads",
  intro: "Company documents for procurement, vendor onboarding and tenders.",
  status:
    "No documents are published for download yet. Request what you need — company information, certification details or a division capability overview — and we'll send the relevant documents directly.",
  requestable: ["Company information", "Certification details", "Division capability overview", "Vendor onboarding information"],
  hint: "List the documents you need and what they're for (e.g. vendor registration, a tender, internal approval).",
};

export const privacyPolicy = {
  eyebrow: "Legal",
  heading: "Privacy Policy",
  updated: "2026-09-14",
  sections: [
    {
      heading: "Who we are",
      body: [`This website is operated by SAI Sustainable Services Inc. (SAI Group). Questions about this policy can be sent to ${inbox}.`],
    },
    {
      heading: "What we collect",
      body: [
        "When you use an enquiry form we collect the details you enter: first and last name, telephone number, email address, your message, the division you selected, the type of enquiry and, where asked, your organisation.",
        "We do not ask for payment details, identity documents or passwords on this website.",
      ],
    },
    {
      heading: "How we use it",
      body: [
        "Enquiry details are used to respond to your enquiry, prepare quotes and follow up on the service you asked about. Your enquiry is delivered to our team by email through an email delivery provider.",
      ],
    },
    {
      heading: "Analytics",
      body: [
        "This website uses Google Analytics to understand how pages are used — for example which pages are visited and how visitors arrive. Google Analytics uses cookies and similar technologies. You can block these through your browser settings or Google's opt-out tools.",
      ],
    },
    {
      heading: "Sharing",
      body: ["We do not sell your personal information. We share it only with the service providers that operate this website and deliver enquiries, or where required by law."],
    },
    {
      heading: "Your choices",
      body: [`You can ask us to access, correct or delete the personal information you've sent us by emailing ${inbox}.`],
    },
    {
      heading: "Changes",
      body: ["We may update this policy. The date above shows when it last changed."],
    },
  ],
};

export const terms = {
  eyebrow: "Legal",
  heading: "Terms of Use",
  updated: "2026-09-14",
  sections: [
    {
      heading: "Using this website",
      body: ["This website provides general information about SAI Group and its divisions. By using it you agree to these terms."],
    },
    {
      heading: "Information only",
      body: [
        "Content on this website is general information, not professional advice for a specific site, shipment or project. Service scope, pricing and timelines are confirmed only in a written quote or agreement.",
      ],
    },
    {
      heading: "Quotes and enquiries",
      body: ["Submitting an enquiry does not create a contract. A quote becomes binding only when both parties agree to it in writing."],
    },
    {
      heading: "Intellectual property",
      body: ["Text, images, logos and design on this website belong to SAI Sustainable Services Inc. or its licensors and may not be reused without permission."],
    },
    {
      heading: "External links",
      body: ["Links to other websites, including client projects, are provided for reference. We are not responsible for their content."],
    },
    {
      heading: "Contact",
      body: [`Questions about these terms can be sent to ${inbox}.`],
    },
  ],
};
