import type { Config } from "@measured/puck";
import HeroFive from "@/components/hero/hero-five";
import WorkAreaFour from "@/components/work/work-area-4";
import MarqueeText from "@/components/marquee/marquee-text";
import AboutFour from "@/components/about/about-four";
import ServiceAreaFive from "@/components/services/service-area-5";
import CtaAreaFour from "@/components/cta/cta-area-4";
import PageTitle from "@/components/common/page-title";

// Puck config — registers each section component as a visual block
export const puckConfig: Config = {
  components: {
    Hero: {
      label: "Hero Section",
      fields: {
        heading: { type: "textarea", label: "Heading" },
        description: { type: "textarea", label: "Description" },
        buttonLabel: { type: "text", label: "Button Text" },
        buttonLink: { type: "text", label: "Button Link" },
        videoUrl: { type: "text", label: "Video URL" },
      },
      defaultProps: {
        heading: "Where visionary concepts come to life",
        description: "We're a leading digital product agency focused on branding, UI/UX design, mobile, and web development.",
        buttonLabel: "Send message",
        buttonLink: "/contact",
        videoUrl: "https://rrdevs.net/project-video/xfire.webm",
      },
      render: ({ heading, description, buttonLabel, buttonLink, videoUrl }) => (
        <HeroFive data={{ heading, description, buttonLabel, buttonLink, videoUrl }} />
      ),
    },

    Works: {
      label: "Works / Portfolio",
      fields: {
        subtitle: { type: "text", label: "Subtitle" },
        heading: { type: "text", label: "Heading" },
        buttonLabel: { type: "text", label: "Button Text" },
        buttonLink: { type: "text", label: "Button Link" },
      },
      defaultProps: {
        subtitle: "Products",
        heading: "The work we do, and our favorite ones",
        buttonLabel: "Browse all products",
        buttonLink: "/service-details",
      },
      render: ({ subtitle, heading, buttonLabel, buttonLink }) => (
        <WorkAreaFour data={{ subtitle, heading, buttonLabel, buttonLink }} />
      ),
    },

    Marquee: {
      label: "Marquee / Scrolling Text",
      fields: {
        text: { type: "text", label: "Scrolling Text" },
      },
      defaultProps: {
        text: "Crafting digital products",
      },
      render: ({ text }) => <MarqueeText data={{ text }} />,
    },

    About: {
      label: "About Section",
      fields: {
        subtitle: { type: "text", label: "Subtitle" },
        heading: { type: "textarea", label: "Heading" },
        primaryButtonLabel: { type: "text", label: "Primary Button Text" },
        primaryButtonLink: { type: "text", label: "Primary Button Link" },
        secondaryButtonLabel: { type: "text", label: "Secondary Button Text" },
        secondaryButtonLink: { type: "text", label: "Secondary Button Link" },
      },
      defaultProps: {
        subtitle: "The studio",
        heading: "We're a design and development studio since 2017 who craft digital masterpiece products.",
        primaryButtonLabel: "Learn more us",
        primaryButtonLink: "/about",
        secondaryButtonLabel: "Browse all products",
        secondaryButtonLink: "/portfolio",
      },
      render: ({ subtitle, heading, primaryButtonLabel, primaryButtonLink, secondaryButtonLabel, secondaryButtonLink }) => (
        <AboutFour data={{ subtitle, heading, primaryButtonLabel, primaryButtonLink, secondaryButtonLabel, secondaryButtonLink }} />
      ),
    },

    Services: {
      label: "Services Section",
      fields: {
        subtitle: { type: "text", label: "Subtitle" },
        heading: { type: "text", label: "Heading" },
        description: { type: "textarea", label: "Description" },
      },
      defaultProps: {
        subtitle: "Services",
        heading: "Services we provide",
        description: "We are here to build solid and courageous brands that can leave a strong mark on the world.",
      },
      render: ({ subtitle, heading, description }) => (
        <ServiceAreaFive data={{ subtitle, heading, description }} />
      ),
    },

    CTA: {
      label: "Call to Action",
      fields: {
        headingLine1: { type: "text", label: "Heading Line 1" },
        headingLine2: { type: "text", label: "Heading Line 2" },
        link: { type: "text", label: "Link" },
      },
      defaultProps: {
        headingLine1: "Let's",
        headingLine2: "build a brand now",
        link: "/contact",
      },
      render: ({ headingLine1, headingLine2, link }) => (
        <CtaAreaFour data={{ headingLine1, headingLine2, link }} />
      ),
    },

    PageTitle: {
      label: "Page Title / Banner",
      fields: {
        title: { type: "text", label: "Title" },
      },
      defaultProps: {
        title: "Page Title",
      },
      render: ({ title }) => <PageTitle title={title} />,
    },
  },
};
