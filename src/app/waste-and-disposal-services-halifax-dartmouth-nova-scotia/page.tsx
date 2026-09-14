import type { Metadata } from "next";
import ServiceGroupPage from "@/components/sections/ServiceGroupPage";
import { JsonLd, serviceSchema, breadcrumbSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import { serviceGroups } from "@/data/services";

const PATH = "/waste-and-disposal-services-halifax-dartmouth-nova-scotia";
const group = serviceGroups.find((g) => g.slug === "waste-and-disposal")!;

export const metadata: Metadata = pageMeta({
  title: "Waste & Disposal Services Halifax & Dartmouth",
  description: "Hazardous waste disposal, junk removal and construction site cleanup, handled in compliance with environmental regulations.",
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
