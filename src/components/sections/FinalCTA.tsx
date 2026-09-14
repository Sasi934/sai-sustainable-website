import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import MaskText from "@/components/motion/MaskText";
import { finalCta } from "@/data/group";
import { environmentalHero } from "@/data/environmental";
import { eximHero } from "@/data/exim";
import { itHero } from "@/data/it-solutions";
import { divisions } from "@/data/divisions";

/** 10 — Close. One primary action, plus the fastest route into each division. */
export default function FinalCTA() {
  const routes = [
    { division: divisions[0], action: environmentalHero.actions[0], note: "24/7 emergency line" },
    { division: divisions[1], action: eximHero.actions[0], note: "Sourcing, import & export" },
    { division: divisions[2], action: itHero.actions[0], note: "Web, software & AI" },
  ];

  return (
    <section aria-labelledby="final-cta" className="relative overflow-hidden border-t border-line-dark bg-ink py-[var(--section)] text-on-dark">
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(50%_60%_at_90%_100%,var(--hero-glow)_0%,transparent_70%)]" />
      <div className="container relative">
        <Reveal>
          <p className="eyebrow flex items-center gap-3 text-signal">
            <span aria-hidden="true" className="h-px w-8 bg-signal" />
            {finalCta.eyebrow}
          </p>
          <div id="final-cta">
            <MaskText as="h2" className="display mt-6 max-w-[20ch] text-h1">
              {finalCta.heading}
            </MaskText>
          </div>
          <div className="mt-10">
            <Button href={finalCta.primary.href} onDark>
              {finalCta.primary.label}
            </Button>
          </div>
        </Reveal>

        <ul className="mt-16 grid border-t border-line-dark md:grid-cols-3">
          {routes.map((r, i) => (
            <Reveal as="li" key={r.division.key} delay={100 + i * 90} className="border-b border-line-dark md:border-b-0 md:border-r md:last:border-r-0">
              <div data-division={r.division.key} className="h-full">
                <Link href={r.action.href} className="group flex h-full flex-col gap-2 py-7 md:px-6 md:first:pl-0">
                  <span className="eyebrow text-on-dark-faint">{r.division.name}</span>
                  <span className="flex items-center gap-3 text-lede font-semibold text-on-dark transition-colors group-hover:text-signal">
                    <span aria-hidden="true" className="h-2 w-2 bg-signal" />
                    {r.action.label}
                  </span>
                  <span className="text-[0.88rem] text-on-dark-muted">{r.note}</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
