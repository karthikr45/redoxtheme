import { Metadata } from "next";
import MainWrapper from "@/components/wrapper/main-wrapper";
import StartupAgencyWrapper from "../startup-agency/_components/startup-agency-wrapper";
import HeaderFive from "@/layout/header/header-five";
import HeroFive from "@/components/hero/hero-five";
import WorkAreaFour from "@/components/work/work-area-4";
import MarqueeText from "@/components/marquee/marquee-text";
import AboutFour from "@/components/about/about-four";
import ServiceAreaFive from "@/components/services/service-area-5";
import CtaAreaFour from "@/components/cta/cta-area-4";
import FooterFour from "@/layout/footer/footer-four";
import CustomCursor from "@/components/common/custom-cursor";

export const metadata: Metadata = {
  title: "Redox - Startup Agency and Portfolio Next js Template",
  description:
    "Redox is a startup agency and portfolio template built with Next.js, designed to showcase your work and services effectively.",
};

export default function HomePage() {
  return (
    <>
      <CustomCursor />
      <HeaderFive />
      <MainWrapper
        bodyCls={[
          "body-wrapper",
          "body-startup-agency",
          "font-heading-bdogrotesk-regular",
        ]}
      >
        <StartupAgencyWrapper>
          <main>
            <HeroFive />
            <WorkAreaFour />
            <MarqueeText />
            <AboutFour />
            <ServiceAreaFive />
            <CtaAreaFour />
          </main>
          <FooterFour />
        </StartupAgencyWrapper>
      </MainWrapper>
    </>
  );
}
