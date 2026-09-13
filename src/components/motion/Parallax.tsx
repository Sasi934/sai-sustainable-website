"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Scrub-driven parallax. The child is scaled slightly so the translation never
 * exposes an edge, and the whole effect is skipped on reduced motion and on
 * coarse pointers, where it costs more than it gives.
 */
export default function Parallax({
  children,
  amount = 12,
  className = "",
}: {
  children: React.ReactNode;
  /** Travel as a percentage of the element's height. */
  amount?: number;
  className?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const inner = el.firstElementChild;
    if (!inner) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        inner,
        { yPercent: -amount / 2, scale: 1 + amount / 100 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={wrap} className={`overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
