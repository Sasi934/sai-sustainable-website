/**
 * Cinematic hero photography.
 *
 * Each slot lists `sources` — the supplied file, in any of the accepted formats —
 * and optional `fallbacks`. The first source that exists in /public is used; if
 * none does, the first existing fallback; otherwise the division's designed
 * ground (never a broken image). Full brief: docs/HERO-IMAGES.md.
 *
 * `detections` are drawn ONLY over a matching `sources` file, never over a
 * fallback — so pothole markers can never land on an unrelated photograph.
 * Values are percent of the photograph's own width and height; the SVG shares
 * the image's aspect ratio and crop, so they stay locked to the same pixels.
 */

import type { DivisionKey } from "./divisions";

export type Detection = {
  kind: "box" | "point" | "lane";
  label?: string;
  /** Box: [x, y, width, height]. Point: [x, y]. Lane: flat [x1, y1, x2, y2, …]. */
  at: number[];
};

export type HeroSlot = {
  key: "group" | DivisionKey | "road";
  sources: string[];
  fallbacks?: string[];
  alt: string;
  /** Alt text when a fallback is shown instead of the sources. */
  fallbackAlt?: string;
  /** Tailwind object-position utilities for the crop (mobile first). */
  position?: string;
  detections?: Detection[];
};

const formats = (base: string) => [`${base}.jpg`, `${base}.png`, `${base}.webp`];

/** Supplied by SAI 2026-09-14. */
const IT_OFFICE = formats("/img/heroes/it-solutions-hero");

export const heroes: Record<HeroSlot["key"], HeroSlot> = {
  // Homepage — SAI supplied frame, 2026-09-14.
  group: {
    key: "group",
    sources: formats("/img/heroes/sai-group-hero"),
    alt: "Deep green abstract of curving leaf forms with fine vein detail, with the SAI Sustainable Services logo",
    position: "object-[78%_center] lg:object-center",
  },

  environmental: {
    key: "environmental",
    sources: formats("/img/heroes/environmental-restoration-site"),
    // SAI's own crew photograph — used until a dedicated frame is supplied.
    fallbacks: ["/img/untitled-design-AMqnRjrGOncj2VPn.png"],
    alt: "Remediation crew in protective suits working on a controlled environmental restoration site",
    fallbackAlt: "SAI remediation crew in full protective suits and respirators on a controlled worksite",
    position: "object-[72%_center] lg:object-center",
  },

  // SAI supplied frame, 2026-09-14.
  exim: {
    key: "exim",
    sources: formats("/img/heroes/exim-hero"),
    alt: "Container ship berthed beside gantry cranes at a port at sunset, with trucks carrying containers along the quay and a cargo plane overhead",
    position: "object-[72%_center] lg:object-center",
  },

  // SAI supplied frame, 2026-09-14. No overlay: this is an office, not a road.
  it: {
    key: "it",
    sources: IT_OFFICE,
    alt: "Software developers at multi-monitor desks in a dark office overlooking a city skyline at dusk, with data dashboards on screen",
    position: "object-[70%_center] lg:object-center",
  },

  /**
   * AI road defect detection. Waits for a real road photograph; until then it
   * shows the IT office frame with no detection markers.
   */
  road: {
    key: "road",
    sources: formats("/img/heroes/it-smart-road"),
    fallbacks: IT_OFFICE,
    alt: "Low-angle photograph of an urban road surface with computer-vision markers identifying potholes, cracks, lane lines and GPS points",
    fallbackAlt: "Software developers at multi-monitor desks in a dark office overlooking a city skyline at dusk",
    position: "object-center",
    // Composed for a road that recedes right of centre, clear of the headline.
    detections: [
      { kind: "lane", at: [56, 100, 66, 52] },
      { kind: "lane", at: [96, 100, 79, 52] },
      { kind: "box", label: "Pothole · High", at: [62, 72, 12, 10] },
      { kind: "box", label: "Crack · Medium", at: [77, 62, 9, 6.5] },
      { kind: "box", label: "Patch · Low", at: [69, 55, 5.5, 4] },
      { kind: "point", label: "GPS", at: [68, 77] },
      { kind: "point", at: [81.5, 65] },
    ],
  },
};
