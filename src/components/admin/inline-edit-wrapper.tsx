"use client";
import { useEffect } from "react";
import { EditModeProvider, useEditMode } from "./edit-mode-provider";
import EditToolbar from "./edit-toolbar";

function NavigationBlocker({ children }: { children: React.ReactNode }) {
  const { isEditMode } = useEditMode();

  useEffect(() => {
    if (!isEditMode) return;

    // Only prevent navigation — do NOT stop event propagation
    // This allows EditableText, EditableImage, EditableLink to still receive clicks
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest("a");

      if (link) {
        const href = link.getAttribute("href");
        if (href && href !== "#" && !href.startsWith("javascript:")) {
          // Only prevent the navigation, don't stop the event
          e.preventDefault();
        }
      }
    };

    // Capture phase to intercept before Next.js router handles it
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
