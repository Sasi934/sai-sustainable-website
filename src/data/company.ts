/**
 * APPROVED CONTENT — do not edit wording.
 * Source: live saisustainable.com crawl, 2026-09-10. See docs/CONTENT-LOCK.md.
 * The only sanctioned deviations from source are the four D-04 spelling corrections,
 * marked inline below.
 */

export const company = {
  legalName: "SAI Sustainable Services Inc.",
  shortName: "SAI",
  // Homepage H1 renders without the trailing period, exactly as published.
  displayName: "SAI Sustainable Services Inc",
  tagline: "Restoration • Abatement • Construction Complete Solutions for Every Project",
  announcement:
    "Contact us for Professional Property Restoration, Abatement, Construction and Complete renovation solutions for all your Commercial and Residential needs.",
  copyright:
    "© 2026 SAI Sustainable Services Inc. Working towards a sustainable tomorrow, TODAY",
  headquarters: "Dartmouth, Nova Scotia", // D-04: source read "Darmouth"
  serviceArea: "Atlantic Canada",
  serviceRegions: "Nova Scotia, New Brunswick & PEI",
} as const;

/**
 * Opening title sequence.
 *
 * ⚠️ NOT FROM AN APPROVED SOURCE. "SAI GROUPS" appears in neither the live site
 * nor SAI_Experience_Web Dev.docx — both name the company "SAI Sustainable
 * Services Inc." This wording was directed by SAI on 2026-09-11 and is recorded
 * here rather than in CONTENT-LOCK.md for exactly that reason.
 *
 * The caption is a variation on the approved homepage tagline
 * ("Restoration • Abatement • Construction"), with the middle term changed to
 * name the IT division — directed by SAI 2026-09-11. It names the three
 * divisions rather than the environmental services alone, which is consistent
 * with "SAI GROUPS" reading as the parent brand. Also not source-approved.
 */
export const intro = {
  title: "SAI GROUPS",
  caption: "Restoration • IT Sector • Construction",
  /** Total time the overlay holds before it clears, in seconds. */
  duration: 1.6,
} as const;

export const contact = {
  phones: [
    { number: "+1(902) 452-7600", href: "tel:+19024527600", primary: true, emergency: true },
    { number: "+1(902) 304-7934", href: "tel:+19023047934", primary: false, emergency: false },
    { number: "+1(782) 409-2347", href: "tel:+17824092347", primary: false, emergency: false },
  ],
  emails: [
    { address: "info@saisustainable.com", href: "mailto:info@saisustainable.com" },
    { address: "akatta@saisustainable.com", href: "mailto:akatta@saisustainable.com" },
    { address: "dkhanna@saisustainable.com", href: "mailto:dkhanna@saisustainable.com" },
    { address: "Sales@saisustainable.com", href: "mailto:Sales@saisustainable.com" },
  ],
  hours: [
    { days: "Monday to Saturday", time: "8 am - 5 pm" },
    { days: "Sunday", time: "Closed" },
  ],
  /**
   * D-05 RESOLVED 2026-09-11 — SAI confirmed +1(902) 452-7600 is the 24/7
   * emergency line. The office hours below describe the other two numbers, so
   * the "24/7 emergency response" claim and "Mon–Sat 8–5" no longer contradict
   * each other: they describe different lines.
   */
  emergencyLineConfirmed: true,
} as const;

/** Independently awarded. Verified from the badge artwork, not inferred. */
export const certifications = [
  {
    name: "IICRC Certified Firm",
    issuer: "Institute of Inspection, Cleaning and Restoration Certification",
    image: "/img/certifiedfirmlogohighresolution-aWNeFZzkORmBt0me.jpg",
    alt: "IICRC Certified Firm seal",
  },
  {
    name: "Safety Certified",
    issuer: "Workers' Compensation Board of Nova Scotia",
    image: "/img/wcb-safety-certified-logo_colour-jpg-hHwe772Ve8NizeT9.jpg",
    alt: "Workers' Compensation Board of Nova Scotia Safety Certified seal",
  },
] as const;

export const homepage = {
  heroHeading: company.displayName,
  heroTagline: company.tagline,
  statementHeading:
    "Your Trusted Partner For All Restoration, Abatement and Full Service Renovations",
  statementSub:
    "Serving Atlantic Canada with certified and skilled professionals and labour",
  introduction: [
    // D-04: "head quartered in Darmouth" → "headquartered in Dartmouth"
    "At SAI Sustainable Services Inc., we bring experience, safety, and sustainability to every job. From hazardous material abatement and waste disposal to property restoration, renovations, and construction — headquartered in Dartmouth, Nova Scotia, our team provides reliable, professional, and compliant solutions throughout Atlantic Canada.",
    "Whether you need a home rebuilt, a site cleaned up, or hazardous materials safely removed, SAI delivers quality workmanship and peace of mind.",
  ],
  estimateHeading: "Call us today for free estimate",
  /** Source prefixes each with an emoji; dropped per §5 in favour of typographic marks. */
  capabilities: [
    { title: "Renovation & Construction", body: "Full-service residential and commercial renovations, including kitchens, bathrooms, basements, and full rebuilds." },
    { title: "Asbestos, Mold & Lead Abatement", body: "Safe and certified removal of hazardous materials." },
    { title: "Water & Fire Restoration", body: "Cleanup and repair after flood, fire, or smoke damage." },
    { title: "Trauma Scene Cleanup & Disposal", body: "Professional and discreet cleanup services." },
    { title: "Waste & Junk Removal", body: "Household, construction, and hazardous waste disposal." },
    { title: "Demolition & Site Cleanup", body: "Interior and exterior demolition with waste management." },
    { title: "Labor Support", body: "Trained laborers for restoration, renovation, and cleanup projects." },
  ],
  whyHeading: "Why Choose Us:",
  why: [
    "Fully insured & certified team",
    "Environmentally responsible disposal",
    "24/7 emergency response",
    "Serving Nova Scotia, New Brunswick & PEI",
  ],
  capture: {
    prompt: "Please enter your email address below, and we'll reach out to you with more information",
    label: "Email address",
    submit: "Submit",
  },
} as const;
