import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "./SectionHeading";
import { divisions } from "@/data/divisions";
import { environmentalServiceGroups } from "@/data/environmental";
import { eximServices, eximCategories } from "@/data/exim";
import { itServices } from "@/data/it-solutions";

/**
 * 06 — Group capability index. Every service across all three divisions as
 * plain, crawlable text, grouped by division — the section an AI agent or a
 * procurement lead would extract from.
 */
export default function Capabilities() {
  const columns = [
    {
      division: divisions[0],
      lists: environmentalServiceGroups.map((g) => ({ name: g.name, items: g.items.map((i) => ({ name: i.name, href: i.href })) })),
    },
    {
      division: divisions[1],
      lists: [
        { name: "Services", items: eximServices.map((i) => ({ name: i.name, href: `${divisions[1].href}#services` })) },
        { name: "Product categories", items: eximCategories.map((i) => ({ name: i.name, href: `${divisions[1].href}#categories` })) },
      ],
    },
    {
      division: divisions[2],
      lists: [{ name: "Services", items: itServices.map((i) => ({ name: i.name, href: i.href })) }],
    },
  ];

  return (
    <section aria-labelledby="capabilities-heading" className="bg-ivory py-[var(--section)] text-on-light">
      <div className="container">
        <SectionHeading id="capabilities-heading" eyebrow="Capabilities" heading="What each division delivers." />

        <div className="mt-14 grid gap-px bg-line-light lg:grid-cols-3">
          {columns.map((col, ci) => (
            <Reveal key={col.division.key} delay={ci * 100} className="bg-ivory">
              <section data-division={col.division.key} aria-labelledby={`cap-${col.division.key}`} className="h-full p-6 lg:p-8">
                <div className="flex items-center gap-3 border-b-2 border-signal-ink pb-4">
                  <h3 id={`cap-${col.division.key}`} className="text-lede font-semibold tracking-[-0.01em]">
                    <Link href={col.division.href} className="hover:text-signal-ink">{col.division.name}</Link>
                  </h3>
                  {col.division.focus && <span className="eyebrow ml-auto text-signal-ink">Focus</span>}
                </div>

                {col.lists.map((list) => (
                  <div key={list.name} className="mt-6">
                    <h4 className="eyebrow text-on-light-faint">{list.name}</h4>
                    <ul className="mt-3 flex flex-col">
                      {list.items.map((item) => (
                        <li key={item.name} className="border-b border-line-light last:border-b-0">
                          {item.href ? (
                            <Link href={item.href} className="group flex items-baseline justify-between gap-4 py-2 text-[0.94rem] transition-colors hover:text-signal-ink">
                              {item.name}
                              <span aria-hidden="true" className="text-on-light-faint transition-transform duration-500 ease-luxe group-hover:translate-x-1 group-hover:text-signal-ink">&rarr;</span>
                            </Link>
                          ) : (
                            <span className="block py-2 text-[0.94rem] text-on-light-muted">{item.name}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </section>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
