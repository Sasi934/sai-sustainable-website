import type { Metadata } from "next";
import Link from "next/link";
import CinematicHero from "@/components/sections/CinematicHero";
import SectionHeading from "@/components/sections/SectionHeading";
import ProcessSteps from "@/components/sections/ProcessSteps";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { getDivision } from "@/data/divisions";
import { eximHero, eximIntro, eximServices, eximCategories, eximSequence } from "@/data/exim";

const division = getDivision("exim");

export const metadata: Metadata = pageMeta({
  title: "EXIM — Global Sourcing, Import Export & Logistics Coordination",
  description:
    "SAI EXIM: import and export of goods, global sourcing, vendor verification, product inspection and quality checks, customs documentation and logistics coordination for international trade.",
  path: division.href,
});

export default function Page() {
  return (
    <div data-division="exim">
      <JsonLd data={serviceSchema(division.fullName, division.line, division.href, { division: division.href, areaServed: null })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: division.name, path: division.href }])} />

      <CinematicHero copy={eximHero} slot="exim" size="tall" />

      <section aria-labelledby="exim-intro" className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-signal-ink">
              <span aria-hidden="true" className="h-px w-8 bg-signal-ink" />
              {eximIntro.eyebrow}
            </p>
            <h2 id="exim-intro" className="display mt-5 max-w-[18ch] text-h1">{eximIntro.heading}</h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5 lg:self-end">
            <p className="text-lede leading-relaxed text-on-light-muted">{eximIntro.body}</p>
          </Reveal>
        </div>
      </section>

      <section id="services" aria-labelledby="exim-services" className="scroll-mt-20 bg-ink py-[var(--section)] text-on-dark">
        <div className="container">
          <SectionHeading
            id="exim-services"
            eyebrow="Services"
            heading="Eight services, one trade partner."
            onDark
            action={
              <Button href={eximHero.actions[0].href} onDark>
                {eximHero.actions[0].label}
              </Button>
            }
          />
          <ul className="mt-14 grid gap-px bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
            {eximServices.map((s, i) => (
              <Reveal as="li" key={s.name} delay={i * 50} className="bg-ink p-6 lg:p-7">
                <span className="tnum eyebrow text-signal">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-[1.1rem] font-semibold tracking-[-0.01em]">{s.name}</h3>
                <p className="mt-2.5 text-[0.92rem] leading-relaxed text-on-dark-muted">{s.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="exim-sequence" className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <SectionHeading id="exim-sequence" eyebrow="How it runs" heading="From requirement to delivery." />
          <ProcessSteps steps={eximSequence} columns={6} />
        </div>
      </section>

      <section id="categories" aria-labelledby="exim-categories" className="scroll-mt-20 bg-ivory-raised py-[var(--section)] text-on-light">
        <div className="container">
          <SectionHeading id="exim-categories" eyebrow="Products" heading="What we source and trade." />
          <ul className="mt-14 grid gap-px bg-line-light sm:grid-cols-2 lg:grid-cols-3">
            {eximCategories.map((c, i) => (
              <Reveal as="li" key={c.name} delay={i * 60} className="bg-ivory-raised">
                <div className="flex h-full flex-col p-7 lg:p-9">
                  <span aria-hidden="true" className="h-px w-10 bg-highlight" />
                  <h3 className="mt-6 text-h3 font-semibold tracking-[-0.02em]">{c.name}</h3>
                  <p className="mt-3 leading-relaxed text-on-light-muted">{c.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="exim-cta" className="bg-ink py-[clamp(4rem,8vw,7rem)] text-on-dark">
        <div className="container grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow text-signal">Buyers</p>
            <h2 id="exim-cta" className="display mt-4 text-h2">Need goods sourced, imported or exported?</h2>
            <div className="mt-8">
              <Button href={eximHero.actions[0].href} onDark>{eximHero.actions[0].label}</Button>
            </div>
          </Reveal>
          <Reveal delay={120} className="border-t border-line-dark pt-10 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            <p className="eyebrow text-signal">Suppliers</p>
            <p className="mt-4 text-h3 font-semibold leading-tight tracking-[-0.02em]">Manufacturers and distributors can register to supply SAI EXIM.</p>
            <div className="mt-8">
              <Button href={eximHero.actions[1].href} variant="outline" onDark>{eximHero.actions[1].label}</Button>
            </div>
            <p className="mt-6 text-[0.9rem] text-on-dark-muted">
              Or see <Link href="/sectors" className="underline underline-offset-4 hover:text-signal">sectors we serve</Link>.
            </p>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
