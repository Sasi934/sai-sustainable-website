import Link from "next/link";
import Magnetic from "./Magnetic";

type Variant = "solid" | "outline" | "ghost";
type Props = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  onDark?: boolean;
  className?: string;
};

/**
 * Squared, refined corporate buttons. Colour comes from the nearest
 * [data-division] ancestor, so the same component is forest on Environmental,
 * gold on EXIM and teal on IT without a prop.
 */
const base =
  "group/btn relative inline-flex items-center justify-center gap-3 px-6 py-3.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] transition-[background-color,border-color,color] duration-300 rounded-[2px] sm:px-7";

export default function Button({
  href,
  children,
  variant = "solid",
  onDark = false,
  className = "",
}: Props) {
  const styles: Record<Variant, string> = {
    solid: onDark
      ? "bg-btn-dark text-btn-dark-ink hover:bg-btn-dark-hover"
      : "bg-btn-light text-btn-light-ink hover:bg-btn-light-hover",
    outline: onDark
      ? "border border-on-dark/30 text-on-dark hover:border-signal hover:text-signal"
      : "border border-on-light/25 text-on-light hover:border-signal-ink hover:text-signal-ink",
    ghost: onDark
      ? "text-on-dark-muted hover:text-on-dark"
      : "text-on-light-muted hover:text-signal-ink",
  };

  const cls = `${base} ${styles[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className="translate-y-px transition-transform duration-500 ease-luxe group-hover/btn:translate-x-1"
      >
        &rarr;
      </span>
    </>
  );

  const web = href.startsWith("http");
  // tel:, mailto: and in-page anchors are plain links — no client routing, no prefetch.
  const plain = web || href.startsWith("tel:") || href.startsWith("mailto:") || href.startsWith("#");

  return (
    <Magnetic strength={0.18}>
      {plain ? (
        <a
          href={href}
          className={cls}
          {...(web ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {inner}
        </a>
      ) : (
        <Link href={href} className={cls}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}
