import type { GlobalConfig } from "payload";

export const MarqueeSection: GlobalConfig = {
  slug: "marquee-section",
  admin: {
    group: "Home Page",
  },
  versions: {
    drafts: true,
    max: 10,
  },
  fields: [
    {
      name: "text",
      type: "text",
      required: true,
      defaultValue: "Crafting digital products",
    },
  ],
};
