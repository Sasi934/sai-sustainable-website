import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";
import { terms } from "@/data/group-pages";

export const metadata: Metadata = pageMeta({
  title: "Terms of Use",
  description: "Terms of use for the SAI Group website.",
  path: "/terms",
});

export default function Page() {
  return <LegalPage doc={terms} path="/terms" />;
}
