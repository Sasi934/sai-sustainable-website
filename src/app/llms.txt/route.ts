import { SITE_URL, SITE_NAME } from "@/lib/site";
import { company, contact, certifications, group } from "@/data/company";
import { divisions } from "@/data/divisions";
import { environmentalPages } from "@/data/environmental";
import { eximServices, eximCategories } from "@/data/exim";
import { itServices, itPages, roadDefect, itIndustries, itTechStack } from "@/data/it-solutions";
import { itProjects } from "@/data/it-projects";
import { serviceGroups } from "@/data/services";
import { partners } from "@/data/partners";

export const dynamic = "force-static";

/**
 * /llms.txt — a plain-text map of the group for AI agents and answer engines
 * (llmstxt.org convention). Generated from the same data files as the pages, so
 * it can never drift from what the site says.
 */
export function GET() {
  const [environmental, exim, it] = divisions;
  const link = (label: string, path: string, note?: string) => `- [${label}](${SITE_URL}${path})${note ? `: ${note}` : ""}`;
  const emergency = contact.phones.find((p) => p.emergency)!;

  const body = [
    `# ${group.name} (${SITE_NAME})`,
    "",
    `> ${group.name} has three divisions: ${divisions.map((d) => d.fullName).join("; ")}. IT Solutions is the group's strategic focus.`,
    "",
    `Headquarters: ${company.headquarters}. Environmental services area: ${company.serviceRegions}.`,
    `24/7 emergency line: ${emergency.number}. Email: ${contact.emails[0].address}.`,
    `Certifications: ${certifications.map((c) => `${c.name} (${c.issuer})`).join("; ")}.`,
    "",
    `## ${it.fullName}`,
    it.line,
    link(it.name, it.href),
    link("AI Road Defect Detection", `${it.href}/ai-road-defect-detection`, `delivered in collaboration with ${roadDefect.partner.long}; detects ${roadDefect.detects.map((d) => d.name.toLowerCase()).join(", ")}; ${roadDefect.capabilities.map((c) => c.name.toLowerCase()).join(", ")}`),
    ...itPages.map((p) => link(p.heading, `${it.href}/${p.slug}`, p.metaDescription)),
    link("Portfolio", `${it.href}/work`, `delivered projects: ${itProjects.map((p) => p.name).join(", ")}`),
    link("Request a demo", `${it.href}/request-demo`),
    `Services: ${itServices.map((s) => s.name).join("; ")}.`,
    `Industries: ${itIndustries.map((i) => i.name).join("; ")}.`,
    `Technology: ${itTechStack.join(", ")}.`,
    "",
    `## ${environmental.fullName}`,
    environmental.line,
    link(environmental.name, environmental.href),
    ...environmentalPages.map((p) => link(p.heading, `${environmental.href}/${p.slug}`, p.metaDescription)),
    "Atlantic Canada service pages:",
    ...serviceGroups.map((g) => link(g.name, g.path, g.services.map((s) => s.name).join(", "))),
    "",
    `## ${exim.fullName}`,
    exim.line,
    link(exim.name, exim.href),
    link("Vendor registration", "/vendor-registration"),
    `Services: ${eximServices.map((s) => s.name).join("; ")}.`,
    `Product categories: ${eximCategories.map((c) => c.name).join("; ")}.`,
    "",
    "## Technology partners",
    ...partners.map((p) => `- ${p.name} (${p.legalName}, ${p.location}) — ${p.relationship}: ${p.summary} ${p.url}`),
    link("Partners page", "/partners"),
    "",
    "## Group",
    link("About SAI", "/about-us"),
    link("Projects", "/projects"),
    link("Sectors", "/sectors"),
    link("Certifications", "/certifications"),
    link("Careers", "/careers"),
    link("Blog", "/blog-list"),
    link("Contact / Get a Quote", "/contact-us"),
    "",
  ].join("\n");

  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
