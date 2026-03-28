import type { CollectionConfig } from "payload";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

export const AdminUsers: CollectionConfig = {
  slug: "admin-users",
  admin: {
    useAsTitle: "username",
    group: "Site Settings",
  },
  fields: [
    {
      name: "username",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "hashedPassword",
      type: "text",
      required: true,
      admin: {
        readOnly: true,
        description: "Auto-generated from password field",
      },
    },
    {
      name: "password",
      type: "text",
      admin: {
        description: "Enter a new password (will be hashed on save)",
      },
      hooks: {
        beforeValidate: [
          ({ value, siblingData }) => {
            if (value) {
              siblingData.hashedPassword = hashPassword(value);
            }
            return undefined; // Don't store plain password
          },
        ],
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "select",
      required: true,
      defaultValue: "editor",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
  ],
};

export { hashPassword };
