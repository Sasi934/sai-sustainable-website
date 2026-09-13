import SceneFrame from "@/components/three/SceneFrame";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { itIntro, itDifference, deliveryProcess } from "@/data/it";

/**
 * 06 — The technology division on the homepage.
 * The lattice scene renders the approved process line, so the 3D carries the
 * same information the type does rather than sitting behind it as texture.
 */
export default function ITPreview() {
  return (
    <section className="relative bg-ink text-on-dark">
      <SceneFrame
        scene="lattice"
        className="absolute inset-0"
      />

      <div className="container relative py-[var(--section)]">
        <div className="grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-champagne">02 — IT Services</p>
            <h2 className="display mt-5 text-h1">{itIntro.heading}</h2>
            <p className="mt-8 max-w-[52ch] text-lede leading-relaxed text-on-dark-muted">
              {itIntro.body[0]}
            </p>
            <div className="mt-10">
              <Button href="/it-services" variant="outline" onDark>
                The technology division
              </Button>
            </div>
          </Reveal>

          <Reveal delay={140} className="lg:col-span-5 lg:col-start-8">
            <p className="eyebrow text-on-dark-faint">How we work</p>
            <ol className="mt-6 flex flex-col">
              {deliveryProcess.map((stage, i) => (
                <li
                  key={stage}
                  className="flex items-baseline gap-4 border-b border-line-dark py-3.5"
                >
                  <span className="eyebrow w-6 shrink-0 text-on-dark-faint">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[0.98rem]">{stage}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        <Reveal delay={200}>
          <p className="display mt-20 max-w-[24ch] text-h3 text-champagne">
            {itDifference.principle}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
