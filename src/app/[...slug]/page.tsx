import { Metadata } from "next";
import { notFound } from "next/navigation";
import HeaderTwo from "@/layout/header/header-two-server";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterInner from "@/layout/footer/footer-inner";
import SectionRenderer from "@/components/renderer/section-renderer";
import { getPages } from "@/lib/db";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string[] }>;
};

// Generate SEO metadata from DB
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const pageSlug = slug.join("/");

  try {
    const pages = await getPages();
    const page = await pages.findOne({ slug: pageSlug });
    if (page) {
      return {
        title: page.metaTitle || page.title || pageSlug,
        description: page.metaDescription || `${page.title} - Redox Agency`,
      };
    }
  } catch {}

  return { title: pageSlug };
}

export default async function DynamicPage({ params }: Props) {
  const { slug } = await params;
  const pageSlug = slug.join("/");

  if (pageSlug.startsWith("admin") || pageSlug.startsWith("api")) {
    notFound();
  }

  let page;
  try {
    const pages = await getPages();
    page = await pages.findOne({ slug: pageSlug });
  } catch {
    notFound();
  }

  if (!page || !page.sections || page.sections.length === 0) {
    notFound();
  }

  return (
    <>
      <HeaderTwo />
      <MainWrapper bodyCls={["body-wrapper", "body-page-inner", "font-heading-sequelsans-romanbody"]}>
        <main>
          {page.sections.map((section: { type: string; [key: string]: unknown }, idx: number) => (
            <SectionRenderer key={idx} section={section} />
          ))}
        </main>
        <FooterInner />
      </MainWrapper>
    </>
  );
}
