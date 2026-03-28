import type { GlobalConfig } from "payload";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
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
      defaultValue: "Since 2012",
    },
    {
      name: "infoSubtitle",
      type: "text",
      defaultValue: "Who are we?",
    },
    {
      name: "infoHeading",
      type: "textarea",
      defaultValue: "We deliver creative ideas to a crowded world.",
    },
    {
      name: "stats",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
      ],
    },
    {
      name: "mediaHeading",
      type: "textarea",
      defaultValue: "Collaborate with a super down-to-earth, mad-talented team",
    },
    {
      name: "mediaText",
      type: "textarea",
      defaultValue: "A collective bunch working on incredible projects and building enduring partnerships that extend well beyond the deliverable.",
    },
    {
      name: "mediaImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "mediaButtonLabel",
      type: "text",
      defaultValue: "Learn More",
    },
    {
      name: "mediaButtonLink",
      type: "text",
      defaultValue: "/contact",
    },
    {
      name: "clientText",
      type: "text",
      defaultValue: "Help to brands growing up and show their success stories to the world",
    },
    {
      name: "awardSubtitle",
      type: "text",
      defaultValue: "Awards",
    },
    {
      name: "awardHeading",
      type: "textarea",
      defaultValue: "We believe in quality, not quantity, that's why we're great ever.",
    },
    {
      name: "teamSubtitle",
      type: "text",
      defaultValue: "Team",
    },
    {
      name: "teamHeading",
      type: "text",
      defaultValue: "Meet the talented squad, behind the creativity",
    },
  ],
};
