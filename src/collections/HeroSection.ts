import type { GlobalConfig } from "payload";

export const HeroSection: GlobalConfig = {
  slug: "hero-section",
  admin: {
    group: "Home Page",
  },
  versions: {
    drafts: true,
    max: 10,
  },
  fields: [
    {
      name: "heading",
      type: "text",
      required: true,
      defaultValue: "Where visionary concepts come to life",
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      defaultValue:
        "We're a leading digital product agency focused on branding, UI/UX design, mobile, and web development.",
    },
    {
      name: "buttonLabel",
      type: "text",
      defaultValue: "Send message",
    },
    {
      name: "buttonLink",
      type: "text",
      defaultValue: "/contact",
    },
    {
      name: "videoUrl",
      type: "text",
      defaultValue: "https://rrdevs.net/project-video/xfire.webm",
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
    },
  ],
};
