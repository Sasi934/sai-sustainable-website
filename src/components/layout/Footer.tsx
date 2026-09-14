import Link from "next/link";
import Image from "next/image";
import { company, contact, certifications, group } from "@/data/company";
import { divisions } from "@/data/divisions";
import { navItems, footerMenu, quoteCta } from "./nav-items";

/**
 * Social icons are deliberately absent. The source footer links to bare
 * facebook.com / instagram.com / linkedin.com placeholders plus a malformed
 * "https://www.linkedin/" (survey F-04b). Dead links are worse than none;
 * they return when SAI supplies real profile URLs.
 */
export default function Footer() {
  const emergency = contact.phones.find((p) => p.emergency)!;
  const general = contact.phones.filter((p) => !p.emergency);

  return (
    <footer className="bg-ink text-on-dark-muted">
      <div className="container py-[clamp(4rem,8vw,6rem)]">
        <div className="flex flex-col gap-8 border-b border-line-dark pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <Image
              src="/img/untitled-design-1-YanB4V4EnLU44Jy6.png"
              alt="SAI Sustainable Services Inc."
              width={160}
              height={100}
              className="h-11 w-auto"
            />
            <p className="mt-6 max-w-[40ch] text-h3 font-semibold leading-tight tracking-[-0.02em] text-on-dark">
              {group.name}
            </p>
            <p className="mt-2 text-[0.92rem]">{group.divisionsLine}</p>
          </div>
          <Link
            href={quoteCta.href}
            className="self-start rounded-[2px] bg-btn-dark px-7 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-btn-dark-ink transition-colors hover:bg-btn-dark-hover lg:self-auto"
          >
            {quoteCta.label} <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>

        <div className="grid gap-12 pt-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <nav aria-labelledby="footer-group">
            <h2 id="footer-group" className="eyebrow text-on-dark-faint">SAI Group</h2>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {divisions.map((d) => (
                <li key={d.key} data-division={d.key}>
                  <Link href={d.href} className="group flex items-start gap-3 text-on-dark transition-colors hover:text-signal">
                    <span aria-hidden="true" className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 bg-signal" />
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-explore">
            <h2 id="footer-explore" className="eyebrow text-on-dark-faint">Explore</h2>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm">
              {navItems
                .filter((i) => !i.menu && i.href !== "/")
                .map((i) => (
                  <li key={i.href}>
                    <Link href={i.href} className="transition-colors hover:text-on-dark">
                      {i.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-info">
            <h2 id="footer-info" className="eyebrow text-on-dark-faint">Information</h2>
            <ul className="mt-5 flex flex-col gap-2.5 text-sm">
              {footerMenu.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} className="transition-colors hover:text-on-dark">
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-on-dark-faint">Contact</h2>
            <address className="not-italic">
            <p className="mt-5 text-sm">
              <span className="block text-on-dark-faint">24/7 emergency</span>
              <a href={emergency.href} className="text-lede text-on-dark transition-colors hover:text-signal">
                {emergency.number}
              </a>
            </p>
            <ul className="mt-4 flex flex-col gap-1.5 text-sm">
              {general.map((p) => (
                <li key={p.number}>
                  <a href={p.href} className="transition-colors hover:text-on-dark">
                    {p.number}
                  </a>
                </li>
              ))}
              {contact.emails.slice(0, 1).concat(contact.emails.slice(-1)).map((e) => (
                <li key={e.address}>
                  <a href={e.href} className="break-all transition-colors hover:text-on-dark">
                    {e.address}
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-on-dark-faint">
              {company.headquarters}
              <br />
              {contact.hours.map((h) => `${h.days}: ${h.time}`).join(" · ")}
            </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-5 border-t border-line-dark pt-8">
          {certifications.map((c) => (
            <Image
              key={c.name}
              src={c.image}
              alt={c.alt}
              width={56}
              height={56}
              className="h-12 w-12 rounded-full bg-on-dark object-contain"
            />
          ))}
          <p className="text-xs text-on-dark-faint lg:ml-auto">{company.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
