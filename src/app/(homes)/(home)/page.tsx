import { Metadata } from "next";
import MainWrapper from "@/components/wrapper/main-wrapper";
import StartupAgencyWrapper from "../startup-agency/_components/startup-agency-wrapper";
import HeaderFive from "@/layout/header/header-five-server";
import HeroFive from "@/components/hero/hero-five";
import WorkAreaFour from "@/components/work/work-area-4";
import MarqueeText from "@/components/marquee/marquee-text";
import AboutFour from "@/components/about/about-four";
import ServiceAreaFive from "@/components/services/service-area-5";
import CtaAreaFour from "@/components/cta/cta-area-4";
import FooterFour from "@/layout/footer/footer-four-server";
import CustomCursor from "@/components/common/custom-cursor";
import { getPageData, getSection } from "@/lib/get-page";

export const metadata: Metadata = {
  title: "Redox - Startup Agency and Portfolio Next js Template",
  description: "Redox is a startup agency and portfolio template built with Next.js, designed to showcase your work and services effectively.",
};

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const page = await getPageData("home");
  const sections = page?.sections || [];

  const heroData = getSection(sections, "hero");
  const worksData = getSection(sections, "works");
  const marqueeData = getSection(sections, "marquee");
  const aboutData = getSection(sections, "about");
  const servicesData = getSection(sections, "services");
  const ctaData = getSection(sections, "cta");

  return (
    <>
      <CustomCursor />
      <HeaderFive />
      <MainWrapper
        bodyCls={["body-wrapper", "body-startup-agency", "font-heading-bdogrotesk-regular"]}
      >
        <StartupAgencyWrapper>
          <main>
            <HeroFive data={heroData as Record<string, unknown>} />
            <WorkAreaFour data={worksData as Record<string, unknown>} />
            <MarqueeText data={marqueeData as Record<string, unknown>} />
            <AboutFour data={aboutData as Record<string, unknown>} />
            <ServiceAreaFive data={servicesData as Record<string, unknown>} />
            <CtaAreaFour data={ctaData as Record<string, unknown>} />
          </main>
          <FooterFour />
        </StartupAgencyWrapper>
      </MainWrapper>
    </>
  );
}
