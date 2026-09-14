import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import HeroImage from "@/components/visual/HeroImage";
import { itPortfolio } from "@/data/it-solutions";
import { itProjects } from "@/data/it-projects";

/**
 * Portfolio index — flat 2D cards. Each card states its status plainly
 * (Delivered / Pilot programme / Capability) so a capability is never mistaken
 * for a finished case study.
 */
export default function PortfolioAreas({ onDark = false }: { onDark?: boolean }) {
  const [web, pilot, ...rest] = itPortfolio;
  const cardBase = `group flex h-full flex-col border transition-colors duration-500 ${
    onDark ? "border-line-dark hover:border-signal" : "border-line-light hover:border-signal-ink"
  }`;
  const muted = onDark ? "text-on-dark-muted" : "text-on-light-muted";
  const status = (s: string) => (
    <span className={`eyebrow ${s === "Capability" ? (onDark ? "text-on-dark-faint" : "text-on-light-faint") : onDark ? "text-signal" : "text-signal-ink"}`}>
      {s}
    </span>
  );

  return (
    <div className="mt-14 grid gap-6 lg:grid-cols-12">
      <Reveal className="lg:col-span-7">
        <Link href={web.href} className={cardBase}>
          <div className="relative grid aspect-[16/9] grid-cols-3 gap-px overflow-hidden bg-line-light">
            {itProjects.map((p) => (
              <div key={p.slug} className="relative overflow-hidden">
                <Image
                  src={p.shot}
                  alt={p.shotAlt}
                  fill
                  sizes="(max-width: 1024px) 33vw, 20vw"
                  className="object-cover object-top transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
                />
              </div>
            ))}
          </div>
          <div className="flex flex-1 flex-col p-6 lg:p-8">
            {status(web.status)}
            <h3 className="mt-3 text-h3 font-semibold tracking-[-0.02em]">{web.name}</h3>
            <p className={`mt-3 max-w-[52ch] leading-relaxed ${muted}`}>{web.body}</p>
          </div>
        </Link>
      </Reveal>

      <Reveal delay={90} className="lg:col-span-5" >
        <Link href={pilot.href} className={`${cardBase} bg-ink text-on-dark`} data-division="it">
          <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:flex-1">
            <HeroImage slot="road" overlay="full" sizes="(max-width: 1024px) 100vw, 40vw" />
          </div>
          <div className="p-6 lg:p-8">
            {/* Always a dark card, whatever ground the grid sits on. */}
            <span className="eyebrow text-signal">{pilot.status}</span>
            <h3 className="mt-3 text-h3 font-semibold tracking-[-0.02em]">{pilot.name}</h3>
            <p className="mt-3 leading-relaxed text-on-dark-muted">{pilot.body}</p>
          </div>
        </Link>
      </Reveal>

      <ul className="grid gap-6 sm:grid-cols-3 lg:col-span-12">
        {rest.map((a, i) => (
          <Reveal as="li" key={a.slug} delay={140 + i * 70}>
            <Link href={a.href} className={`${cardBase} p-6 lg:p-8`}>
              {status(a.status)}
              <h3 className="mt-3 text-lede font-semibold tracking-[-0.01em]">{a.name}</h3>
              <p className={`mt-3 flex-1 text-[0.92rem] leading-relaxed ${muted}`}>{a.body}</p>
              <span aria-hidden="true" className={`mt-6 ${onDark ? "text-signal" : "text-signal-ink"} transition-transform duration-500 ease-luxe group-hover:translate-x-1.5`}>
                &rarr;
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
