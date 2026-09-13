import type { Metadata } from "next";
import ServiceGroupPage from "@/components/sections/ServiceGroupPage";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { serviceGroups } from "@/data/services";

const PATH = "/renovation-and-construction-dartmouth-halifax-general-contractors";
const group = serviceGroups.find((g) => g.slug === "renovation-and-construction")!;

export const metadata: Metadata = pageMeta({
  title: "Renovation & Construction — Dartmouth & Halifax General Contractors",
  description: "Full-service home and commercial renovations, interior and exterior upgrades, delivered with quality craftsmanship and lasting value.",
  path: PATH,
  image: group.image,
});

export default function Page() {
  return (
    <>
      <JsonLd data={serviceSchema(group.name, group.intro, PATH)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: group.name, path: PATH },
        ])}
      />
      <ServiceGroupPage
        group={group}
        scene="massing"
        sceneHeading="Structure, in sequence."
        sceneBody="Every build resolves in an order — frame, envelope, finish. The same discipline applies whether it is a single room or a full rebuild."
      />
    </>
  );
}
