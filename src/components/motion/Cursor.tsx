"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";

/**
 * Whether a pointer companion is appropriate. Read through useSyncExternalStore
 * rather than set in a mount effect, so there is no cascading render and the
 * server snapshot is explicit.
 */
const subscribe = () => () => {};
const isFinePointer = () =>
  window.matchMedia("(pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const serverSnapshot = () => false;

/**
 * Pointer companion. Fine pointers only — on touch it would be a permanent
 * artefact, and on reduced motion it is noise. Never replaces the native
 * cursor, so nothing is lost if it does not render.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(subscribe, isFinePointer, serverSnapshot);

  useEffect(() => {
    if (!enabled) return;
    const el = dot.current;
    if (!el) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.42, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.42, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const interactive = (e.target as Element)?.closest?.(
        "a, button, input, textarea, label, [role='button']",
      );
      gsap.to(el, {
        scale: interactive ? 2.4 : 1,
        opacity: interactive ? 0.5 : 1,
        duration: 0.32,
        ease: "power3.out",
      });
    };

    const leave = () => gsap.to(el, { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to(el, { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={dot}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal mix-blend-difference"
      style={{ willChange: "transform" }}
    />
  );
}
