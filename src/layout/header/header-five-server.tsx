import { getMenuData } from "@/lib/get-menu";
import HeaderFiveClient from "./header-five";

export default async function HeaderFive() {
  const menuData = await getMenuData();
  return <HeaderFiveClient menuData={menuData} />;
}
