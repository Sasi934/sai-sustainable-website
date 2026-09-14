import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "./SectionHeading";
import HeroImage from "@/components/visual/HeroImage";
import { divisions, getDivision, type Division } from "@/data/divisions";
import { divisionsIntro } from "@/data/group";

/**
 * 03 — The three divisions.
 *
 * Deliberately not three equal cards. IT Solutions, the strategic focus, takes
 * the tall panel; Environmental and EXIM stack beside it. Each card wears its
 * own palette through data-division, on a shared ivory ground, so the three
 * identities read as distinct members of one family.
 */
export default function Divisions() {
  const it = getDivision("it");
  const others = divisions.filter((d) => !d.focus);

  return (
    <section id="divisions" aria-labelledby="divisions-heading" className="scroll-mt-20 bg-ivory pb-[var(--section)] text-on-light">
      <div className="container">
        <SectionHeading id="divisions-heading" eyebrow={divisionsIntro.eyebrow} heading={divisionsIntro.heading} body={divisionsIntro.body} />

        <ul className="mt-14 grid gap-5 lg:grid-cols-12 lg:grid-rows-2">
          <Reveal as="li" className="lg:col-span-7 lg:row-span-2">
            <DivisionCard division={it} large />
          </Reveal>
          {others.map((d, i) => (
            <Reveal as="li" key={d.key} delay={120 + i * 100} className="lg:col-span-5">
              <DivisionCard division={d} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function DivisionCard({ division: d, large = false }: { division: Division; large?: boolean }) {
  return (
    <article data-division={d.key} className="group relative flex h-full flex-col overflow-hidden bg-ink text-on-dark">
      <div className={`relative overflow-hidden ${large ? "aspect-[4/3] lg:aspect-auto lg:min-h-[26rem] lg:flex-1" : "aspect-[16/8]"}`}>
        <div className="absolute inset-0 transition-transform duration-[1400ms] ease-luxe group-hover:scale-[1.04]">
          <HeroImage slot={d.key} sizes={large ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 1024px) 100vw, 42vw"} />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink via-ink/20 to-transparent" />
        {d.focus && (
          <p className="eyebrow absolute left-6 top-6 bg-ink/70 px-3 py-1.5 text-signal backdrop-blur-sm lg:left-8 lg:top-8">
            Strategic focus
          </p>
        )}
      </div>

      <div className={`flex flex-col ${large ? "p-6 lg:p-10" : "p-6 lg:p-8"}`}>
        <p className="tnum eyebrow text-on-dark-faint">
          {d.index} <span aria-hidden="true">·</span> {d.fullName}
        </p>
        <h3 className={`mt-3 font-semibold tracking-[-0.025em] ${large ? "text-h2 leading-[1.05]" : "text-h3 leading-tight"}`}>
          <Link href={d.href} className="after:absolute after:inset-0 hover:text-signal">
            {d.name}
          </Link>
        </h3>
        <p className={`mt-4 leading-relaxed text-on-dark-muted ${large ? "max-w-[48ch] text-lede" : "text-[0.95rem]"}`}>
          {d.line}
        </p>

        {large && (
          <ul className="relative z-10 mt-7 flex flex-wrap gap-2">
            {d.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="inline-block rounded-[2px] border border-line-dark px-3 py-1.5 text-[0.82rem] transition-colors hover:border-signal hover:text-signal">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        )}

        <span className="eyebrow mt-7 inline-flex items-center gap-2 text-signal">
          Explore {d.name}
          <span aria-hidden="true" className="transition-transform duration-500 ease-luxe group-hover:translate-x-1.5">
            &rarr;
          </span>
        </span>
      </div>
    </article>
  );
}
