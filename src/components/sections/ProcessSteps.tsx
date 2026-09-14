import Reveal from "@/components/ui/Reveal";
import type { Item } from "@/data/types";

/**
 * Numbered process as an ordered list. On wide screens a hairline rail runs
 * across the top and fills left-to-right as the section enters; each step then
 * rises in sequence behind it. Flat and typographic — no timeline objects.
 */
export default function ProcessSteps({
  steps,
  onDark = false,
  columns = 7,
}: {
  steps: Item[];
  onDark?: boolean;
  columns?: 4 | 6 | 7;
}) {
  const grid =
    columns === 7 ? "lg:grid-cols-7" : columns === 6 ? "lg:grid-cols-6" : "lg:grid-cols-4";

  return (
    <Reveal className="relative mt-14">
      <div aria-hidden="true" className={`absolute inset-x-0 top-0 hidden h-px lg:block ${onDark ? "bg-line-dark" : "bg-line-light"}`}>
        <div className={`rail-fill h-full w-full ${onDark ? "bg-signal" : "bg-signal-ink"}`} />
      </div>

      <ol className={`grid gap-x-6 sm:grid-cols-2 ${grid}`}>
        {steps.map((s, i) => (
          <Reveal
            as="li"
            key={s.name}
            delay={250 + i * 110}
            className={`relative border-t py-6 lg:border-t-0 lg:pb-0 lg:pt-9 ${onDark ? "border-line-dark" : "border-line-light"}`}
          >
            <span
              aria-hidden="true"
              className={`absolute left-0 top-[-3.5px] hidden h-2 w-2 rounded-full lg:block ${onDark ? "bg-ink ring-1 ring-signal" : "bg-ivory ring-1 ring-signal-ink"}`}
            />
            <span className={`tnum eyebrow ${onDark ? "text-signal" : "text-signal-ink"}`}>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-[1.05rem] font-semibold leading-snug tracking-[-0.01em]">{s.name}</h3>
            {s.body && (
              <p className={`mt-2.5 text-[0.9rem] leading-relaxed ${onDark ? "text-on-dark-muted" : "text-on-light-muted"}`}>
                {s.body}
              </p>
            )}
          </Reveal>
        ))}
      </ol>
    </Reveal>
  );
}
