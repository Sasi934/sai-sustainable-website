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

const base =
  "relative inline-flex items-center gap-3 px-7 py-3.5 text-[0.82rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-300 rounded-[2px]";

export default function Button({
  href,
  children,
  variant = "solid",
  onDark = false,
  className = "",
}: Props) {
  const styles: Record<Variant, string> = {
    solid: onDark
      ? "bg-on-dark text-ink hover:bg-champagne"
      : "bg-forest-600 text-on-dark hover:bg-forest-700",
    outline: onDark
      ? "border border-line-dark text-on-dark hover:border-champagne hover:text-champagne"
      : "border border-line-light text-on-light hover:border-forest-600 hover:text-forest-600",
    ghost: onDark
      ? "text-on-dark-muted hover:text-on-dark"
      : "text-on-light-muted hover:text-forest-600",
  };

  const external = href.startsWith("http");
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden="true" className="translate-y-[1px]">
        &rarr;
      </span>
    </>
  );

  return (
    <Magnetic strength={0.22}>
      {external ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${styles[variant]} ${className}`}
        >
          {inner}
        </a>
      ) : (
        <Link href={href} className={`${base} ${styles[variant]} ${className}`}>
          {inner}
        </Link>
      )}
    </Magnetic>
  );
}
