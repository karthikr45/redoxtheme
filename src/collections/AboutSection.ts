import type { GlobalConfig } from "payload";

export const AboutSection: GlobalConfig = {
  slug: "about-section",
  admin: {
    group: "Home Page",
  },
  versions: {
    drafts: true,
    max: 10,
  },
  fields: [
    {
      name: "subtitle",
      type: "text",
      defaultValue: "The studio",
    },
    {
      name: "heading",
      type: "textarea",
      required: true,
      defaultValue:
        "We're a design and development studio since 2017 who craft digital masterpiece products.",
    },
    {
      name: "primaryButtonLabel",
      type: "text",
      defaultValue: "Learn more us",
    },
    {
      name: "primaryButtonLink",
      type: "text",
      defaultValue: "/about",
    },
    {
      name: "secondaryButtonLabel",
      type: "text",
      defaultValue: "Browse all products",
    },
    {
      name: "secondaryButtonLink",
      type: "text",
      defaultValue: "/portfolio",
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
    },
  ],
};
