import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import SectionHeading from "@/components/sections/SectionHeading";
import PortfolioAreas from "@/components/sections/it/PortfolioAreas";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { projectsPage } from "@/data/group-pages";
import { atlanticRoutes } from "@/data/environmental";
import { eximHero } from "@/data/exim";
import { divisions } from "@/data/divisions";

export const metadata: Metadata = pageMeta({
  title: "Projects & Case Studies",
  description:
    "SAI Group projects: delivered web platforms, the AI road defect detection pilot programme, and environmental abatement, restoration and construction work across Atlantic Canada.",
  path: "/projects",
});

export default function Page() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/projects" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <PageHero eyebrow={projectsPage.eyebrow} heading={projectsPage.heading} intro={projectsPage.intro} slot="group" crumbs={crumbs} />

      <section data-division="it" aria-labelledby="projects-it" className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <SectionHeading
            id="projects-it"
            eyebrow={divisions[2].fullName}
            heading="Technology portfolio."
            action={
              <Button href="/it-services/work" variant="outline">
                Full case studies
              </Button>
            }
          />
          <PortfolioAreas />
        </div>
      </section>

      <section data-division="environmental" aria-labelledby="projects-env" className="bg-ink py-[var(--section)] text-on-dark">
        <div className="container">
          <SectionHeading id="projects-env" eyebrow={divisions[0].fullName} heading="Environmental, restoration and construction work." onDark />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {atlanticRoutes.map((r, i) => (
              <Reveal as="li" key={r.href} delay={i * 70}>
                <Link href={r.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={r.image} alt={r.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]" />
                  </div>
                  <h3 className="mt-5 text-lede font-semibold tracking-[-0.01em] transition-colors group-hover:text-signal">{r.name}</h3>
                  <p className="mt-2 line-clamp-3 text-[0.92rem] leading-relaxed text-on-dark-muted">{r.intro}</p>
                </Link>
              </Reveal>
            ))}
            <Reveal as="li" delay={atlanticRoutes.length * 70}>
              <Link href="/environmental-restoration-manpower/projects" className="group flex h-full min-h-[14rem] flex-col justify-end border border-line-dark p-6 transition-colors hover:border-signal">
                <span className="eyebrow text-signal">All project types</span>
                <span className="mt-3 text-lede font-semibold">Environmental & Restoration Projects &rarr;</span>
              </Link>
            </Reveal>
          </ul>
        </div>
      </section>

      <section data-division="exim" aria-labelledby="projects-exim" className="bg-ivory-raised py-[clamp(4rem,8vw,6rem)] text-on-light">
        <div className="container grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-8">
            <p className="eyebrow text-signal-ink">{divisions[1].fullName}</p>
            <h2 id="projects-exim" className="display mt-4 text-h2">Trade engagements</h2>
            <p className="mt-5 max-w-[60ch] leading-relaxed text-on-light-muted">{projectsPage.eximNote}</p>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4 lg:justify-self-end">
            <Button href={eximHero.actions[0].href}>{eximHero.actions[0].label}</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
