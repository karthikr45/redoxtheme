// All section types available in the theme
// Each type defines its editable fields for the admin panel

export interface FieldDef {
  name: string;
  label: string;
  type: "text" | "textarea" | "image" | "link" | "array" | "select" | "video";
  options?: { label: string; value: string }[];
  fields?: FieldDef[]; // for array type
}

export interface SectionType {
  slug: string;
  label: string;
  variants: { label: string; value: string }[];
  fields: FieldDef[];
}

export const sectionTypes: SectionType[] = [
  {
    slug: "hero",
    label: "Hero Section",
    variants: [
      { label: "Startup Agency", value: "hero-five" },
      { label: "Digital Agency", value: "hero-one" },
      { label: "Creative Agency", value: "hero-two" },
      { label: "Marketing Agency", value: "hero-three" },
      { label: "Design Agency", value: "hero-four" },
      { label: "Modern Agency", value: "hero-six" },
      { label: "Agency Portfolio", value: "hero-seven" },
    ],
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "buttonLabel", label: "Button Text", type: "text" },
      { name: "buttonLink", label: "Button Link", type: "link" },
      { name: "videoUrl", label: "Video URL", type: "video" },
      { name: "backgroundImage", label: "Background Image", type: "image" },
    ],
  },
  {
    slug: "about",
    label: "About Section",
    variants: [
      { label: "Style 1 - Digital", value: "about-one" },
      { label: "Style 2 - Creative", value: "about-two" },
      { label: "Style 3 - Marketing", value: "about-three" },
      { label: "Style 4 - Startup", value: "about-four" },
      { label: "Style 5 - Details", value: "about-area-details" },
    ],
    fields: [
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "heading", label: "Heading", type: "textarea" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "primaryButtonLabel", label: "Primary Button Text", type: "text" },
      { name: "primaryButtonLink", label: "Primary Button Link", type: "link" },
      { name: "secondaryButtonLabel", label: "Secondary Button Text", type: "text" },
      { name: "secondaryButtonLink", label: "Secondary Button Link", type: "link" },
      { name: "image", label: "Image", type: "image" },
    ],
  },
  {
    slug: "services",
    label: "Services Section",
    variants: [
      { label: "Style 1 - Digital", value: "service-area" },
      { label: "Style 2 - Creative", value: "service-area-2" },
      { label: "Style 3 - Marketing", value: "service-area-3" },
      { label: "Style 4 - Design", value: "service-area-4" },
      { label: "Style 5 - Startup", value: "service-area-5" },
      { label: "Style 6 - Core", value: "service-area-6" },
      { label: "Style 7 - Modern", value: "service-area-7" },
    ],
    fields: [
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "heading", label: "Heading", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "items",
        label: "Service Items",
        type: "array",
        fields: [
          { name: "number", label: "Number", type: "text" },
          { name: "title", label: "Title", type: "text" },
          { name: "text", label: "Description", type: "textarea" },
          { name: "image", label: "Image", type: "image" },
          { name: "link", label: "Link", type: "link" },
        ],
      },
    ],
  },
  {
    slug: "works",
    label: "Works / Portfolio",
    variants: [
      { label: "Style 1 - Digital", value: "work-area" },
      { label: "Style 2 - Creative", value: "work-area-2" },
      { label: "Style 3 - Marketing", value: "work-area-3" },
      { label: "Style 4 - Startup", value: "work-area-4" },
      { label: "Style 5 - Design", value: "work-area-5" },
      { label: "Style 6 - Modern", value: "work-area-6" },
      { label: "Style 7 - Portfolio", value: "work-area-7" },
      { label: "Style 8 - Agency", value: "work-area-8" },
    ],
    fields: [
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "heading", label: "Heading", type: "text" },
      { name: "buttonLabel", label: "Button Text", type: "text" },
      { name: "buttonLink", label: "Button Link", type: "link" },
      {
        name: "items",
        label: "Portfolio Items",
        type: "array",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "tag", label: "Category", type: "text" },
          { name: "date", label: "Date", type: "text" },
          { name: "image", label: "Image", type: "image" },
          { name: "link", label: "Link", type: "link" },
        ],
      },
    ],
  },
  {
    slug: "cta",
    label: "Call to Action",
    variants: [
      { label: "Style 1 - Digital", value: "cta-area" },
      { label: "Style 2 - Creative", value: "cta-area-2" },
      { label: "Style 3 - Marketing", value: "cta-area-3" },
      { label: "Style 4 - Startup", value: "cta-area-4" },
      { label: "Style 5 - Modern", value: "cta-area-5" },
    ],
    fields: [
      { name: "heading", label: "Heading", type: "textarea" },
      { name: "headingLine1", label: "Heading Line 1", type: "text" },
      { name: "headingLine2", label: "Heading Line 2", type: "text" },
      { name: "buttonLabel", label: "Button Text", type: "text" },
      { name: "link", label: "Link", type: "link" },
      { name: "image", label: "Icon/Image", type: "image" },
    ],
  },
  {
    slug: "marquee",
    label: "Marquee / Scrolling Text",
    variants: [{ label: "Default", value: "marquee-text" }],
    fields: [
      { name: "text", label: "Scrolling Text", type: "text" },
    ],
  },
  {
    slug: "team",
    label: "Team Section",
    variants: [
      { label: "Team Grid", value: "team-area" },
      { label: "Team List", value: "team-list-area" },
    ],
    fields: [
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "heading", label: "Heading", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
      {
        name: "members",
        label: "Team Members",
        type: "array",
        fields: [
          { name: "name", label: "Name", type: "text" },
          { name: "post", label: "Position", type: "text" },
          { name: "image", label: "Photo", type: "image" },
          { name: "link", label: "Profile Link", type: "link" },
        ],
      },
    ],
  },
  {
    slug: "faq",
    label: "FAQ Section",
    variants: [{ label: "Default", value: "faq-area" }],
    fields: [
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "heading", label: "Heading", type: "text" },
      {
        name: "items",
        label: "Questions & Answers",
        type: "array",
        fields: [
          { name: "question", label: "Question", type: "text" },
          { name: "answer", label: "Answer", type: "textarea" },
        ],
      },
    ],
  },
  {
    slug: "blog",
    label: "Blog Section",
    variants: [
      { label: "Style 1", value: "blog-area" },
      { label: "Style 2 - Grid", value: "blog-area-2" },
    ],
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "buttonLabel", label: "Button Text", type: "text" },
      { name: "buttonLink", label: "Button Link", type: "link" },
    ],
  },
  {
    slug: "client",
    label: "Client Logos",
    variants: [
      { label: "Style 1", value: "client-area" },
      { label: "Slider", value: "client-slider" },
      { label: "Capsules", value: "client-capsules" },
      { label: "Style 4", value: "client-area-4" },
    ],
    fields: [
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
  {
    slug: "funfact",
    label: "Fun Facts / Counters",
    variants: [
      { label: "Style 1", value: "fun-fact-area" },
      { label: "Style 2", value: "fun-fact-area-2" },
    ],
    fields: [
      {
        name: "items",
        label: "Counter Items",
        type: "array",
        fields: [
          { name: "label", label: "Label", type: "text" },
          { name: "value", label: "Value", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "testimonial",
    label: "Testimonials",
    variants: [{ label: "Default", value: "testimonial-area" }],
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      {
        name: "items",
        label: "Testimonials",
        type: "array",
        fields: [
          { name: "name", label: "Name", type: "text" },
          { name: "role", label: "Role", type: "text" },
          { name: "quote", label: "Quote", type: "textarea" },
          { name: "avatar", label: "Avatar", type: "image" },
        ],
      },
    ],
  },
  {
    slug: "contact",
    label: "Contact Section",
    variants: [{ label: "Default", value: "contact-area" }],
    fields: [
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "heading", label: "Heading", type: "textarea" },
      { name: "email", label: "Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "address", label: "Address", type: "textarea" },
      {
        name: "socialLinks",
        label: "Social Links",
        type: "array",
        fields: [
          { name: "label", label: "Platform", type: "text" },
          { name: "href", label: "URL", type: "link" },
        ],
      },
      { name: "submitButtonLabel", label: "Button Text", type: "text" },
    ],
  },
  {
    slug: "page-title",
    label: "Page Title / Banner",
    variants: [{ label: "Default", value: "page-title" }],
    fields: [
      { name: "title", label: "Title", type: "text" },
    ],
  },
  {
    slug: "video",
    label: "Video Section",
    variants: [{ label: "Default", value: "video-box" }],
    fields: [
      { name: "videoUrl", label: "Video URL", type: "video" },
      { name: "posterImage", label: "Poster Image", type: "image" },
    ],
  },
  {
    slug: "text-slider",
    label: "Text Slider",
    variants: [{ label: "Default", value: "text-slider" }],
    fields: [
      { name: "text", label: "Slider Text", type: "text" },
    ],
  },
  {
    slug: "parallax-image",
    label: "Parallax Image",
    variants: [
      { label: "Style 1", value: "parallax-img" },
      { label: "Style 2", value: "parallax-img-2" },
    ],
    fields: [
      { name: "image", label: "Image", type: "image" },
    ],
  },
  {
    slug: "capabilities",
    label: "Capabilities",
    variants: [
      { label: "Style 1", value: "capabilities-area" },
      { label: "Style 2", value: "capability-area-2" },
    ],
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      {
        name: "items",
        label: "Capabilities",
        type: "array",
        fields: [
          { name: "title", label: "Title", type: "text" },
          { name: "link", label: "Link", type: "link" },
        ],
      },
    ],
  },
  {
    slug: "award",
    label: "Awards Section",
    variants: [
      { label: "Style 1", value: "award-area" },
      { label: "Style 2", value: "award-area-2" },
      { label: "Style 3", value: "award-area-3" },
      { label: "Style 4", value: "award-area-4" },
    ],
    fields: [
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "heading", label: "Heading", type: "textarea" },
    ],
  },
  {
    slug: "approach",
    label: "Approach Section",
    variants: [
      { label: "Default", value: "approach-area" },
      { label: "About Page", value: "approach-about-area" },
    ],
    fields: [
      { name: "subtitle", label: "Subtitle", type: "text" },
      { name: "heading", label: "Heading", type: "textarea" },
    ],
  },
  {
    slug: "productivity",
    label: "Productivity Section",
    variants: [{ label: "Default", value: "productivity-area" }],
    fields: [
      { name: "heading", label: "Heading", type: "text" },
      { name: "description", label: "Description", type: "textarea" },
    ],
  },
];

export function getSectionType(slug: string): SectionType | undefined {
  return sectionTypes.find((s) => s.slug === slug);
}
