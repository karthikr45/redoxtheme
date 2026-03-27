"use client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { fadeAnimation } from "@/utils/title-anim";
import { ScrollToPlugin, ScrollTrigger } from "gsap/all";

type Props = {
  children: React.ReactNode;
};

export default function BlogWrapper({ children }: Props) {
  useGSAP(() => {
    gsap.registerPlugin( ScrollToPlugin,ScrollTrigger);
    const timer = setTimeout(() => {
      fadeAnimation();
    }, 100);
    return () => clearTimeout(timer);
  }, {});
  return children;
}
