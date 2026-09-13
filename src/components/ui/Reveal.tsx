"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in ms for sibling groups. */
  delay?: number;
  /**
   * Only the two tags the site actually needs. A generic `createElement(as, …)`
   * hides the ref from React's static analysis; concrete JSX keeps it typed and
   * checkable.
   */
  as?: "div" | "li";
};

/**
 * L2 scroll reveal. Deliberately IntersectionObserver rather than ScrollTrigger:
 * these fire once and never scrub, so they do not need the scroll clock and stay
 * cheap on long pages.
 *
 * The element is visible by default in CSS when scripting is unavailable, and on
 * reduced motion it is revealed immediately.
 */
export default function Reveal({ children, className = "", delay = 0, as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in");
      return;
    }

    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => el.classList.add("is-in"), delay);
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0.01 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [delay]);

  const cls = `reveal ${className}`;

  if (as === "li") {
    return (
      <li ref={ref as React.RefObject<HTMLLIElement>} className={cls}>
        {children}
      </li>
    );
  }

  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className={cls}>
      {children}
    </div>
  );
}
