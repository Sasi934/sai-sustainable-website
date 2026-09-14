import Link from "next/link";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { itServices, itHero } from "@/data/it-solutions";

/**
 * The 13 IT & AI service lines as a flat index. AI road defect detection is the
 * product line and gets the one filled tile. A closing CTA tile completes the
 * last row so the grid never ends on empty cells.
 */
export default function ITServicesGrid({ onDark = true }: { onDark?: boolean }) {
  const consult = itHero.actions[0];
  return (
    <ul className={`mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-4 ${onDark ? "bg-line-dark" : "bg-line-light"}`}>
      {itServices.map((s, i) => {
        const product = s.href?.endsWith("ai-road-defect-detection");
        const dark = onDark || product;
        return (
          <Reveal as="li" key={s.name} delay={i * 35} className={product ? "bg-ink-soft" : onDark ? "bg-ink" : "bg-ivory"}>
            <Link
              href={s.href ?? "#"}
              className={`group flex h-full min-h-[11rem] flex-col p-6 transition-colors duration-500 ${
                product ? "" : onDark ? "hover:bg-ink-raised" : "hover:bg-ivory-raised"
              }`}
            >
              <span className={`tnum eyebrow ${dark ? "text-on-dark-faint" : "text-on-light-faint"}`}>
                {String(i + 1).padStart(2, "0")}
                {product && <span className="ml-3 text-signal">Product</span>}
              </span>
              <h3 className={`mt-4 text-[1.08rem] font-semibold leading-snug tracking-[-0.01em] ${dark ? "text-on-dark" : ""}`}>
                {s.name}
              </h3>
              <p className={`mt-2.5 flex-1 text-[0.9rem] leading-relaxed ${dark ? "text-on-dark-muted" : "text-on-light-muted"}`}>
                {s.body}
              </p>
              <span
                aria-hidden="true"
                className={`mt-5 ${dark ? "text-signal" : "text-signal-ink"} transition-transform duration-500 ease-luxe group-hover:translate-x-1.5`}
              >
                &rarr;
              </span>
            </Link>
          </Reveal>
        );
      })}
      <Reveal as="li" delay={13 * 35} className={`lg:col-span-3 ${onDark ? "bg-ink" : "bg-ivory"}`}>
        <div className="flex h-full min-h-[11rem] flex-col justify-between gap-6 p-6 lg:flex-row lg:items-end">
          <p className={`max-w-[34ch] text-lede font-medium leading-snug tracking-[-0.01em] ${onDark ? "text-on-dark" : ""}`}>
            Not sure which service fits? Start with a free consultation.
          </p>
          <Button href={consult.href} onDark={onDark}>
            {consult.label}
          </Button>
        </div>
      </Reveal>
    </ul>
  );
}
