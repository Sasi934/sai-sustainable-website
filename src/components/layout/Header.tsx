"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems } from "./nav-items";
import MegaMenu from "./MegaMenu";
import { contact } from "@/data/company";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock background scroll and allow Escape to close the full-screen menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      /*
        Always painted, never transparent. The header is sticky and therefore in
        normal flow, so a transparent state at scroll-top would show the ivory
        body ground rather than the hero behind it.
      */
      className={`sticky top-0 z-50 border-b bg-ink/95 backdrop-blur-md transition-colors duration-500 ${
        solid || open ? "border-line-dark" : "border-transparent"
      }`}
    >
      <div className="container flex items-center justify-between gap-6 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="SAI Sustainable Services Inc. — home">
          <Image
            src="/img/untitled-design-1-YanB4V4EnLU44Jy6.png"
            alt="SAI Sustainable Services Inc."
            width={132}
            height={83}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            // Services expands into the mega menu rather than linking flatly.
            if (item.href === "/services") return <MegaMenu key={item.href} />;

            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative text-[0.8rem] font-medium tracking-wide transition-colors ${
                  active ? "text-champagne" : "text-on-dark-muted hover:text-on-dark"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-px bg-current transition-all duration-500 ease-luxe ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/contact-us"
            className="rounded-[2px] bg-forest-600 px-5 py-2.5 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-on-dark transition-colors hover:bg-forest-500"
          >
            Get a Quote
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="flex items-center gap-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-on-dark lg:hidden"
        >
          {open ? "Close" : "Menu"}
          <span aria-hidden="true" className="flex h-3 w-5 flex-col justify-between">
            <span className={`h-px w-full bg-current transition-transform duration-300 ${open ? "translate-y-[5.5px] rotate-45" : ""}`} />
            <span className={`h-px w-full bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`h-px w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* Full-screen mobile navigation (§13) */}
      <div
        id="mobile-nav"
        hidden={!open}
        className="fixed inset-0 top-[var(--header-h,73px)] z-40 overflow-y-auto bg-ink lg:hidden"
      >
        <nav className="container flex flex-col py-8" aria-label="Mobile">
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="border-b border-line-dark py-5 font-[family-name:var(--font-display)] text-[2rem] leading-tight text-on-dark"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-3 text-on-dark-muted">
            {contact.phones.map((p) => (
              <a key={p.number} href={p.href} className="text-lg text-on-dark">
                {p.number}
              </a>
            ))}
            <a href={contact.emails[0].href} className="mt-2">
              {contact.emails[0].address}
            </a>
          </div>
          <Link
            href="/contact-us"
            onClick={() => setOpen(false)}
            className="mt-8 rounded-[2px] bg-forest-600 px-6 py-4 text-center text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-on-dark"
          >
            Get a Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
