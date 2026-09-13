import type { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import EnquiryForm from "@/components/forms/EnquiryForm";
import Reveal from "@/components/ui/Reveal";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { contactPage } from "@/data/pages";
import { contact, company, homepage } from "@/data/company";

export const metadata: Metadata = pageMeta({
  title: "Contact Us for Waste Solutions and Disposal - Sai Sustainable Services Inc.",
  description:
    "Reach out to SAI Sustainable Services Inc. for waste solutions and disposal. Contact us and someone from our team will support your needs within an hour. Thank you!",
  path: "/contact-us",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact-us" },
        ])}
      />

      <PageHero
        eyebrow="Get in touch"
        heading={contactPage.heading}
        intro={contactPage.body[0]}
        image="/img/environmental-drums-florida-scaled-YKbJQoW8D3HGyKZb.jpg"
        imageAlt="Labelled drums staged for compliant transport"
      />

      <section className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 className="display text-h3">{contactPage.subheading}</h2>
              <p className="mt-6 max-w-[48ch] leading-relaxed text-on-light-muted">
                {contactPage.body[1]}
              </p>
            </Reveal>

            <Reveal delay={100}>
              <dl className="mt-10 flex flex-col gap-8">
                <div>
                  <dt className="eyebrow text-on-light-faint">Phone</dt>
                  <dd className="mt-3 flex flex-col gap-1.5">
                    {contact.phones.map((p) => (
                      <a
                        key={p.number}
                        href={p.href}
                        className="text-lede transition-colors hover:text-forest-600"
                      >
                        {p.number}
                        {p.emergency && (
                          <span className="ml-3 align-middle text-[0.68rem] uppercase tracking-[0.14em] text-forest-600">
                            24/7 emergency
                          </span>
                        )}
                      </a>
                    ))}
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow text-on-light-faint">Email</dt>
                  <dd className="mt-3 flex flex-col gap-1.5">
                    {contact.emails.map((e) => (
                      <a
                        key={e.address}
                        href={e.href}
                        className="break-all transition-colors hover:text-forest-600"
                      >
                        {e.address}
                      </a>
                    ))}
                  </dd>
                </div>

                {/*
                  D-05 OPEN: office hours and the homepage's "24/7 emergency response"
                  are both approved content and contradict each other when adjacent.
                  Presented as two distinct things until SAI confirms which number is
                  the emergency line.
                */}
                <div>
                  <dt className="eyebrow text-on-light-faint">Office hours</dt>
                  <dd className="mt-3 flex flex-col gap-1">
                    {contact.hours.map((h) => (
                      <span key={h.days} className="text-on-light-muted">
                        {h.days}: {h.time}
                      </span>
                    ))}
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow text-on-light-faint">Emergency</dt>
                  <dd className="mt-3 text-on-light-muted">
                    {homepage.why[2]} on{" "}
                    <a
                      href={contact.phones[0].href}
                      className="text-on-light underline underline-offset-4 hover:text-forest-600"
                    >
                      {contact.phones[0].number}
                    </a>
                    . Office hours above apply to general enquiries.
                  </dd>
                </div>

                <div>
                  <dt className="eyebrow text-on-light-faint">Headquarters</dt>
                  <dd className="mt-3 text-on-light-muted">
                    {company.headquarters} — serving {company.serviceRegions}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={80}>
              <h2 className="eyebrow text-forest-600">{contactPage.quoteHeading}</h2>
              <div className="mt-8">
                <EnquiryForm />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-ink py-[clamp(4rem,8vw,6rem)] text-on-dark">
        <div className="container">
          <Reveal>
            <p className="display max-w-[46ch] text-h3">{contactPage.closing}</p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
