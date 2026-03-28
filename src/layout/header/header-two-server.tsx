import { getMenuData } from "@/lib/get-menu";
import HeaderTwoClient from "./header-two";

export default async function HeaderTwo() {
  const menuData = await getMenuData();
  return <HeaderTwoClient menuData={menuData} />;
}
