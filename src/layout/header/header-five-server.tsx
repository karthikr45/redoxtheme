import { getMenuData } from "@/lib/get-menu";
import { getSiteSettingsData } from "@/lib/get-settings";
import HeaderFiveClient from "./header-five";

export default async function HeaderFive() {
  const menuData = await getMenuData();
  const settings = await getSiteSettingsData();
  const logoUrl = settings.logo !== "/assets/imgs/logo/logo-2.png" ? settings.logo : undefined;
  return <HeaderFiveClient menuData={menuData} logoUrl={logoUrl} />;
}
