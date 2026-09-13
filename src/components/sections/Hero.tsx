import SceneFrame from "@/components/three/SceneFrame";
import Button from "@/components/ui/Button";
import MaskText from "@/components/motion/MaskText";
import HeroEntrance from "@/components/motion/HeroEntrance";
import { company, homepage } from "@/data/company";

/**
 * 01 — Cinematic hero. Minimal chrome, one statement, one CTA.
 * The scene sits behind the type at low contrast; it never competes with it.
 */
export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[92svh] bg-ink text-on-dark">
      <HeroEntrance scope="#hero" />
      <SceneFrame
        scene="containment"
        fallbackImage="/img/untitled-design-AMqnRjrGOncj2VPn.png"
        fallbackAlt="SAI Sustainable Services crew in full protective equipment on site"
        className="absolute inset-0"
        imageClassName="object-[72%_center] lg:object-center"
        priority
      />

      <div className="container relative flex min-h-[92svh] flex-col justify-end pb-[clamp(3rem,8vw,7rem)] pt-32">
        <p data-entrance="1" className="eyebrow text-champagne">
          Dartmouth, Nova Scotia — serving {company.serviceArea}
        </p>

        <MaskText as="h1" className="display mt-7 max-w-[16ch] text-hero" immediate delay={0.25}>
          {homepage.heroHeading}
        </MaskText>

        <p data-entrance="2" className="mt-8 max-w-[46ch] text-lede leading-snug text-on-dark-muted">
          {homepage.heroTagline}
        </p>

        <div className="mt-11 flex flex-wrap items-center gap-4" data-entrance="3">
          <Button href="/contact-us" variant="solid" onDark>
            Contact us
          </Button>
          <Button href="/services" variant="outline" onDark>
            Explore services
          </Button>
        </div>
      </div>
    </section>
  );
}
