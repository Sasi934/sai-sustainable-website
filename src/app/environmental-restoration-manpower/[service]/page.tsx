import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SubServicePage from "@/components/sections/SubServicePage";
import { pageMeta } from "@/lib/seo";
import { getDivision } from "@/data/divisions";
import { environmentalPages, getEnvironmentalPage } from "@/data/environmental";

const division = getDivision("environmental");

export function generateStaticParams() {
  return environmentalPages.map((p) => ({ service: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const { service } = await params;
  const page = getEnvironmentalPage(service);
  if (!page) return {};
  return {
    ...pageMeta({
      title: page.metaTitle,
      description: page.metaDescription,
      path: `${division.href}/${page.slug}`,
      image: page.image,
    }),
    keywords: page.keywords,
  };
}

export default async function Page({ params }: { params: Promise<{ service: string }> }) {
  const { service } = await params;
  const page = getEnvironmentalPage(service);
  if (!page) notFound();

  return <SubServicePage page={page} division={division} siblings={environmentalPages} areaServed="Atlantic Canada" />;
}
