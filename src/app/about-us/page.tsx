import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import CTABand from "@/components/sections/CTABand";
import Credentials from "@/components/sections/Credentials";
import Reveal from "@/components/ui/Reveal";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { about } from "@/data/pages";
import { leadership } from "@/data/team";

/** noindex removed — the live page carries one, which hides the company page from search (F-04). */
export const metadata: Metadata = pageMeta({
  title: "About Us",
  description:
    "SAI Sustainable Services Inc. brings experience, safety and sustainability to every job — hazardous material abatement, waste disposal, restoration, renovations and construction across Atlantic Canada.",
  path: "/about-us",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about-us" },
        ])}
      />

      <PageHero
        eyebrow="Our story"
        heading={about.welcome}
        image="/img/sss5-mk3DrlrRbjCvllRe.jpeg"
        imageAlt="SAI Sustainable Services team at work"
      />

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

      <Credentials />

      <section className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <Reveal>
            <p className="eyebrow text-forest-600">Leadership</p>
            <h2 className="display mt-5 max-w-[18ch] text-h2">
              The people accountable for delivery.
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-px bg-line-light md:grid-cols-2">
            {leadership.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 110} className="bg-ivory p-8 lg:p-10">
                <h3 className="display text-h3">{p.name}</h3>
                <p className="eyebrow mt-3 text-forest-600">{p.role}</p>
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
