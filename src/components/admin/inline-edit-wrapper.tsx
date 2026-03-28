"use client";
import { useEffect } from "react";
import { EditModeProvider, useEditMode } from "./edit-mode-provider";
import EditToolbar from "./edit-toolbar";

function NavigationBlocker({ children }: { children: React.ReactNode }) {
  const { isEditMode } = useEditMode();

  useEffect(() => {
    if (!isEditMode) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Allow file input clicks (for image upload)
      if (target.tagName === "INPUT" && (target as HTMLInputElement).type === "file") return;

      // Allow clicks on editable elements
      if (target.getAttribute("contenteditable") === "true") return;
      if (target.closest("[contenteditable='true']")) return;

      // Allow clicks on edit mode UI elements (toolbar, popups)
      if (target.closest("[data-edit-ui]")) return;

      // Block link navigation
      const link = target.closest("a");
      if (link) {
        const href = link.getAttribute("href");
        if (href && href !== "#" && !href.startsWith("javascript:")) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
    };

    // Use capture phase but don't stop propagation for non-link clicks
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
