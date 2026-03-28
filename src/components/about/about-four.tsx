"use client";
import Image from "next/image";
import gallery_img from "@/assets/imgs/gallery/image-51.webp";
import Link from "next/link";
import aboutContent from "@/data/content/about.json";
import EditableText from "@/components/admin/editable-text";
import EditableLink from "@/components/admin/editable-link";
import EditableImage from "@/components/admin/editable-image";

export default function AboutFour() {
  return (
    <section className="about-area-4">
      <div className="container large">
        <div className="about-area-4-inner section-spacing-bottom">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <EditableText
                  section="about"
                  field="subtitle"
                  as="span"
                  className="section-subtitle"
                >
                  {aboutContent.subtitle}
                </EditableText>
              </div>
              <div className="title-wrapper">
                <EditableText
                  section="about"
                  field="heading"
                  as="h2"
                  className="section-title font-bdogrotesk-regular fade-anim"
                  multiline
                >
                  {aboutContent.heading}
                </EditableText>
                <div className="btn-wrapper fade-anim">
                  <EditableLink section="about" field="primaryButtonLink" currentHref={aboutContent.primaryButtonLink}>
                    <Link href={aboutContent.primaryButtonLink} className="rr-btn">
                      <span className="btn-wrap">
                        <EditableText section="about" field="primaryButtonLabel" as="span" className="text-one">
                          {aboutContent.primaryButtonLabel}
                        </EditableText>
                        <span className="text-two">{aboutContent.primaryButtonLabel}</span>
                      </span>
                    </Link>
                  </EditableLink>
                  <EditableLink section="about" field="secondaryButtonLink" currentHref={aboutContent.secondaryButtonLink}>
                    <Link href={aboutContent.secondaryButtonLink} className="rr-btn-underline">
                      <EditableText section="about" field="secondaryButtonLabel" as="span">
                        {aboutContent.secondaryButtonLabel}
                      </EditableText>
                    <span className="icon">
                      <Image
                        src="/assets/imgs/icon/icon-5.webp"
                        alt="image"
                        width={13}
                        height={13}
                      />
                    </span>
                    </Link>
                  </EditableLink>
                </div>
              </div>
            </div>
          </div>
          <div className="thumb parallax-view go_full">
            <EditableImage section="about" field="image" currentSrc="/assets/imgs/gallery/image-51.webp">
              <Image
                src={gallery_img}
                alt="image"
                data-speed="0.8"
                style={{ height: "auto" }}
              />
            </EditableImage>
          </div>
        </div>
      </div>
    </section>
  );
}
