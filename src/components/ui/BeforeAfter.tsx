"use client";

import Image from "next/image";
import { useCallback, useId, useRef, useState } from "react";

/**
 * Before/after wipe.
 *
 * Fully keyboard operable: the handle is a real range input, so arrow keys work
 * and screen readers announce a labelled slider. Pointer dragging updates the
 * same value, so there is one source of truth and no divergence between input
 * methods.
 */
export default function BeforeAfter({
  before,
  after,
  beforeAlt,
  afterAlt,
  beforeLabel = "Before",
  afterLabel = "After",
  className = "",
}: {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const frame = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const id = useId();

  const setFromClientX = useCallback((clientX: number) => {
    const el = frame.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const next = ((clientX - r.left) / r.width) * 100;
    setPos(Math.min(100, Math.max(0, next)));
  }, []);

  return (
    <figure className={`m-0 ${className}`}>
      <div
        ref={frame}
        className="relative aspect-4/3 touch-pan-y select-none overflow-hidden bg-ink"
        onPointerDown={(e) => {
          dragging.current = true;
          e.currentTarget.setPointerCapture(e.pointerId);
          setFromClientX(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && setFromClientX(e.clientX)}
        onPointerUp={(e) => {
          dragging.current = false;
          e.currentTarget.releasePointerCapture(e.pointerId);
        }}
      >
        <Image
          src={after}
          alt={afterAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />

        {/* The "before" state is clipped away as the handle moves right. */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        >
          <Image
            src={before}
            alt={beforeAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>

        <span className="pointer-events-none absolute left-4 top-4 bg-ink/75 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-on-dark">
          {beforeLabel}
        </span>
        <span className="pointer-events-none absolute right-4 top-4 bg-ink/75 px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.14em] text-on-dark">
          {afterLabel}
        </span>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-px bg-on-dark"
          style={{ left: `${pos}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-on-dark bg-ink/80 text-on-dark">
            <span className="text-xs tracking-tighter">&#8596;</span>
          </span>
        </div>
      </div>

      <label htmlFor={id} className="sr-only">
        Reveal before and after
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="mt-4 w-full accent-[var(--forest-600)]"
      />
    </figure>
  );
}
