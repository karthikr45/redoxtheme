import type { GlobalConfig } from "payload";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
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
      defaultValue: "Contact",
    },
    {
      name: "subtitle",
      type: "text",
      defaultValue: "Contact",
    },
    {
      name: "heading",
      type: "textarea",
      defaultValue: "Let's drop us a line and get the project started.",
    },
    {
      name: "getInTouchTitle",
      type: "text",
      defaultValue: "Get in touch",
    },
    {
      name: "getInTouchText",
      type: "textarea",
      defaultValue: "We're excited to hear from you and let's start something special together",
    },
    {
      name: "email",
      type: "email",
      defaultValue: "hello@redoxagency.com",
    },
    {
      name: "followTitle",
      type: "text",
      defaultValue: "Follow",
    },
    {
      name: "socialLinks",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "submitButtonLabel",
      type: "text",
      defaultValue: "Send Message",
    },
  ],
};
