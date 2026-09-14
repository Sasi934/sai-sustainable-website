import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import SectionHeading from "./SectionHeading";
import ITServicesGrid from "./it/ITServicesGrid";
import TagList from "./it/TagList";
import { itHero, itIndustries, itTechStack, itIntroStatement } from "@/data/it-solutions";
import { IT_BASE } from "@/data/divisions";
import Link from "next/link";
import { partners } from "@/data/partners";

/**
 * 04 — IT Solutions, featured. The largest division block on the homepage and
 * the only one that lists every service line: the strategic focus is shown in
 * space and depth, not just stated.
 */
export default function ITPreview() {
  return (
    <section data-division="it" aria-labelledby="it-featured" className="relative overflow-hidden bg-ink py-[var(--section)] text-on-dark">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_45%_at_12%_0%,var(--hero-glow)_0%,transparent_70%)]" />
      <div className="container relative">
        <SectionHeading
          id="it-featured"
          eyebrow="SAI IT Solutions — strategic focus"
          heading={itHero.heading}
          body={itIntroStatement.body}
          size="h1"
          onDark
          action={
            <Button href={IT_BASE} onDark>
              Explore IT Solutions
            </Button>
          }
        />

        <ITServicesGrid />

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h3 className="eyebrow text-on-dark-faint">Industries we serve</h3>
            <div className="mt-5">
              <TagList label="Industries" items={itIndustries.map((i) => i.name)} onDark />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <h3 className="eyebrow text-on-dark-faint">Technology</h3>
            <div className="mt-5">
              <TagList label="Technology stack" items={itTechStack} onDark />
            </div>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <p className="mt-12 text-[0.92rem] text-on-dark-muted">
            <span className="eyebrow mr-3 text-on-dark-faint">Technology partners</span>
            {partners.map((p, i) => (
              <span key={p.slug}>
                <Link href={`/partners#${p.slug}`} className="font-medium text-on-dark underline-offset-4 hover:text-signal hover:underline">
                  {p.name}
                </Link>
                {i < partners.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </Reveal>

        <Reveal delay={150}>
          <p className="mt-16 max-w-[40ch] border-l-2 border-signal pl-6 text-h3 font-medium leading-snug tracking-[-0.02em]">
            {itIntroStatement.principle}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
