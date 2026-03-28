import type { GlobalConfig } from "payload";

export const FaqPage: GlobalConfig = {
  slug: "faq-page",
  admin: {
    group: "Pages",
  },
  versions: {
    drafts: true,
    max: 10,
  },
  fields: [
    {
      name: "pageTitle",
      type: "text",
      defaultValue: "Question",
    },
    {
      name: "subtitle",
      type: "text",
      defaultValue: "FAQ",
    },
    {
      name: "heading",
      type: "textarea",
      defaultValue: "Learn some common answers about newly projects",
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "question",
          type: "text",
          required: true,
        },
        {
          name: "answer",
          type: "textarea",
          required: true,
        },
      ],
    },
  ],
};
