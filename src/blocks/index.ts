import type { Block } from "payload";

// Shared rich text field for descriptions
const richTextField = (name: string, label: string, defaultValue?: string) => ({
  name,
  type: "textarea" as const,
  label,
  defaultValue,
});

const imageField = (name: string, label: string) => ({
  name,
  type: "upload" as const,
  relationTo: "media" as const,
  label,
});

const linkField = (name: string, label: string, defaultValue?: string) => ({
  name,
  type: "text" as const,
  label,
  defaultValue,
});

// ==================== HERO BLOCKS ====================

export const HeroBlock: Block = {
  slug: "hero",
  labels: { singular: "Hero Section", plural: "Hero Sections" },
  imageURL: "/assets/imgs/admin/hero-preview.png",
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Style Variant",
      defaultValue: "hero-five",
      options: [
        { label: "Startup Agency (Default)", value: "hero-five" },
        { label: "Digital Agency", value: "hero-one" },
        { label: "Creative Agency", value: "hero-two" },
        { label: "Marketing Agency", value: "hero-three" },
        { label: "Design Agency", value: "hero-four" },
        { label: "Modern Agency", value: "hero-six" },
        { label: "Agency Portfolio", value: "hero-seven" },
      ],
    },
    { name: "heading", type: "text", label: "Main Heading", required: true },
    richTextField("description", "Description"),
    { name: "buttonLabel", type: "text", label: "Button Text" },
    linkField("buttonLink", "Button Link", "/contact"),
    { name: "videoUrl", type: "text", label: "Video URL" },
    imageField("backgroundImage", "Background Image"),
  ],
};

// ==================== ABOUT BLOCKS ====================

export const AboutBlock: Block = {
  slug: "about",
  labels: { singular: "About Section", plural: "About Sections" },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Style Variant",
      defaultValue: "about-four",
      options: [
        { label: "Style 1 - Digital Agency", value: "about-one" },
        { label: "Style 2 - Creative", value: "about-two" },
        { label: "Style 3 - Marketing", value: "about-three" },
        { label: "Style 4 - Startup (Default)", value: "about-four" },
        { label: "Style 5 - Details", value: "about-area-details" },
      ],
    },
    { name: "subtitle", type: "text", label: "Subtitle" },
    { name: "heading", type: "textarea", label: "Heading", required: true },
    richTextField("description", "Description"),
    { name: "primaryButtonLabel", type: "text", label: "Primary Button Text" },
    linkField("primaryButtonLink", "Primary Button Link"),
    { name: "secondaryButtonLabel", type: "text", label: "Secondary Button Text" },
    linkField("secondaryButtonLink", "Secondary Button Link"),
    imageField("image", "Section Image"),
  ],
};

// ==================== SERVICES BLOCKS ====================

export const ServicesBlock: Block = {
  slug: "services",
  labels: { singular: "Services Section", plural: "Services Sections" },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Style Variant",
      defaultValue: "service-area-5",
      options: [
        { label: "Style 1 - Digital Agency", value: "service-area" },
        { label: "Style 2 - Creative", value: "service-area-2" },
        { label: "Style 3 - Marketing", value: "service-area-3" },
        { label: "Style 4 - Design", value: "service-area-4" },
        { label: "Style 5 - Startup (Default)", value: "service-area-5" },
        { label: "Style 6 - Core Services", value: "service-area-6" },
        { label: "Style 7 - Modern", value: "service-area-7" },
      ],
    },
    { name: "subtitle", type: "text", label: "Subtitle" },
    { name: "heading", type: "text", label: "Heading" },
    richTextField("description", "Description"),
    {
      name: "items",
      type: "array",
      label: "Service Items",
      fields: [
        { name: "number", type: "text", label: "Number" },
        { name: "title", type: "text", label: "Title", required: true },
        { name: "text", type: "textarea", label: "Description" },
        imageField("image", "Service Image"),
        linkField("link", "Link", "/service-details"),
      ],
    },
  ],
};

