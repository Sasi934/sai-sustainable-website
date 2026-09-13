"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { serviceGroups } from "@/data/services";
import { divisions } from "@/data/divisions";

/**
 * Desktop expanding navigation (§13).
 *
 * Opens on hover for pointer users and on click/Enter for keyboard users, and
 * closes on Escape or focus leaving the panel — so it is operable without a
 * mouse rather than hover-only.
 */
export default function MegaMenu() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const closeTimer = useRef(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onClick);
    };
  }, [open]);

  const cancelClose = () => window.clearTimeout(closeTimer.current);
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      ref={wrap}
      className="relative"
      onPointerEnter={() => {
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={scheduleClose}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={`group relative flex items-center gap-1.5 text-[0.8rem] font-medium tracking-wide transition-colors ${
          open ? "text-champagne" : "text-on-dark-muted hover:text-on-dark"
        }`}
      >
        Services
        <span
          aria-hidden="true"
          className={`text-[0.6rem] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        >
          &#9660;
        </span>
      </button>

      <div
        className={`absolute left-1/2 top-[calc(100%+1.15rem)] z-50 w-[min(58rem,88vw)] -translate-x-1/2 border border-line-dark bg-ink/98 backdrop-blur-md transition-all duration-300 ease-luxe ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        hidden={!open}
      >
        <div className="grid grid-cols-[1.1fr_2fr]">
          <div className="border-r border-line-dark p-7">
            <p className="eyebrow text-on-dark-faint">Divisions</p>
            <ul className="mt-5 flex flex-col gap-4">
              {divisions.map((d) => (
                <li key={d.key}>
                  <Link
                    href={d.href}
                    className="group/item block"
                    onClick={() => setOpen(false)}
                  >
                    <span className="text-lede text-on-dark transition-colors group-hover/item:text-champagne">
                      {d.name}
                    </span>
                    <span className="mt-1 block text-[0.82rem] leading-snug text-on-dark-faint">
                      {d.line}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-7">
            <p className="eyebrow text-on-dark-faint">All services</p>
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-6">
              {serviceGroups.map((g) => (
                <div key={g.slug}>
                  <Link
                    href={g.path}
                    onClick={() => setOpen(false)}
                    className="text-[0.86rem] font-semibold text-on-dark transition-colors hover:text-champagne"
                  >
                    {g.name}
                  </Link>
                  <ul className="mt-2 flex flex-col gap-1">
                    {g.services.map((s) => (
                      <li
                        key={s.slug}
                        className="text-[0.8rem] leading-snug text-on-dark-faint"
                      >
                        {s.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
