import type { Metadata } from "next";
import Link from "next/link";
import CinematicHero from "@/components/sections/CinematicHero";
import RoadDefectFeature from "@/components/sections/it/RoadDefectFeature";
import SectionHeading from "@/components/sections/SectionHeading";
import ProcessSteps from "@/components/sections/ProcessSteps";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/site";
import { getDivision } from "@/data/divisions";
import { roadDefect, itHero } from "@/data/it-solutions";
import type { HeroCopy } from "@/data/types";

const division = getDivision("it");
const PATH = `${division.href}/ai-road-defect-detection`;

export const metadata: Metadata = {
  ...pageMeta({
    title: "AI Road Defect Detection — Potholes, Cracks & Surface Distress Mapped by GPS",
    description:
      "AI-powered road defect detection: computer vision finds potholes, cracks, ruts, patches and surface distress from vehicle-mounted cameras and a mobile app, with GPS mapping, severity classification, dashboards, reports and API integration.",
    path: PATH,
  }),
  keywords: ["AI road defect detection", "pothole detection", "computer vision", "smart city technology", "road asset management"],
};

const hero: HeroCopy = {
  eyebrow: "SAI IT Solutions — Product",
  heading: roadDefect.heading,
  sub: roadDefect.intro,
  actions: [
    { label: itHero.actions[1].label, href: itHero.actions[1].href, variant: "solid" },
    { label: "Discuss a pilot", href: "/contact-us?division=it&type=demo#enquiry", variant: "outline" },
  ],
};

export default function Page() {
  return (
    <div data-division="it">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: roadDefect.heading,
          serviceType: "AI road defect detection",
          description: roadDefect.intro,
          url: `${SITE_URL}${PATH}`,
          provider: { "@id": `${SITE_URL}${division.href}#division` },
          audience: roadDefect.users.map((u) => ({ "@type": "Audience", audienceType: u.body ?? u.name })),
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "System capabilities",
            itemListElement: roadDefect.capabilities.map((c) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: c.name, description: c.body },
            })),
          },
        }}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: division.name, path: division.href },
          { name: "AI Road Defect Detection", path: PATH },
        ])}
      />

      <CinematicHero copy={hero} slot="road" overlay="full" />

      <RoadDefectFeature eyebrow="How it works" heading="Capture. Detect. Classify. Map. Report." showCta={false} />

      <section aria-labelledby="rd-pipeline" className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <SectionHeading id="rd-pipeline" eyebrow="The pipeline" heading="From a drive to a repair list." />
          <ProcessSteps
            columns={4}
            steps={[
              { name: "Capture", body: "Dashcam and vehicle-mounted camera footage, the mobile app, and drone or survey data." },
              { name: "Detect & classify", body: `${roadDefect.detects.map((d) => d.name).join(", ")} — each graded by severity.` },
              { name: "Score & map", body: "Pavement condition (IRI), safety scoring and roadside assets, all pinned by GPS." },
              { name: "Act", body: "Prioritised work orders, budget estimates, GIS maps, dashboards, PDF and Excel reports, and API data." },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="rd-users" className="bg-ivory-raised py-[var(--section)] text-on-light">
        <div className="container grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="rd-users" eyebrow="Who it's for" heading="Built for the people responsible for roads." stacked />
          </div>
          <ul className="border-t border-line-light lg:col-span-6 lg:col-start-7">
            {roadDefect.users.map((u, i) => (
              <Reveal as="li" key={u.name} delay={i * 60} className="flex items-baseline gap-5 border-b border-line-light py-5">
                <span className="tnum eyebrow text-on-light-faint">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="text-lede font-semibold">{u.name}</span>
                  {u.body && <span className="ml-3 text-[0.9rem] text-on-light-muted">{u.body}</span>}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="rd-pilot" className="bg-ink py-[clamp(4.5rem,9vw,8rem)] text-on-dark">
        <div className="container grid gap-10 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow text-signal">{roadDefect.pilot.heading}</p>
            <h2 id="rd-pilot" className="display mt-5 max-w-[20ch] text-h2">See it run on your own roads.</h2>
            <p className="mt-6 max-w-[56ch] text-lede leading-relaxed text-on-dark-muted">{roadDefect.pilot.body}</p>
          </Reveal>
          <Reveal delay={120} className="flex flex-wrap gap-3 lg:col-span-5 lg:justify-end">
            <Button href={itHero.actions[1].href} onDark>{itHero.actions[1].label}</Button>
            <Button href={`${division.href}/ai-ml`} variant="outline" onDark>AI & ML services</Button>
          </Reveal>
        </div>
        <div className="container">
          <p className="mt-14 border-t border-line-dark pt-6 text-[0.85rem] text-on-dark-faint">
            Related: <Link href={`${division.href}/ai-ml`} className="underline underline-offset-4 hover:text-signal">Computer vision</Link> ·{" "}
            <Link href={`${division.href}/software-development`} className="underline underline-offset-4 hover:text-signal">Mobile app development</Link> ·{" "}
            <Link href="/sectors" className="underline underline-offset-4 hover:text-signal">Sectors</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
