import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "./SectionHeading";
import { whySai } from "@/data/group";
import { certifications } from "@/data/company";

/** 08 — Why SAI. Six reasons, each traceable to approved copy, plus the two independent seals. */
export default function WhySAI() {
  return (
    <section aria-labelledby="why-heading" className="bg-ink py-[var(--section)] text-on-dark">
      <div className="container">
        <SectionHeading id="why-heading" eyebrow={whySai.eyebrow} heading={whySai.heading} onDark />

        <ul className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {whySai.points.map((p, i) => (
            <Reveal as="li" key={p.name} delay={i * 70} className="border-t border-line-dark pb-10 pt-6">
              <span className="tnum eyebrow text-signal">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lede font-semibold tracking-[-0.01em]">{p.name}</h3>
              <p className="mt-3 max-w-[40ch] text-[0.94rem] leading-relaxed text-on-dark-muted">{p.body}</p>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <ul aria-label="Certifications" className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-6 border-t border-line-dark pt-10">
            {certifications.map((c) => (
              <li key={c.name} className="flex items-center gap-4">
                <Image src={c.image} alt={c.alt} width={64} height={64} className="h-14 w-14 rounded-full bg-on-dark object-contain" />
                <div>
                  <p className="font-semibold">{c.name}</p>
                  <p className="text-[0.84rem] text-on-dark-muted">{c.issuer}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
