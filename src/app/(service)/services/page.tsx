import { Metadata } from "next";
import HeaderTwo from "@/layout/header/header-two-server";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterInner from "@/layout/footer/footer-inner";
import PageTitle from "@/components/common/page-title";
import ServiceAreaSix from "@/components/services/service-area-6";
import ServiceWrapper from "./_components/service-wrapper";
import ClientAreaFour from "@/components/client/client-area-4";
import { getPageData, getSection } from "@/lib/get-page";

export const metadata: Metadata = {
  title: "Services Page - Redox Next js Template",
  description: "Redox is a agency and portfolio template built with Next.js.",
};

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const page = await getPageData("services");
  const sections = page?.sections || [];
  const pageTitle = getSection(sections, "page-title");

  return (
    <>
      <HeaderTwo />
      <MainWrapper bodyCls={["body-wrapper", "body-page-inner", "font-heading-sequelsans-romanbody"]}>
        <ServiceWrapper>
          <main>
            <PageTitle title={(pageTitle?.title as string) || "Expertise"} />
            <ServiceAreaSix />
            <ClientAreaFour />
          </main>
          <FooterInner />
        </ServiceWrapper>
      </MainWrapper>
    </>
  );
}
