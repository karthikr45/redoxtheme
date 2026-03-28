import { Metadata } from "next";
import HeaderTwo from "@/layout/header/header-two";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterInner from "@/layout/footer/footer-inner";
import PortfolioDetailsWrapper from "./_components/portfolio-details-wrapper";
import PortfolioDetailsArea from "./_components/portfolio-details-area";

export const metadata: Metadata = {
  title: "Portfolio details Page - Redox Next js Template",
  description:
    "Redox is a agency and portfolio template built with Next.js, designed to showcase your work and services effectively.",
};

export default function PortfolioDetailsPage() {
  return (
    <>
      {/* Header area start */}
      <HeaderTwo />
      {/* Header area end */}

      {/* Main wrapper start */}
      <MainWrapper
        bodyCls={[
          "body-wrapper",
          "body-page-inner",
          "font-heading-sequelsans-romanbody",
        ]}
      >
        <PortfolioDetailsWrapper>
          <main>

            {/* portfolio details area start */}
            <PortfolioDetailsArea/>
            {/* portfolio details area end */}

          </main>

          {/* Footer area start */}
          <FooterInner />
          {/* Footer area end */}
        </PortfolioDetailsWrapper>
      </MainWrapper>
      {/* Main wrapper end */}
    </>
  );
}
