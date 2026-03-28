import { getSiteSettings } from "./db";

export interface SiteSettingsData {
  logo: string;
  logoDark: string;
  favicon: string;
  siteName: string;
  siteDescription: string;
  headingFont: string;
  primaryColor: string;
  secondaryColor: string;
  footerCopyright: string;
  footerCopyrightLink: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
}

const defaults: SiteSettingsData = {
  logo: "/assets/imgs/logo/logo-2.png",
  logoDark: "/assets/imgs/logo/logo-2.png",
  favicon: "",
  siteName: "Redox Agency",
  siteDescription: "Creative Agency and Portfolio",
  headingFont: "font-heading-bdogrotesk-regular",
  primaryColor: "#6c5ce7",
  secondaryColor: "#00b894",
  footerCopyright: "All rights reserved by",
  footerCopyrightLink: "https://themeforest.net/user/ravextheme",
  contactEmail: "hello@redoxagency.com",
  contactPhone: "(505) 555-0125",
  contactAddress: "3891 Ranchview Dr. Richardson",
};

export async function getSiteSettingsData(): Promise<SiteSettingsData> {
  try {
    const settings = await getSiteSettings();
    const doc = await settings.findOne({ key: "site-settings" });
    if (doc?.data) {
      return { ...defaults, ...doc.data };
    }
  } catch {
    // DB not available
  }
  return defaults;
}
