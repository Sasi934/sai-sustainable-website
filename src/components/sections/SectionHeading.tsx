import Reveal from "@/components/ui/Reveal";
import MaskText from "@/components/motion/MaskText";

/** Eyebrow + H2 + optional lede — the one heading pattern used by every section. */
export default function SectionHeading({
  eyebrow,
  heading,
  body,
  onDark = false,
  size = "h2",
  id,
  action,
  stacked = false,
  className = "",
}: {
  eyebrow: string;
  heading: string;
  body?: string;
  onDark?: boolean;
  size?: "h1" | "h2";
  /** id for the H2, so sections can be referenced with aria-labelledby. */
  id?: string;
  /** Right-aligned action (a Button) on wide screens. */
  action?: React.ReactNode;
  /** Single column — for headings that sit inside an already-split layout. */
  stacked?: boolean;
  className?: string;
}) {
  return (
    <div className={`grid gap-8 ${stacked ? "" : "lg:grid-cols-12 lg:items-end"} ${className}`}>
      <Reveal className={stacked ? "" : "lg:col-span-8"}>
        <p className={`eyebrow flex items-center gap-3 ${onDark ? "text-signal" : "text-signal-ink"}`}>
          <span aria-hidden="true" className={`h-px w-8 ${onDark ? "bg-signal" : "bg-signal-ink"}`} />
          {eyebrow}
        </p>
        <div id={id}>
          <MaskText as="h2" className={`display mt-5 max-w-[22ch] ${size === "h1" ? "text-h1" : "text-h2"}`}>
            {heading}
          </MaskText>
        </div>
        {body && (
          <p className={`mt-6 max-w-[60ch] text-lede leading-relaxed ${onDark ? "text-on-dark-muted" : "text-on-light-muted"}`}>
            {body}
          </p>
        )}
      </Reveal>
      {action && (
        <Reveal delay={120} className={stacked ? "" : "lg:col-span-4 lg:justify-self-end"}>
          {action}
        </Reveal>
      )}
    </div>
  );
}
