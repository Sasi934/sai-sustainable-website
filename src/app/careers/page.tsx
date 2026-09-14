import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/sections/PageHero";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Reveal from "@/components/ui/Reveal";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { careersPage } from "@/data/group-pages";

export const metadata: Metadata = pageMeta({
  title: "Careers — Site Crews, Trade Operations & Technology",
  description:
    "Careers at SAI Group across environmental restoration and manpower, EXIM trade operations, and IT solutions — software, AI/ML, UI/UX, data analytics and cloud.",
  path: "/careers",
});

export default function Page() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <PageHero
        eyebrow={careersPage.eyebrow}
        heading={careersPage.heading}
        intro={careersPage.intro}
        image="/img/construction-site-clean-up-halifax-dartmouth-f9thjAfxv0hP54fy.jpg"
        imageAlt="Worker in a hard hat and high-visibility vest on a demolition site"
        crumbs={crumbs}
      />

      <section aria-labelledby="careers-areas" className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <h2 id="careers-areas" className="sr-only">Where you could work</h2>
          <ul className="grid gap-px bg-line-light lg:grid-cols-3">
            {careersPage.areas.map((a, i) => (
              <Reveal as="li" key={a.heading} delay={i * 90} className="bg-ivory">
                <div data-division={a.division.key} className="flex h-full flex-col p-7 lg:p-9">
                  <p className="eyebrow flex items-center gap-2 text-signal-ink">
                    <span aria-hidden="true" className="h-2 w-2 bg-signal-ink" />
                    {a.division.name}
                  </p>
                  <h3 className="mt-5 text-h3 font-semibold tracking-[-0.02em]">{a.heading}</h3>
                  <p className="mt-3 flex-1 leading-relaxed text-on-light-muted">{a.body}</p>
                  <Link href={a.division.href} className="mt-6 text-[0.9rem] font-medium text-signal-ink underline-offset-4 hover:underline">
                    About the division &rarr;
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="careers-apply" className="border-t border-line-light bg-ivory-raised py-[var(--section)] text-on-light">
        <div className="container grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="careers-apply" className="display text-h2">Register your interest</h2>
            <p className="mt-6 leading-relaxed text-on-light-muted">{careersPage.vacancies}</p>
            <p className="mt-4 leading-relaxed text-on-light-muted">{careersPage.howTo}</p>
          </Reveal>
          <div id="enquiry" className="scroll-mt-24 lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <EnquiryForm type="careers" hint={careersPage.hint} />
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
