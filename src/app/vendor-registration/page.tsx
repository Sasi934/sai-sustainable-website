import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Reveal from "@/components/ui/Reveal";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { supplierPage, eximCategories } from "@/data/exim";

export const metadata: Metadata = pageMeta({
  title: "Vendor Registration — Become a Supplier to SAI EXIM",
  description:
    "Manufacturers, distributors and service providers can register to supply SAI EXIM across industrial goods, construction materials, safety equipment, IT hardware and consumer goods.",
  path: "/vendor-registration",
});

export default function Page() {
  const crumbs = [
    { name: "Home", href: "/" },
    { name: "EXIM", href: "/exim" },
    { name: "Vendor Registration", href: "/vendor-registration" },
  ];

  return (
    <div data-division="exim">
      <JsonLd data={breadcrumbSchema(crumbs.map((c) => ({ name: c.name, path: c.href })))} />
      <PageHero eyebrow={supplierPage.eyebrow} heading={supplierPage.heading} intro={supplierPage.intro} slot="exim" crumbs={crumbs} />

      <section className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="display text-h3">What to include</h2>
              <ul className="mt-6 border-t border-line-light">
                {supplierPage.checklist.map((c) => (
                  <li key={c} className="flex items-start gap-3 border-b border-line-light py-3.5">
                    <span aria-hidden="true" className="mt-[0.6rem] h-1.5 w-1.5 shrink-0 bg-signal-ink" />
                    {c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={100}>
              <h2 className="display mt-12 text-h3">Categories we source</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {eximCategories.map((c) => (
                  <li key={c.name} className="rounded-[2px] border border-line-light px-3 py-1.5 text-[0.86rem]">{c.name}</li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div id="enquiry" className="scroll-mt-24 lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <h2 className="eyebrow text-signal-ink">Register as a supplier</h2>
              <div className="mt-8">
                <EnquiryForm defaultDivision="exim" type="supplier" hint={supplierPage.hint} showOrganisation />
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}
