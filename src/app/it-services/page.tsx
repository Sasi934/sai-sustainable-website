import type { Metadata } from "next";
import CinematicHero from "@/components/sections/CinematicHero";
import SectionHeading from "@/components/sections/SectionHeading";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ITServicesGrid from "@/components/sections/it/ITServicesGrid";
import RoadDefectFeature from "@/components/sections/it/RoadDefectFeature";
import PortfolioAreas from "@/components/sections/it/PortfolioAreas";
import TagList from "@/components/sections/it/TagList";
import Partners from "@/components/sections/it/Partners";
import CTABand from "@/components/sections/CTABand";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import { getDivision } from "@/data/divisions";
import { itHero, itIntroStatement, itIndustries, itProcess, itTechStack } from "@/data/it-solutions";
import { itIntro, itDifference, itCapabilities, deliveryModel, offshoreTeam } from "@/data/it";
import { technologyTeam } from "@/data/team";
import { groupPrinciple } from "@/data/group";
import { partnersIntro } from "@/data/partners";

const division = getDivision("it");

// Path preserved: /it-services is a live URL. The division is now "IT Solutions".
export const metadata: Metadata = pageMeta({
  title: "IT Solutions — Web Development, Software, AI Solutions & AI Road Defect Detection",
  description:
    "SAI IT Solutions: web development, e-commerce and mobile app development, custom software, cloud and IT consulting, AI/ML, computer vision, AI road defect detection, smart city dashboards, data analytics, cybersecurity and AMC support.",
  path: division.href,
});

export default function Page() {
  return (
    <div data-division="it">
      <JsonLd data={serviceSchema(division.fullName, division.line, division.href, { division: division.href, areaServed: null })} />
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: division.name, path: division.href }])} />

      <CinematicHero copy={itHero} slot="it" />

      {/* Positioning */}
      <section aria-labelledby="it-positioning" className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow flex items-center gap-3 text-signal-ink">
              <span aria-hidden="true" className="h-px w-8 bg-signal-ink" />
              {itIntroStatement.eyebrow}
            </p>
            <h2 id="it-positioning" className="display mt-5 max-w-[18ch] text-h1">{itIntroStatement.heading}</h2>
          </Reveal>
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
            <Reveal delay={100}>
              <p className="text-lede leading-relaxed">{itIntro.body[0]}</p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 leading-relaxed text-on-light-muted">{itDifference.body}</p>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-10 border-l-2 border-signal-ink pl-5 font-semibold leading-snug">{itDifference.principle}</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services */}
      <section aria-labelledby="it-services-heading" className="bg-ink py-[var(--section)] text-on-dark">
        <div className="container">
          <SectionHeading id="it-services-heading" eyebrow="Services" heading="Thirteen service lines. One delivery team." onDark />
          <ITServicesGrid />
        </div>
      </section>

      <RoadDefectFeature eyebrow="Product" />

      {/* Technology partners — D-09 */}
      <section id="partners" aria-labelledby="it-partners" className="scroll-mt-20 bg-ivory-raised py-[var(--section)] text-on-light">
        <div className="container">
          <SectionHeading
            id="it-partners"
            eyebrow={partnersIntro.eyebrow}
            heading="Working with specialist technology partners."
            body={partnersIntro.intro}
            action={
              <Button href="/partners" variant="outline">
                All partner services
              </Button>
            }
          />
          <Partners />
        </div>
      </section>

      {/* Industries + tech stack */}
      <section aria-labelledby="it-industries" className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container grid gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading id="it-industries" eyebrow="Industries" heading="Industries we build for." stacked />
            <ul className="mt-10 grid grid-cols-1 border-t border-line-light sm:grid-cols-2 sm:gap-x-8">
              {itIndustries.map((ind, i) => (
                <Reveal as="li" key={ind.name} delay={i * 45} className="flex items-baseline gap-4 border-b border-line-light py-4">
                  <span className="tnum eyebrow text-on-light-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-semibold">{ind.name}</span>
                </Reveal>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Tech stack" heading="Proven, supportable technology." stacked />
            <div className="mt-10">
              <TagList label="Technology stack" items={itTechStack} />
            </div>
            <Reveal delay={120}>
              <p className="mt-8 max-w-[52ch] text-[0.95rem] leading-relaxed text-on-light-muted">
                {itIntro.capabilities.find((c) => c.includes("API integration"))}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section aria-labelledby="it-process" className="bg-ink py-[var(--section)] text-on-dark">
        <div className="container">
          <SectionHeading id="it-process" eyebrow="Process" heading="Seven steps from idea to running system." onDark />
          <ProcessSteps steps={itProcess} onDark />
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" aria-labelledby="it-portfolio" className="scroll-mt-20 bg-ivory-raised py-[var(--section)] text-on-light">
        <div className="container">
          <SectionHeading
            id="it-portfolio"
            eyebrow="Portfolio & case studies"
            heading="Delivered, piloting, and ready to build."
            action={
              <Button href={`${division.href}/work`} variant="outline">
                Read the case studies
              </Button>
            }
          />
          <PortfolioAreas />
        </div>
      </section>

      {/* Capability areas — approved vocabulary (CONTENT-LOCK §10) */}
      <section aria-labelledby="it-capabilities" className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <SectionHeading id="it-capabilities" eyebrow="Capability areas" heading="What the team works with." />
          <ul className="mt-14 grid gap-px bg-line-light sm:grid-cols-2 lg:grid-cols-4">
            {itCapabilities.map((c, i) => (
              <Reveal as="li" key={c.area} delay={i * 50} className="bg-ivory p-7">
                <h3 className="text-lede font-semibold">{c.area}</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {c.items.map((item) => (
                    <li key={item} className="text-[0.9rem] leading-snug text-on-light-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Delivery model + team */}
      <section id="delivery" aria-labelledby="it-delivery" className="bg-ink py-[var(--section)] text-on-dark">
        <div className="container">
          <SectionHeading id="it-delivery" eyebrow="Delivery model" heading="Canada leads. Offshore scales." body={offshoreTeam.body} onDark />

          <div className="mt-14 grid gap-px bg-line-dark lg:grid-cols-2">
            {deliveryModel.map((m, i) => (
              <Reveal as="div" key={m.label} delay={i * 110} className="bg-ink p-8 lg:p-10">
                <p className="eyebrow text-signal">{m.label}</p>
                <h3 className="mt-4 text-h3 font-semibold tracking-[-0.02em]">{m.title}</h3>
                <ul className="mt-7 flex flex-col gap-3">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[0.95rem] text-on-dark-muted">
                      <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-signal" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <h3 className="eyebrow mt-20 text-on-dark-faint">{offshoreTeam.heading}</h3>
          <ul className="mt-6 flex flex-col border-t border-line-dark">
            {technologyTeam.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 90} className="border-b border-line-dark py-9">
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <p className="text-h3 font-semibold tracking-[-0.02em]">{p.name}</p>
                    <p className="eyebrow mt-3 text-signal">{p.role}</p>
                  </div>
                  <p className="leading-relaxed text-on-dark-muted lg:col-span-5">{p.bio}</p>
                  <ul className="flex flex-col gap-2 lg:col-span-3">
                    {p.skills?.map((s) => (
                      <li key={s} className="text-[0.88rem] leading-snug text-on-dark-faint">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTABand
        heading={groupPrinciple}
        body="Tell us what the business needs to do, and we'll work back from there."
        cta={itHero.actions[0].label}
        href={itHero.actions[0].href}
      />
    </div>
  );
}
