import { Metadata } from "next";
import HeaderTwo from "@/layout/header/header-two-server";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterInner from "@/layout/footer/footer-inner";
import PortfolioWrapper from "./_components/portfolio-wrapper";
import PageTitle from "@/components/common/page-title";
import WorkAreaEight from "@/components/work/work-area-8";
import CustomCursor from "@/components/common/custom-cursor";
import { getPageData, getSection } from "@/lib/get-page";

export const metadata: Metadata = {
  title: "Portfolio Page - Redox Next js Template",
  description: "Redox is a agency and portfolio template built with Next.js.",
};

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const page = await getPageData("portfolio");
  const sections = page?.sections || [];
  const pageTitle = getSection(sections, "page-title");

  return (
    <>
      <CustomCursor />
      <HeaderTwo />
      <MainWrapper bodyCls={["body-wrapper", "body-page-inner", "font-heading-sequelsans-romanbody"]}>
        <PortfolioWrapper>
          <main>
            <PageTitle title={(pageTitle?.title as string) || "Portfolio"} />
            <WorkAreaEight />
          </main>
          <FooterInner />
        </PortfolioWrapper>
      </MainWrapper>
    </>
  );
}
