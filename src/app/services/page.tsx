import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import CTABand from "@/components/sections/CTABand";
import Reveal from "@/components/ui/Reveal";
import Capabilities from "@/components/sections/Capabilities";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { serviceGroups } from "@/data/services";

export const metadata: Metadata = pageMeta({
  title: "Renovation and Remodelling Halifax Dartmouth Abatement, Demolition, Hazard Clean Up",
  description:
    "Transform your space with expert renovation solutions tailored to your needs. From kitchens and bathrooms to offices and retail spaces, we deliver quality craftsmanship and lasting value. Offering renovation and remodelling in Halifax Dartmouth and all across Atlantic Canada",
  path: "/services",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ])}
      />

      <PageHero
        eyebrow="SAI Group — full capability index"
        heading="Services"
        intro="Every service across SAI's three divisions: Environmental, Restoration & Manpower; EXIM; and IT Solutions."
        image="/img/halifax-best-renovation-services-EuIl7Xm2IAvPdX3H.jpg"
        imageAlt="Interior stripped back to framing mid-renovation"
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />

      <Capabilities />

      {/* Preserved: the fifteen Atlantic Canada services this URL ranks for. */}
      <section data-division="environmental" aria-labelledby="atlantic-services" className="border-t border-line-light bg-ivory py-[var(--section)] text-on-light">
        <div className="container flex flex-col gap-[clamp(3.5rem,7vw,5.5rem)]">
          <Reveal>
            <p className="eyebrow text-signal-ink">Environmental, Restoration & Manpower — Atlantic Canada</p>
            <h2 id="atlantic-services" className="display mt-4 max-w-[24ch] text-h2">
              Abatement, restoration, waste, demolition and renovation in Halifax, Dartmouth and across Atlantic Canada.
            </h2>
          </Reveal>
          {serviceGroups.map((g, gi) => (
            <Reveal key={g.slug} delay={gi * 60}>
              <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
                <div className="lg:col-span-4">
                  <p className="eyebrow text-signal-ink">
                    {String(gi + 1).padStart(2, "0")}
                  </p>
                  <h3 className="display mt-3 text-h3">
                    <Link href={g.path} className="transition-colors hover:text-signal-ink">
                      {g.name}
                    </Link>
                  </h3>
                  <p className="mt-5 max-w-[40ch] text-[0.95rem] leading-relaxed text-on-light-muted">
                    {g.intro}
                  </p>
                </div>

                <ul className="lg:col-span-7 lg:col-start-6">
                  {g.services.map((s) => (
                    <li key={s.slug} className="border-b border-line-light py-5 first:border-t">
                      <h4 className="text-lede font-semibold">{s.name}</h4>
                      <p className="mt-2 max-w-[62ch] text-[0.95rem] leading-relaxed text-on-light-muted">
                        {s.summary}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand
        heading="Call us today for free estimate"
        body="Tell us which service you need and we'll get straight back to you."
        cta="Get a quote"
      />
    </>
  );
}
