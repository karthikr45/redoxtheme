"use client";
import Image from "next/image";
import gallery_img from "@/assets/imgs/gallery/image-23.webp";
import Link from "next/link";
import aboutPage from "@/data/content/about-page.json";
import EditableText from "@/components/admin/editable-text";
import EditableImage from "@/components/admin/editable-image";

export default function MediaAboutArea() {
  return (
    <section className="media-area-page-about">
      <div className="container large">
        <div className="media-area-page-about-inner">
          <div className="section-content-wrapper fade-anim">
            <div className="area-thumb parallax-view">
              <EditableImage section="about-page" field="mediaImage" currentSrc="/assets/imgs/gallery/image-23.webp">
                <Image
                  src={gallery_img}
                  alt="image"
                  data-speed="0.8"
                  style={{ height: "auto" }}
                />
              </EditableImage>
            </div>
            <div className="section-content">
              <div className="section-title-wrapper">
                <div className="title-wrapper">
                  <EditableText section="about-page" field="mediaHeading" as="h2" className="section-title font-sequelsans-romanbody" multiline>
                    {aboutPage.mediaHeading}
                  </EditableText>
                </div>
              </div>
              <div className="text-wrapper">
                <EditableText section="about-page" field="mediaText" as="p" className="text" multiline>
                  {aboutPage.mediaText}
                </EditableText>
              </div>
              <div className="btn-wrapper">
                <Link href={aboutPage.mediaButtonLink} className="rr-btn">
                  <span className="btn-wrap">
                    <EditableText section="about-page" field="mediaButtonLabel" as="span" className="text-one">
                      {aboutPage.mediaButtonLabel}
                    </EditableText>
                    <span className="text-two">{aboutPage.mediaButtonLabel}</span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
