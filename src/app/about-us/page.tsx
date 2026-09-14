import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CTABand from "@/components/sections/CTABand";
import Credentials from "@/components/sections/Credentials";
import Introduction from "@/components/sections/Introduction";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";
import { divisions } from "@/data/divisions";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { about } from "@/data/pages";
import { leadership } from "@/data/team";

/** noindex removed — the live page carries one, which hides the company page from search (F-04). */
export const metadata: Metadata = pageMeta({
  title: "About SAI Group",
  description:
    "About SAI Group (SAI Sustainable Services Inc.): three divisions — Environmental, Restoration & Manpower; EXIM; and IT Solutions — with IICRC and WCB Nova Scotia certifications and a Canada-led delivery team.",
  path: "/about-us",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About SAI", path: "/about-us" },
        ])}
      />

      <PageHero
        eyebrow="About SAI"
        heading={about.welcome}
        slot="group"
        crumbs={[
          { name: "Home", href: "/" },
          { name: "About SAI", href: "/about-us" },
        ]}
      />

      <Introduction />

      <section aria-labelledby="about-divisions" className="border-t border-line-light bg-ivory-raised py-[clamp(4rem,8vw,6rem)] text-on-light">
        <div className="container">
          <h2 id="about-divisions" className="eyebrow text-on-light-faint">Group structure</h2>
          <ul className="mt-8 grid gap-px bg-line-light lg:grid-cols-3">
            {divisions.map((d) => (
              <li key={d.key} data-division={d.key} className="bg-ivory-raised">
                <Link href={d.href} className="group flex h-full flex-col p-7 transition-colors hover:bg-ivory">
                  <span className="tnum eyebrow flex items-center gap-2 text-signal-ink">
                    <span aria-hidden="true" className="h-2 w-2 bg-signal-ink" />
                    {d.index}
                    {d.focus && <span className="ml-2">Strategic focus</span>}
                  </span>
                  <span className="mt-4 text-lede font-semibold tracking-[-0.01em] group-hover:text-signal-ink">{d.fullName}</span>
                  <span className="mt-2 text-[0.94rem] leading-relaxed text-on-light-muted">{d.line}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Rendered only when there is copy to show — the narrative was removed
          under D-02 and the page stands on credentials and leadership instead. */}
      {about.body.length > 0 && (
        <section className="bg-ivory py-[var(--section)] text-on-light">
          <div className="container grid gap-x-16 gap-y-8 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <h2 className="display text-h2">{about.heading}</h2>
            </Reveal>
            <div className="flex flex-col gap-6 lg:col-span-7 lg:col-start-6">
              {about.body.map((p, i) => (
                <Reveal key={i} delay={i * 50}>
                  <p className="max-w-[64ch] leading-relaxed text-on-light-muted">{p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <div data-division="environmental">
        <Credentials />
      </div>

      <section className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <Reveal>
            <p className="eyebrow text-signal-ink">Leadership</p>
            <h2 className="display mt-5 max-w-[18ch] text-h2">
              The people accountable for delivery.
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-px bg-line-light md:grid-cols-2">
            {leadership.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 110} className="bg-ivory p-8 lg:p-10">
                <h3 className="text-h3 font-semibold tracking-[-0.02em]">{p.name}</h3>
                <p className="eyebrow mt-3 text-signal-ink">{p.role}</p>
                <p className="mt-6 leading-relaxed text-on-light-muted">{p.bio}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTABand heading={about.ctaHeading} body={about.ctaBody} cta={about.ctaLabel} />
    </>
  );
}
