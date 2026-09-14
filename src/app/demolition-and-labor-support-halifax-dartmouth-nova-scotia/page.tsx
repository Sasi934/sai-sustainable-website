import type { Metadata } from "next";
import ServiceGroupPage from "@/components/sections/ServiceGroupPage";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { serviceGroups } from "@/data/services";

const PATH = "/demolition-and-labor-support-halifax-dartmouth-nova-scotia";
const group = serviceGroups.find((g) => g.slug === "demolition-and-labor-support")!;

export const metadata: Metadata = pageMeta({
  title: "Demolition & Labor Support Halifax & Dartmouth",
  description: "Full house and interior demolition with responsible waste separation, plus skilled labour support for projects of any size.",
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
          { name: "Environmental, Restoration & Manpower", path: "/environmental-restoration-manpower" },
          { name: group.name, path: PATH },
        ])}
      />
      <ServiceGroupPage group={group} />
    </>
  );
}
