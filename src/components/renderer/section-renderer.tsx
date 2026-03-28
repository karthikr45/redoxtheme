import HeroFive from "@/components/hero/hero-five";
import WorkAreaFour from "@/components/work/work-area-4";
import MarqueeText from "@/components/marquee/marquee-text";
import AboutFour from "@/components/about/about-four";
import ServiceAreaFive from "@/components/services/service-area-5";
import CtaAreaFour from "@/components/cta/cta-area-4";
import PageTitle from "@/components/common/page-title";
import ContactArea from "@/app/contact/_components/contact-area";
import { AccordionWrapper } from "@/components/faq/faq-area";
import Image from "next/image";
import Link from "next/link";

interface SectionData {
  type: string;
  variant?: string;
  [key: string]: unknown;
}

function TeamSection({ data }: { data: SectionData }) {
  const members = (data.members as { name: string; post: string; image?: string; img?: string }[]) || [];
  return (
    <section className="team-area">
      <div className="container large">
        <div className="team-area-inner section-spacing">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              {data.subtitle && (
                <div className="subtitle-wrapper">
                  <span className="section-subtitle">{data.subtitle as string}</span>
                </div>
              )}
              <div className="title-wrapper">
                <h2 className="section-title font-sequelsans-romanbody">
                  {(data.heading as string) || "Meet the talented squad"}
                </h2>
              </div>
            </div>
            {data.description && (
              <div className="text-wrapper">
                <p className="text">{data.description as string}</p>
              </div>
            )}
          </div>
          <div className="team-wrapper-box fade-anim">
            <div className="team-wrapper">
              {members.map((member, idx) => (
                <div className="team-box" key={idx}>
                  <div className="thumb">
                    <Link href="/team-details">
                      <Image
                        src={(member.image || member.img) as string || "/assets/imgs/team/team-1.webp"}
                        alt={member.name}
                        width={440}
                        height={600}
                        style={{ height: "auto" }}
                      />
                    </Link>
                  </div>
                  <div className="content">
                    <h3 className="name"><Link href="/team-details">{member.name}</Link></h3>
                    <span className="post">{member.post}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSection({ data }: { data: SectionData }) {
  return (
    <section className="faq-area-faq-page">
      <div className="container large">
        <div className="faq-area-faq-page-inner">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <span className="section-subtitle">{(data.subtitle as string) || "FAQ"}</span>
              </div>
              <div className="title-wrapper">
                <h2 className="section-title font-sequelsans-romanbody">
                  {(data.heading as string) || "Frequently Asked Questions"}
                </h2>
              </div>
            </div>
          </div>
          <AccordionWrapper data={data} />
        </div>
      </div>
    </section>
  );
}

function BlogSection({ data }: { data: SectionData }) {
  return (
    <section className="blog-area">
      <div className="container large">
        <div className="blog-area-inner section-spacing-top">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <h2 className="section-title font-sequelsans-romanbody">
                  {(data.heading as string) || "Latest articles"}
                  {data.buttonLabel && (
                    <span className="mb-14">
                      <Link href={(data.buttonLink as string) || "/blog"} className="rr-btn-group">
                        <span className="b">{data.buttonLabel as string}</span>
                      </Link>
                    </span>
                  )}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ClientSection({ data }: { data: SectionData }) {
  return (
    <section className="client-area-page-about">
      <div className="client-area-page-about-inner section-spacing">
        <div className="container large">
          <div className="section-header fade-anim">
            <div className="text-wrapper">
              <p className="text">{(data.description as string) || "Our trusted clients"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FunFactSection({ data }: { data: SectionData }) {
  const items = (data.items as { label: string; value: string }[]) || [];
  return (
    <section className="info-area-page-about">
      <div className="container large">
        <div className="info-area-page-about-inner section-spacing-top">
          <div className="counter-wrapper-box fade-anim">
            <div className="counter-wrapper">
              {items.map((item, idx) => (
                <div className="funfact-item" key={idx}>
                  <p className="text">{item.label}</p>
                  <h3 className="number t-counter">{item.value}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function SectionRenderer({ section }: { section: SectionData }) {
  switch (section.type) {
    case "hero":
      return <HeroFive data={section} />;
    case "works":
      return <WorkAreaFour data={section} />;
    case "marquee":
      return <MarqueeText data={section} />;
    case "about":
      return <AboutFour data={section} />;
    case "services":
      return <ServiceAreaFive data={section} />;
    case "cta":
      return <CtaAreaFour data={section} />;
    case "page-title":
      return <PageTitle title={(section.title as string) || ""} />;
    case "contact":
      return <ContactArea data={section} />;
    case "team":
      return <TeamSection data={section} />;
    case "faq":
      return <FaqSection data={section} />;
    case "blog":
      return <BlogSection data={section} />;
    case "client":
      return <ClientSection data={section} />;
    case "funfact":
      return <FunFactSection data={section} />;
    default:
      return null;
  }
}
