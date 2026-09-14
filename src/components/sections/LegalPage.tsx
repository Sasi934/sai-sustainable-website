import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";

type Legal = {
  eyebrow: string;
  heading: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
};

/** Plain, readable legal document. No hero image — the words are the page. */
export default function LegalPage({ doc, path }: { doc: Legal; path: string }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: doc.heading, path }])} />
      <section className="bg-ink pb-[clamp(3rem,6vw,5rem)] pt-[clamp(6rem,12vw,9rem)] text-on-dark">
        <div className="container">
          <nav aria-label="Breadcrumb" className="hero-step text-[0.78rem] text-on-dark-muted" style={{ "--d": 100 } as React.CSSProperties}>
            <Link href="/" className="hover:text-signal">Home</Link>
            <span aria-hidden="true" className="mx-2 text-on-dark-faint">/</span>
            <span aria-current="page" className="text-on-dark">{doc.heading}</span>
          </nav>
          <p className="hero-step eyebrow mt-8 text-signal" style={{ "--d": 200 } as React.CSSProperties}>{doc.eyebrow}</p>
          <h1 className="hero-step display mt-5 text-h1" style={{ "--d": 320 } as React.CSSProperties}>{doc.heading}</h1>
          <p className="hero-step mt-6 text-[0.9rem] text-on-dark-muted" style={{ "--d": 440 } as React.CSSProperties}>
            Last updated <time dateTime={doc.updated}>{new Date(doc.updated).toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time>
          </p>
        </div>
      </section>

      <article className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <div className="mx-auto flex max-w-[68ch] flex-col gap-12">
            {doc.sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 40}>
                <section aria-labelledby={`legal-${i}`}>
                  <h2 id={`legal-${i}`} className="text-h3 font-semibold tracking-[-0.02em]">{s.heading}</h2>
                  {s.body.map((p) => (
                    <p key={p} className="mt-4 leading-relaxed text-on-light-muted">{p}</p>
                  ))}
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
