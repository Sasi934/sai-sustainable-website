import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import PageHero from "@/components/sections/PageHero";
import CTABand from "@/components/sections/CTABand";
import Reveal from "@/components/ui/Reveal";
import { pageMeta } from "@/lib/seo";
import { JsonLd, breadcrumbSchema } from "@/lib/schema";
import { posts } from "@/data/insights";

export const metadata: Metadata = pageMeta({
  title: "Blog",
  description:
    "Practical guidance on mold remediation, water damage response, asbestos safety during renovation, and renovation upgrades that improve property value and energy efficiency.",
  path: "/blog-list",
});

export default function Page() {
  return (
    <div data-division="environmental">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog-list" },
        ])}
      />

      <PageHero
        eyebrow="Blog"
        heading="Blogs"
        intro="Practical guidance from the people who do the work."
        image="/img/pexels-curtis-adams-1694007-4258279.jpg-RuCEWu2K2sAEWETi.jpeg"
        imageAlt="Renovated interior with updated finishes"
      />

      <section className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <ul className="grid gap-x-10 gap-y-14 md:grid-cols-2">
            {posts.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i * 90}>
                <article className="group">
                  <Link href={`/${p.slug}`} className="block">
                    <div className="relative aspect-16/10 overflow-hidden">
                      <Image
                        src={p.cover}
                        alt={p.coverAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover transition-transform duration-[1200ms] ease-luxe group-hover:scale-[1.04]"
                      />
                    </div>

                    <p className="eyebrow mt-6 text-on-light-faint">
                      <time dateTime={p.date}>
                        {new Date(p.date).toLocaleDateString("en-CA", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span aria-hidden="true"> · </span>
                      {p.readingTime}
                    </p>

                    <h2 className="display mt-3 text-h3 transition-colors group-hover:text-signal-ink">
                      {p.title}
                    </h2>
                    <p className="mt-4 max-w-[52ch] leading-relaxed text-on-light-muted">
                      {p.description}
                    </p>
                  </Link>
                </article>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTABand
        heading="Need help with any of this?"
        body="Certified, insured and available across Atlantic Canada."
        cta="Get a quote"
      />
    </div>
  );
}
