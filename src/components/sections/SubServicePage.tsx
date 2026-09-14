import Link from "next/link";
import PageHero from "./PageHero";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { JsonLd, breadcrumbSchema, serviceSchema } from "@/lib/schema";
import type { Division } from "@/data/divisions";
import type { HeroSlot } from "@/data/heroes";
import type { SubPage } from "@/data/types";

/**
 * Shared composition for division sub-pages (Environmental and IT). One H1 in
 * the hero, then each content block as an H2 with its items as H3s — a heading
 * outline an AI agent can extract a service definition from directly.
 */
export default function SubServicePage({
  page,
  division,
  siblings,
  fallbackSlot,
  areaServed = null,
}: {
  page: SubPage;
  division: Division;
  siblings: SubPage[];
  /** Used when the page has no photograph of its own. */
  fallbackSlot?: HeroSlot["key"];
  areaServed?: string | null;
}) {
  const path = `${division.href}/${page.slug}`;
  const crumbs = [
    { name: "Home", href: "/" },
    { name: division.name, href: division.href },
    { name: page.name, href: path },
  ];
  const [primary, ...secondary] = page.actions;

  return (
    <div data-division={division.key}>
      <JsonLd data={serviceSchema(page.heading, page.metaDescription, path, { division: division.href, areaServed })} />
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.name, path: c.href })))} />

      <PageHero
        eyebrow={division.fullName}
        heading={page.heading}
        intro={page.intro}
        image={page.image}
        imageAlt={page.imageAlt}
        slot={page.image ? undefined : fallbackSlot ?? division.key}
        crumbs={crumbs}
      >
        {primary && (
          <Button href={primary.href} onDark>
            {primary.label}
          </Button>
        )}
        {secondary.map((a) => (
          <Button key={a.label} href={a.href} variant="outline" onDark>
            {a.label}
          </Button>
        ))}
      </PageHero>

      <article className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container flex flex-col gap-[clamp(3.5rem,7vw,6rem)]">
          {page.sections.map((s, si) => (
            <section key={s.heading} aria-labelledby={`s-${si}`} className="grid gap-8 lg:grid-cols-12 lg:gap-14">
              <Reveal className="lg:col-span-4">
                <p className="tnum eyebrow text-signal-ink">{String(si + 1).padStart(2, "0")}</p>
                <h2 id={`s-${si}`} className="display mt-3 text-h3">{s.heading}</h2>
              </Reveal>

              <div className="lg:col-span-7 lg:col-start-6">
                {s.body && (
                  <Reveal>
                    <p className="max-w-[62ch] text-lede leading-relaxed text-on-light-muted">{s.body}</p>
                  </Reveal>
                )}
                {s.items && (
                  <ul className={`${s.body ? "mt-8" : ""} grid border-t border-line-light ${s.items.every((i) => !i.body) ? "sm:grid-cols-2 sm:gap-x-8" : ""}`}>
                    {s.items.map((item, ii) => (
                      <Reveal as="li" key={item.name} delay={ii * 50} className="border-b border-line-light">
                        {item.href ? (
                          <Link href={item.href} className="group flex items-start justify-between gap-6 py-5 transition-colors hover:text-signal-ink">
                            <ItemText name={item.name} body={item.body} />
                            <span aria-hidden="true" className="mt-1 text-signal-ink transition-transform duration-500 ease-luxe group-hover:translate-x-1.5">&rarr;</span>
                          </Link>
                        ) : (
                          <div className="py-5">
                            <ItemText name={item.name} body={item.body} />
                          </div>
                        )}
                      </Reveal>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          ))}
        </div>
      </article>

      {(page.related?.length ?? 0) > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-line-light bg-ivory-raised py-[clamp(3.5rem,7vw,5rem)] text-on-light">
          <div className="container grid gap-8 lg:grid-cols-12">
            <h2 id="related-heading" className="eyebrow text-on-light-faint lg:col-span-4">Related</h2>
            <ul className="grid gap-px bg-line-light sm:grid-cols-2 lg:col-span-8">
              {page.related!.map((r) => (
                <li key={r.href} className="bg-ivory-raised">
                  <Link href={r.href} className="group flex h-full flex-col gap-2 p-5 transition-colors hover:bg-ivory">
                    {r.note && <span className="eyebrow text-on-light-faint">{r.note}</span>}
                    <span className="font-semibold leading-snug group-hover:text-signal-ink">{r.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section aria-labelledby="more-heading" className="bg-ink py-[clamp(4rem,8vw,6rem)] text-on-dark">
        <div className="container">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow text-signal">{division.fullName}</p>
              <h2 id="more-heading" className="display mt-4 max-w-[22ch] text-h2">
                Speak with the {division.name} team.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {page.actions.map((a, i) => (
                <Button key={a.label} href={a.href} variant={i === 0 ? "solid" : "outline"} onDark>
                  {a.label}
                </Button>
              ))}
            </div>
          </div>

          <nav aria-label={`More from ${division.name}`} className="mt-14 border-t border-line-dark pt-8">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-[0.9rem]">
              <li>
                <Link href={division.href} className="text-on-dark hover:text-signal">{division.name} overview</Link>
              </li>
              {siblings
                .filter((p) => p.slug !== page.slug)
                .map((p) => (
                  <li key={p.slug}>
                    <Link href={`${division.href}/${p.slug}`} className="text-on-dark-muted hover:text-signal">
                      {p.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>
        </div>
      </section>
    </div>
  );
}

function ItemText({ name, body }: { name: string; body?: string }) {
  return (
    <div>
      <h3 className="text-[1.05rem] font-semibold leading-snug tracking-[-0.01em]">{name}</h3>
      {body && <p className="mt-1.5 max-w-[58ch] text-[0.95rem] leading-relaxed text-on-light-muted">{body}</p>}
    </div>
  );
}
