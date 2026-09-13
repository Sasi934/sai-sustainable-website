"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { intro } from "@/data/company";

const SEEN_KEY = "sai:intro-seen";
export const INTRO_DONE_EVENT = "sai:intro-done";

/**
 * Layout effect on the client so the skip decision lands before paint — with a
 * plain effect the overlay would flash for a frame on every repeat visit.
 */
const useBeforePaint = typeof window !== "undefined" ? useLayoutEffect : useEffect;

function markDone() {
  document.documentElement.dataset.introDone = "1";
  window.dispatchEvent(new CustomEvent(INTRO_DONE_EVENT));
}

/**
 * Opening title sequence on the homepage only.
 *
 * Shown once per browser session: landing on the domain plays it, moving around
 * the site afterwards does not. The overlay covers a hero that has already been
 * painted underneath, so nothing is waiting on it to start loading — but it does
 * delay the moment the visitor sees that hero, which is a real Largest
 * Contentful Paint cost. That is the reason it is short, skippable by any input,
 * and limited to one route.
 *
 * On reduced motion it never plays at all.
 */
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);

  /*
    No React state here on purpose. The overlay renders once, never re-renders,
    and is torn down imperatively — routing that through setState would mean
    setting state inside an effect for no benefit.
  */
  useBeforePaint(() => {
    const el = root.current;
    if (!el) return;

    const skip =
      window.sessionStorage.getItem(SEEN_KEY) === "1" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const hide = () => {
      el.setAttribute("hidden", "");
      el.style.display = "none";
      el.style.pointerEvents = "none";
    };

    if (skip) {
      hide();
      markDone();
      return;
    }

    window.sessionStorage.setItem(SEEN_KEY, "1");

    // Nothing behind the overlay should scroll while it is up.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const finish = () => {
      document.body.style.overflow = previousOverflow;
      hide();
      markDone();
    };

    let settled = false;
    const settle = () => {
      if (settled) return;
      settled = true;
      finish();
    };

    /*
      A full-screen overlay that fails to tear down traps the visitor: the page
      is invisible behind it and body scroll stays locked. So teardown does not
      depend on the timeline reporting completion — an independent timer settles
      it regardless, and the timeline's own onComplete just gets there sooner.
    */
    const IN = 0.95;      // word + rule + caption reveal
    const HOLD = intro.duration;
    const OUT = 0.55;
    const safety = window.setTimeout(settle, (IN + HOLD + OUT + 1.2) * 1000);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: settle });

      tl.from("[data-intro-word]", { yPercent: 112, duration: 0.85, stagger: 0.07 }, 0)
        .from("[data-intro-rule]", { scaleX: 0, duration: 0.7 }, 0.35)
        .from("[data-intro-caption]", { opacity: 0, y: 10, duration: 0.6 }, 0.5)
        .to("[data-intro-panel]", { opacity: 0, duration: OUT }, IN + HOLD)
        .to(el, { opacity: 0, duration: OUT }, IN + HOLD + 0.1);

      // Any deliberate input cuts it short rather than making people wait.
      const cut = () => {
        tl.timeScale(3.2);
      };
      ["pointerdown", "keydown", "wheel", "touchstart"].forEach((evt) =>
        window.addEventListener(evt, cut, { once: true, passive: true }),
      );
    }, el);

    return () => {
      window.clearTimeout(safety);
      document.body.style.overflow = previousOverflow;
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={root}
      // Decorative: the same words are in the page's real heading beneath it.
      aria-hidden="true"
      className="fixed inset-0 z-[90] flex items-center justify-center bg-ink"
    >
      <div data-intro-panel className="flex flex-col items-center px-6 text-center">
        <h2 className="display flex flex-wrap justify-center gap-x-[0.22em] text-[clamp(2.6rem,9vw,6.5rem)] leading-none tracking-[0.06em] text-on-dark">
          {intro.title.split(" ").map((word, i) => (
            <span key={`${word}-${i}`} className="overflow-hidden pb-[0.08em]">
              <span data-intro-word className="inline-block">
                {word}
              </span>
            </span>
          ))}
        </h2>

        <span
          data-intro-rule
          className="mt-7 block h-px w-[min(18rem,60vw)] origin-center bg-champagne"
        />

        <p
          data-intro-caption
          className="eyebrow mt-6 text-champagne"
        >
          {intro.caption}
        </p>
      </div>
    </div>
  );
}
