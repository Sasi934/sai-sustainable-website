import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import Partners from "@/components/sections/it/Partners";
import CTABand from "@/components/sections/CTABand";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { partners, partnersIntro } from "@/data/partners";
import { itHero } from "@/data/it-solutions";

export const metadata: Metadata = pageMeta({
  title: "Technology Partners — IRIS by DigiInfra & Sharajman Technologies",
  description:
    "SAI IT Solutions works with DigiInfra (IRIS, the Intelligent Road Inspection System) on AI road defect detection, and with Sharajman Technologies on AI, software, cloud, business automation and data services.",
  path: "/partners",
});

export default function Page() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "IT Solutions", href: "/it-services" },
    { name: "Partners", href: "/partners" },
  ];

  return (
    <div data-division="it">
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "SAI technology partners",
          url: `${SITE_URL}/partners`,
          itemListElement: partners.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Organization", name: p.legalName, alternateName: p.name, url: p.url, description: p.summary },
          })),
        }}
      />

      <PageHero eyebrow={partnersIntro.eyebrow} heading={partnersIntro.heading} intro={partnersIntro.intro} slot="it" crumbs={crumbs} />

      <section className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <Partners variant="full" />
        </div>
      </section>

      <CTABand
        heading="One conversation, the right team behind it."
        body="Tell us what you need built or inspected, and we'll bring in the right partner."
        cta={itHero.actions[0].label}
        href={itHero.actions[0].href}
      />
    </div>
  );
}
