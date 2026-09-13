import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTABand from "@/components/sections/CTABand";
import Reveal from "@/components/ui/Reveal";
import { pageMeta } from "@/lib/seo";
import { JsonLd, articleSchema, breadcrumbSchema } from "@/lib/schema";
import { posts, getPost } from "@/data/insights";

/**
 * Blog posts sit at the site root, matching their live URLs exactly. The five
 * service routes and every other page are static segments, which take precedence
 * over this dynamic one in the App Router.
 */
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  return {
    ...pageMeta({
      title: post.title,
      description: post.description,
      path: `/${post.slug}`,
      image: post.cover,
      type: "article",
    }),
    // The source renders this list as visible body copy at the foot of every
    // post (survey F-03b). It belongs here.
    keywords: post.keywords,
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const others = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Insights", path: "/blog-list" },
          { name: post.title, path: `/${post.slug}` },
        ])}
      />

      <article>
        <header className="relative flex min-h-[58svh] items-end overflow-hidden bg-ink text-on-dark">
          <Image
            src={post.cover}
            alt={post.coverAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-ink via-ink/60 to-transparent"
          />
          <div className="relative container pb-[clamp(2.5rem,5vw,4rem)] pt-36">
            <p className="eyebrow text-champagne">
              <Link href="/blog-list" className="hover:text-on-dark">
                Insights
              </Link>
              <span aria-hidden="true"> · </span>
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString("en-CA", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <span aria-hidden="true"> · </span>
              {post.readingTime}
            </p>
            <h1 className="display mt-6 max-w-[22ch] text-h1">{post.title}</h1>
          </div>
        </header>

        <div className="bg-ivory py-[var(--section)] text-on-light">
          <div className="container">
            <div className="mx-auto flex max-w-[68ch] flex-col gap-7">
              <Reveal>
                <p className="text-lede leading-relaxed text-on-light">{post.description}</p>
              </Reveal>
              {post.body.map((para, i) => (
                <Reveal key={i} delay={i * 60}>
                  <p className="leading-relaxed text-on-light-muted">{para}</p>
                </Reveal>
              ))}
              <Reveal delay={200}>
                <p className="mt-6 border-l-2 border-forest-600 pl-6 text-lede leading-relaxed text-on-light">
                  {post.cta}
                </p>
              </Reveal>
            </div>
          </div>
        </div>

        <section className="border-t border-line-light bg-ivory-raised py-[clamp(4rem,8vw,6rem)] text-on-light">
          <div className="container">
            <p className="eyebrow text-on-light-faint">More insights</p>
            <ul className="mt-8 grid gap-px bg-line-light md:grid-cols-3">
              {others.map((p) => (
                <li key={p.slug} className="bg-ivory-raised">
                  <Link href={`/${p.slug}`} className="group flex h-full flex-col gap-4 p-6 transition-colors hover:bg-ivory">
                    <span className="text-lede font-semibold leading-snug group-hover:text-forest-600">
                      {p.title}
                    </span>
                    <span aria-hidden="true" className="mt-auto text-forest-600">
                      &rarr;
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </article>

      <CTABand
        heading="Call us today for free estimate"
        body="Fully insured and certified, serving Nova Scotia, New Brunswick & PEI."
        cta="Get a quote"
      />
    </>
  );
}
