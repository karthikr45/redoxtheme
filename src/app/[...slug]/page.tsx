import { notFound } from "next/navigation";
import HeaderTwo from "@/layout/header/header-two-server";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterInner from "@/layout/footer/footer-inner";
import SectionRenderer from "@/components/renderer/section-renderer";
import { getPageData } from "@/lib/get-page";

export const dynamic = "force-dynamic";

// This catch-all route handles any page created dynamically via admin
// It checks if a page exists in MongoDB for the given slug
// If found, it renders the page sections using SectionRenderer
// If not found, it returns 404 (letting Next.js file-based routes take priority)

export default async function DynamicPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const pageSlug = slug.join("/");

  // Skip admin routes and API routes
  if (pageSlug.startsWith("admin") || pageSlug.startsWith("api")) {
    notFound();
  }

  const page = await getPageData(pageSlug);

  if (!page || !page.sections || page.sections.length === 0) {
    notFound();
  }

  return (
    <>
      <HeaderTwo />
      <MainWrapper
        bodyCls={["body-wrapper", "body-page-inner", "font-heading-sequelsans-romanbody"]}
      >
        <main>
          {page.sections.map((section, idx) => (
            <SectionRenderer key={idx} section={section} />
          ))}
        </main>
        <FooterInner />
      </MainWrapper>
    </>
  );
}
