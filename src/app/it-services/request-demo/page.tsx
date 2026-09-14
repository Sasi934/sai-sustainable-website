import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Reveal from "@/components/ui/Reveal";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { getDivision } from "@/data/divisions";
import { demoPage } from "@/data/it-solutions";
import { contactPage } from "@/data/pages";

const division = getDivision("it");
const PATH = `${division.href}/request-demo`;

export const metadata: Metadata = pageMeta({
  title: "Request a Demo — AI Road Defect Detection & IT Solutions",
  description:
    "Request a demo of SAI's AI road defect detection system, or a walkthrough of dashboards, web and software work from SAI IT Solutions.",
  path: PATH,
});

export default function Page() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: division.name, href: division.href },
    { name: "Request Demo", href: PATH },
  ];

  return (
    <div data-division="it">
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <PageHero eyebrow={demoPage.eyebrow} heading={demoPage.heading} intro={demoPage.intro} slot="it" crumbs={crumbs} />

      <section aria-labelledby="demo-form" className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="display text-h3">What to expect</h2>
            </Reveal>
            <ol className="mt-8 border-t border-line-light">
              {demoPage.expect.map((e, i) => (
                <Reveal as="li" key={e.name} delay={i * 80} className="flex gap-5 border-b border-line-light py-5">
                  <span className="tnum eyebrow mt-1 text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-semibold">{e.name}</h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-on-light-muted">{e.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>

          <div id="enquiry" className="scroll-mt-24 lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <h2 id="demo-form" className="eyebrow text-signal-ink">{contactPage.quoteHeading.replace("GET A QUOTE", "Request a demo")}</h2>
              <div className="mt-8">
                <EnquiryForm defaultDivision="it" type="demo" hint={demoPage.hint} showOrganisation />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
