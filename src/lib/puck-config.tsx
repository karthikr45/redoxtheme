import type { Config } from "@measured/puck";
import ImageUploadField from "@/components/puck-fields/image-upload-field";
import HeroFive from "@/components/hero/hero-five";
import WorkAreaFour from "@/components/work/work-area-4";
import MarqueeText from "@/components/marquee/marquee-text";
import AboutFour from "@/components/about/about-four";
import ServiceAreaFive from "@/components/services/service-area-5";
import CtaAreaFour from "@/components/cta/cta-area-4";
import PageTitle from "@/components/common/page-title";

export const puckConfig: Config = {
  components: {
    Hero: {
      label: "Hero Section",
      fields: {
        heading: { type: "textarea", label: "Main Heading" },
        description: { type: "textarea", label: "Description" },
        buttonLabel: { type: "text", label: "Button Text" },
        buttonLink: { type: "text", label: "Button Link" },
        videoUrl: { type: "custom", label: "Video URL", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
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
        item1Title: { type: "text", label: "Item 1 - Title" },
        item1Tag: { type: "text", label: "Item 1 - Category" },
        item1Date: { type: "text", label: "Item 1 - Date" },
        item1Image: { type: "custom", label: "Item 1 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        item1Link: { type: "text", label: "Item 1 - Link" },
        item2Title: { type: "text", label: "Item 2 - Title" },
        item2Tag: { type: "text", label: "Item 2 - Category" },
        item2Date: { type: "text", label: "Item 2 - Date" },
        item2Image: { type: "custom", label: "Item 2 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        item2Link: { type: "text", label: "Item 2 - Link" },
        item3Title: { type: "text", label: "Item 3 - Title" },
        item3Tag: { type: "text", label: "Item 3 - Category" },
        item3Date: { type: "text", label: "Item 3 - Date" },
        item3Image: { type: "custom", label: "Item 3 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        item3Link: { type: "text", label: "Item 3 - Link" },
        item4Title: { type: "text", label: "Item 4 - Title" },
        item4Tag: { type: "text", label: "Item 4 - Category" },
        item4Date: { type: "text", label: "Item 4 - Date" },
        item4Image: { type: "custom", label: "Item 4 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        item4Link: { type: "text", label: "Item 4 - Link" },
        item5Title: { type: "text", label: "Item 5 - Title" },
        item5Tag: { type: "text", label: "Item 5 - Category" },
        item5Date: { type: "text", label: "Item 5 - Date" },
        item5Image: { type: "custom", label: "Item 5 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        item5Link: { type: "text", label: "Item 5 - Link" },
        item6Title: { type: "text", label: "Item 6 - Title" },
        item6Tag: { type: "text", label: "Item 6 - Category" },
        item6Date: { type: "text", label: "Item 6 - Date" },
        item6Image: { type: "custom", label: "Item 6 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        item6Link: { type: "text", label: "Item 6 - Link" },
      },
      defaultProps: {
        subtitle: "Products",
        heading: "The work we do, and our favorite ones",
        buttonLabel: "Browse all products",
        buttonLink: "/service-details",
        item1Title: "Redox Digital Agency HTML Template", item1Tag: "WordPress, Themeforest", item1Date: "(2025)", item1Image: "/assets/imgs/project/image-30.webp", item1Link: "/portfolio-details",
        item2Title: "Redox Digital Agency Theme", item2Tag: "Themeforest", item2Date: "(2025)", item2Image: "/assets/imgs/project/image-31.webp", item2Link: "/portfolio-details",
        item3Title: "Redox Digital Agency HTML Template", item3Tag: "WordPress, Themeforest", item3Date: "(2025)", item3Image: "/assets/imgs/project/image-32.webp", item3Link: "/portfolio-details",
        item4Title: "Redox Digital Agency Theme", item4Tag: "Themeforest", item4Date: "(2025)", item4Image: "/assets/imgs/project/image-33.webp", item4Link: "/portfolio-details",
        item5Title: "Redox Digital Agency HTML Template", item5Tag: "WordPress, Themeforest", item5Date: "(2025)", item5Image: "/assets/imgs/project/image-34.webp", item5Link: "/portfolio-details",
        item6Title: "Redox Digital Agency Theme", item6Tag: "Themeforest", item6Date: "(2025)", item6Image: "/assets/imgs/project/image-35.webp", item6Link: "/portfolio-details",
      },
      render: (props) => {
        const items = [];
        for (let i = 1; i <= 6; i++) {
          const t = props[`item${i}Title` as keyof typeof props] as string;
          if (t) items.push({
            title: t,
            tag: (props[`item${i}Tag` as keyof typeof props] as string) || "",
            date: (props[`item${i}Date` as keyof typeof props] as string) || "",
            image: (props[`item${i}Image` as keyof typeof props] as string) || "/assets/imgs/project/image-30.webp",
            link: (props[`item${i}Link` as keyof typeof props] as string) || "/portfolio-details",
          });
        }
        return <WorkAreaFour data={{ subtitle: props.subtitle, heading: props.heading, buttonLabel: props.buttonLabel, buttonLink: props.buttonLink, items }} />;
      },
    },

    Marquee: {
      label: "Marquee / Scrolling Text",
      fields: { text: { type: "text", label: "Scrolling Text" } },
      defaultProps: { text: "Crafting digital products" },
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
        image: { type: "custom", label: "Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
      },
      defaultProps: {
        subtitle: "The studio",
        heading: "We're a design and development studio since 2017 who craft digital masterpiece products.",
        primaryButtonLabel: "Learn more us",
        primaryButtonLink: "/about",
        secondaryButtonLabel: "Browse all products",
        secondaryButtonLink: "/portfolio",
        image: "",
      },
      render: (props) => <AboutFour data={props} />,
    },

    Services: {
      label: "Services Section",
      fields: {
        subtitle: { type: "text", label: "Subtitle" },
        heading: { type: "text", label: "Heading" },
        description: { type: "textarea", label: "Description" },
        svc1Number: { type: "text", label: "Service 1 - Number" },
        svc1Title: { type: "text", label: "Service 1 - Title" },
        svc1Text: { type: "textarea", label: "Service 1 - Description" },
        svc1Image: { type: "custom", label: "Service 1 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        svc1Link: { type: "text", label: "Service 1 - Link" },
        svc2Number: { type: "text", label: "Service 2 - Number" },
        svc2Title: { type: "text", label: "Service 2 - Title" },
        svc2Text: { type: "textarea", label: "Service 2 - Description" },
        svc2Image: { type: "custom", label: "Service 2 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        svc2Link: { type: "text", label: "Service 2 - Link" },
        svc3Number: { type: "text", label: "Service 3 - Number" },
        svc3Title: { type: "text", label: "Service 3 - Title" },
        svc3Text: { type: "textarea", label: "Service 3 - Description" },
        svc3Image: { type: "custom", label: "Service 3 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        svc3Link: { type: "text", label: "Service 3 - Link" },
        svc4Number: { type: "text", label: "Service 4 - Number" },
        svc4Title: { type: "text", label: "Service 4 - Title" },
        svc4Text: { type: "textarea", label: "Service 4 - Description" },
        svc4Image: { type: "custom", label: "Service 4 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        svc4Link: { type: "text", label: "Service 4 - Link" },
        svc5Number: { type: "text", label: "Service 5 - Number" },
        svc5Title: { type: "text", label: "Service 5 - Title" },
        svc5Text: { type: "textarea", label: "Service 5 - Description" },
        svc5Image: { type: "custom", label: "Service 5 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        svc5Link: { type: "text", label: "Service 5 - Link" },
      },
      defaultProps: {
        subtitle: "Services", heading: "Services we provide",
        description: "We are here to build solid and courageous brands that can leave a strong mark on the world.",
        svc1Number: "(001)", svc1Title: "UI/UX Design", svc1Text: "We help you build successful products by understanding your market and users.", svc1Image: "/assets/imgs/project/image-47.webp", svc1Link: "/service-details",
        svc2Number: "(002)", svc2Title: "Web Development", svc2Text: "We help you build successful products by understanding your market and users.", svc2Image: "/assets/imgs/project/image-48.webp", svc2Link: "/service-details",
        svc3Number: "(003)", svc3Title: "Web Design", svc3Text: "We help you build successful products by understanding your market and users.", svc3Image: "/assets/imgs/project/image-49.webp", svc3Link: "/service-details",
        svc4Number: "(004)", svc4Title: "Branding Design", svc4Text: "We help you build successful products by understanding your market and users.", svc4Image: "/assets/imgs/project/image-50.webp", svc4Link: "/service-details",
        svc5Number: "(005)", svc5Title: "Webflow Development", svc5Text: "We help you build successful products by understanding your market and users.", svc5Image: "/assets/imgs/project/image-51.webp", svc5Link: "/service-details",
      },
      render: (props) => {
        const items = [];
        for (let i = 1; i <= 5; i++) {
          const t = props[`svc${i}Title` as keyof typeof props] as string;
          if (t) items.push({
            number: (props[`svc${i}Number` as keyof typeof props] as string) || "",
            title: t,
            text: (props[`svc${i}Text` as keyof typeof props] as string) || "",
            image: (props[`svc${i}Image` as keyof typeof props] as string) || "",
            link: (props[`svc${i}Link` as keyof typeof props] as string) || "/service-details",
          });
        }
        return <ServiceAreaFive data={{ subtitle: props.subtitle, heading: props.heading, description: props.description, items }} />;
      },
    },

    CTA: {
      label: "Call to Action",
      fields: {
        headingLine1: { type: "text", label: "Heading Line 1" },
        headingLine2: { type: "text", label: "Heading Line 2" },
        link: { type: "text", label: "Link URL" },
      },
      defaultProps: { headingLine1: "Let's", headingLine2: "build a brand now", link: "/contact" },
      render: (props) => <CtaAreaFour data={props} />,
    },

    PageTitle: {
      label: "Page Title / Banner",
      fields: { title: { type: "text", label: "Page Title" } },
      defaultProps: { title: "Page Title" },
      render: ({ title }) => <PageTitle title={title} />,
    },

    Contact: {
      label: "Contact Section",
      fields: {
        subtitle: { type: "text", label: "Subtitle" },
        heading: { type: "textarea", label: "Heading" },
        email: { type: "text", label: "Email Address" },
        submitButtonLabel: { type: "text", label: "Submit Button Text" },
        social1Label: { type: "text", label: "Social 1 - Name" },
        social1Href: { type: "text", label: "Social 1 - URL" },
        social2Label: { type: "text", label: "Social 2 - Name" },
        social2Href: { type: "text", label: "Social 2 - URL" },
        social3Label: { type: "text", label: "Social 3 - Name" },
        social3Href: { type: "text", label: "Social 3 - URL" },
        social4Label: { type: "text", label: "Social 4 - Name" },
        social4Href: { type: "text", label: "Social 4 - URL" },
      },
      defaultProps: {
        subtitle: "Contact", heading: "Let's drop us a line and get the project started.",
        email: "hello@redoxagency.com", submitButtonLabel: "Send Message",
        social1Label: "Facebook", social1Href: "#",
        social2Label: "Twitter", social2Href: "#",
        social3Label: "LinkedIn", social3Href: "#",
        social4Label: "Instagram", social4Href: "#",
      },
      render: (props) => {
        const socialLinks = [];
        for (let i = 1; i <= 4; i++) {
          const label = props[`social${i}Label` as keyof typeof props] as string;
          if (label) socialLinks.push({ label, href: (props[`social${i}Href` as keyof typeof props] as string) || "#" });
        }
        // Simple inline contact render since ContactArea is a client component with form state
        return (
          <section className="contact-area-contact-page">
            <div className="container large">
              <div className="contact-area-contact-page-inner section-spacing-top">
                <div className="section-header">
                  <div className="section-title-wrapper">
                    <div className="subtitle-wrapper"><span className="section-subtitle">{props.subtitle}</span></div>
                    <div className="title-wrapper"><h2 className="section-title font-sequelsans-romanbody">{props.heading}</h2></div>
                  </div>
                </div>
                <div className="section-content-wrapper">
                  <div className="section-content">
                    <div className="contact-mail">
                      <p className="title">Get in touch</p>
                      <p className="text"><a href={`mailto:${props.email}`}>{props.email}</a></p>
                    </div>
                    <div className="contact-social">
                      <p className="title">Follow</p>
                      <div className="social-links">{socialLinks.map((l, i) => <a key={i} href={l.href}>{l.label}</a>)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      },
    },

    Team: {
      label: "Team Section",
      fields: {
        subtitle: { type: "text", label: "Subtitle" },
        heading: { type: "text", label: "Heading" },
        description: { type: "textarea", label: "Description" },
        member1Name: { type: "text", label: "Member 1 - Name" },
        member1Post: { type: "text", label: "Member 1 - Position" },
        member1Image: { type: "custom", label: "Member 1 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        member2Name: { type: "text", label: "Member 2 - Name" },
        member2Post: { type: "text", label: "Member 2 - Position" },
        member2Image: { type: "custom", label: "Member 2 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        member3Name: { type: "text", label: "Member 3 - Name" },
        member3Post: { type: "text", label: "Member 3 - Position" },
        member3Image: { type: "custom", label: "Member 3 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
        member4Name: { type: "text", label: "Member 4 - Name" },
        member4Post: { type: "text", label: "Member 4 - Position" },
        member4Image: { type: "custom", label: "Member 4 - Image", render: ({ value, onChange }: { value: string; onChange: (v: string) => void }) => <ImageUploadField value={value} onChange={onChange} /> },
      },
      defaultProps: {
        subtitle: "Team", heading: "Meet the talented squad", description: "",
        member1Name: "James David", member1Post: "CEO & Founder", member1Image: "/assets/imgs/team/team-1.webp",
        member2Name: "Brenda C. Janet", member2Post: "Lead Developer", member2Image: "/assets/imgs/team/team-2.webp",
        member3Name: "Martin Carlos", member3Post: "Lead Designer", member3Image: "/assets/imgs/team/team-3.webp",
        member4Name: "Garry J. Coburn", member4Post: "Project Manager", member4Image: "/assets/imgs/team/team-4.webp",
      },
      render: (props) => {
        const members = [];
        for (let i = 1; i <= 4; i++) {
          const name = props[`member${i}Name` as keyof typeof props] as string;
          if (name) members.push({
            name,
            post: (props[`member${i}Post` as keyof typeof props] as string) || "",
            img: (props[`member${i}Image` as keyof typeof props] as string) || "/assets/imgs/team/team-1.webp",
          });
        }
        return (
          <section className="team-area">
            <div className="container large">
              <div className="team-area-inner section-spacing">
                <div className="section-header">
                  <div className="section-title-wrapper">
                    {props.subtitle && <div className="subtitle-wrapper"><span className="section-subtitle">{props.subtitle}</span></div>}
                    <div className="title-wrapper"><h2 className="section-title font-sequelsans-romanbody">{props.heading}</h2></div>
                  </div>
                  {props.description && <div className="text-wrapper"><p className="text">{props.description}</p></div>}
                </div>
                <div className="team-wrapper-box">
                  <div className="team-wrapper">
                    {members.map((m, i) => (
                      <div className="team-box" key={i}>
                        <div className="thumb"><img src={m.img} alt={m.name} style={{ width: "100%", height: "auto" }} /></div>
                        <div className="content">
                          <h3 className="name">{m.name}</h3>
                          <span className="post">{m.post}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      },
    },

    FAQ: {
      label: "FAQ Section",
      fields: {
        subtitle: { type: "text", label: "Subtitle" },
        heading: { type: "text", label: "Heading" },
        q1: { type: "text", label: "Question 1" },
        a1: { type: "textarea", label: "Answer 1" },
        q2: { type: "text", label: "Question 2" },
        a2: { type: "textarea", label: "Answer 2" },
        q3: { type: "text", label: "Question 3" },
        a3: { type: "textarea", label: "Answer 3" },
        q4: { type: "text", label: "Question 4" },
        a4: { type: "textarea", label: "Answer 4" },
        q5: { type: "text", label: "Question 5" },
        a5: { type: "textarea", label: "Answer 5" },
      },
      defaultProps: {
        subtitle: "FAQ", heading: "Learn some common answers about newly projects",
        q1: "Bring their individual experience and creative?", a1: "People know what an FAQ is, so make that your page title.",
        q2: "Design should enrich our day?", a2: "People know what an FAQ is, so make that your page title.",
        q3: "Human centered design to challenges design theory?", a3: "People know what an FAQ is, so make that your page title.",
        q4: "Align with your brand look and feel?", a4: "People know what an FAQ is, so make that your page title.",
        q5: "How to become an Agile productive manager?", a5: "People know what an FAQ is, so make that your page title.",
      },
      render: (props) => {
        const items = [];
        for (let i = 1; i <= 5; i++) {
          const q = props[`q${i}` as keyof typeof props] as string;
          if (q) items.push({ question: q, answer: (props[`a${i}` as keyof typeof props] as string) || "" });
        }
        return (
          <section className="faq-area">
            <div className="container large">
              <div className="faq-area-inner section-spacing-top">
                <div className="section-header">
                  <div className="section-title-wrapper">
                    <div className="subtitle-wrapper"><span className="section-subtitle">{props.subtitle}</span></div>
                    <div className="title-wrapper"><h2 className="section-title font-sequelsans-romanbody">{props.heading}</h2></div>
                  </div>
                </div>
                <div className="accordion-wrapper">
                  <div className="accordion">
                    {items.map((item, idx) => (
                      <div key={idx} className="accordion-item">
                        <h2 className="accordion-header"><button className="accordion-button collapsed" type="button">{item.question}</button></h2>
                        <div className="accordion-collapse collapse"><div className="accordion-body">{item.answer}</div></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      },
    },

    Blog: {
      label: "Blog Section",
      fields: {
        heading: { type: "text", label: "Heading" },
        buttonLabel: { type: "text", label: "Button Text" },
        buttonLink: { type: "text", label: "Button Link" },
      },
      defaultProps: { heading: "Learn our recent journal", buttonLabel: "Learn all news", buttonLink: "/blog" },
      render: (props) => (
        <section className="blog-area">
          <div className="container large">
            <div className="blog-area-inner section-spacing-top">
              <div className="section-header">
                <div className="section-title-wrapper">
                  <div className="title-wrapper">
                    <h2 className="section-title font-sequelsans-romanbody">{props.heading} <span className="mb-14"><a href={props.buttonLink} className="rr-btn-group"><span className="b">{props.buttonLabel}</span></a></span></h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    },

    ClientLogos: {
      label: "Client Logos",
      fields: { description: { type: "textarea", label: "Description" } },
      defaultProps: { description: "Help to brands growing up and show their success stories to the world" },
      render: (props) => (
        <section className="client-area"><div className="container large"><div className="section-header"><div className="text-wrapper"><p className="text">{props.description}</p></div></div></div></section>
      ),
    },

    FunFacts: {
      label: "Fun Facts / Counters",
      fields: {
        stat1Label: { type: "text", label: "Stat 1 - Label" },
        stat1Value: { type: "text", label: "Stat 1 - Value" },
        stat2Label: { type: "text", label: "Stat 2 - Label" },
        stat2Value: { type: "text", label: "Stat 2 - Value" },
        stat3Label: { type: "text", label: "Stat 3 - Label" },
        stat3Value: { type: "text", label: "Stat 3 - Value" },
        stat4Label: { type: "text", label: "Stat 4 - Label" },
        stat4Value: { type: "text", label: "Stat 4 - Value" },
      },
      defaultProps: {
        stat1Label: "Google reviews", stat1Value: "4.9",
        stat2Label: "Clients world-wide", stat2Value: "170+",
        stat3Label: "Completed projects", stat3Value: "1.7k",
        stat4Label: "Client satisfaction", stat4Value: "95%",
      },
      render: (props) => (
        <section className="info-area-page-about">
          <div className="container large">
            <div className="info-area-page-about-inner section-spacing-top">
              <div className="counter-wrapper-box">
                <div className="counter-wrapper">
                  {[1, 2, 3, 4].map(i => {
                    const label = props[`stat${i}Label` as keyof typeof props] as string;
                    const value = props[`stat${i}Value` as keyof typeof props] as string;
                    return label ? (
                      <div className="funfact-item" key={i}>
                        <p className="text">{label}</p>
                        <h3 className="number t-counter">{value}</h3>
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    },
  },
};
