import type { Metadata } from "next";
import ServiceGroupPage from "@/components/sections/ServiceGroupPage";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { serviceGroups } from "@/data/services";

const PATH = "/environmental-abatement-halifax-dartmouth-nova-scotia";
const group = serviceGroups.find((g) => g.slug === "environmental-abatement")!;

export const metadata: Metadata = pageMeta({
  title: "Environmental Abatement Halifax & Dartmouth",
  description: "Safe, certified asbestos, mold and lead abatement for residential, commercial and industrial properties across Atlantic Canada.",
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
