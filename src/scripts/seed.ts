import "dotenv/config";
import { MongoClient } from "mongodb";
import crypto from "crypto";

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = "redoxdb";

function hash(password: string) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

async function seed() {
  console.log("Connecting to MongoDB...");
  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  console.log("Connected to redoxdb\n");

  // ===== USERS =====
  console.log("Creating admin users...");
  const users = db.collection("users");
  await users.deleteMany({});
  await users.insertMany([
    { email: "admin@redox.com", hashedPassword: hash("admin123"), name: "Administrator", role: "admin", createdAt: new Date() },
    { email: "editor@redox.com", hashedPassword: hash("editor123"), name: "Content Editor", role: "editor", createdAt: new Date() },
  ]);

  // ===== MENU =====
  console.log("Creating navigation menu...");
  const settings = db.collection("site_settings");
  await settings.deleteMany({});
  await settings.insertOne({
    key: "menu",
    data: [
      { title: "Home", href: "/" },
      {
        title: "Our Services", href: "/services",
        children: [
          { title: "Brand Strategy & Design", href: "/services" },
          { title: "Content Design & Marketing", href: "/services-2" },
          { title: "Service Design & Optimization", href: "/services-3" },
          { title: "Product Design & Engineering", href: "/services-4" },
          { title: "Advertising & Campaigns", href: "/services-5" },
          { title: "Digital Commerce & Integration", href: "/services-6" },
        ],
      },
      { title: "Our Team", href: "/team" },
      {
        title: "Our Portfolio", href: "/portfolio",
        children: [{ title: "Portfolio Details", href: "/portfolio-details" }],
      },
      { title: "Blogs", href: "/blog" },
      { title: "About Us", href: "/about" },
      { title: "Contact Us", href: "/contact" },
    ],
    updatedAt: new Date(),
  });

  // ===== PAGES =====
  console.log("Creating pages...");
  const pages = db.collection("pages");
  await pages.deleteMany({});

  // HOME PAGE
  await pages.insertOne({
    slug: "home", title: "Home",
    sections: [
      { type: "hero", variant: "hero-five", heading: "Where visionary concepts come to life", description: "We're a leading digital product agency focused on branding, UI/UX design, mobile, and web development.", buttonLabel: "Send message", buttonLink: "/contact", videoUrl: "https://rrdevs.net/project-video/xfire.webm" },
      { type: "works", variant: "work-area-4", subtitle: "Products", heading: "The work we do, and our favorite ones", buttonLabel: "Browse all products", buttonLink: "/service-details", items: [
        { title: "Redox Digital Agency HTML Template", tag: "WordPress, Themeforest", date: "(2025)", image: "/assets/imgs/project/image-30.webp", link: "/portfolio-details" },
        { title: "Redox Digital Agency Theme", tag: "Themeforest", date: "(2025)", image: "/assets/imgs/project/image-31.webp", link: "/portfolio-details" },
        { title: "Redox Digital Agency HTML Template", tag: "WordPress, Themeforest", date: "(2025)", image: "/assets/imgs/project/image-32.webp", link: "/portfolio-details" },
        { title: "Redox Digital Agency Theme", tag: "Themeforest", date: "(2025)", image: "/assets/imgs/project/image-33.webp", link: "/portfolio-details" },
        { title: "Redox Digital Agency HTML Template", tag: "WordPress, Themeforest", date: "(2025)", image: "/assets/imgs/project/image-34.webp", link: "/portfolio-details" },
        { title: "Redox Digital Agency Theme", tag: "Themeforest", date: "(2025)", image: "/assets/imgs/project/image-35.webp", link: "/portfolio-details" },
      ]},
      { type: "marquee", variant: "marquee-text", text: "Crafting digital products" },
      { type: "about", variant: "about-four", subtitle: "The studio", heading: "We're a design and development studio since 2017 who craft digital masterpiece products.", primaryButtonLabel: "Learn more us", primaryButtonLink: "/about", secondaryButtonLabel: "Browse all products", secondaryButtonLink: "/portfolio", image: "/assets/imgs/gallery/image-51.webp" },
      { type: "services", variant: "service-area-5", subtitle: "Services", heading: "Services we provide", description: "We are here to build solid and courageous brands that can leave a strong mark on the world.", items: [
        { number: "(001)", title: "UI/UX Design", text: "We help you build successful products by understanding your market and users.", image: "/assets/imgs/project/image-47.webp", link: "/service-details" },
        { number: "(002)", title: "Web Development", text: "We help you build successful products by understanding your market and users.", image: "/assets/imgs/project/image-48.webp", link: "/service-details" },
        { number: "(003)", title: "Web Design", text: "We help you build successful products by understanding your market and users.", image: "/assets/imgs/project/image-49.webp", link: "/service-details" },
        { number: "(004)", title: "Branding Design", text: "We help you build successful products by understanding your market and users.", image: "/assets/imgs/project/image-50.webp", link: "/service-details" },
        { number: "(005)", title: "Webflow Development", text: "We help you build successful products by understanding your market and users.", image: "/assets/imgs/project/image-51.webp", link: "/service-details" },
      ]},
      { type: "cta", variant: "cta-area-4", headingLine1: "Let's", headingLine2: "build a brand now", link: "/contact" },
    ],
    versions: [], createdAt: new Date(), updatedAt: new Date(),
  });

  // ABOUT PAGE
  await pages.insertOne({
    slug: "about", title: "About Us",
    sections: [
      { type: "page-title", title: "Since 2012" },
      { type: "about", variant: "about-area-details", subtitle: "About studio", heading: "Crafting digital products with a unique vision of making user experience better.", description: "Redox is the first and only creative agency for your real exploration." },
      { type: "team", variant: "team-area", subtitle: "Team", heading: "Meet the talented squad, behind the creativity", members: [
        { name: "James David", post: "CEO & Founder", image: "/assets/imgs/team/team-1.webp" },
        { name: "Brenda C. Janet", post: "Lead Developer", image: "/assets/imgs/team/team-2.webp" },
        { name: "Martin Carlos", post: "Lead Designer", image: "/assets/imgs/team/team-3.webp" },
        { name: "Garry J. Coburn", post: "Project Manager", image: "/assets/imgs/team/team-4.webp" },
      ]},
    ],
    versions: [], createdAt: new Date(), updatedAt: new Date(),
  });

  // CONTACT PAGE
  await pages.insertOne({
    slug: "contact", title: "Contact Us",
    sections: [
      { type: "page-title", title: "Contact" },
      { type: "contact", subtitle: "Contact", heading: "Let's drop us a line and get the project started.", email: "hello@redoxagency.com", socialLinks: [
        { label: "Facebook", href: "#" }, { label: "Twitter", href: "#" }, { label: "LinkedIn", href: "#" }, { label: "Instagram", href: "#" },
      ], submitButtonLabel: "Send Message" },
    ],
    versions: [], createdAt: new Date(), updatedAt: new Date(),
  });

  // TEAM PAGE
  await pages.insertOne({
    slug: "team", title: "Our Team",
    sections: [
      { type: "page-title", title: "Our Team" },
      { type: "team", variant: "team-area", heading: "Our talented squad", description: "We're a diverse team that works as fancies attention to details.", members: [
        { name: "James David", post: "CEO & Founder", image: "/assets/imgs/team/team-1.webp" },
        { name: "Brenda C. Janet", post: "Lead Developer", image: "/assets/imgs/team/team-2.webp" },
        { name: "Martin Carlos", post: "Lead Designer", image: "/assets/imgs/team/team-3.webp" },
        { name: "Garry J. Coburn", post: "Project Manager", image: "/assets/imgs/team/team-4.webp" },
      ]},
      { type: "cta", variant: "cta-area-4", headingLine1: "Want to join", headingLine2: "the talented team?", link: "/contact" },
    ],
    versions: [], createdAt: new Date(), updatedAt: new Date(),
  });

  // FAQ PAGE
  await pages.insertOne({
    slug: "faq", title: "FAQ",
    sections: [
      { type: "page-title", title: "Question" },
      { type: "faq", subtitle: "FAQ", heading: "Learn some common answers about newly projects", items: [
        { question: "Bring their individual experience and creative?", answer: "People know what an FAQ is, so make that your page title." },
        { question: "Design should enrich our day?", answer: "People know what an FAQ is, so make that your page title." },
        { question: "Human centered design to challenges design theory?", answer: "People know what an FAQ is, so make that your page title." },
        { question: "Align with your brand look and feel?", answer: "People know what an FAQ is, so make that your page title." },
        { question: "How to become an Agile productive manager?", answer: "People know what an FAQ is, so make that your page title." },
      ]},
    ],
    versions: [], createdAt: new Date(), updatedAt: new Date(),
  });

  // SERVICES PAGE
  await pages.insertOne({
    slug: "services", title: "Services",
    sections: [
      { type: "page-title", title: "Expertise" },
      { type: "services", variant: "service-area-6", subtitle: "Services", heading: "Our core services", items: [
        { number: "(001)", title: "Brand Strategy & Design", text: "We help you build successful products.", link: "/service-details" },
        { number: "(002)", title: "Content Design & Marketing", text: "We help you build successful products.", link: "/service-details" },
        { number: "(003)", title: "Service Design & Optimization", text: "We help you build successful products.", link: "/service-details" },
        { number: "(004)", title: "Product Design & Engineering", text: "We help you build successful products.", link: "/service-details" },
      ]},
    ],
    versions: [], createdAt: new Date(), updatedAt: new Date(),
  });

  // BLOG PAGE
  await pages.insertOne({
    slug: "blog", title: "Blog",
    sections: [
      { type: "page-title", title: "Journals" },
      { type: "blog", variant: "blog-area-2", heading: "Latest articles", buttonLabel: "View all", buttonLink: "/blog" },
    ],
    versions: [], createdAt: new Date(), updatedAt: new Date(),
  });

  // PORTFOLIO PAGE
  await pages.insertOne({
    slug: "portfolio", title: "Portfolio",
    sections: [
      { type: "page-title", title: "Portfolio" },
      { type: "works", variant: "work-area", heading: "Our recent works", items: [
        { title: "Redox Digital Agency", tag: "WordPress", date: "(2025)", image: "/assets/imgs/project/image-30.webp", link: "/portfolio-details" },
        { title: "Redox Design System", tag: "Design", date: "(2025)", image: "/assets/imgs/project/image-31.webp", link: "/portfolio-details" },
      ]},
    ],
    versions: [], createdAt: new Date(), updatedAt: new Date(),
  });

  // ===== SAMPLE BLOG POSTS =====
  console.log("Creating sample blog posts...");
  const blogs = db.collection("blogs");
  await blogs.deleteMany({});
  await blogs.insertMany([
    { title: "How to Build a Successful Brand Identity", author: "James David", content: "Building a brand identity is about more than just a logo...", excerpt: "Learn the key steps to creating a memorable brand identity.", image: "/assets/imgs/blog/blog-1.webp", tags: "branding, design", status: "published", createdAt: new Date(), updatedAt: new Date() },
    { title: "The Future of Web Development in 2025", author: "Brenda Janet", content: "Web development continues to evolve rapidly...", excerpt: "Explore the latest trends shaping web development.", image: "/assets/imgs/blog/blog-2.webp", tags: "development, technology", status: "published", createdAt: new Date(), updatedAt: new Date() },
    { title: "UI/UX Design Best Practices", author: "Martin Carlos", content: "Great UI/UX design starts with understanding your users...", excerpt: "Essential principles for creating better user experiences.", image: "/assets/imgs/blog/blog-3.webp", tags: "design, UX", status: "published", createdAt: new Date(), updatedAt: new Date() },
  ]);

  console.log("\nDone! Database seeded successfully.");
  console.log("\nLogin credentials:");
  console.log("  Admin:  admin@redox.com / admin123");
  console.log("  Editor: editor@redox.com / editor123");
  console.log("\nPages created: home, about, contact, team, faq, services, blog, portfolio");
  console.log("Blog posts: 3 sample posts");
  console.log("\nVisit http://localhost:3000/admin to manage your site");

  await client.close();
  process.exit(0);
}

seed().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
