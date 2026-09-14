import Image from "next/image";
import { heroes, type HeroSlot } from "@/data/heroes";
import { resolveImage } from "@/lib/images";
import DetectionOverlay from "./DetectionOverlay";

/**
 * Resolves a slot to the photograph that will render. `primary` is true only for
 * the slot's own sources — detection markers are never drawn over a fallback.
 */
export function resolveHero(slot: HeroSlot["key"]) {
  const hero = heroes[slot];
  const primary = resolveImage(...hero.sources);
  if (primary) return { hero, image: primary, primary: true, alt: hero.alt };
  const fallback = resolveImage(...(hero.fallbacks ?? []));
  if (fallback) return { hero, image: fallback, primary: false, alt: hero.fallbackAlt ?? hero.alt };
  return { hero, image: null, primary: false, alt: hero.alt };
}

/** True when the slot will show its detection markers (a real road photo is in place). */
export const hasDetections = (slot: HeroSlot["key"]) => {
  const r = resolveHero(slot);
  return r.primary && Boolean(r.hero.detections?.length);
};

/**
 * A division's cinematic photograph — or, until the commissioned file exists,
 * that division's designed ground. Server component: the existence check runs
 * at prerender, so there is never a broken image and never a client flash.
 *
 * Fills its positioned parent. The media layer carries the `.hero-media` reveal
 * and drift when `animate` is set; the overlay sits inside it so the markers
 * move with the photograph rather than sliding across it.
 */
export default function HeroImage({
  slot,
  animate = false,
  priority = false,
  overlay = "none",
  sizes = "100vw",
  scrim,
  className = "",
}: {
  slot: HeroSlot["key"];
  animate?: boolean;
  priority?: boolean;
  overlay?: "none" | "subtle" | "full";
  sizes?: string;
  /** Darkening layers, painted between the photograph and the overlay so the markers stay legible. */
  scrim?: React.ReactNode;
  className?: string;
}) {
  const { hero, image, primary, alt } = resolveHero(slot);
  const showOverlay = overlay !== "none" && image && primary && hero.detections?.length;

  return (
    <div className={`absolute inset-0 overflow-hidden bg-ink ${className}`}>
      <div className={`absolute inset-0 ${animate ? "hero-media" : ""}`}>
        {image ? (
          <Image
            src={image.src}
            alt={alt}
            fill
            priority={priority}
            sizes={sizes}
            className={`object-cover ${hero.position ?? "object-center"}`}
          />
        ) : (
          <Placeholder src={hero.sources[0]} />
        )}
      </div>
      {scrim}
      {/* Same animation class as the media layer, started on the same frame, so the
          markers drift with the photograph while sitting above the scrims. */}
      {showOverlay && (
        <div className={`absolute inset-0 ${animate ? "hero-media" : ""}`}>
          <DetectionOverlay
            detections={hero.detections!}
            width={image.width}
            height={image.height}
            tone={overlay === "subtle" ? "subtle" : "full"}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Designed ground for an unsupplied photograph: the division's deep tone, a
 * single soft light source and film grain. No illustration, no fake imagery.
 * In development only, a caption names the file to supply.
 */
function Placeholder({ src }: { src: string }) {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute inset-0 bg-[radial-gradient(90%_70%_at_78%_28%,var(--hero-glow)_0%,transparent_65%),linear-gradient(180deg,var(--ink-soft)_0%,var(--ink)_78%)]" />
      <div className="grain absolute inset-0" />
      {process.env.NODE_ENV === "development" && (
        <p className="absolute right-4 top-4 z-10 max-w-[80%] border border-dashed border-on-dark/30 bg-ink/70 px-3 py-2 text-[0.68rem] leading-snug text-on-dark-muted">
          Photograph pending — supply <code className="text-on-dark">public{src}</code> (.jpg, .png or .webp)
          <br />
          Art direction: docs/HERO-IMAGES.md
        </p>
      )}
    </div>
  );
}
