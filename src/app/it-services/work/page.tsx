import type { Metadata } from "next";
import CTABand from "@/components/sections/CTABand";
import PageHero from "@/components/sections/PageHero";
import PortfolioAreas from "@/components/sections/it/PortfolioAreas";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import Parallax from "@/components/motion/Parallax";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { itProjects, itProjectsIntro } from "@/data/it-projects";
import { benchmarks, benchmarkDisclaimer } from "@/data/it-benchmarks";

export const metadata: Metadata = pageMeta({
  title: "Selected Project Experience",
  description:
    "Three projects showing different parts of SAI's technology and design capability — consumer-facing digital commerce, AI-enabled platforms and highly visual interactive experiences.",
  path: "/it-services/work",
});

export default function Page() {
  return (
    <div data-division="it">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "IT Solutions", path: "/it-services" },
          { name: "Selected Work", path: "/it-services/work" },
        ])}
      />

      <PageHero
        eyebrow="SAI IT Solutions — Portfolio"
        heading="Selected Project Experience"
        intro={itProjectsIntro}
        slot="it"
        crumbs={[
          { name: "Home", href: "/" },
          { name: "IT Solutions", href: "/it-services" },
          { name: "Portfolio", href: "/it-services/work" },
        ]}
      />

      {/* Portfolio index: every area from the brief, each labelled with its real status. */}
      <section aria-labelledby="portfolio-areas" className="bg-ivory-raised py-[var(--section)] text-on-light">
        <div className="container">
          <h2 id="portfolio-areas" className="eyebrow text-signal-ink">Portfolio areas</h2>
          <PortfolioAreas />
        </div>
      </section>

      <section id="web-projects" aria-labelledby="web-projects-heading" className="scroll-mt-20 bg-ivory py-[var(--section)] text-on-light">
        <h2 id="web-projects-heading" className="sr-only">Web Projects</h2>
        <div className="container flex flex-col gap-[clamp(4rem,9vw,8rem)]">
          {itProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 60}>
              <article id={p.slug} className="grid scroll-mt-24 gap-8 lg:grid-cols-12 lg:gap-14">
                <Parallax className="relative aspect-16/10 lg:col-span-12" amount={8}>
                  <div className="absolute inset-0 border border-line-light">
                    <Image
                      src={p.shot}
                      alt={p.shotAlt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 1100px"
                      className="object-cover object-top"
                    />
                  </div>
                </Parallax>

                <div className="lg:col-span-4">
                  <p className="eyebrow text-signal-ink">
                    Project {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="display mt-4 text-h2">{p.name}</h3>
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 border-b border-line-light pb-1 text-[0.88rem] text-on-light-muted transition-colors hover:border-signal-ink hover:text-signal-ink"
                  >
                    Visit live site
                    <span aria-hidden="true">&rarr;</span>
                  </a>
                </div>

                <div className="lg:col-span-7 lg:col-start-6">
                  <p className="text-lede leading-relaxed">{p.body}</p>

                  <ul className="mt-8 flex flex-col">
                    {p.points.map((pt) => (
                      <li
                        key={pt}
                        className="border-b border-line-light py-3 text-[0.95rem] leading-relaxed text-on-light-muted"
                      >
                        {pt}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-7 max-w-[62ch] text-[0.92rem] leading-relaxed text-on-light-faint">
                    <span className="font-semibold text-on-light">Technology / approach: </span>
                    {p.approach}
                  </p>

                  {/* The journey line from the source document, set as a sequence. */}
                  <ol className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {p.journey.map((step, si) => (
                      <li key={step} className="flex items-center gap-3">
                        <span className="eyebrow text-signal-ink">{step}</span>
                        {si < p.journey.length - 1 && (
                          <span aria-hidden="true" className="text-on-light-faint">
                            &rarr;
                          </span>
                        )}
                      </li>
                    ))}
                  </ol>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/*
        Reference benchmarks. Rendered from it-benchmarks.ts, deliberately a
        different file and a visually distinct block from the SAI projects above,
        so this can never be mistaken for our work.
      */}
      <section className="border-t border-line-light bg-ivory-dim py-[clamp(4rem,8vw,6rem)] text-on-light">
        <div className="container">
          <Reveal>
            <p className="eyebrow text-on-light-faint">Reference benchmark</p>
            <p className="mt-4 max-w-[52ch] text-[0.95rem] font-semibold text-on-light">
              {benchmarkDisclaimer}
            </p>
          </Reveal>

          <ul className="mt-8 flex flex-col gap-4">
            {benchmarks.map((b) => (
              <Reveal as="li" key={b.name} delay={80}>
                <div className="border border-line-light bg-ivory-raised p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-4">
                    <h2 className="text-lede font-semibold">{b.name}</h2>
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[0.85rem] text-on-light-muted underline underline-offset-4 hover:text-signal-ink"
                    >
                      {b.url.replace("https://", "")}
                    </a>
                  </div>
                  <p className="mt-3 max-w-[70ch] text-[0.9rem] leading-relaxed text-on-light-muted">
                    {b.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTABand
        heading="Have a platform in mind?"
        body="Tell us the business problem and we'll come back with an approach."
        cta="Start a conversation"
      />
    </div>
  );
}
