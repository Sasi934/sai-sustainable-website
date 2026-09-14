import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70svh] items-center bg-ink text-on-dark">
      <div className="container py-24">
        <p className="eyebrow text-signal">404</p>
        <h1 className="display mt-6 max-w-[16ch] text-h1">
          That page isn&rsquo;t here.
        </h1>
        <p className="mt-6 max-w-[46ch] leading-relaxed text-on-dark-muted">
          It may have moved. You can start from the homepage, or tell us what you need and
          we&rsquo;ll point you to the right team.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Button href="/" variant="solid" onDark>
            Homepage
          </Button>
          <Button href="/#divisions" variant="outline" onDark>
            Explore divisions
          </Button>
        </div>
        <p className="mt-10 text-sm text-on-dark-faint">
          Or call{" "}
          <a href="tel:+19024527600" className="text-on-dark underline underline-offset-4">
            +1(902) 452-7600
          </a>
        </p>
      </div>
    </section>
  );
}
