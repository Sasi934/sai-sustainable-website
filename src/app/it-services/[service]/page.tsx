import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServicePage from "@/components/sections/SubServicePage";
import { pageMeta } from "@/lib/seo";
import { getDivision } from "@/data/divisions";
import { itPages, getItPage } from "@/data/it-solutions";

/*
  /it-services/work, /it-services/ai-road-defect-detection and
  /it-services/request-demo are static segments and take precedence over this
  dynamic route in the App Router.
*/
const division = getDivision("it");

export function generateStaticParams() {
  return itPages.map((p) => ({ service: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const page = getItPage(service);
  if (!page) return {};
  return {
    ...pageMeta({ title: page.metaTitle, description: page.metaDescription, path: `${division.href}/${page.slug}` }),
    keywords: page.keywords,
  };
}

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const page = getItPage(service);
  if (!page) notFound();

  return <SubServicePage page={page} division={division} siblings={itPages} />;
}
