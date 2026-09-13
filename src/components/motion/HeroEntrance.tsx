"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { INTRO_DONE_EVENT } from "./Intro";

/**
 * L1 — the orchestrated opening.
 *
 * Deliberately not a full-screen preloader: covering the hero delays Largest
 * Contentful Paint. This animates elements that are already painted, so LCP is
 * never gated on a timeline finishing. (The separate title sequence in Intro is
 * a client-directed exception and runs once per session.)
 *
 * Elements opt in with data-entrance="1|2|3" to set their order. When the title
 * sequence is on screen this waits for it, so the two never animate at once.
 */
export default function HeroEntrance({ scope }: { scope: string }) {
  useEffect(() => {
    const root = document.querySelector(scope);
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: gsap.Context | null = null;
    let safety = 0;

    const play = () => {
      if (ctx) return;
      window.clearTimeout(safety);
      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from('[data-entrance="1"]', { opacity: 0, y: 18, duration: 0.8 }, 0.05)
          .from('[data-entrance="2"]', { opacity: 0, y: 26, duration: 1.0 }, 0.2)
          .from('[data-entrance="3"]', { opacity: 0, y: 20, duration: 0.9, stagger: 0.09 }, 0.45);
      }, root as Element);
    };

    if (document.documentElement.dataset.introDone === "1") {
      play();
    } else {
      window.addEventListener(INTRO_DONE_EVENT, play, { once: true });
      // Never hang waiting for a sequence that may not be on this page.
      safety = window.setTimeout(play, 2600);
    }

    return () => {
      window.removeEventListener(INTRO_DONE_EVENT, play);
      window.clearTimeout(safety);
      ctx?.revert();
    };
  }, [scope]);

  return null;
}
