import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import MaskText from "@/components/motion/MaskText";
import { contact } from "@/data/company";

/** 08 — Dramatic close. The loudest block on the page, and the last. */
export default function FinalCTA() {
  return (
    <section className="border-t border-line-dark bg-ink py-[var(--section)] text-on-dark">
      <div className="container">
        <Reveal>
          <p className="eyebrow text-champagne">Start a conversation</p>
          <MaskText as="h2" className="display mt-6 max-w-[14ch] text-hero">
            Call us today for free estimate
          </MaskText>
        </Reveal>

        <Reveal delay={140}>
          <div className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-6">
            <Button href="/contact-us" variant="solid" onDark>
              Get a quote
            </Button>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
              {contact.phones.map((p) => (
                <a
                  key={p.number}
                  href={p.href}
                  className="text-lede text-on-dark-muted transition-colors hover:text-on-dark"
                >
                  {p.number}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
