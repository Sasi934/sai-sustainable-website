import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import Reveal from "@/components/ui/Reveal";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { sectorsPage } from "@/data/group-pages";
import { divisions } from "@/data/divisions";
import { itIndustries, roadDefect } from "@/data/it-solutions";
import { eximCategories } from "@/data/exim";

export const metadata: Metadata = pageMeta({
  title: "Sectors We Serve",
  description:
    "Sectors served by SAI Group: residential, commercial and industrial property; government, municipalities, smart cities, infrastructure, healthcare, retail, education and manufacturing; and international trade.",
  path: "/sectors",
});

export default function Page() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Sectors", href: "/sectors" },
  ];

  const columns = [
    { division: divisions[2], heading: "Industries", items: itIndustries.map((i) => i.name), extraHeading: "Road defect detection users", extra: roadDefect.users.map((u) => u.name) },
    { division: divisions[0], heading: "Property and site types", items: sectorsPage.environmental },
    { division: divisions[1], heading: "Product categories", items: eximCategories.map((c) => c.name) },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <PageHero eyebrow={sectorsPage.eyebrow} heading={sectorsPage.heading} intro={sectorsPage.intro} slot="group" crumbs={crumbs} />

      <section className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container grid gap-px bg-line-light lg:grid-cols-3">
          {columns.map((c, i) => (
            <Reveal key={c.division.key} delay={i * 90} className="bg-ivory">
              <section data-division={c.division.key} aria-labelledby={`sector-${c.division.key}`} className="h-full p-7 lg:p-9">
                <p className="eyebrow flex items-center gap-2 text-signal-ink">
                  <span aria-hidden="true" className="h-2 w-2 bg-signal-ink" />
                  {c.division.fullName}
                </p>
                <h2 id={`sector-${c.division.key}`} className="mt-5 text-h3 font-semibold tracking-[-0.02em]">{c.heading}</h2>
                <ul className="mt-6 border-t border-line-light">
                  {c.items.map((item) => (
                    <li key={item} className="border-b border-line-light py-3">{item}</li>
                  ))}
                </ul>
                {c.extra && (
                  <>
                    <h3 className="eyebrow mt-8 text-on-light-faint">{c.extraHeading}</h3>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {c.extra.map((e) => (
                        <li key={e} className="rounded-[2px] border border-line-light px-3 py-1.5 text-[0.86rem]">{e}</li>
                      ))}
                    </ul>
                  </>
                )}
                <Link href={c.division.href} className="mt-8 inline-block text-[0.9rem] font-medium text-signal-ink underline-offset-4 hover:underline">
                  {c.division.name} &rarr;
                </Link>
              </section>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
