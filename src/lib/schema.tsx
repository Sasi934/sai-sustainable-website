import { SITE_URL, SITE_NAME } from "./site";
import { company, contact, certifications } from "@/data/company";
import { serviceGroups } from "@/data/services";

/**
 * Structured data the current site does not have. For a local services business
 * this is the highest-value SEO work available (survey §15).
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    description: company.announcement,
    telephone: contact.phones.map((p) => p.number),
    contactPoint: contact.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.number,
      contactType: p.emergency ? "emergency" : "customer service",
      areaServed: ["CA-NS", "CA-NB", "CA-PE"],
      availableLanguage: "English",
      ...(p.emergency
        ? {
            hoursAvailable: {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday", "Tuesday", "Wednesday", "Thursday",
                "Friday", "Saturday", "Sunday",
              ],
              opens: "00:00",
              closes: "23:59",
            },
          }
        : {}),
    })),
    email: contact.emails[0].address,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dartmouth",
      addressRegion: "NS",
      addressCountry: "CA",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Nova Scotia" },
      { "@type": "AdministrativeArea", name: "New Brunswick" },
      { "@type": "AdministrativeArea", name: "Prince Edward Island" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "17:00",
      },
    ],
    hasCredential: certifications.map((c) => ({
      "@type": "EducationalOccupationalCredential",
      name: c.name,
      credentialCategory: "certification",
      recognizedBy: { "@type": "Organization", name: c.issuer },
    })),
    makesOffer: serviceGroups.flatMap((g) =>
      g.services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, description: s.summary },
      })),
    ),
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "AdministrativeArea", name: "Atlantic Canada" },
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${SITE_URL}${t.path}`,
    })),
  };
}

export function articleSchema(p: {
  title: string;
  description: string;
  date: string;
  slug: string;
  cover: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.description,
    datePublished: p.date,
    image: `${SITE_URL}${p.cover}`,
    url: `${SITE_URL}/${p.slug}`,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

/**
 * Structured data must land in the prerendered HTML so crawlers that do not
 * execute JavaScript still see it — which rules out next/script's client
 * strategies. `beforeInteractive` is not permitted outside the root layout and
 * warns on client-side navigation, so this stays a plain server-rendered tag,
 * which is the pattern the Next.js docs use.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
