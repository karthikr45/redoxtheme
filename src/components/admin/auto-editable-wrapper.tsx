"use client";
import { useEffect, useRef } from "react";
import { useEditMode } from "./edit-mode-provider";

/**
 * AutoEditableWrapper - Makes ALL text elements inside it editable
 * without needing to wrap each element individually.
 * Skips elements that already have manual EditableText wrappers.
 */
export default function AutoEditableWrapper({
  section,
  children,
}: {
  section: string;
  children: React.ReactNode;
}) {
  const { isEditMode, addChange } = useEditMode();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isEditMode || !containerRef.current) return;

    const container = containerRef.current;

    // Find all text elements
    const textSelectors = [
      "h1", "h2", "h3", "h4", "h5", "h6",
      "p",
      ".section-subtitle",
      ".title",
      ".text",
      ".name",
      ".post",
      ".number",
      ".tag",
      ".date",
      ".text-one",
      "li",
      ".accordion-button",
      ".accordion-body",
      ".info-text",
    ].join(", ");

    const textElements = container.querySelectorAll(textSelectors);
    const cleanupFns: (() => void)[] = [];

    textElements.forEach((el, elIndex) => {
      const htmlEl = el as HTMLElement;

      // Skip if already has manual EditableText (data-edit-ui)
      if (htmlEl.getAttribute("data-edit-ui") === "true") return;
      if (htmlEl.closest("[data-edit-ui='true']")) return;

      // Skip if already processed
      if (htmlEl.getAttribute("data-auto-edit") === "true") return;

      // Skip containers (elements with block children)
      if (htmlEl.querySelector("h1, h2, h3, h4, h5, h6, div, section, article")) return;

      // Skip if no meaningful text
      const originalText = htmlEl.innerText?.trim();
      if (!originalText || originalText.length < 2) return;

      htmlEl.setAttribute("data-auto-edit", "true");

      const fieldKey = `auto_${section}_${elIndex}`;

      const onMouseEnter = () => {
        htmlEl.style.outline = "2px dashed #6c5ce7";
        htmlEl.style.outlineOffset = "2px";
        htmlEl.style.borderRadius = "4px";
        htmlEl.style.cursor = "pointer";
      };

      const onMouseLeave = () => {
        if (htmlEl.getAttribute("contenteditable") !== "true") {
          htmlEl.style.outline = "";
          htmlEl.style.outlineOffset = "";
          htmlEl.style.cursor = "";
        }
      };

      const onClick = (e: Event) => {
        e.preventDefault();
        htmlEl.setAttribute("contenteditable", "true");
        htmlEl.style.outline = "2px solid #6c5ce7";
        htmlEl.style.boxShadow = "0 0 0 4px rgba(108,92,231,0.15)";
        htmlEl.style.cursor = "text";
        htmlEl.focus();
      };

      const onBlur = () => {
        htmlEl.removeAttribute("contenteditable");
        htmlEl.style.outline = "";
        htmlEl.style.boxShadow = "";
        htmlEl.style.cursor = "";

        const newText = htmlEl.innerText?.trim();
        if (newText && newText !== originalText) {
          addChange(fieldKey, {
            section,
            field: fieldKey,
            value: newText,
          });
          // Show green outline to indicate pending change
          htmlEl.style.outline = "2px solid #00b894";
          htmlEl.style.outlineOffset = "2px";
        }
      };

      const onKeyDown = (e: Event) => {
        const ke = e as KeyboardEvent;
        if (ke.key === "Enter" && !ke.shiftKey) {
          ke.preventDefault();
          htmlEl.blur();
        }
        if (ke.key === "Escape") {
          htmlEl.innerText = originalText;
          htmlEl.blur();
        }
      };

      htmlEl.addEventListener("mouseenter", onMouseEnter);
      htmlEl.addEventListener("mouseleave", onMouseLeave);
      htmlEl.addEventListener("click", onClick);
      htmlEl.addEventListener("blur", onBlur);
      htmlEl.addEventListener("keydown", onKeyDown);

      cleanupFns.push(() => {
        htmlEl.removeAttribute("data-auto-edit");
        htmlEl.removeAttribute("contenteditable");
        htmlEl.style.outline = "";
        htmlEl.style.outlineOffset = "";
        htmlEl.style.boxShadow = "";
        htmlEl.style.cursor = "";
        htmlEl.style.borderRadius = "";
        htmlEl.removeEventListener("mouseenter", onMouseEnter);
        htmlEl.removeEventListener("mouseleave", onMouseLeave);
        htmlEl.removeEventListener("click", onClick);
        htmlEl.removeEventListener("blur", onBlur);
        htmlEl.removeEventListener("keydown", onKeyDown);
      });
    });

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [isEditMode, section, addChange]);

  return <div ref={containerRef}>{children}</div>;
}
