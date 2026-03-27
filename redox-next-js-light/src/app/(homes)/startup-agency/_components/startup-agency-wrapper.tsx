"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { goFullAnimation, scaleAnim } from "@/utils/img-anim";
import { movingTextAnimation } from "@/utils/moving-anim";
import { fadeAnimation } from "@/utils/title-anim";
import { CustomEase, ScrollToPlugin, ScrollTrigger, SplitText } from "gsap/all";

type Props = {
  children: React.ReactNode;
};

export default function StartupAgencyWrapper({ children }: Props) {
  useGSAP(() => {
    gsap.registerPlugin(CustomEase, ScrollToPlugin, SplitText, ScrollTrigger);
    const timer = setTimeout(() => {
      fadeAnimation();
      scaleAnim();
      movingTextAnimation();
      goFullAnimation();
    }, 100);
    return () => clearTimeout(timer);
  }, {});
  return children;
}
