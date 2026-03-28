import { Metadata } from "next";
import HeaderTwo from "@/layout/header/header-two-server";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterInner from "@/layout/footer/footer-inner";
import PageTitle from "@/components/common/page-title";
import BlogAreaTwo from "@/components/blog/blog-area-2";
import BlogWrapper from "./_components/blog-wrapper";
import { getPageData, getSection } from "@/lib/get-page";

export const metadata: Metadata = {
  title: "Blog Page - Redox Next js Template",
  description: "Redox is a agency and portfolio template built with Next.js.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const page = await getPageData("blog");
  const sections = page?.sections || [];
  const pageTitle = getSection(sections, "page-title");

  return (
    <>
      <HeaderTwo />
      <MainWrapper bodyCls={["body-wrapper", "body-page-inner", "font-heading-sequelsans-romanbody"]}>
        <BlogWrapper>
          <main>
            <PageTitle title={(pageTitle?.title as string) || "Journals"} />
            <BlogAreaTwo />
          </main>
          <FooterInner />
        </BlogWrapper>
      </MainWrapper>
    </>
  );
}
