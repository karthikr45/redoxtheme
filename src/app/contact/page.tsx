import { Metadata } from "next";
import HeaderTwo from "@/layout/header/header-two-server";
import MainWrapper from "@/components/wrapper/main-wrapper";
import ContactWrapper from "./_components/contact-wrapper";
import ContactArea from "./_components/contact-area";
import FooterInner from "@/layout/footer/footer-inner";
import PageTitle from "@/components/common/page-title";
import { getPageData, getSection } from "@/lib/get-page";

export const metadata: Metadata = {
  title: "Contact Page - Redox Next js Template",
  description: "Redox is a agency and portfolio template built with Next.js.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const page = await getPageData("contact");
  const sections = page?.sections || [];
  const pageTitle = getSection(sections, "page-title");
  const contactData = getSection(sections, "contact");

  return (
    <>
      <HeaderTwo />
      <MainWrapper bodyCls={["body-wrapper", "body-page-inner", "font-heading-sequelsans-romanbody"]}>
        <ContactWrapper>
          <main>
            <PageTitle title={(pageTitle?.title as string) || "Contact"} />
            <ContactArea data={contactData} />
          </main>
          <FooterInner />
        </ContactWrapper>
      </MainWrapper>
    </>
  );
}
