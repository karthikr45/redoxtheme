import type { CollectionConfig } from "payload";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Uploads",
  },
  access: {
    read: () => true,
  },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*", "video/*"],
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "full",
        width: 1920,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
  ],
};
