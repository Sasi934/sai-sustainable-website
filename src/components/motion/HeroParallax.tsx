"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll parallax for a full-bleed hero photograph. Moves the wrapper, never the
 * media layer, so it composes with the CSS reveal/drift animation on the child
 * instead of fighting it for `transform`.
 */
export default function HeroParallax({
  children,
  amount = 12,
}: {
  children: React.ReactNode;
  /** Downward travel as a percentage of the hero's height by the time it leaves. */
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: amount,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [amount]);

  return (
    <div ref={ref} className="absolute inset-0 will-change-transform">
      {children}
    </div>
  );
}
