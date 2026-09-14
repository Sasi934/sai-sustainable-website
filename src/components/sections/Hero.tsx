import Link from "next/link";
import CinematicHero from "./CinematicHero";
import { groupHero } from "@/data/group";
import { divisions } from "@/data/divisions";

/**
 * 01 — SAI GROUP hero. SAI's supplied group frame, the group statement, and —
 * inside the first viewport — an index of
 * the three divisions, so "one group, three divisions, IT leads" reads in
 * about five seconds without scrolling.
 */
export default function Hero() {
  return (
    <CinematicHero copy={groupHero} slot="group">
      <nav
        aria-label="SAI Group divisions"
        className="hero-step mt-12 border-t border-line-dark lg:mt-16"
        style={{ "--d": 1500 } as React.CSSProperties}
      >
        <ul className="grid sm:grid-cols-3">
          {divisions.map((d) => (
            <li key={d.key} data-division={d.key} className="border-b border-line-dark sm:border-b-0 sm:border-r sm:last:border-r-0">
              <Link
                href={d.href}
                className="group flex h-full items-start gap-4 py-4 transition-colors duration-500 sm:px-5 sm:first:pl-0 sm:py-5"
              >
                <span aria-hidden="true" className="mt-[0.45rem] h-2 w-2 shrink-0 bg-signal" />
                <span className="flex-1">
                  <span className="tnum eyebrow flex flex-wrap items-center gap-x-3 text-on-dark-faint">
                    {d.index}
                    {d.focus && <span className="text-signal">Strategic focus</span>}
                  </span>
                  <span className="mt-1.5 block text-[0.98rem] font-semibold leading-snug text-on-dark transition-colors group-hover:text-signal">
                    {d.name}
                  </span>
                </span>
                <span aria-hidden="true" className="mt-5 text-signal opacity-0 transition-all duration-500 ease-luxe group-hover:translate-x-1 group-hover:opacity-100">
                  &rarr;
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </CinematicHero>
  );
}
