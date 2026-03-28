"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { fadeAnimation } from "@/utils/title-anim";
import { scaleAnim } from "@/utils/img-anim";
import { CustomEase, ScrollToPlugin, ScrollTrigger, SplitText } from "gsap/all";

type Props = {
  children: React.ReactNode;
};

export default function AgencyPortfolioWrapper({ children }: Props) {
  useGSAP(() => {
    gsap.registerPlugin(CustomEase, ScrollToPlugin,SplitText,ScrollTrigger);
    const timer = setTimeout(() => {
      fadeAnimation();
      scaleAnim();
    }, 100);
    return () => clearTimeout(timer);
  }, {});
  return children;
}
