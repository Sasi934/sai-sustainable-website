import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import CinematicHero from "@/components/sections/CinematicHero";
import SectionHeading from "@/components/sections/SectionHeading";
import Credentials from "@/components/sections/Credentials";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { getDivision } from "@/data/divisions";
import { environmentalHero, environmentalServiceGroups, environmentalPages, atlanticRoutes } from "@/data/environmental";
import { contact } from "@/data/company";

const division = getDivision("environmental");

export const metadata: Metadata = pageMeta({
  title: "Environmental, Restoration & Manpower — Asbestos Abatement, Mold Remediation & Manpower Supply",
  description:
    "SAI Environmental, Restoration & Manpower: asbestos abatement services, lead removal, mold remediation, water damage and fire restoration, 24/7 emergency response and construction manpower supply.",
  path: division.href,
  image: "/img/untitled-design-AMqnRjrGOncj2VPn.png",
});

export default function Page() {
  const emergency = contact.phones.find((p) => p.emergency)!;

  return (
    <div data-division="environmental">
      <JsonLd data={serviceSchema(division.fullName, division.line, division.href, { division: division.href })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: division.name, path: division.href }])} />

      <CinematicHero copy={environmentalHero} slot="environmental" size="tall" />

      {/* Services, grouped */}
      <section aria-labelledby="env-services" className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <SectionHeading
            id="env-services"
            eyebrow="Services"
            heading="Remediation, restoration and the people to deliver it."
            action={
              <Button href={emergency.href}>
                {`24/7 — ${emergency.number}`}
              </Button>
            }
          />

          <div className="mt-14 grid gap-px bg-line-light lg:grid-cols-3">
            {environmentalServiceGroups.map((g, gi) => (
              <Reveal key={g.name} delay={gi * 100} className="bg-ivory">
                <section aria-labelledby={`env-g-${gi}`} className="h-full p-6 lg:p-8">
                  <p className="tnum eyebrow text-signal-ink">{String(gi + 1).padStart(2, "0")}</p>
                  <h3 id={`env-g-${gi}`} className="mt-3 text-h3 font-semibold tracking-[-0.02em]">{g.name}</h3>
                  <ul className="mt-6 flex flex-col border-t border-line-light">
                    {g.items.map((item) => (
                      <li key={item.name} className="border-b border-line-light">
                        {item.href ? (
                          <Link href={item.href} className="group block py-4">
                            <span className="flex items-baseline justify-between gap-4 font-semibold transition-colors group-hover:text-signal-ink">
                              {item.name}
                              <span aria-hidden="true" className="text-signal-ink transition-transform duration-500 ease-luxe group-hover:translate-x-1">&rarr;</span>
                            </span>
                            {item.body && <span className="mt-1.5 line-clamp-3 block text-[0.9rem] leading-relaxed text-on-light-muted">{item.body}</span>}
                          </Link>
                        ) : (
                          <span className="block py-3 text-[0.95rem] text-on-light-muted">{item.name}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sub-pages */}
      <section aria-labelledby="env-explore" className="bg-ink py-[var(--section)] text-on-dark">
        <div className="container">
          <SectionHeading id="env-explore" eyebrow={division.fullName} heading="Explore the division." onDark />
          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {environmentalPages.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 50}>
                <Link href={`${division.href}/${p.slug}`} className="group flex h-full flex-col border border-line-dark transition-colors duration-500 hover:border-signal">
                  {p.image && (
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={p.image}
                        alt={p.imageAlt ?? ""}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover opacity-80 transition-all duration-[1200ms] ease-luxe group-hover:scale-[1.04] group-hover:opacity-100"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lede font-semibold tracking-[-0.01em] transition-colors group-hover:text-signal">{p.name}</h3>
                    <p className="mt-2 line-clamp-2 text-[0.9rem] leading-relaxed text-on-dark-muted">{p.metaDescription}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <Credentials />

      {/* Preserved Atlantic Canada routes — these carry the local-search rankings. */}
      <section aria-labelledby="env-atlantic" className="bg-ivory-raised py-[var(--section)] text-on-light">
        <div className="container">
          <SectionHeading
            id="env-atlantic"
            eyebrow="Atlantic Canada"
            heading="Halifax, Dartmouth and across Nova Scotia, New Brunswick & PEI."
          />
          <ul className="mt-12 grid gap-px bg-line-light sm:grid-cols-2 lg:grid-cols-5">
            {atlanticRoutes.map((r, i) => (
              <Reveal as="li" key={r.href} delay={i * 60} className="bg-ivory-raised">
                <Link href={r.href} className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-ivory">
                  <span className="font-semibold leading-snug group-hover:text-signal-ink">{r.name}</span>
                  <span aria-hidden="true" className="text-signal-ink transition-transform duration-500 ease-luxe group-hover:translate-x-1.5">&rarr;</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
