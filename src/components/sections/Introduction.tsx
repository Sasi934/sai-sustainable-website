import Reveal from "@/components/ui/Reveal";
import MaskText from "@/components/motion/MaskText";
import { groupStatement } from "@/data/group";

/**
 * 02 — Group statement. The calmest block on the page: an editorial passage and
 * four plain facts, each a count of something stated elsewhere on the site.
 */
export default function Introduction() {
  return (
    <section aria-labelledby="group-statement" className="bg-ivory py-[var(--section)] text-on-light">
      <div className="container">
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow flex items-center gap-3 text-signal-ink">
              <span aria-hidden="true" className="h-px w-8 bg-signal-ink" />
              {groupStatement.eyebrow}
            </p>
            <div id="group-statement">
              <MaskText as="h2" className="display mt-5 max-w-[16ch] text-h1">
                {groupStatement.heading}
              </MaskText>
            </div>
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8 lg:pt-12">
            {groupStatement.body.map((para, i) => (
              <Reveal key={i} delay={120 + i * 90}>
                <p className={`${i === 0 ? "text-lede text-on-light" : "mt-6 text-on-light-muted"} leading-relaxed`}>
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        <dl className="mt-[clamp(3.5rem,7vw,6rem)] grid grid-cols-2 border-t border-line-light lg:grid-cols-4">
          {groupStatement.facts.map((f, i) => (
            <Reveal key={f.label} delay={i * 80} className="border-b border-line-light py-7 pr-6 lg:border-b-0">
              <dt className="sr-only">{f.label}</dt>
              <dd className="m-0">
                <span className="tnum block text-h1 font-semibold leading-none tracking-[-0.04em]">{f.value}</span>
                <span className="mt-3 block max-w-[24ch] text-[0.9rem] leading-snug text-on-light-muted" aria-hidden="true">
                  {f.label}
                </span>
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
