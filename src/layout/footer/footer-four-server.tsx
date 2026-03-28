import { getSiteSettingsData } from "@/lib/get-settings";
import FooterFour from "./footer-four";

export default async function FooterFourServer() {
  const settings = await getSiteSettingsData();

  return (
    <FooterFour
      data={{
        copyright: settings.footerCopyright,
        copyrightLink: settings.footerCopyrightLink,
        logoUrl: settings.logo !== "/assets/imgs/logo/logo-2.png" ? settings.logo : undefined,
      }}
    />
  );
}
