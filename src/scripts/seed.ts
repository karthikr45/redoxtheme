import "dotenv/config";
import payload from "payload";
import crypto from "crypto";
import config from "../payload.config.ts";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

const seed = async () => {
  console.log("🔄 Starting content seed...\n");

  const payloadInstance = await payload.init({ config });

  // Seed Hero Section
  console.log("📝 Seeding Hero Section...");
  await payloadInstance.updateGlobal({
    slug: "hero-section",
    data: {
      heading: "Where visionary concepts come to life",
      description: "We're a leading digital product agency focused on branding, UI/UX design, mobile, and web development.",
      buttonLabel: "Send message",
      buttonLink: "/contact",
      videoUrl: "https://rrdevs.net/project-video/xfire.webm",
    },
  });

  // Seed About Section
  console.log("📝 Seeding About Section...");
  await payloadInstance.updateGlobal({
    slug: "about-section",
    data: {
      subtitle: "The studio",
      heading: "We're a design and development studio since 2017 who craft digital masterpiece products.",
      primaryButtonLabel: "Learn more us",
      primaryButtonLink: "/about",
      secondaryButtonLabel: "Browse all products",
      secondaryButtonLink: "/portfolio",
    },
  });

  // Seed Services Section
  console.log("📝 Seeding Services Section...");
  await payloadInstance.updateGlobal({
    slug: "services-section",
    data: {
      subtitle: "Services",
      heading: "Services we provide",
      description: "We are here to build solid and courageous brands that can leave a strong mark on the world.",
      items: [
        { number: "(001)", title: "UI/UX Design", text: "We help you build successful products by understanding your market and users.", link: "/service-details" },
        { number: "(002)", title: "Web Development", text: "We help you build successful products by understanding your market and users.", link: "/service-details" },
        { number: "(003)", title: "Web Design", text: "We help you build successful products by understanding your market and users.", link: "/service-details" },
        { number: "(004)", title: "Branding Design", text: "We help you build successful products by understanding your market and users.", link: "/service-details" },
        { number: "(005)", title: "Webflow Development", text: "We help you build successful products by understanding your market and users.", link: "/service-details" },
      ],
    },
  });

  // Seed Works Section
  console.log("📝 Seeding Works Section...");
  await payloadInstance.updateGlobal({
    slug: "works-section",
    data: {
      subtitle: "Products",
      heading: "The work we do, and our favorite ones",
      buttonLabel: "Browse all products",
      buttonLink: "/service-details",
      items: [
        { title: "Redox Digital Agency HTML Template", tag: "WordPress, Themeforest", date: "(2025)", link: "/portfolio-details" },
        { title: "Redox Digital Agency Theme", tag: "Themeforest", date: "(2025)", link: "/portfolio-details" },
        { title: "Redox Digital Agency HTML Template", tag: "WordPress, Themeforest", date: "(2025)", link: "/portfolio-details" },
        { title: "Redox Digital Agency Theme", tag: "Themeforest", date: "(2025)", link: "/portfolio-details" },
        { title: "Redox Digital Agency HTML Template", tag: "WordPress, Themeforest", date: "(2025)", link: "/portfolio-details" },
        { title: "Redox Digital Agency Theme", tag: "Themeforest", date: "(2025)", link: "/portfolio-details" },
      ],
    },
  });

  // Seed CTA Section
  console.log("📝 Seeding CTA Section...");
  await payloadInstance.updateGlobal({
    slug: "cta-section",
    data: {
      headingLine1: "Let's",
      headingLine2: "build a brand now",
      link: "/contact",
    },
  });

  // Seed Marquee Section
  console.log("📝 Seeding Marquee Section...");
  await payloadInstance.updateGlobal({
    slug: "marquee-section",
    data: {
      text: "Crafting digital products",
    },
  });

  // Seed Footer Section
  console.log("📝 Seeding Footer Section...");
  await payloadInstance.updateGlobal({
    slug: "footer-section",
    data: {
      navItems: [
        { label: "Studio", href: "/contact" },
        { label: "Works", href: "/portfolio" },
        { label: "Services", href: "/services" },
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
      ],
      startYear: "2019",
      copyrightText: "All rights reserved by",
      copyrightHolder: "RavexTheme",
      copyrightLink: "https://themeforest.net/user/ravextheme",
    },
  });

  // Seed Navigation
  console.log("📝 Seeding Navigation...");
  await payloadInstance.updateGlobal({
    slug: "navigation",
    data: {
      menuItems: [
        { title: "Home", href: "/" },
        {
          title: "Our Services",
          href: "/services",
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
          title: "Our Portfolio",
          href: "/portfolio",
          children: [
            { title: "Portfolio Details", href: "/portfolio-details" },
          ],
        },
        { title: "Blogs", href: "/blog" },
        { title: "About Us", href: "/about" },
        { title: "Contact Us", href: "/contact" },
      ],
    },
  });

  // Seed About Page
  console.log("📝 Seeding About Page...");
  await payloadInstance.updateGlobal({
    slug: "about-page",
    data: {
      pageTitle: "Since 2012",
      infoSubtitle: "Who are we?",
      infoHeading: "We deliver creative ideas to a crowded world.",
      stats: [
        { label: "35+ Google reviews", value: "4.9" },
        { label: "Clients world-wide", value: "170+" },
        { label: "Completed projects", value: "1.7k" },
        { label: "Client satisfaction", value: "95%" },
      ],
      mediaHeading: "Collaborate with a super down-to-earth, mad-talented team",
      mediaText: "A collective bunch working on incredible projects and building enduring partnerships that extend well beyond the deliverable.",
      mediaButtonLabel: "Learn More",
      mediaButtonLink: "/contact",
      clientText: "Help to brands growing up and show their success stories to the world",
      awardSubtitle: "Awards",
      awardHeading: "We believe in quality, not quantity, that's why we're great ever.",
      teamSubtitle: "Team",
      teamHeading: "Meet the talented squad, behind the creativity",
    },
  });

  // Seed Contact Page
  console.log("📝 Seeding Contact Page...");
  await payloadInstance.updateGlobal({
    slug: "contact-page",
    data: {
      pageTitle: "Contact",
      subtitle: "Contact",
      heading: "Let's drop us a line and get the project started.",
      getInTouchTitle: "Get in touch",
      getInTouchText: "We're excited to hear from you and let's start something special together",
      email: "hello@redoxagency.com",
      followTitle: "Follow",
      socialLinks: [
        { label: "Facebook", href: "#" },
        { label: "Twitter", href: "#" },
        { label: "LinkedIn", href: "#" },
        { label: "Instagram", href: "#" },
        { label: "Dribbble", href: "#" },
        { label: "Behance", href: "#" },
      ],
      submitButtonLabel: "Send Message",
    },
  });

  // Seed Team Page
  console.log("📝 Seeding Team Page...");
  await payloadInstance.updateGlobal({
    slug: "team-page",
    data: {
      pageTitle: "Our Team",
      headerHeading: "Our talented squad",
      headerDescription: "We're a diverse team that works as fancies attention to details, enjoys beers on Friday nights and aspires to design the dent in the universe.",
      members: [
        { name: "James David", post: "CEO & Founder" },
        { name: "Brenda C. Janet", post: "Lead Developer" },
        { name: "Martin Carlos", post: "Lead Designer" },
        { name: "Garry J. Coburn", post: "Project Manager" },
      ],
      ctaHeading: "We think out of the box when it comes to strategy, design and creative. Want to join the talented team?",
      ctaButtonLabel: "Send Us Now",
      ctaButtonLink: "/contact",
    },
  });

  // Seed FAQ Page
  console.log("📝 Seeding FAQ Page...");
  await payloadInstance.updateGlobal({
    slug: "faq-page",
    data: {
      pageTitle: "Question",
      subtitle: "FAQ",
      heading: "Learn some common answers about newly projects",
      items: [
        { question: "Bring their individual experience and creative?", answer: "People know what an FAQ is, so make that your page title. Don't overcomplicate things by calling it 'Good to Know' or 'More Info'." },
        { question: "Design should enrich our day?", answer: "People know what an FAQ is, so make that your page title. Don't overcomplicate things by calling it 'Good to Know' or 'More Info'." },
        { question: "Human centered design to challenges design theory?", answer: "People know what an FAQ is, so make that your page title. Don't overcomplicate things by calling it 'Good to Know' or 'More Info'." },
        { question: "Align with your brand look and feel?", answer: "People know what an FAQ is, so make that your page title. Don't overcomplicate things by calling it 'Good to Know' or 'More Info'." },
        { question: "How to become an Agile productive manager?", answer: "People know what an FAQ is, so make that your page title. Don't overcomplicate things by calling it 'Good to Know' or 'More Info'." },
        { question: "Why we create the best Webflow websites in Figma?", answer: "People know what an FAQ is, so make that your page title. Don't overcomplicate things by calling it 'Good to Know' or 'More Info'." },
        { question: "How to manage Agile project teams?", answer: "People know what an FAQ is, so make that your page title. Don't overcomplicate things by calling it 'Good to Know' or 'More Info'." },
      ],
    },
  });

  // Seed Pages with Blocks
  console.log("📄 Seeding Pages...");

  // Delete existing pages
  const existingPages = await payloadInstance.find({ collection: "pages", limit: 100 });
  for (const doc of existingPages.docs) {
    await payloadInstance.delete({ collection: "pages", id: doc.id });
  }

  // HOME PAGE
  await payloadInstance.create({
    collection: "pages",
    data: {
      title: "Home",
      slug: "home",
      headerVariant: "header-five",
      footerVariant: "footer-four",
      bodyClasses: "body-wrapper body-startup-agency font-heading-bdogrotesk-regular",
      layout: [
        {
          blockType: "hero",
          variant: "hero-five",
          heading: "Where visionary concepts come to life",
          description: "We're a leading digital product agency focused on branding, UI/UX design, mobile, and web development.",
          buttonLabel: "Send message",
          buttonLink: "/contact",
          videoUrl: "https://rrdevs.net/project-video/xfire.webm",
        },
        {
          blockType: "works",
          variant: "work-area-4",
          subtitle: "Products",
          heading: "The work we do, and our favorite ones",
          buttonLabel: "Browse all products",
          buttonLink: "/service-details",
          items: [
            { title: "Redox Digital Agency HTML Template", tag: "WordPress, Themeforest", date: "(2025)" },
            { title: "Redox Digital Agency Theme", tag: "Themeforest", date: "(2025)" },
            { title: "Redox Digital Agency HTML Template", tag: "WordPress, Themeforest", date: "(2025)" },
            { title: "Redox Digital Agency Theme", tag: "Themeforest", date: "(2025)" },
          ],
        },
        {
          blockType: "marquee",
          text: "Crafting digital products",
        },
        {
          blockType: "about",
          variant: "about-four",
          subtitle: "The studio",
          heading: "We're a design and development studio since 2017 who craft digital masterpiece products.",
          primaryButtonLabel: "Learn more us",
          primaryButtonLink: "/about",
          secondaryButtonLabel: "Browse all products",
          secondaryButtonLink: "/portfolio",
        },
        {
          blockType: "services",
          variant: "service-area-5",
          subtitle: "Services",
          heading: "Services we provide",
          description: "We are here to build solid and courageous brands that can leave a strong mark on the world.",
          items: [
            { number: "(001)", title: "UI/UX Design", text: "We help you build successful products by understanding your market and users.", link: "/service-details" },
            { number: "(002)", title: "Web Development", text: "We help you build successful products by understanding your market and users.", link: "/service-details" },
            { number: "(003)", title: "Web Design", text: "We help you build successful products by understanding your market and users.", link: "/service-details" },
            { number: "(004)", title: "Branding Design", text: "We help you build successful products by understanding your market and users.", link: "/service-details" },
            { number: "(005)", title: "Webflow Development", text: "We help you build successful products by understanding your market and users.", link: "/service-details" },
          ],
        },
        {
          blockType: "cta",
          variant: "cta-area-4",
          headingLine1: "Let's",
          headingLine2: "build a brand now",
          link: "/contact",
        },
      ],
      _status: "published",
    },
  });

  // ABOUT PAGE
  await payloadInstance.create({
    collection: "pages",
    data: {
      title: "About Us",
      slug: "about",
      pageTitle: "Since 2012",
      headerVariant: "header-two",
      footerVariant: "footer-inner",
      bodyClasses: "body-wrapper body-page-inner font-heading-sequelsans-romanbody",
      layout: [
        {
          blockType: "page-title",
          title: "Since 2012",
        },
        {
          blockType: "about",
          variant: "about-area-details",
          heading: "We deliver creative ideas to a crowded world.",
          subtitle: "Who are we?",
        },
        {
          blockType: "team",
          subtitle: "Team",
          heading: "Meet the talented squad, behind the creativity",
          members: [
            { name: "James David", post: "CEO & Founder" },
            { name: "Brenda C. Janet", post: "Lead Developer" },
            { name: "Martin Carlos", post: "Lead Designer" },
            { name: "Garry J. Coburn", post: "Project Manager" },
          ],
        },
      ],
      _status: "published",
    },
  });

  // CONTACT PAGE
  await payloadInstance.create({
    collection: "pages",
    data: {
      title: "Contact Us",
      slug: "contact",
      pageTitle: "Contact",
      headerVariant: "header-two",
      footerVariant: "footer-inner",
      bodyClasses: "body-wrapper body-page-inner font-heading-sequelsans-romanbody",
      layout: [
        {
          blockType: "page-title",
          title: "Contact",
        },
        {
          blockType: "contact",
          subtitle: "Contact",
          heading: "Let's drop us a line and get the project started.",
          email: "hello@redoxagency.com",
          socialLinks: [
            { label: "Facebook", href: "#" },
            { label: "Twitter", href: "#" },
            { label: "LinkedIn", href: "#" },
            { label: "Instagram", href: "#" },
          ],
          submitButtonLabel: "Send Message",
        },
      ],
      _status: "published",
    },
  });

  // TEAM PAGE
  await payloadInstance.create({
    collection: "pages",
    data: {
      title: "Our Team",
      slug: "team",
      pageTitle: "Our Team",
      headerVariant: "header-two",
      footerVariant: "footer-inner",
      bodyClasses: "body-wrapper body-page-inner font-heading-sequelsans-romanbody",
      layout: [
        {
          blockType: "page-title",
          title: "Our Team",
        },
        {
          blockType: "team",
          heading: "Our talented squad",
          description: "We're a diverse team that works as fancies attention to details.",
          members: [
            { name: "James David", post: "CEO & Founder" },
            { name: "Brenda C. Janet", post: "Lead Developer" },
            { name: "Martin Carlos", post: "Lead Designer" },
            { name: "Garry J. Coburn", post: "Project Manager" },
          ],
        },
        {
          blockType: "cta",
          variant: "cta-area-4",
          headingLine1: "Want to join",
          headingLine2: "the talented team?",
          link: "/contact",
        },
      ],
      _status: "published",
    },
  });

  // FAQ PAGE
  await payloadInstance.create({
    collection: "pages",
    data: {
      title: "FAQ",
      slug: "faq",
      pageTitle: "Question",
      headerVariant: "header-two",
      footerVariant: "footer-inner",
      bodyClasses: "body-wrapper body-page-inner font-heading-sequelsans-romanbody",
      layout: [
        {
          blockType: "page-title",
          title: "Question",
        },
        {
          blockType: "faq",
          subtitle: "FAQ",
          heading: "Learn some common answers about newly projects",
          items: [
            { question: "Bring their individual experience and creative?", answer: "People know what an FAQ is, so make that your page title." },
            { question: "Design should enrich our day?", answer: "People know what an FAQ is, so make that your page title." },
            { question: "Human centered design to challenges design theory?", answer: "People know what an FAQ is, so make that your page title." },
            { question: "Align with your brand look and feel?", answer: "People know what an FAQ is, so make that your page title." },
            { question: "How to become an Agile productive manager?", answer: "People know what an FAQ is, so make that your page title." },
          ],
        },
      ],
      _status: "published",
    },
  });

  // SERVICES PAGE
  await payloadInstance.create({
    collection: "pages",
    data: {
      title: "Services",
      slug: "services",
      pageTitle: "Expertise",
      headerVariant: "header-two",
      footerVariant: "footer-inner",
      bodyClasses: "body-wrapper body-page-inner font-heading-sequelsans-romanbody",
      layout: [
        {
          blockType: "page-title",
          title: "Expertise",
        },
        {
          blockType: "services",
          variant: "service-area-6",
          subtitle: "Services",
          heading: "Our core services",
          items: [
            { number: "(001)", title: "Brand Strategy & Design", text: "We help you build successful products.", link: "/service-details" },
            { number: "(002)", title: "Content Design & Marketing", text: "We help you build successful products.", link: "/service-details" },
            { number: "(003)", title: "Service Design & Optimization", text: "We help you build successful products.", link: "/service-details" },
            { number: "(004)", title: "Product Design & Engineering", text: "We help you build successful products.", link: "/service-details" },
          ],
        },
        {
          blockType: "client",
          variant: "client-area-4",
        },
      ],
      _status: "published",
    },
  });

  // BLOG PAGE
  await payloadInstance.create({
    collection: "pages",
    data: {
      title: "Blog",
      slug: "blog",
      pageTitle: "Journals",
      headerVariant: "header-two",
      footerVariant: "footer-inner",
      bodyClasses: "body-wrapper body-page-inner font-heading-sequelsans-romanbody",
      layout: [
        {
          blockType: "page-title",
          title: "Journals",
        },
        {
          blockType: "blog",
          variant: "blog-area-2",
          heading: "Latest articles",
        },
      ],
      _status: "published",
    },
  });

  // Seed Admin Users
  console.log("👤 Seeding Admin Users...");

  // Delete existing admin users to avoid duplicates
  const existing = await payloadInstance.find({ collection: "admin-users", limit: 100 });
  for (const doc of existing.docs) {
    await payloadInstance.delete({ collection: "admin-users", id: doc.id });
  }

  await payloadInstance.create({
    collection: "admin-users",
    data: {
      username: "admin",
      hashedPassword: hashPassword("admin123"),
      name: "Administrator",
      role: "admin",
    },
  });

  await payloadInstance.create({
    collection: "admin-users",
    data: {
      username: "editor",
      hashedPassword: hashPassword("editor123"),
      name: "Content Editor",
      role: "editor",
    },
  });

  console.log("\n✅ All content seeded successfully!");
  console.log("\n👤 Login credentials:");
  console.log("   Admin:  username: admin  / password: admin123");
  console.log("   Editor: username: editor / password: editor123");
  console.log("\n🌐 Visit localhost:3000/admin/login to sign in");
  process.exit(0);
};

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
