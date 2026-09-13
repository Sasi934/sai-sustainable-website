import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

/** Reusable closing band for interior pages. */
export default function CTABand({
  heading,
  body,
  cta = "Contact us",
  href = "/contact-us",
}: {
  heading: string;
  body?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="bg-ink py-[clamp(4rem,8vw,7rem)] text-on-dark">
      <div className="container flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <Reveal className="max-w-[34ch]">
          <h2 className="display text-h2">{heading}</h2>
          {body && <p className="mt-5 leading-relaxed text-on-dark-muted">{body}</p>}
        </Reveal>
        <Reveal delay={100}>
          <Button href={href} variant="solid" onDark>
            {cta}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
