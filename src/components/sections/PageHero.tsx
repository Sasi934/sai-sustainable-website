import Image from "next/image";
import Link from "next/link";
import HeroImage from "@/components/visual/HeroImage";
import type { HeroSlot } from "@/data/heroes";

type Crumb = { name: string; href: string };

/**
 * Interior page hero. Quieter than the division heroes — one image, one
 * statement, with the same CSS reveal so every page opens the same way.
 * Pass `image` for an existing photograph, or `slot` to share a division's
 * cinematic frame (with its designed ground until the photograph is supplied).
 */
export default function PageHero({
  eyebrow,
  heading,
  intro,
  image,
  imageAlt,
  slot,
  crumbs,
  children,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  image?: string;
  imageAlt?: string;
  slot?: HeroSlot["key"];
  /** Visible breadcrumb trail; the last item is the current page. */
  crumbs?: Crumb[];
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate flex min-h-[60svh] items-end overflow-hidden bg-ink text-on-dark">
      {image ? (
        <div className="hero-media absolute inset-0">
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
        </div>
      ) : slot ? (
        <HeroImage slot={slot} animate priority />
      ) : null}
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink via-ink/65 to-ink/20" />
      <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-ink/85 via-ink/35 to-transparent" />

      <div className="relative container pb-[clamp(2.75rem,6vw,4.75rem)] pt-32">
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="hero-step mb-8" style={{ "--d": 150 } as React.CSSProperties}>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.78rem] text-on-dark-muted">
              {crumbs.map((c, i) => {
                const last = i === crumbs.length - 1;
                return (
                  <li key={c.href} className="flex items-center gap-2">
                    {last ? (
                      <span aria-current="page" className="text-on-dark">{c.name}</span>
                    ) : (
                      <>
                        <Link href={c.href} className="transition-colors hover:text-signal">{c.name}</Link>
                        <span aria-hidden="true" className="text-on-dark-faint">/</span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        <p className="hero-step eyebrow flex items-center gap-3 text-signal" style={{ "--d": 250 } as React.CSSProperties}>
          <span aria-hidden="true" className="h-px w-8 bg-signal" />
          {eyebrow}
        </p>
        <h1 className="hero-step display mt-6 max-w-[22ch] text-h1" style={{ "--d": 400 } as React.CSSProperties}>
          {heading}
        </h1>
        {intro && (
          <p className="hero-step mt-7 max-w-[60ch] text-lede leading-relaxed text-on-dark-muted" style={{ "--d": 600 } as React.CSSProperties}>
            {intro}
          </p>
        )}
        {children && (
          <div className="hero-step mt-9 flex flex-wrap gap-3 sm:gap-4" style={{ "--d": 800 } as React.CSSProperties}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
