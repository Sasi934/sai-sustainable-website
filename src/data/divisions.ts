/**
 * SAI GROUP — the three divisions.
 *
 * SOURCE: SAI brief, 2026-09-14 (D-07). `name`, `fullName` and `line` are verbatim
 * from that brief. Service copy lives in environmental.ts, exim.ts and
 * it-solutions.ts; the preserved Atlantic Canada service copy stays in services.ts.
 *
 * Array order is the brief's order (01 → 03). IT Solutions is the strategic focus
 * and is given the stronger visual treatment by the components, not by reordering
 * the enumerated set.
 */
export type DivisionKey = "environmental" | "exim" | "it";

export type Division = {
  key: DivisionKey;
  index: string;
  name: string;
  fullName: string;
  line: string;
  href: string;
  /** Strategic focus — rendered with the stronger treatment. */
  focus?: boolean;
  /** Sub-pages surfaced in navigation. */
  links: { label: string; href: string }[];
};

export const ENVIRONMENTAL_BASE = "/environmental-restoration-manpower";
export const EXIM_BASE = "/exim";
export const IT_BASE = "/it-services";

export const divisions: Division[] = [
  {
    key: "environmental",
    index: "01",
    name: "Environmental, Restoration & Manpower",
    fullName: "SAI Environmental, Restoration & Manpower",
    line: "Asbestos abatement, lead removal, mold remediation, water/fire restoration and construction manpower supply.",
    href: ENVIRONMENTAL_BASE,
    links: [
      { label: "Asbestos Abatement", href: `${ENVIRONMENTAL_BASE}/asbestos-abatement` },
      { label: "Mold Remediation", href: `${ENVIRONMENTAL_BASE}/mold-remediation` },
      { label: "Water & Fire Restoration", href: `${ENVIRONMENTAL_BASE}/water-restoration` },
      { label: "Manpower Solutions", href: `${ENVIRONMENTAL_BASE}/manpower-solutions` },
    ],
  },
  {
    key: "exim",
    index: "02",
    name: "EXIM",
    fullName: "SAI EXIM",
    line: "Import, export, sourcing, documentation and logistics coordination.",
    href: EXIM_BASE,
    links: [
      { label: "Services", href: `${EXIM_BASE}#services` },
      { label: "Product categories", href: `${EXIM_BASE}#categories` },
      { label: "Become a Supplier", href: "/vendor-registration" },
    ],
  },
  {
    key: "it",
    index: "03",
    name: "IT Solutions",
    fullName: "SAI IT Solutions",
    line: "Web development, IT consulting, AI solutions and AI-based road defect detection.",
    href: IT_BASE,
    focus: true,
    links: [
      { label: "Web Development", href: `${IT_BASE}/web-development` },
      { label: "AI & ML", href: `${IT_BASE}/ai-ml` },
      { label: "AI Road Defect Detection", href: `${IT_BASE}/ai-road-defect-detection` },
      { label: "Portfolio", href: `${IT_BASE}/work` },
    ],
  },
];

export const getDivision = (key: DivisionKey) => divisions.find((d) => d.key === key)!;

/** The five preserved Atlantic Canada service routes belong to Division 01. */
const ENVIRONMENTAL_PATHS = [
  ENVIRONMENTAL_BASE,
  "/environmental-abatement-halifax-dartmouth-nova-scotia",
  "/restoration-and-cleaning-dartmouth-halifax-nova-scotia",
  "/waste-and-disposal-services-halifax-dartmouth-nova-scotia",
  "/demolition-and-labor-support-halifax-dartmouth-nova-scotia",
  "/renovation-and-construction-dartmouth-halifax-general-contractors",
];

/** Which palette the global chrome (header) should wear on a given route. */
export function divisionForPath(pathname: string): DivisionKey | undefined {
  if (pathname === IT_BASE || pathname.startsWith(`${IT_BASE}/`) || pathname === "/partners") return "it";
  if (pathname === EXIM_BASE || pathname === "/vendor-registration") return "exim";
  if (ENVIRONMENTAL_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) {
    return "environmental";
  }
  return undefined;
}
