/** APPROVED CONTENT — About and Contact page copy. See docs/CONTENT-LOCK.md. */

export const about = {
  heading: "About Us",
  welcome: "Welcome to SAI Sustainable Services Inc.",
  /**
   * D-02 RESOLVED 2026-09-11 — SAI directed that the waste-management narrative
   * be removed. It contradicted the restoration/abatement/construction
   * positioning carried everywhere else on the site.
   *
   * The original approved text is NOT deleted from the project: it remains in
   * docs/CONTENT-LOCK.md and docs/source-live-site-crawl.txt. Restoring it is a
   * matter of moving those paragraphs back into this array.
   */
  body: [] as string[],
  ctaHeading: "Start Your Sustainable Journey",
  ctaBody:
    "Contact SAI Sustainable Services Inc. today for a free consultation and discover how our waste management solutions can transform your home or business.",
  ctaLabel: "Get A Quote",
} as const;

export const contactPage = {
  heading: "Contact Us",
  subheading: "Get in Touch with SAI Sustainable Services Inc.",
  body: [
    "At SAI Sustainable Services Inc., customer satisfaction is at the heart of everything we do. We understand that the success of our business is directly tied to the satisfaction and trust of our clients. That's why we are committed to delivering exceptional service and value in every interaction.",
    "We value your interest in SAI Sustainable Services Inc. and are here to assist you with all your waste management needs. Whether you have questions about our services, need a consultation, or want to request a quote, our team is ready to help. Please use the contact information provided below or fill out the contact form, and we will get back to you promptly.",
  ],
  quoteHeading: "GET A QUOTE",
  closing:
    "Feel free to reach out to us with any questions or concerns. We look forward to partnering with you for all your environmental waste management solutions. Thank you for considering SAI Sustainable Services Inc. for your environmental needs.",
  /** Field labels exactly as published. */
  form: {
    name: "Name",
    lastName: "Last name",
    telephone: "Telephone number",
    email: "Your email",
    message: "Message",
    submit: "Submit",
  },
} as const;

/**
 * Visitors identify which division they need. Values are the DivisionKey set
 * (brief 2026-09-14). "construction" enquiries now route to environmental, the
 * division that owns the preserved renovation and demolition pages.
 */
export const enquiryDivisions = [
  { value: "environmental", label: "Environmental, Restoration & Manpower" },
  { value: "exim", label: "EXIM" },
  { value: "it", label: "IT Solutions" },
] as const;

/**
 * Enquiry intents that deep links can pre-select via `?type=`. The label is what
 * lands in the email subject, so SAI can triage without opening the message.
 */
export const enquiryTypes = {
  quote: "Quote request",
  "site-survey": "Site survey request",
  manpower: "Manpower hire",
  emergency: "Emergency",
  consultation: "Free consultation",
  demo: "Demo request",
  supplier: "Supplier registration",
  careers: "Careers enquiry",
  documents: "Document request",
} as const;

export type EnquiryType = keyof typeof enquiryTypes;
