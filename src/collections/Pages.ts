import type { CollectionConfig } from "payload";
import { allBlocks } from "../blocks";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status", "updatedAt"],
    group: "Content",
  },
  versions: {
    drafts: true,
    maxPerDoc: 20,
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      label: "Page Title",
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      label: "URL Slug",
      admin: {
        description: 'e.g. "home", "about", "contact", "services"',
      },
    },
    {
      name: "pageTitle",
      type: "text",
      label: "Banner Title (shown on page header)",
      admin: {
        description: "The title shown in the page banner/header area",
      },
    },
    {
      name: "headerVariant",
      type: "select",
      label: "Header Style",
      defaultValue: "header-five",
      options: [
        { label: "Style 1 - Digital Agency", value: "header-one" },
        { label: "Style 2 - Inner Pages", value: "header-two" },
        { label: "Style 3 - Creative", value: "header-three" },
        { label: "Style 4 - Design", value: "header-four" },
        { label: "Style 5 - Startup (Default)", value: "header-five" },
        { label: "Style 6 - Modern", value: "header-six" },
        { label: "Style 7 - Portfolio", value: "header-seven" },
        { label: "Style 8 - Agency", value: "header-eight" },
      ],
    },
    {
      name: "footerVariant",
      type: "select",
      label: "Footer Style",
      defaultValue: "footer-four",
      options: [
        { label: "Style 1 - Digital Agency", value: "footer-one" },
        { label: "Style 2 - Creative", value: "footer-two" },
        { label: "Style 3 - Marketing", value: "footer-three" },
        { label: "Style 4 - Startup (Default)", value: "footer-four" },
        { label: "Style 5 - Inner Pages", value: "footer-inner" },
      ],
    },
    {
      name: "bodyClasses",
      type: "text",
      label: "Body CSS Classes",
      defaultValue: "body-wrapper body-startup-agency font-heading-bdogrotesk-regular",
      admin: {
        description: "CSS classes applied to the page body",
      },
    },
    {
      name: "layout",
      type: "blocks",
      label: "Page Sections",
      blocks: allBlocks,
      admin: {
        description: "Add, remove, and reorder sections on this page. Drag to reorder.",
      },
    },
  ],
};
