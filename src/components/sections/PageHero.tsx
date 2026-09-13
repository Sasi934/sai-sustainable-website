import Image from "next/image";

/** Interior page hero. Quieter than the homepage — one image, one statement. */
export default function PageHero({
  eyebrow,
  heading,
  intro,
  image,
  imageAlt,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative flex min-h-[62svh] items-end overflow-hidden bg-ink text-on-dark">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-55"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-ink via-ink/65 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-r from-ink/85 via-ink/30 to-transparent"
      />

      <div className="relative container pb-[clamp(3rem,6vw,5rem)] pt-36">
        <p className="eyebrow text-champagne">{eyebrow}</p>
        <h1 className="display mt-6 max-w-[20ch] text-h1">{heading}</h1>
        {intro && (
          <p className="mt-7 max-w-[58ch] text-lede leading-relaxed text-on-dark-muted">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
