"use client";
import { useEffect } from "react";
import { EditModeProvider, useEditMode } from "./edit-mode-provider";
import EditToolbar from "./edit-toolbar";

function NavigationBlocker({ children }: { children: React.ReactNode }) {
  const { isEditMode } = useEditMode();

  useEffect(() => {
    if (!isEditMode) return;

    // Block all link clicks and navigation in edit mode
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href");
        // Allow # links and javascript: links
        if (href && href !== "#" && !href.startsWith("javascript:")) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [isEditMode]);

  return <>{children}</>;
}

export default function InlineEditWrapper({ children }: { children: React.ReactNode }) {
  return (
    <EditModeProvider>
      <NavigationBlocker>
        {children}
      </NavigationBlocker>
      <EditToolbar />
    </EditModeProvider>
  );
}
