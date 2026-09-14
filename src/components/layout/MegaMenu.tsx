"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { divisions } from "@/data/divisions";

/**
 * Desktop "Divisions" dropdown. Three entries, each in its own palette, with IT
 * Solutions marked as the focus. Deliberately compact — the full service index
 * lives on the division pages, not in the header.
 *
 * Opens on hover for pointer users and on click/Enter for keyboard users, and
 * closes on Escape, outside click, or focus leaving the panel.
 */
export default function MegaMenu({ active = false }: { active?: boolean }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const closeTimer = useRef(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      button.current?.focus();
    };
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
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelClose();
        setOpen(true);
      }}
      onPointerLeave={(e) => e.pointerType === "mouse" && scheduleClose()}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls="divisions-menu"
        // A mouse user has already opened the panel by hovering, so their click must not
        // toggle it shut again. Keyboard activation (detail === 0) toggles as expected.
        onClick={(e) => setOpen((v) => (e.detail === 0 ? !v : true))}
        className={`group relative flex items-center gap-1.5 text-[0.82rem] font-medium transition-colors ${
          open || active ? "text-on-dark" : "text-on-dark-muted hover:text-on-dark"
        }`}
      >
        Divisions
        <svg aria-hidden="true" viewBox="0 0 10 6" className={`h-1.5 w-2.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.4" />
        </svg>
        <span
          aria-hidden="true"
          className={`absolute -bottom-1.5 left-0 h-px bg-signal transition-all duration-500 ease-luxe ${active ? "w-full" : "w-0"}`}
        />
      </button>

      <div
        id="divisions-menu"
        className={`absolute left-1/2 top-[calc(100%+1.35rem)] z-50 w-[min(62rem,92vw)] -translate-x-1/2 border border-line-dark bg-ink shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] transition-[opacity,transform] duration-300 ease-luxe ${
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        hidden={!open}
      >
        <ul className="grid grid-cols-3">
          {divisions.map((d) => (
            <li key={d.key} data-division={d.key} className="border-r border-line-dark bg-ink last:border-r-0">
              <div className="flex h-full flex-col p-7">
                <div className="flex items-center gap-2.5">
                  <span aria-hidden="true" className="h-2 w-2 bg-signal" />
                  <span className="tnum eyebrow text-on-dark-faint">{d.index}</span>
                  {d.focus && <span className="eyebrow ml-auto text-signal">Focus</span>}
                </div>
                <Link
                  href={d.href}
                  onClick={() => setOpen(false)}
                  className="mt-4 text-[1.08rem] font-semibold leading-snug tracking-[-0.01em] text-on-dark transition-colors hover:text-signal"
                >
                  {d.name}
                </Link>
                <p className="mt-2 text-[0.82rem] leading-relaxed text-on-dark-muted">{d.line}</p>
                <ul className="mt-5 flex flex-col border-t border-line-dark pt-4">
                  {d.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block py-1.5 text-[0.84rem] text-on-dark-muted transition-colors hover:text-on-dark"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
