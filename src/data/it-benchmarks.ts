/**
 * ⚠️ REFERENCE BENCHMARKS — NOT SAI WORK.
 *
 * The source document states verbatim:
 *   "Not built by SAI. Just Reference benchmark what SAI is proposed to built"
 *
 * This file is deliberately separate from it-projects.ts. Never merge the two
 * arrays, never render them through the same component, and never place them in
 * the same grid or carousel. See docs/DECISIONS.md, constraint 3.
 */

export type Benchmark = {
  name: string;
  url: string;
  note: string;
};

export const benchmarks: Benchmark[] = [
  {
    name: "City of Vaughan",
    url: "https://www.vaughan.ca/",
    note: "Reference benchmark for municipal service organization and resident digital experience; not presented as an SAI project.",
  },
];

export const benchmarkDisclaimer = "Not built by SAI. Referenced as a standard, not as our work.";
