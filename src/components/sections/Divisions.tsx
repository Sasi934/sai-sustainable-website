"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { divisions } from "@/data/divisions";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * 03 — Three portals.
 *
 * Composed mobile-first as a vertical narrative, then pinned and moved
 * horizontally on wide viewports — not the reverse, which is how pinned
 * sections usually end up broken on phones (survey §16).
 *
 * Numbered 01–03 because the divisions are an enumerated set the reader is
 * meant to hold as three, not because numbering looks editorial.
 */
export default function Divisions() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sec = section.current;
    const rail = track.current;
    if (!sec || !rail) return;

    const mm = gsap.matchMedia();

    // Pinning only above 1024px and only when motion is welcome. Below that the
    // list stays a normal vertical stack and nothing is pinned.
    mm.add(
      "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
      () => {
        const distance = () => rail.scrollWidth - window.innerWidth;
        if (distance() <= 0) return;

        const tween = gsap.to(rail, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: sec,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
          gsap.set(rail, { x: 0 });
        };
      },
    );

    return () => mm.revert();
  }, []);

  return (
    <section ref={section} className="overflow-hidden bg-ink py-[var(--section)] text-on-dark lg:py-0">
      <div className="container lg:flex lg:h-svh lg:flex-col lg:justify-center">
        <div className="lg:shrink-0">
          <p className="eyebrow text-champagne">One organisation</p>
          <h2 className="display mt-5 max-w-[18ch] text-h1">
            Three capabilities, one standard of delivery.
          </h2>
        </div>

        <ul
          ref={track}
          className="mt-12 grid gap-px bg-line-dark lg:mt-14 lg:flex lg:w-max lg:gap-8 lg:bg-transparent"
        >
          {divisions.map((d) => (
            <li
              key={d.key}
              className="group bg-ink lg:w-[clamp(22rem,32vw,30rem)] lg:shrink-0 lg:bg-transparent"
            >
              <Link
                href={d.href}
                className="flex h-full flex-col p-8 transition-colors duration-500 hover:bg-ink-raised lg:p-0 lg:hover:bg-transparent"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={d.image}
                    alt={d.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover opacity-70 transition-all duration-[1200ms] ease-luxe group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>

                <p className="eyebrow mt-8 text-on-dark-faint">{d.index}</p>
                <h3 className="display mt-3 text-h3">{d.title}</h3>
                <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-on-dark-muted">
                  {d.line}
                </p>

                <span className="eyebrow mt-8 inline-flex items-center gap-2 text-champagne">
                  {d.name}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-500 ease-luxe group-hover:translate-x-1.5"
                  >
                    &rarr;
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
