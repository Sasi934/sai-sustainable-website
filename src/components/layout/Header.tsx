"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { navItems, quoteCta } from "./nav-items";
import MegaMenu from "./MegaMenu";
import { contact } from "@/data/company";
import { divisions, divisionForPath } from "@/data/divisions";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();
  // The header wears the palette of the division being viewed, so the chrome and
  // the page read as one identity (navy on EXIM, forest on Environmental, …).
  const division = divisionForPath(pathname);

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

  const emergency = contact.phones.find((p) => p.emergency)!;

  return (
    <>
    <header
      data-division={division}
      /*
        Always painted, never transparent. The header is sticky and therefore in
        normal flow, so a transparent state at scroll-top would show the ivory
        body ground rather than the hero behind it.
      */
      className={`sticky top-0 z-50 border-b bg-ink/95 backdrop-blur-md transition-colors duration-500 ${
        solid || open ? "border-line-dark" : "border-transparent"
      }`}
    >
      <div className="container flex h-[4.5rem] items-center justify-between gap-6">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="SAI Group — home">
          <Image
            src="/img/untitled-design-1-YanB4V4EnLU44Jy6.png"
            alt="SAI Sustainable Services Inc."
            width={132}
            height={83}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary">
          {navItems.map((item) => {
            if (item.menu === "divisions") return <MegaMenu key={item.label} active={Boolean(division)} />;

            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative text-[0.82rem] font-medium transition-colors ${
                  active ? "text-on-dark" : "text-on-dark-muted hover:text-on-dark"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-1.5 left-0 h-px bg-signal transition-all duration-500 ease-luxe ${
                    active ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href={quoteCta.href}
            className="hidden rounded-[2px] bg-btn-dark px-5 py-2.5 text-[0.74rem] font-semibold uppercase tracking-[0.14em] text-btn-dark-ink transition-colors hover:bg-btn-dark-hover sm:inline-block"
          >
            {quoteCta.label}
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="flex items-center gap-2.5 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-on-dark lg:hidden"
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden="true" className="flex h-3 w-5 flex-col justify-between">
              <span className={`h-px w-full bg-current transition-transform duration-300 ${open ? "translate-y-[5.5px] rotate-45" : ""}`} />
              <span className={`h-px w-full bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
              <span className={`h-px w-full bg-current transition-transform duration-300 ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>
    </header>

      {/*
        Full-screen mobile navigation. Rendered as a sibling of <header>, not a
        child: the header's backdrop-filter makes it the containing block for
        fixed descendants, which would collapse this panel to the header's height.
      */}
      <div
        id="mobile-nav"
        data-division={division}
        hidden={!open}
        className="fixed inset-x-0 bottom-0 top-[4.5rem] z-40 overflow-y-auto bg-ink lg:hidden"
      >
        <nav className="container flex flex-col pb-10 pt-4" aria-label="Mobile">
          <ul className="flex flex-col">
            {navItems.map((item) =>
              item.menu === "divisions" ? (
                <li key={item.label} className="border-b border-line-dark py-5">
                  <p className="eyebrow text-on-dark-faint">{item.label}</p>
                  <ul className="mt-3 flex flex-col gap-1">
                    {divisions.map((d) => (
                      <li key={d.key} data-division={d.key}>
                        <Link
                          href={d.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 py-2 text-[1.15rem] font-medium leading-snug text-on-dark"
                        >
                          <span aria-hidden="true" className="h-2 w-2 shrink-0 bg-signal" />
                          {d.name}
                          {d.focus && <span className="eyebrow ml-auto text-signal">Focus</span>}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block border-b border-line-dark py-4 text-[1.6rem] font-semibold leading-tight tracking-[-0.02em] text-on-dark"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <Link
            href={quoteCta.href}
            onClick={() => setOpen(false)}
            className="mt-8 rounded-[2px] bg-btn-dark px-6 py-4 text-center text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-btn-dark-ink"
          >
            {quoteCta.label}
          </Link>

          <div className="mt-8 flex flex-col gap-2 text-on-dark-muted">
            <p className="eyebrow text-on-dark-faint">24/7 emergency</p>
            <a href={emergency.href} className="text-lg text-on-dark">
              {emergency.number}
            </a>
            <a href={contact.emails[0].href} className="mt-2">
              {contact.emails[0].address}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
