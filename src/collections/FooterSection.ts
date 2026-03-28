import type { GlobalConfig } from "payload";

export const FooterSection: GlobalConfig = {
  slug: "footer-section",
  admin: {
    group: "Site Settings",
  },
  versions: {
    drafts: true,
    max: 10,
  },
  fields: [
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "navItems",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "startYear",
      type: "text",
      defaultValue: "2019",
    },
    {
      name: "copyrightText",
      type: "text",
      defaultValue: "All rights reserved by",
    },
    {
      name: "copyrightHolder",
      type: "text",
      defaultValue: "RavexTheme",
    },
    {
      name: "copyrightLink",
      type: "text",
      defaultValue: "https://themeforest.net/user/ravextheme",
    },
  ],
};