// ==================== WORKS / PORTFOLIO BLOCKS ====================

export const WorksBlock: Block = {
  slug: "works",
  labels: { singular: "Works / Portfolio Section", plural: "Works Sections" },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Style Variant",
      defaultValue: "work-area-4",
      options: [
        { label: "Style 1 - Digital Agency", value: "work-area" },
        { label: "Style 2 - Creative", value: "work-area-2" },
        { label: "Style 3 - Marketing", value: "work-area-3" },
        { label: "Style 4 - Startup (Default)", value: "work-area-4" },
        { label: "Style 5 - Design", value: "work-area-5" },
        { label: "Style 6 - Modern", value: "work-area-6" },
        { label: "Style 7 - Portfolio", value: "work-area-7" },
        { label: "Style 8 - Agency", value: "work-area-8" },
      ],
    },
    { name: "subtitle", type: "text", label: "Subtitle" },
    { name: "heading", type: "text", label: "Heading" },
    { name: "buttonLabel", type: "text", label: "Button Text" },
    linkField("buttonLink", "Button Link"),
    {
      name: "items",
      type: "array",
      label: "Portfolio Items",
      fields: [
        { name: "title", type: "text", label: "Title", required: true },
        { name: "tag", type: "text", label: "Category / Tag" },
        { name: "date", type: "text", label: "Date" },
        imageField("image", "Project Image"),
        linkField("link", "Link", "/portfolio-details"),
      ],
    },
  ],
};

// ==================== CTA BLOCKS ====================

export const CtaBlock: Block = {
  slug: "cta",
  labels: { singular: "Call to Action", plural: "CTA Sections" },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Style Variant",
      defaultValue: "cta-area-4",
      options: [
        { label: "Style 1 - Digital Agency", value: "cta-area" },
        { label: "Style 2 - Creative", value: "cta-area-2" },
        { label: "Style 3 - Marketing", value: "cta-area-3" },
        { label: "Style 4 - Startup (Default)", value: "cta-area-4" },
        { label: "Style 5 - Modern", value: "cta-area-5" },
      ],
    },
    { name: "headingLine1", type: "text", label: "Heading Line 1" },
    { name: "headingLine2", type: "text", label: "Heading Line 2" },
    linkField("link", "Link", "/contact"),
    imageField("icon", "Icon Image"),
  ],
};

// ==================== MARQUEE BLOCK ====================

export const MarqueeBlock: Block = {
  slug: "marquee",
  labels: { singular: "Marquee / Scrolling Text", plural: "Marquee Sections" },
  fields: [
    { name: "text", type: "text", label: "Scrolling Text", required: true },
  ],
};

// ==================== TEAM BLOCK ====================

export const TeamBlock: Block = {
  slug: "team",
  labels: { singular: "Team Section", plural: "Team Sections" },
  fields: [
    { name: "subtitle", type: "text", label: "Subtitle" },
    { name: "heading", type: "text", label: "Heading" },
    richTextField("description", "Description"),
    {
      name: "members",
      type: "array",
      label: "Team Members",
      fields: [
        { name: "name", type: "text", label: "Name", required: true },
        { name: "post", type: "text", label: "Position", required: true },
        imageField("image", "Photo"),
        linkField("link", "Profile Link", "/team-details"),
      ],
    },
  ],
};

// ==================== FAQ BLOCK ====================

export const FaqBlock: Block = {
  slug: "faq",
  labels: { singular: "FAQ Section", plural: "FAQ Sections" },
  fields: [
    { name: "subtitle", type: "text", label: "Subtitle" },
    { name: "heading", type: "text", label: "Heading" },
    {
      name: "items",
      type: "array",
      label: "Questions & Answers",
      fields: [
        { name: "question", type: "text", label: "Question", required: true },
        { name: "answer", type: "textarea", label: "Answer", required: true },
      ],
    },
  ],
};

// ==================== BLOG BLOCK ====================

