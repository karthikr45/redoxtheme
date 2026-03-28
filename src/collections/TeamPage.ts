import type { GlobalConfig } from "payload";

export const TeamPage: GlobalConfig = {
  slug: "team-page",
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
      defaultValue: "Our Team",
    },
    {
      name: "headerHeading",
      type: "text",
      defaultValue: "Our talented squad",
    },
    {
      name: "headerDescription",
      type: "textarea",
      defaultValue: "We're a diverse team that works as fancies attention to details, enjoys beers on Friday nights and aspires to design the dent in the universe.",
    },
    {
      name: "members",
      type: "array",
      fields: [
        { name: "name", type: "text", required: true },
        { name: "post", type: "text", required: true },
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
      ],
    },
    {
      name: "ctaHeading",
      type: "textarea",
      defaultValue: "We think out of the box when it comes to strategy, design and creative. Want to join the talented team?",
    },
    {
      name: "ctaButtonLabel",
      type: "text",
      defaultValue: "Send Us Now",
    },
    {
      name: "ctaButtonLink",
      type: "text",
      defaultValue: "/contact",
    },
  ],
};
