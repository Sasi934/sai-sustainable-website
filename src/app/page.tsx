import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import Divisions from "@/components/sections/Divisions";
import { pageMeta } from "@/lib/seo";
import { JsonLd, groupSchema } from "@/lib/schema";

const meta = pageMeta({
  title: "SAI Group — Environmental Restoration, Global Trade (EXIM) & IT/AI Solutions",
  description:
    "SAI Group: asbestos abatement, mold remediation, water and fire restoration and construction manpower supply; import, export and global sourcing; and web development, software, AI solutions and AI road defect detection.",
  path: "/",
  image: "/img/untitled-design-AMqnRjrGOncj2VPn.png",
});

export const metadata: Metadata = {
  ...meta,
  // The homepage title is already complete; skip the "| SAI Sustainable Services Inc." template.
  title: { absolute: "SAI Group — Environmental Restoration, Global Trade (EXIM) & IT/AI Solutions | SAI Sustainable Services Inc." },
};

/**
 * Homepage — deliberately short (SAI, 2026-09-14): hero → group intro → the three
 * divisions, then the footer. Everything deeper lives on the division pages, which
 * the division cards and the Divisions menu lead straight to.
 */
export default function Home() {
  return (
    <>
      <JsonLd data={groupSchema()} />
      <Hero />
      <Introduction />
      <Divisions />
    </>
  );
}
