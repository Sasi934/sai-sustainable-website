"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

/**
 * A brief wash between routes. Short by design — a long transition on a
 * services site reads as latency, not craft.
 */
export default function PageTransition() {
  const veil = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = veil.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      el,
      { opacity: 0.85 },
      { opacity: 0, duration: 0.55, ease: "power2.out" },
    );
  }, [pathname]);

  return (
    <div
      ref={veil}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[65] bg-ink opacity-0"
    />
  );
}
