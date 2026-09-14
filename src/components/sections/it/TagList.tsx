import Reveal from "@/components/ui/Reveal";

/** Simple, flat technology / industry labels. No logos, no icons. */
export default function TagList({
  items,
  onDark = false,
  label,
}: {
  items: string[];
  onDark?: boolean;
  /** Accessible name for the list. */
  label: string;
}) {
  return (
    <ul aria-label={label} className="flex flex-wrap gap-2">
      {items.map((t, i) => (
        <Reveal as="li" key={t} delay={i * 40}>
          <span
            className={`inline-block rounded-[2px] border px-3.5 py-2 text-[0.84rem] font-medium tracking-[-0.005em] ${
              onDark ? "border-line-dark text-on-dark" : "border-line-light text-on-light"
            }`}
          >
            {t}
          </span>
        </Reveal>
      ))}
    </ul>
  );
}
