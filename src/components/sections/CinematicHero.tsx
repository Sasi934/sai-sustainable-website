import { Fragment } from "react";
import Button from "@/components/ui/Button";
import HeroImage from "@/components/visual/HeroImage";
import HeroParallax from "@/components/motion/HeroParallax";
import type { HeroSlot } from "@/data/heroes";
import type { HeroCopy } from "@/data/types";

/**
 * Full-bleed 2D cinematic hero, shared by the group homepage and the three
 * division pages.
 *
 * Sequence (all CSS, from first paint): dark base → photograph reveals and
 * begins a slow drift → eyebrow → H1 word mask → sub-text → CTAs. Every word
 * of the H1 and every CTA is real server-rendered HTML; nothing important lives
 * only inside the animation or the image.
 */
export default function CinematicHero({
  copy,
  slot,
  overlay = "none",
  size = "full",
  children,
}: {
  copy: HeroCopy;
  slot: HeroSlot["key"];
  overlay?: "none" | "subtle" | "full";
  size?: "full" | "tall";
  /** Rendered under the CTAs — e.g. the homepage division index. */
  children?: React.ReactNode;
}) {
  const words = copy.heading.split(" ");
  const minH = size === "full" ? "min-h-[calc(100svh-4.5rem)]" : "min-h-[82svh]";

  return (
    <section className={`relative isolate flex ${minH} flex-col overflow-hidden bg-ink text-on-dark`}>
      <HeroParallax>
        <HeroImage
          slot={slot}
          animate
          priority
          overlay={overlay}
          scrim={
            /* Directional scrims: darkness is spent where the type sits (bottom-left),
               so the subject of the photograph stays legible on the right. */
            <>
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-r from-ink/90 via-ink/45 to-ink/5" />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-ink via-ink/25 to-ink/40" />
            </>
          }
        />
      </HeroParallax>

      <div className="container relative flex flex-1 flex-col justify-end pb-[clamp(2.5rem,6vw,5rem)] pt-28">
        <p className="hero-step eyebrow flex items-center gap-3 text-signal" style={{ "--d": 300 } as React.CSSProperties}>
          <span aria-hidden="true" className="h-px w-8 bg-signal" />
          {copy.eyebrow}
        </p>

        <h1 className="display mt-6 max-w-[17ch] text-hero">
          {words.map((word, i) => (
            <Fragment key={`${word}-${i}`}>
              <span className="hero-word">
                <span style={{ "--i": i } as React.CSSProperties}>{word}</span>
              </span>
              {i < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h1>

        {copy.supporting && (
          <p
            className="hero-step mt-5 text-h3 font-medium tracking-[-0.02em] text-on-dark/90"
            style={{ "--d": 900 } as React.CSSProperties}
          >
            {copy.supporting}
          </p>
        )}

        <p
          className="hero-step mt-6 max-w-[52ch] text-lede leading-relaxed text-on-dark-muted"
          style={{ "--d": 1050 } as React.CSSProperties}
        >
          {copy.sub}
        </p>

        <div className="hero-step mt-10 flex flex-wrap items-center gap-3 sm:gap-4" style={{ "--d": 1250 } as React.CSSProperties}>
          {copy.actions.map((a) => (
            <Button key={a.label} href={a.href} variant={a.variant ?? "outline"} onDark>
              {a.label}
            </Button>
          ))}
        </div>

        {children}
      </div>
    </section>
  );
}
