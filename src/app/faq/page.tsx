import { Metadata } from "next";
import HeaderTwo from "@/layout/header/header-two-server";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterInner from "@/layout/footer/footer-inner";
import FaqWrapper from "./_components/faq-wrapper";
import PageTitle from "@/components/common/page-title";
import { AccordionWrapper } from "@/components/faq/faq-area";
import { getPageData, getSection } from "@/lib/get-page";

export const metadata: Metadata = {
  title: "FAQ Page - Redox Next js Template",
  description: "Redox is a agency and portfolio template built with Next.js.",
};

export const dynamic = "force-dynamic";

export default async function FaqPage() {
  const page = await getPageData("faq");
  const sections = page?.sections || [];
  const pageTitle = getSection(sections, "page-title");
  const faqData = getSection(sections, "faq");

  return (
    <>
      <HeaderTwo />
      <MainWrapper bodyCls={["body-wrapper", "body-page-inner", "font-heading-sequelsans-romanbody"]}>
        <FaqWrapper>
          <main>
            <PageTitle title={(pageTitle?.title as string) || "Question"} />
            <section className="faq-area-faq-page">
              <div className="container large">
                <div className="faq-area-faq-page-inner">
                  <div className="section-header fade-anim">
                    <div className="section-title-wrapper">
                      <div className="subtitle-wrapper">
                        <span className="section-subtitle">{(faqData?.subtitle as string) || "FAQ"}</span>
                      </div>
                      <div className="title-wrapper">
                        <h2 className="section-title font-sequelsans-romanbody">
                          {(faqData?.heading as string) || "Learn some common answers about newly projects"}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <AccordionWrapper data={faqData} />
                </div>
              </div>
            </section>
          </main>
          <FooterInner />
        </FaqWrapper>
      </MainWrapper>
    </>
  );
}
