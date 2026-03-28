import type { GlobalConfig } from "payload";

export const WorksSection: GlobalConfig = {
  slug: "works-section",
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
      defaultValue: "Products",
    },
    {
      name: "heading",
      type: "text",
      defaultValue: "The work we do, and our favorite ones",
    },
    {
      name: "buttonLabel",
      type: "text",
      defaultValue: "Browse all products",
    },
    {
      name: "buttonLink",
      type: "text",
      defaultValue: "/service-details",
    },
    {
      name: "items",
      type: "array",
      fields: [
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "tag",
          type: "text",
          required: true,
        },
        {
          name: "date",
          type: "text",
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "link",
          type: "text",
          defaultValue: "/portfolio-details",
        },
      ],
    },
  ],
};
