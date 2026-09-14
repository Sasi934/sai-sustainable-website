import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import Introduction from "@/components/sections/Introduction";
import Divisions from "@/components/sections/Divisions";
import ITPreview from "@/components/sections/ITPreview";
import RoadDefectFeature from "@/components/sections/it/RoadDefectFeature";
import Capabilities from "@/components/sections/Capabilities";
import ProjectsPreview from "@/components/sections/ProjectsPreview";
import WhySAI from "@/components/sections/WhySAI";
import ProcessSteps from "@/components/sections/ProcessSteps";
import SectionHeading from "@/components/sections/SectionHeading";
import FinalCTA from "@/components/sections/FinalCTA";
import { pageMeta } from "@/lib/seo";
import { JsonLd, groupSchema } from "@/lib/schema";
import { itProcess } from "@/data/it-solutions";

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
 * Homepage rhythm — contrast, with IT given the most space:
 *   01 dark cinematic hero (group) → 02 ivory statement → 03 ivory division panels
 *   → 04 dark IT feature → 05 dark road-defect product → 06 ivory capability index
 *   → 07 raised-ivory projects → 08 dark why → 09 ivory process → 10 dark close
 *   → 11 footer (layout).
 */
export default function Home() {
  return (
    <>
      <JsonLd data={groupSchema()} />
      <Hero />
      <Introduction />
      <Divisions />
      <ITPreview />
      <RoadDefectFeature />
      <Capabilities />
      <ProjectsPreview />
      <WhySAI />
      <section aria-labelledby="process-heading" data-division="it" className="bg-ivory py-[var(--section)] text-on-light">
        <div className="container">
          <SectionHeading
            id="process-heading"
            eyebrow="Process"
            heading="Seven steps from idea to running system."
            body="How SAI IT Solutions delivers — from the first conversation to long-term support."
          />
          <ProcessSteps steps={itProcess} />
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
