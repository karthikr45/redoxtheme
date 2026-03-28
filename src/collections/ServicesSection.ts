import type { GlobalConfig } from "payload";

export const ServicesSection: GlobalConfig = {
  slug: "services-section",
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
      defaultValue: "Services",
    },
    {
      name: "heading",
      type: "text",
      defaultValue: "Services we provide",
    },
    {
      name: "description",
      type: "textarea",
      defaultValue:
        "We are here to build solid and courageous brands that can leave a strong mark on the world.",
    },
    {
      name: "items",
      type: "array",
      admin: {
        initCollapsed: false,
      },
      fields: [
        {
          name: "number",
          type: "text",
          required: true,
        },
        {
          name: "title",
          type: "text",
          required: true,
        },
        {
          name: "text",
          type: "textarea",
          required: true,
        },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "link",
          type: "text",
          defaultValue: "/service-details",
        },
      ],
    },
  ],
};
