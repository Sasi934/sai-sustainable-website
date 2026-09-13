"use client";

import { Suspense, lazy, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDeviceTier } from "@/hooks/useDeviceTier";

const scenes = {
  containment: lazy(() => import("./scenes/ContainmentScene")),
  lattice: lazy(() => import("./scenes/LatticeScene")),
  massing: lazy(() => import("./scenes/MassingScene")),
};

export type SceneName = keyof typeof scenes;

type Props = {
  scene: SceneName;
  /**
   * Shown on `static` tier and until the canvas mounts. Optional: the technology
   * division has no photography in either approved source (survey F-09), and
   * illustrating it with abatement crews would misrepresent the work. Omitting it
   * renders a designed ground instead of a borrowed, misleading photograph.
   */
  fallbackImage?: string;
  fallbackAlt?: string;
  /**
   * Positioning is the caller's, not ours. The base class list deliberately
   * contains no position utility: mixing `relative` here with an `absolute`
   * passed in className leaves the winner up to stylesheet order.
   */
  className?: string;
  priority?: boolean;
  /**
   * Where to hold the crop. The hero photograph is a 2.5:1 banner with its
   * subject on the right, so a centred crop on a narrow viewport shows only
   * blurred background.
   */
  imageClassName?: string;
};

/**
 * Gates every WebGL scene on three things: device tier, viewport proximity, and
 * a Suspense boundary. On `static` tier the dynamic import never runs, so the
 * Three.js chunk is never fetched at all.
 */
export default function SceneFrame({
  scene,
  fallbackImage,
  fallbackAlt,
  className = "",
  priority = false,
  imageClassName = "object-center",
}: Props) {
  const tier = useDeviceTier();
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || tier === "static") return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [tier]);

  const Scene = scenes[scene];
  const showCanvas = tier !== "static" && near;

  return (
    <div ref={ref} className={`isolate overflow-hidden ${className}`}>
      {fallbackImage ? (
        <Image
          src={fallbackImage}
          alt={fallbackAlt ?? ""}
          fill
          priority={priority}
          sizes="100vw"
          className={`object-cover transition-opacity duration-1000 ${imageClassName} ${
            showCanvas ? "opacity-85" : "opacity-90"
          }`}
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(120%_90%_at_75%_15%,var(--forest-800)_0%,var(--ink)_62%)]"
        />
      )}

      {/*
        Directional scrim rather than a symmetric vignette. The type sits bottom-left,
        so darkness is spent where the words are and the photographic subject on the
        right stays legible. A centred vignette darkens exactly the wrong region.
      */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-ink via-ink/55 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-ink via-ink/35 to-transparent"
      />

      {showCanvas && (
        <Suspense fallback={null}>
          <div className="absolute inset-0 h-full w-full" aria-hidden="true">
            <Scene tier={tier} />
          </div>
        </Suspense>
      )}
    </div>
  );
}
