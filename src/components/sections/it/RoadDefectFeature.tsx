import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import HeroImage, { hasDetections } from "@/components/visual/HeroImage";
import SectionHeading from "@/components/sections/SectionHeading";
import { roadDefect, itHero } from "@/data/it-solutions";

/**
 * AI Road Defect Detection — the division's product, given its own full band.
 * Left: the road photograph with live-drawn detections. Right: what it finds and
 * who it is for. Everything readable is HTML; the overlay is decoration.
 */
export default function RoadDefectFeature({
  eyebrow = roadDefect.eyebrow,
  heading = roadDefect.heading,
  body = roadDefect.intro,
  showCta = true,
}: {
  eyebrow?: string;
  heading?: string;
  body?: string;
  showCta?: boolean;
}) {
  return (
    <section data-division="it" aria-labelledby="road-defect-heading" className="relative overflow-hidden bg-ink py-[var(--section)] text-on-dark">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_10%,var(--hero-glow)_0%,transparent_70%)]" />
      <div className="container relative">
        <SectionHeading
          id="road-defect-heading"
          eyebrow={eyebrow}
          heading={heading}
          body={body}
          onDark
        />

        {/* D-09 — the platform is a partner's; say so plainly, next to the heading. */}
        <Reveal delay={80}>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 border-l-2 border-signal pl-4 text-[0.92rem] text-on-dark-muted">
            <span className="eyebrow text-on-dark-faint">{roadDefect.partner.label}</span>
            <a
              href={roadDefect.partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-on-dark underline-offset-4 hover:text-signal hover:underline"
            >
              {roadDefect.partner.long}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <Reveal className="lg:col-span-7">
            <figure>
              <div className="relative aspect-[16/10] overflow-hidden border border-line-dark">
                <HeroImage slot="road" overlay="full" sizes="(max-width: 1024px) 100vw, 58vw" />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-ink/80 to-transparent" />
                <ol aria-label="How detection works" className="absolute inset-x-0 bottom-0 flex flex-wrap gap-x-5 gap-y-1 p-5">
                  {roadDefect.pipeline.map((step, i) => (
                    <li key={step} className="eyebrow text-[0.66rem] text-on-dark">
                      <span className="tnum text-signal">{String(i + 1).padStart(2, "0")}</span> {step}
                    </li>
                  ))}
                </ol>
              </div>
              {hasDetections("road") && (
                <figcaption className="mt-3 text-[0.8rem] text-on-dark-faint">
                  Illustrative detections: potholes, cracks, patches, lane lines and GPS points.
                </figcaption>
              )}
            </figure>
          </Reveal>

          <div className="lg:col-span-5">
            <Reveal>
              <h3 className="eyebrow text-on-dark-faint">Detects</h3>
              <ul className="mt-2 grid grid-cols-2 gap-x-6 sm:grid-cols-3 lg:grid-cols-2">
                {roadDefect.detects.map((d) => (
                  <li key={d.name} className="border-t border-line-dark py-4">
                    <p className="font-semibold">{d.name}</p>
                    <p className="mt-1 text-[0.82rem] leading-snug text-on-dark-muted">{d.body}</p>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100}>
              <h3 className="eyebrow mt-10 text-on-dark-faint">Built for</h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {roadDefect.users.map((u) => (
                  <li key={u.name} className="rounded-[2px] border border-line-dark px-3 py-1.5 text-[0.84rem]">
                    {u.body ? <abbr title={u.body} className="no-underline">{u.name}</abbr> : u.name}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>

        <h3 className="eyebrow mt-16 text-on-dark-faint">System capabilities</h3>
        <div className="mt-5 grid gap-x-10 gap-y-10 lg:grid-cols-3">
          {(["Capture", "Analyse", "Act"] as const).map((stage, si) => (
            <Reveal key={stage} delay={60 + si * 90}>
              <h4 className="flex items-center gap-3 text-lede font-semibold">
                <span className="tnum eyebrow text-signal">{String(si + 1).padStart(2, "0")}</span>
                {stage}
              </h4>
              <ul className="mt-4 border-t border-line-dark">
                {roadDefect.capabilities
                  .filter((c) => c.stage === stage)
                  .map((c) => (
                    <li key={c.name} className="border-b border-line-dark py-3.5">
                      <p className="font-semibold leading-snug">{c.name}</p>
                      <p className="mt-1 text-[0.86rem] leading-snug text-on-dark-muted">{c.body}</p>
                    </li>
                  ))}
              </ul>
            </Reveal>
          ))}
        </div>

        {showCta && (
          <Reveal delay={120}>
            <div className="mt-12 flex flex-wrap gap-3 sm:gap-4">
              <Button href={itHero.actions[1].href} onDark>
                {itHero.actions[1].label}
              </Button>
              <Button href="/it-services/ai-road-defect-detection" variant="outline" onDark>
                Explore the product
              </Button>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
