import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SceneFrame from "@/components/three/SceneFrame";
import CTABand from "@/components/sections/CTABand";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { itIntro, itDifference, itCapabilities, deliveryModel, deliveryProcess, offshoreTeam } from "@/data/it";
import { technologyTeam } from "@/data/team";
import { itProjects } from "@/data/it-projects";

export const metadata: Metadata = pageMeta({
  title: "IT Services — Web, AI, Data & UX",
  description:
    "SAI combines business leadership, project coordination and technology delivery to build practical digital solutions — websites, web applications, AI-enabled platforms, data analytics, APIs and cloud-ready solutions.",
  path: "/it-services",
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "IT Services", path: "/it-services" },
        ])}
      />

      {/* Hero — the lattice scene renders the approved delivery sequence. */}
      <section className="relative isolate flex min-h-[78svh] items-end bg-ink text-on-dark">
        <SceneFrame
          scene="lattice"
          className="absolute inset-0"
          priority
        />
        <div className="container relative pb-[clamp(3rem,6vw,5rem)] pt-36">
          <p className="eyebrow text-champagne">02 — IT Services</p>
          <h1 className="display mt-6 max-w-[16ch] text-h1">{itIntro.heading}</h1>
          <p className="mt-7 max-w-[60ch] text-lede leading-relaxed text-on-dark-muted">
            {itIntro.body[0]}
          </p>
        </div>
      </section>

      {/* Approach */}
      <section className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container grid gap-x-16 gap-y-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow text-forest-600">Capability</p>
            <h2 className="display mt-5 text-h2">{itDifference.heading}</h2>
            <p className="mt-7 max-w-[40ch] leading-relaxed text-on-light-muted">
              {itIntro.body[1]}
            </p>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <p className="text-lede leading-relaxed">{itDifference.body}</p>
            </Reveal>
            <ul className="mt-9 flex flex-col">
              {itDifference.points.map((p, i) => (
                <Reveal as="li" key={p} delay={i * 60} className="border-b border-line-light py-4">
                  <span className="leading-relaxed text-on-light-muted">{p}</span>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={200}>
              <p className="display mt-12 max-w-[26ch] text-h3 text-forest-600">
                {itDifference.principle}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-forest-900 py-[var(--section)] text-on-dark">
        <div className="container">
          <Reveal>
            <p className="eyebrow text-champagne">How we work</p>
            <h2 className="display mt-5 max-w-[20ch] text-h2">
              Business need first. Technology in service of it.
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-px bg-line-dark sm:grid-cols-2 lg:grid-cols-4">
            {deliveryProcess.map((stage, i) => (
              <Reveal as="li" key={stage} delay={i * 55} className="bg-forest-900 p-6">
                <span className="eyebrow text-on-dark-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-lede">{stage}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <Reveal>
            <p className="eyebrow text-forest-600">What we work with</p>
            <h2 className="display mt-5 max-w-[20ch] text-h2">Capability areas.</h2>
          </Reveal>
          <ul className="mt-14 grid gap-px bg-line-light sm:grid-cols-2 lg:grid-cols-4">
            {itCapabilities.map((c, i) => (
              <Reveal as="li" key={c.area} delay={i * 50} className="bg-ivory p-7">
                <h3 className="text-lede font-semibold">{c.area}</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {c.items.map((item) => (
                    <li key={item} className="text-[0.9rem] leading-snug text-on-light-muted">
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Delivery model */}
      <section id="delivery" className="bg-ink py-[var(--section)] text-on-dark">
        <div className="container">
          <Reveal>
            <p className="eyebrow text-champagne">Delivery model</p>
            <h2 className="display mt-5 max-w-[22ch] text-h2">Canada leads. Offshore scales.</h2>
          </Reveal>

          <div className="mt-14 grid gap-px bg-line-dark lg:grid-cols-2">
            {deliveryModel.map((m, i) => (
              <Reveal as="div" key={m.label} delay={i * 110} className="bg-ink p-8 lg:p-10">
                <p className="eyebrow text-champagne">{m.label}</p>
                <h3 className="display mt-4 text-h3">{m.title}</h3>
                <ul className="mt-7 flex flex-col gap-3">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[0.95rem] text-on-dark-muted">
                      <span aria-hidden="true" className="mt-[0.6em] h-px w-3 shrink-0 bg-forest-500" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal delay={160}>
            <p className="mt-12 max-w-[70ch] leading-relaxed text-on-dark-muted">
              {offshoreTeam.body}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Technology team — editorial, no profile cards, no invented photography */}
      <section className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <Reveal>
            <p className="eyebrow text-forest-600">{offshoreTeam.heading}</p>
            <h2 className="display mt-5 max-w-[20ch] text-h2">The people behind the work.</h2>
          </Reveal>

          <ul className="mt-14 flex flex-col border-t border-line-light">
            {technologyTeam.map((p, i) => (
              <Reveal as="li" key={p.name} delay={i * 90} className="border-b border-line-light py-9">
                <div className="grid gap-6 lg:grid-cols-12 lg:gap-12">
                  <div className="lg:col-span-4">
                    <h3 className="display text-h3">{p.name}</h3>
                    <p className="eyebrow mt-3 text-forest-600">{p.role}</p>
                  </div>
                  <div className="lg:col-span-5">
                    <p className="leading-relaxed text-on-light-muted">{p.bio}</p>
                  </div>
                  <ul className="flex flex-col gap-2 lg:col-span-3">
                    {p.skills?.map((s) => (
                      <li key={s} className="text-[0.88rem] leading-snug text-on-light-faint">
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={150}>
            <div className="mt-12">
              <Button href="/it-services/work" variant="outline">
                Selected project experience
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Selected work — actual delivered projects, the only honest imagery this
          division has. Full write-ups live on /it-services/work. */}
      <section className="bg-ivory-raised py-[var(--section)] text-on-light">
        <div className="container">
          <Reveal>
            <p className="eyebrow text-forest-600">Selected work</p>
            <h2 className="display mt-5 max-w-[20ch] text-h2">
              Three projects, three different problems.
            </h2>
          </Reveal>

          <ul className="mt-14 grid gap-10 md:grid-cols-3">
            {itProjects.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 90}>
                <Link href="/it-services/work" className="group block">
                  <div className="relative aspect-16/11 overflow-hidden border border-line-light">
                    <Image
                      src={p.shot}
                      alt={p.shotAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-top transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="display mt-6 text-h3 transition-colors group-hover:text-forest-600">
                    {p.name}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-on-light-muted">
                    {p.journey.slice(0, 3).join(" · ")}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={200}>
            <div className="mt-12">
              <Button href="/it-services/work" variant="outline">
                Read the case studies
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CTABand
        heading="Simple for users. Simple for staff."
        body="Tell us what the business needs to do, and we'll work back from there."
        cta="Start a conversation"
      />
    </>
  );
}
