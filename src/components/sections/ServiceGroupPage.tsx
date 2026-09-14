import Image from "next/image";
import Link from "next/link";
import PageHero from "./PageHero";
import CTABand from "./CTABand";
import Parallax from "@/components/motion/Parallax";
import MaskText from "@/components/motion/MaskText";
import Reveal from "@/components/ui/Reveal";
import { serviceGroups, type ServiceGroup } from "@/data/services";
import { getDivision, ENVIRONMENTAL_BASE } from "@/data/divisions";

/**
 * Shared composition for the five preserved service routes. Each route file is a
 * thin wrapper, so the pages stay consistent and the approved copy has one path
 * from data/ to the screen.
 */
export default function ServiceGroupPage({
  group,
  band,
  sceneHeading,
  sceneBody,
}: {
  group: ServiceGroup;
  /**
   * Optional full-bleed photographic band (2D, parallax). Replaced the WebGL
   * scene band under D-07 — same slot in the page rhythm, no 3D.
   */
  band?: { image: string; imageAlt: string };
  sceneHeading?: string;
  sceneBody?: string;
}) {
  const others = serviceGroups.filter((g) => g.slug !== group.slug);
  // All five preserved Atlantic Canada routes now sit inside Division 01.
  const division = getDivision("environmental");

  return (
    <div data-division="environmental">
      <PageHero
        eyebrow={`${division.fullName} — Atlantic Canada`}
        heading={group.heading}
        intro={group.intro}
        image={group.image}
        imageAlt={group.imageAlt}
        crumbs={[
          { name: "Home", href: "/" },
          { name: division.name, href: ENVIRONMENTAL_BASE },
          { name: group.name, href: group.path },
        ]}
      />

      <section className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <ul className="flex flex-col gap-[clamp(3.5rem,7vw,6rem)]">
            {group.services.map((s, i) => (
              <Reveal as="li" key={s.slug} delay={i * 80}>
                <article className="grid gap-8 lg:grid-cols-12 lg:gap-14">
                  {s.image && (
                    <div className="lg:col-span-5">
                      <Parallax className="relative aspect-4/3" amount={14}>
                        <div className="absolute inset-0">
                          <Image
                            src={s.image}
                            alt={s.imageAlt ?? s.name}
                            fill
                            sizes="(max-width: 1024px) 100vw, 40vw"
                            className="object-cover"
                          />
                        </div>
                      </Parallax>
                    </div>
                  )}

                  <div
                    className={
                      s.image
                        ? "lg:col-span-6 lg:col-start-7"
                        : "lg:col-span-8 lg:col-start-3"
                    }
                  >
                    <p className="eyebrow text-on-light-faint">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h2 className="display mt-3 text-h3">{s.name}</h2>
                    <p className="mt-6 max-w-[58ch] leading-relaxed text-on-light-muted">
                      {s.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {band && (
        <section className="relative flex min-h-[70svh] items-end overflow-hidden bg-ink text-on-dark">
          <Parallax className="absolute inset-0" amount={10}>
            <div className="absolute inset-0">
              <Image src={band.image} alt={band.imageAlt} fill sizes="100vw" className="object-cover opacity-60" />
            </div>
          </Parallax>
          <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink via-ink/50 to-ink/10" />
          <div className="relative container pb-[clamp(3rem,7vw,6rem)] pt-[clamp(4rem,10vw,8rem)]">
            <MaskText as="h2" className="display max-w-[18ch] text-h2">
              {sceneHeading ?? ""}
            </MaskText>
            {sceneBody && (
              <p className="mt-6 max-w-[52ch] leading-relaxed text-on-dark-muted">{sceneBody}</p>
            )}
          </div>
        </section>
      )}

      <section className="border-t border-line-light bg-ivory-raised py-[clamp(4rem,8vw,6rem)]">
        <div className="container">
          <p className="eyebrow text-on-light-faint">Related capabilities</p>
          <ul className="mt-8 grid gap-px bg-line-light sm:grid-cols-2 lg:grid-cols-4">
            {others.map((g) => (
              <li key={g.slug} className="bg-ivory-raised">
                <Link
                  href={g.path}
                  className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors hover:bg-ivory"
                >
                  <span className="text-lede font-semibold leading-snug">{g.name}</span>
                  <span
                    aria-hidden="true"
                    className="text-signal-ink transition-transform duration-500 ease-luxe group-hover:translate-x-1.5"
                  >
                    &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CTABand
        heading="Call us today for free estimate"
        body="Fully insured and certified, with 24/7 emergency response across Nova Scotia, New Brunswick & PEI."
        cta="Get a quote"
      />
    </div>
  );
}
