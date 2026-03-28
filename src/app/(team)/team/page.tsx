import { Metadata } from "next";
import HeaderTwo from "@/layout/header/header-two-server";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterInner from "@/layout/footer/footer-inner";
import TeamWrapper from "./_components/team-wrapper";
import PageTitle from "@/components/common/page-title";
import TeamHeaderArea from "./_components/team-header-area";
import { TeamWrapperArea } from "@/components/team/team-area";
import { TeamListWrapper } from "@/components/team/team-list-area";
import Link from "next/link";
import { getPageData, getSection } from "@/lib/get-page";

export const metadata: Metadata = {
  title: "Team Page - Redox Next js Template",
  description: "Redox is a agency and portfolio template built with Next.js.",
};

export const dynamic = "force-dynamic";

export default async function TeamPage() {
  const page = await getPageData("team");
  const sections = page?.sections || [];
  const pageTitle = getSection(sections, "page-title");
  const ctaData = getSection(sections, "cta");

  return (
    <>
      <HeaderTwo />
      <MainWrapper bodyCls={["body-wrapper", "body-page-inner", "font-heading-sequelsans-romanbody"]}>
        <TeamWrapper>
          <main>
            <PageTitle title={(pageTitle?.title as string) || "Our Team"} />
            <TeamHeaderArea />
            <section className="team-area">
              <div className="container large">
                <div className="team-area-inner">
                  <div className="team-wrapper-box fade-anim"><TeamWrapperArea /></div>
                </div>
              </div>
            </section>
            <div className="team-list-area">
              <div className="container large">
                <div className="team-list-area-inner">
                  <div className="team-wrapper-box fade-anim"><TeamListWrapper /></div>
                </div>
              </div>
            </div>
            <section className="cta-area-team-page">
              <div className="container large">
                <div className="cta-area-team-page-inner section-spacing-top">
                  <div className="section-content fade-anim">
                    <div className="section-title-wrapper">
                      <div className="title-wrapper">
                        <h2 className="section-title font-sequelsans-romanbody">
                          {(ctaData?.headingLine1 as string) || "We think out of the box when it comes to strategy, design and creative. Want to join the talented team?"}
                        </h2>
                      </div>
                    </div>
                    <div className="btn-wrapper">
                      <Link href={(ctaData?.link as string) || "/contact"} className="rr-btn">
                        <span className="btn-wrap">
                          <span className="text-one">{(ctaData?.buttonLabel as string) || "Send Us Now"}</span>
                          <span className="text-two">{(ctaData?.buttonLabel as string) || "Send Us Now"}</span>
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          <FooterInner />
        </TeamWrapper>
      </MainWrapper>
    </>
  );
}
