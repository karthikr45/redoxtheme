import type { GlobalConfig } from "payload";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  admin: {
    group: "Site Settings",
  },
  versions: {
    drafts: true,
    max: 10,
  },
  fields: [
    {
      name: "menuItems",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
        {
          name: "children",
          type: "array",
          fields: [
            {
              name: "title",
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
      ],
    },
  ],
};
