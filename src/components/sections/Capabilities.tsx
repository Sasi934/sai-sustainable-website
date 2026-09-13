import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import MaskText from "@/components/motion/MaskText";
import { homepage } from "@/data/company";

/**
 * 04 — The seven approved capability lines, set as an editorial index rather
 * than a card grid. Source prefixes each with an emoji; replaced with numbering
 * because the list is a set of seven, and the count is the point.
 */
export default function Capabilities() {
  return (
    <section className="bg-ivory py-[var(--section)] text-on-light">
      <div className="container">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-forest-600">What we do</p>
            <MaskText as="h2" className="display mt-5 text-h1">
              {homepage.estimateHeading}
            </MaskText>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            <Button href="/services" variant="outline">
              All services
            </Button>
          </Reveal>
        </div>

        <ul className="mt-16 border-t border-line-light">
          {homepage.capabilities.map((c, i) => (
            <Reveal
              as="li"
              key={c.title}
              delay={i * 60}
              className="group border-b border-line-light"
            >
              <div className="grid gap-3 py-7 md:grid-cols-12 md:items-baseline md:gap-8">
                <span className="eyebrow text-on-light-faint md:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lede font-semibold leading-snug md:col-span-4">
                  {c.title}
                </h3>
                <p className="text-[0.98rem] leading-relaxed text-on-light-muted md:col-span-7">
                  {c.body}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
