import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Reveal from "@/components/ui/Reveal";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { downloadsPage } from "@/data/group-pages";

export const metadata: Metadata = pageMeta({
  title: "Downloads — Company Documents",
  description: "Request SAI Group company information, certification details and division capability overviews for procurement and vendor onboarding.",
  path: "/downloads",
});

export default function Page() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "Downloads", href: "/downloads" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <PageHero eyebrow={downloadsPage.eyebrow} heading={downloadsPage.heading} intro={downloadsPage.intro} slot="group" crumbs={crumbs} />

      <section className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container grid gap-x-16 gap-y-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 className="display text-h3">Available on request</h2>
            <p className="mt-5 leading-relaxed text-on-light-muted">{downloadsPage.status}</p>
            <ul className="mt-8 border-t border-line-light">
              {downloadsPage.requestable.map((d) => (
                <li key={d} className="flex items-start gap-3 border-b border-line-light py-3.5">
                  <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-signal-ink" />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <div id="enquiry" className="scroll-mt-24 lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <h2 className="eyebrow text-signal-ink">Request documents</h2>
              <div className="mt-8">
                <EnquiryForm type="documents" hint={downloadsPage.hint} showOrganisation />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
