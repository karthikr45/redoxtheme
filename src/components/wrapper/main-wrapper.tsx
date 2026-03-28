'use client';
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import useScrollSmooth from "@/hooks/use-scroll-smooth";
import ScrollToTop from "../common/scroll-to-top";
import InlineEditWrapper from "../admin/inline-edit-wrapper";
import AutoEditableWrapper from "../admin/auto-editable-wrapper";

type IProps = {
  children: React.ReactNode;
  bodyCls?: string[];
};

export default function MainWrapper({ children, bodyCls }: IProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (bodyCls?.length) {
      document.body.classList.add(...bodyCls);
    }
    return () => {
      if (bodyCls) {
        document.body.classList.remove(...bodyCls);
      }
    };
  }, [bodyCls]);

  // Smooth scrolling
  useScrollSmooth();

  // Generate section name from pathname for auto-editable
  const sectionName = pathname === "/" ? "home" : pathname.replace(/^\//, "").replace(/\//g, "-");

  return (
    <InlineEditWrapper>
      {/* scroll to top start */}
      <ScrollToTop />
      {/* scroll to top end */}

      <div className="has-smooth" id="has_smooth"></div>
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <AutoEditableWrapper section={sectionName}>
            {children}
          </AutoEditableWrapper>
        </div>
      </div>
    </InlineEditWrapper>
  )
}
