import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import MaskText from "@/components/motion/MaskText";
import { certifications, company, homepage } from "@/data/company";

/**
 * 05 — Experience and credentials.
 *
 * The IICRC and WCB marks are the only independently-awarded trust signals SAI
 * has. On the current site they sit unlabelled at the foot of the homepage; here
 * they get a named moment, which is the single highest-value change on the page.
 */
export default function Credentials() {
  return (
    <section className="bg-forest-900 py-[var(--section)] text-on-dark">
      <div className="container grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <p className="eyebrow text-champagne">Certified &amp; insured</p>
          <MaskText as="h2" className="display mt-5 text-h2">
            Independently certified, and audited on safety.
          </MaskText>
          <p className="mt-7 max-w-[42ch] leading-relaxed text-on-dark-muted">
            {homepage.introduction[1]}
          </p>
        </Reveal>

        <div className="lg:col-span-6 lg:col-start-7">
          <ul className="flex flex-col gap-px bg-line-dark">
            {certifications.map((c, i) => (
              <Reveal
                as="li"
                key={c.name}
                delay={i * 120}
                className="flex items-center gap-6 bg-forest-900 py-7"
              >
                <Image
                  src={c.image}
                  alt={c.alt}
                  width={88}
                  height={88}
                  className="h-[72px] w-[72px] shrink-0 rounded-full object-contain"
                />
                <div>
                  <h3 className="text-lede font-semibold">{c.name}</h3>
                  <p className="mt-1.5 text-sm text-on-dark-muted">{c.issuer}</p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={280}>
            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {homepage.why.map((w) => (
                <li key={w} className="flex items-start gap-3 text-[0.95rem] text-on-dark-muted">
                  <span
                    aria-hidden="true"
                    className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-lime"
                  />
                  {w}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-on-dark-faint">
              Headquartered in {company.headquarters}. Serving {company.serviceRegions}.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
