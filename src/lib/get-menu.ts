import { getSiteSettings } from "./db";
import menuDataFallback from "@/data/menu-data";

export interface MenuItemData {
  title: string;
  href: string;
  children?: MenuItemData[];
}

export async function getMenuData(): Promise<MenuItemData[]> {
  try {
    const settings = await getSiteSettings();
    const menu = await settings.findOne({ key: "menu" });
    if (menu?.data && Array.isArray(menu.data) && menu.data.length > 0) {
      return menu.data;
    }
  } catch {
    // DB not available — fall back to file
  }
  return menuDataFallback;
}
