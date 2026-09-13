"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  /** Play immediately on mount instead of waiting for scroll. */
  immediate?: boolean;
  delay?: number;
};

/**
 * Word-by-word mask reveal.
 *
 * Words are rendered on the server exactly as they render on the client, so
 * there is no hydration mismatch and no layout shift — GSAP only animates what
 * is already in the document. Without JS the text is simply visible.
 */
export default function MaskText({
  children,
  className = "",
  as = "h2",
  immediate = false,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    if (!words.length) return;

    const ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 108 });

      const tween = gsap.to(words, {
        yPercent: 0,
        duration: 1.05,
        ease: "power3.out",
        stagger: 0.045,
        delay,
        paused: !immediate,
      });

      if (immediate) return;

      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => tween.play(),
      });
    }, el);

    return () => ctx.revert();
  }, [immediate, delay, children]);

  const Tag = as;
  const words = children.split(" ");

  return (
    <Tag ref={ref as never} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
          // A little vertical room so descenders are not clipped by the mask.
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <span data-word className="inline-block will-change-transform">
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </Tag>
  );
}
