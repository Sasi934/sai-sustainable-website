import Reveal from "@/components/ui/Reveal";
import MaskText from "@/components/motion/MaskText";
import { homepage } from "@/data/company";

/**
 * 02 — Quiet editorial passage. Deliberately the calmest block on the page:
 * it is what makes the division portals that follow land (§34).
 */
export default function Introduction() {
  return (
    <section className="bg-ivory py-[var(--section)] text-on-light">
      <div className="container grid gap-x-16 gap-y-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <MaskText as="h2" className="display text-h2">
            {homepage.statementHeading}
          </MaskText>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal delay={80}>
            <p className="eyebrow text-forest-600">{homepage.statementSub}</p>
          </Reveal>
          {homepage.introduction.map((para, i) => (
            <Reveal key={i} delay={140 + i * 90}>
              <p className="mt-7 text-lede leading-relaxed text-on-light-muted">
                {para}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
