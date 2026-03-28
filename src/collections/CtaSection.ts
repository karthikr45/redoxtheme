import type { GlobalConfig } from "payload";

export const CtaSection: GlobalConfig = {
  slug: "cta-section",
  admin: {
    group: "Home Page",
  },
  versions: {
    drafts: true,
    max: 10,
  },
  fields: [
    {
      name: "headingLine1",
      type: "text",
      defaultValue: "Let's",
    },
    {
      name: "headingLine2",
      type: "text",
      defaultValue: "build a brand now",
    },
    {
      name: "link",
      type: "text",
      defaultValue: "/contact",
    },
    {
      name: "icon",
      type: "upload",
      relationTo: "media",
    },
  ],
};
