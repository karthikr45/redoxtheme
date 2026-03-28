import { Metadata } from "next";
import HeaderTwo from "@/layout/header/header-two-server";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterInner from "@/layout/footer/footer-inner";
import PageTitle from "@/components/common/page-title";
import AboutWrapper from "./_components/about-wrapper";
import AboutAreaDetails from "@/components/about/about-area-details";
import ApproachAboutArea from "@/components/approach/approach-about-area";
import InfoAreaAbout from "./_components/info-area-about";
import ClientSlider from "@/components/client/client-slider";
import MediaAboutArea from "./_components/media-about-area";
import { AwardBoxWrapper } from "@/components/award/award-area";
import { TeamWrapperArea } from "@/components/team/team-area";
import TeamListArea from "@/components/team/team-list-area";
import { getPageData, getSection } from "@/lib/get-page";

export const metadata: Metadata = {
  title: "About Page - Redox Next js Template",
  description: "Redox is a agency and portfolio template built with Next.js.",
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const page = await getPageData("about");
  const sections = page?.sections || [];
  const pageTitle = getSection(sections, "page-title");
  const aboutData = getSection(sections, "about");
  const teamData = getSection(sections, "team");

  return (
    <>
      <HeaderTwo />
      <MainWrapper bodyCls={["body-wrapper", "body-page-inner", "font-heading-sequelsans-romanbody"]}>
        <AboutWrapper>
          <main>
            <PageTitle title={(pageTitle?.title as string) || "Since 2012"} />
            <AboutAreaDetails />
            <ApproachAboutArea />
            <InfoAreaAbout />
            <div className="client-area-page-about">
              <div className="client-area-page-about-inner section-spacing">
                <div className="container large">
                  <div className="section-header fade-anim">
                    <div className="text-wrapper">
                      <p className="text">Help to brands growing up and show their success stories to the world</p>
                    </div>
                  </div>
                </div>
                <div className="clients-wrapper-box fade-anim">
                  <div className="clients-wrapper"><ClientSlider /></div>
                </div>
              </div>
            </div>
            <MediaAboutArea />
            <section className="award-area-page-about">
              <div className="container large">
                <div className="award-area-page-about-inner section-spacing">
                  <div className="section-header fade-anim">
                    <div className="section-title-wrapper">
                      <div className="subtitle-wrapper">
                        <span className="section-subtitle">{(aboutData?.subtitle as string) || "Awards"}</span>
                      </div>
                      <div className="title-wrapper" data-direction="left">
                        <h2 className="section-title font-sequelsans-romanbody">
                          {(aboutData?.heading as string) || "We believe in quality, not quantity, that's why we're great ever."}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="awards-wrapper-box fade-anim">
                    <div className="awards-wrapper"><AwardBoxWrapper /></div>
                  </div>
                </div>
              </div>
            </section>
            <section className="team-area-about-page">
              <div className="container large">
                <div className="team-area-about-page-inner section-spacing-top">
                  <div className="section-header fade-anim">
                    <div className="section-title-wrapper">
                      <div className="subtitle-wrapper">
                        <span className="section-subtitle">{(teamData?.subtitle as string) || "Team"}</span>
                      </div>
                      <div className="title-wrapper">
                        <h2 className="section-title font-sequelsans-romanbody">
                          {(teamData?.heading as string) || "Meet the talented squad, behind the creativity"}
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="team-wrapper-box fade-anim"><TeamWrapperArea /></div>
                </div>
              </div>
            </section>
            <TeamListArea />
          </main>
          <FooterInner />
        </AboutWrapper>
      </MainWrapper>
    </>
  );
}
