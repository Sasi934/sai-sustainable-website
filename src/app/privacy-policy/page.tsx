import type { Metadata } from "next";
import LegalPage from "@/components/sections/LegalPage";
import { pageMeta } from "@/lib/seo";
import { privacyPolicy } from "@/data/group-pages";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description: "How SAI Group collects and uses information submitted through this website's enquiry forms, and how analytics are used.",
  path: "/privacy-policy",
});

export default function Page() {
  return <LegalPage doc={privacyPolicy} path="/privacy-policy" />;
}
