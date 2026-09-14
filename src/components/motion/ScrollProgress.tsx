"use client";

import { useEffect, useRef } from "react";

/**
 * Reading progress. Driven by rAF-throttled scroll rather than ScrollTrigger —
 * it is one value on one element and does not need the timeline machinery.
 *
 * Deliberately not gated on prefers-reduced-motion: the bar tracks the user's
 * own scroll position rather than animating independently, so it carries none
 * of the vestibular risk that guard exists to avoid. It is an indicator, not
 * an animation.
 */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const el = bar.current;
      if (!el) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
      el.style.transform = `scaleX(${p})`;
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-transparent"
    >
      <div
        ref={bar}
        className="h-full origin-left scale-x-0 bg-signal"
        style={{ willChange: "transform" }}
      />
    </div>
  );
}
