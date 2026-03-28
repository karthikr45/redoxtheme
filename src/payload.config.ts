import { buildConfig } from "payload";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import sharp from "sharp";
import { fileURLToPath } from "url";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { HeroSection } from "./collections/HeroSection";
import { AboutSection } from "./collections/AboutSection";
import { ServicesSection } from "./collections/ServicesSection";
import { WorksSection } from "./collections/WorksSection";
import { CtaSection } from "./collections/CtaSection";
import { MarqueeSection } from "./collections/MarqueeSection";
import { FooterSection } from "./collections/FooterSection";
import { Navigation } from "./collections/Navigation";
import { AboutPage } from "./collections/AboutPage";
import { ContactPage } from "./collections/ContactPage";
import { TeamPage } from "./collections/TeamPage";
import { FaqPage } from "./collections/FaqPage";
import { AdminUsers } from "./collections/AdminUsers";
import { Pages } from "./collections/Pages";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " - Redox Admin",
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  editor: lexicalEditor(),
  collections: [Users, Media, AdminUsers, Pages],
  globals: [
    HeroSection,
    AboutSection,
    ServicesSection,
    WorksSection,
    CtaSection,
    MarqueeSection,
    FooterSection,
    Navigation,
    AboutPage,
    ContactPage,
    TeamPage,
    FaqPage,
  ],
  db: mongooseAdapter({
    url: process.env.MONGODB_URI || "mongodb+srv://your-connection-string",
  }),
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },
  secret: process.env.PAYLOAD_SECRET || "your-super-secret-key-change-this",
});
