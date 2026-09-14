import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import SectionHeading from "./SectionHeading";
import PortfolioAreas from "./it/PortfolioAreas";
import { projectsIntro } from "@/data/group";
import { atlanticRoutes } from "@/data/environmental";
import { divisions } from "@/data/divisions";

/**
 * 07 — Projects & case studies. IT portfolio first (delivered work and the road
 * defect pilot), then the environmental division's field service areas. Nothing
 * here is presented as a case study unless it is one.
 */
export default function ProjectsPreview() {
  const field = atlanticRoutes.filter((r) =>
    ["Environmental Abatement", "Restoration & Cleaning", "Renovation & Construction"].includes(r.name),
  );

  return (
    <section aria-labelledby="projects-heading" className="bg-ivory-raised py-[var(--section)] text-on-light">
      <div className="container">
        <SectionHeading
          id="projects-heading"
          eyebrow={projectsIntro.eyebrow}
          heading={projectsIntro.heading}
          action={
            <Button href="/projects" variant="outline">
              All projects
            </Button>
          }
        />

        <div data-division="it">
          <PortfolioAreas />
        </div>

        <div data-division="environmental" className="mt-20">
          <Reveal>
            <h3 className="eyebrow flex items-center gap-3 text-signal-ink">
              <span aria-hidden="true" className="h-2 w-2 bg-signal-ink" />
              {divisions[0].name} — field work
            </h3>
          </Reveal>
          <ul className="mt-6 grid gap-6 md:grid-cols-3">
            {field.map((r, i) => (
              <Reveal as="li" key={r.href} delay={i * 80}>
                <Link href={r.href} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                    <Image
                      src={r.image}
                      alt={r.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
                    />
                  </div>
                  <p className="mt-5 text-lede font-semibold tracking-[-0.01em] transition-colors group-hover:text-signal-ink">{r.name}</p>
                  <p className="mt-2 line-clamp-2 text-[0.92rem] leading-relaxed text-on-light-muted">{r.intro}</p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