export const BlogBlock: Block = {
  slug: "blog",
  labels: { singular: "Blog Section", plural: "Blog Sections" },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Style Variant",
      defaultValue: "blog-area",
      options: [
        { label: "Style 1 - Default", value: "blog-area" },
        { label: "Style 2 - Grid", value: "blog-area-2" },
      ],
    },
    { name: "heading", type: "text", label: "Heading" },
    { name: "buttonLabel", type: "text", label: "Button Text" },
    linkField("buttonLink", "Button Link", "/blog"),
  ],
};

// ==================== CLIENT / LOGOS BLOCK ====================

export const ClientBlock: Block = {
  slug: "client",
  labels: { singular: "Client / Logo Section", plural: "Client Sections" },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Style Variant",
      defaultValue: "client-area",
      options: [
        { label: "Style 1 - Default", value: "client-area" },
        { label: "Style 2 - Slider", value: "client-slider" },
        { label: "Style 3 - Capsules", value: "client-capsules" },
        { label: "Style 4 - Grid", value: "client-area-4" },
      ],
    },
    richTextField("description", "Description"),
  ],
};

// ==================== FUN FACT / COUNTER BLOCK ====================

export const FunFactBlock: Block = {
  slug: "fun-fact",
  labels: { singular: "Fun Facts / Counters", plural: "Fun Fact Sections" },
  fields: [
    {
      name: "variant",
      type: "select",
      label: "Style Variant",
      defaultValue: "fun-fact-area",
      options: [
        { label: "Style 1 - Default", value: "fun-fact-area" },
        { label: "Style 2 - Alternate", value: "fun-fact-area-2" },
      ],
    },
    {
      name: "items",
      type: "array",
      label: "Counter Items",
      fields: [
        { name: "label", type: "text", label: "Label", required: true },
        { name: "value", type: "text", label: "Value", required: true },
      ],
    },
  ],
};

// ==================== TESTIMONIAL BLOCK ====================

export const TestimonialBlock: Block = {
  slug: "testimonial",
  labels: { singular: "Testimonial Section", plural: "Testimonial Sections" },
  fields: [
    { name: "heading", type: "text", label: "Heading" },
    {
      name: "items",
      type: "array",
      label: "Testimonials",
      fields: [
        { name: "name", type: "text", label: "Name", required: true },
        { name: "role", type: "text", label: "Role / Company" },
        { name: "quote", type: "textarea", label: "Quote", required: true },
        imageField("avatar", "Avatar"),
        { name: "rating", type: "number", label: "Rating (1-5)", min: 1, max: 5 },
      ],
    },
  ],
};

// ==================== CONTACT BLOCK ====================

export const ContactBlock: Block = {
  slug: "contact",
  labels: { singular: "Contact Section", plural: "Contact Sections" },
  fields: [
    { name: "subtitle", type: "text", label: "Subtitle" },
    { name: "heading", type: "textarea", label: "Heading" },
    { name: "email", type: "text", label: "Email Address" },
    { name: "phone", type: "text", label: "Phone Number" },
    { name: "address", type: "textarea", label: "Address" },
    {
      name: "socialLinks",
      type: "array",
      label: "Social Media Links",
      fields: [
        { name: "label", type: "text", label: "Platform", required: true },
        linkField("href", "URL", "#"),
      ],
    },
    { name: "submitButtonLabel", type: "text", label: "Submit Button Text", defaultValue: "Send Message" },
  ],
};

// ==================== PAGE TITLE BLOCK ====================

export const PageTitleBlock: Block = {
  slug: "page-title",
  labels: { singular: "Page Title / Banner", plural: "Page Titles" },
  fields: [
    { name: "title", type: "text", label: "Page Title", required: true },
  ],
};

// Export all blocks
export const allBlocks: Block[] = [
  HeroBlock,
  AboutBlock,
  ServicesBlock,
  WorksBlock,
  CtaBlock,
  MarqueeBlock,
  TeamBlock,
  FaqBlock,
  BlogBlock,
  ClientBlock,
  FunFactBlock,
  TestimonialBlock,
  ContactBlock,
  PageTitleBlock,
];
