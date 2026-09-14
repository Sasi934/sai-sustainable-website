import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/ui/Reveal";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { certificationsPage } from "@/data/group-pages";
import { certifications } from "@/data/company";

export const metadata: Metadata = pageMeta({
  title: "Certifications — IICRC Certified Firm & WCB Nova Scotia Safety Certified",
  description:
    "SAI is an IICRC Certified Firm and Safety Certified by the Workers' Compensation Board of Nova Scotia, with Certified Azure Developer capability in its technology team.",
  path: "/certifications",
});

export default function Page() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Certifications", href: "/certifications" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <PageHero
        eyebrow={certificationsPage.eyebrow}
        heading={certificationsPage.heading}
        intro={certificationsPage.intro}
        image="/img/pexels-sonny-13364320.jpg-yDcZzkFW4Txe5xwc.jpeg"
        imageAlt="Asbestos hazard warning tape across a site fence"
        crumbs={crumbs}
      />

      <section data-division="environmental" aria-labelledby="cert-list" className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <h2 id="cert-list" className="eyebrow text-signal-ink">Independently awarded</h2>
          <ul className="mt-8 grid gap-px bg-line-light md:grid-cols-2">
            {certifications.map((c, i) => (
              <Reveal as="li" key={c.name} delay={i * 100} className="bg-ivory">
                <div className="flex items-center gap-7 p-7 lg:p-10">
                  <Image src={c.image} alt={c.alt} width={112} height={112} className="h-24 w-24 shrink-0 rounded-full object-contain" />
                  <div>
                    <h3 className="text-h3 font-semibold tracking-[-0.02em]">{c.name}</h3>
                    <p className="mt-2 text-on-light-muted">{c.issuer}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section data-division="it" aria-labelledby="cert-team" className="bg-ink py-[clamp(4rem,8vw,6rem)] text-on-dark">
        <div className="container grid gap-8 lg:grid-cols-12">
          <h2 id="cert-team" className="eyebrow text-signal lg:col-span-4">{certificationsPage.teamHeading}</h2>
          <ul className="border-t border-line-dark lg:col-span-7 lg:col-start-6">
            {certificationsPage.team.map((t) => (
              <li key={t} className="border-b border-line-dark py-4 text-lede">{t}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
