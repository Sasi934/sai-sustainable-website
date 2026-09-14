import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import { partners, type Partner } from "@/data/partners";

/**
 * Technology partners. Text only, no logos (no permission on file), and every
 * offering is shown under the partner's name so nothing reads as SAI in-house work.
 *
 *   compact — two summary cards (IT Solutions page)
 *   full    — each partner with its grouped offerings (/partners)
 */
export default function Partners({ variant = "compact", onDark = false }: { variant?: "compact" | "full"; onDark?: boolean }) {
  const muted = onDark ? "text-on-dark-muted" : "text-on-light-muted";
  const faint = onDark ? "text-on-dark-faint" : "text-on-light-faint";
  const line = onDark ? "border-line-dark" : "border-line-light";
  const accent = onDark ? "text-signal" : "text-signal-ink";

  if (variant === "compact") {
    return (
      <ul className={`mt-12 grid gap-px md:grid-cols-2 ${onDark ? "bg-line-dark" : "bg-line-light"}`}>
        {partners.map((p, i) => (
          <Reveal as="li" key={p.slug} delay={i * 90} className={onDark ? "bg-ink" : "bg-ivory"}>
            <article className="flex h-full flex-col p-7 lg:p-9">
              <p className={`eyebrow ${accent}`}>{p.relationship}</p>
              <h3 className="mt-4 text-h3 font-semibold tracking-[-0.02em]">{p.name}</h3>
              <p className={`mt-1 text-[0.86rem] ${faint}`}>
                {p.legalName} · {p.location}
              </p>
              <p className={`mt-5 flex-1 leading-relaxed ${muted}`}>{p.summary}</p>
              <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem] font-medium">
                <Link href={`/partners#${p.slug}`} className={`${accent} underline-offset-4 hover:underline`}>
                  What they bring &rarr;
                </Link>
                <ExternalLink partner={p} className={`${muted} underline-offset-4 hover:underline`} />
              </div>
            </article>
          </Reveal>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex flex-col gap-[clamp(4rem,8vw,7rem)]">
      {partners.map((p) => (
        <article key={p.slug} id={p.slug} aria-labelledby={`${p.slug}-name`} className="scroll-mt-24">
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-4">
              <p className={`eyebrow ${accent}`}>{p.relationship}</p>
              <h2 id={`${p.slug}-name`} className="display mt-4 text-h2">{p.name}</h2>
              <dl className={`mt-6 flex flex-col gap-3 text-[0.9rem] ${muted}`}>
                <div>
                  <dt className={`eyebrow ${faint}`}>Company</dt>
                  <dd className="mt-1">{p.legalName}</dd>
                </div>
                <div>
                  <dt className={`eyebrow ${faint}`}>Based in</dt>
                  <dd className="mt-1">{p.location}</dd>
                </div>
              </dl>
              <p className="mt-6">
                <ExternalLink partner={p} className={`inline-flex border-b pb-1 text-[0.9rem] ${line} ${muted} hover:border-current`} />
              </p>
            </Reveal>

            <div className="lg:col-span-7 lg:col-start-6">
              <Reveal>
                <p className="text-lede leading-relaxed">{p.summary}</p>
              </Reveal>
              <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {p.groups.map((g, gi) => (
                  <Reveal key={g.name} delay={gi * 50}>
                    <h3 className={`eyebrow ${faint}`}>{g.name}</h3>
                    <ul className={`mt-3 border-t ${line}`}>
                      {g.items.map((item) => (
                        <li key={item.name} className={`border-b py-2.5 ${line}`}>
                          <span className="block text-[0.95rem] font-medium">{item.name}</span>
                          {item.body && <span className={`mt-0.5 block text-[0.85rem] leading-snug ${muted}`}>{item.body}</span>}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </div>
              <Reveal>
                <p className={`mt-10 text-[0.9rem] ${muted}`}>
                  At SAI:{" "}
                  {p.related.map((r, ri) => (
                    <span key={r.href}>
                      <Link href={r.href} className={`font-medium ${accent} underline-offset-4 hover:underline`}>
                        {r.label}
                      </Link>
                      {ri < p.related.length - 1 ? " · " : ""}
                    </span>
                  ))}
                </p>
              </Reveal>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ExternalLink({ partner, className }: { partner: Partner; className: string }) {
  return (
    <a href={partner.url} target="_blank" rel="noopener noreferrer" className={className}>
      {partner.url.replace(/^https:\/\//, "").replace(/\/$/, "")} &#8599;
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
