import type { Metadata } from "next";
import ServiceGroupPage from "@/components/sections/ServiceGroupPage";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { serviceGroups } from "@/data/services";

const PATH = "/restoration-and-cleaning-dartmouth-halifax-nova-scotia";
const group = serviceGroups.find((g) => g.slug === "restoration-and-cleaning")!;

export const metadata: Metadata = pageMeta({
  title: "Restoration & Cleaning Dartmouth & Halifax",
  description: "Trauma scene cleanup, water damage restoration and attic mold removal, delivered discreetly and to strict safety protocols.",
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
      <ServiceGroupPage group={group} />
    </>
  );
}
