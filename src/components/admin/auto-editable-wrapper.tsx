"use client";
import { useEffect, useRef } from "react";
import { useEditMode } from "./edit-mode-provider";

/**
 * AutoEditableWrapper - Makes ALL text and images inside it editable
 * without needing to wrap each element individually.
 *
 * Wrap any section/component with this to enable inline editing.
 * It auto-detects headings, paragraphs, spans, buttons, and images.
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

    // Find all text elements and make them editable
    const textElements = container.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, p, span.section-subtitle, span.text-one, li, .title, .text, .name, .post, .number, .tag, .date, button span.text-one"
    );

    const editableEls: HTMLElement[] = [];

    textElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      // Skip if already editable or if it's inside edit UI
      if (htmlEl.getAttribute("data-auto-editable") === "true") return;
      if (htmlEl.closest("[data-edit-ui]")) return;
      // Skip if it has child block elements (it's a container, not a text node)
      if (htmlEl.querySelector("h1, h2, h3, h4, h5, h6, div, section")) return;
      // Skip if no meaningful text
      const text = htmlEl.innerText?.trim();
      if (!text || text.length < 2) return;

      htmlEl.setAttribute("data-auto-editable", "true");
      htmlEl.style.cursor = "pointer";
      htmlEl.style.transition = "outline 0.15s";

      const fieldKey = `${section}_${htmlEl.tagName}_${Array.from(textElements).indexOf(el)}`;

      // Hover effect
      htmlEl.addEventListener("mouseenter", () => {
        if (!isEditMode) return;
        htmlEl.style.outline = "2px dashed #6c5ce7";
        htmlEl.style.outlineOffset = "2px";
        htmlEl.style.borderRadius = "4px";
      });

      htmlEl.addEventListener("mouseleave", () => {
        if (!htmlEl.getAttribute("contenteditable")) {
          htmlEl.style.outline = "none";
        }
      });

      // Click to edit
      htmlEl.addEventListener("click", (e) => {
        if (!isEditMode) return;
        e.preventDefault();
        e.stopPropagation();

        htmlEl.setAttribute("contenteditable", "true");
        htmlEl.style.outline = "2px solid #6c5ce7";
        htmlEl.style.boxShadow = "0 0 0 4px rgba(108,92,231,0.15)";
        htmlEl.focus();
      });

      // Save on blur
      htmlEl.addEventListener("blur", () => {
        htmlEl.removeAttribute("contenteditable");
        htmlEl.style.outline = "none";
        htmlEl.style.boxShadow = "none";

        const newText = htmlEl.innerText?.trim();
        if (newText && newText !== text) {
          addChange(fieldKey, {
            section,
            field: fieldKey,
            value: newText,
          });
          htmlEl.style.outline = "2px solid #00b894";
          htmlEl.style.outlineOffset = "2px";
        }
      });

      // Enter to save
      htmlEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();
          htmlEl.blur();
        }
        if (e.key === "Escape") {
          htmlEl.innerText = text;
          htmlEl.blur();
        }
      });

      editableEls.push(htmlEl);
    });

    // Cleanup
    return () => {
      editableEls.forEach((el) => {
        el.removeAttribute("data-auto-editable");
        el.removeAttribute("contenteditable");
        el.style.cursor = "";
        el.style.outline = "";
        el.style.outlineOffset = "";
        el.style.boxShadow = "";
      });
    };
  }, [isEditMode, section, addChange]);

  return <div ref={containerRef}>{children}</div>;
}
