import Link from "next/link";
import Image from "next/image";
import { company, contact, certifications } from "@/data/company";
import { navItems } from "./nav-items";

/**
 * Social icons are deliberately absent. The source footer links to bare
 * facebook.com / instagram.com / linkedin.com placeholders plus a malformed
 * "https://www.linkedin/" (survey F-04b). Dead links are worse than none;
 * they return when SAI supplies real profile URLs.
 */
export default function Footer() {
  return (
    <footer className="bg-ink text-on-dark-muted">
      <div className="container grid gap-14 py-20 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-20">
        <div>
          <Image
            src="/img/untitled-design-1-YanB4V4EnLU44Jy6.png"
            alt="SAI Sustainable Services Inc."
            width={160}
            height={100}
            className="h-11 w-auto"
          />
          <p className="measure mt-6 text-sm leading-relaxed">{company.announcement}</p>
          <div className="mt-8 flex items-center gap-4">
            {certifications.map((c) => (
              <Image
                key={c.name}
                src={c.image}
                alt={c.alt}
                width={64}
                height={64}
                className="h-14 w-14 rounded-full object-contain"
              />
            ))}
          </div>
        </div>

        <nav aria-label="Footer">
          <h2 className="eyebrow text-on-dark-faint">Explore</h2>
          <ul className="mt-5 flex flex-col gap-2.5 text-sm">
            {navItems.map((i) => (
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
          <ul className="mt-5 flex flex-col gap-2 text-sm">
            {contact.phones.map((p) => (
              <li key={p.number}>
                <a href={p.href} className="transition-colors hover:text-on-dark">
                  {p.number}
                </a>
              </li>
            ))}
          </ul>
          <ul className="mt-5 flex flex-col gap-2 text-sm">
            {contact.emails.map((e) => (
              <li key={e.address}>
                <a href={e.href} className="break-all transition-colors hover:text-on-dark">
                  {e.address}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-sm">
            <p className="text-on-dark-faint">{company.headquarters}</p>
            {contact.hours.map((h) => (
              <p key={h.days}>
                {h.days}: {h.time}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-line-dark">
        <div className="container py-6 text-xs text-on-dark-faint">
          {company.copyright}
        </div>
      </div>
    </footer>
  );
}
