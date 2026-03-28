"use client";
import Image from "next/image";
import gallery_img_1 from "@/assets/imgs/gallery/image-19.webp";
import gallery_img_2 from "@/assets/imgs/gallery/image-20.webp";
import gallery_img_3 from "@/assets/imgs/gallery/image-21.webp";
import gallery_img_4 from "@/assets/imgs/gallery/image-22.webp";
import Link from "next/link";
import aboutDetails from "@/data/content/about-details.json";
import EditableText from "@/components/admin/editable-text";
import EditableLink from "@/components/admin/editable-link";

const gallery_images = [
  gallery_img_1,
  gallery_img_2,
  gallery_img_3,
  gallery_img_4,
  gallery_img_1,
];

export default function AboutAreaDetails() {
  return (
    <section className="about-area-details">
      <div className="container large">
        <div className="about-area-details-inner">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <EditableText section="about-details" field="subtitle" as="span" className="section-subtitle">
                  {aboutDetails.subtitle}
                </EditableText>
              </div>
              <div className="title-wrapper">
                <EditableText section="about-details" field="heading" as="h2" className="section-title font-sequelsans-romanbody" multiline>
                  {aboutDetails.heading}
                </EditableText>
              </div>
            </div>
          </div>
          <div className="section-content-wrapper fade-anim">
            <div className="info-list">
              <ul>
                {aboutDetails.listItems.map((item, idx) => (
                  <li key={idx}>
                    <EditableText section="about-details" field={`listItems.${idx}`} as="span">
                      {item}
                    </EditableText>
                  </li>
                ))}
              </ul>
            </div>
            <div className="section-content">
              <div className="text-wrapper" data-direction="right">
                <EditableText section="about-details" field="text1" as="p" className="text" multiline>
                  {aboutDetails.text1}
                </EditableText>
                <EditableText section="about-details" field="text2" as="p" className="text" multiline>
                  {aboutDetails.text2}
                </EditableText>
              </div>
              <div className="btn-wrapper" data-direction="right">
                <EditableLink section="about-details" field="buttonLink" currentHref={aboutDetails.buttonLink}>
                  <Link href={aboutDetails.buttonLink} className="rr-btn">
                    <span className="btn-wrap">
                      <EditableText section="about-details" field="buttonLabel" as="span" className="text-one">
                        {aboutDetails.buttonLabel}
                      </EditableText>
                      <span className="text-two">{aboutDetails.buttonLabel}</span>
                    </span>
                  </Link>
                </EditableLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="moving-gallery fade-anim">
        <ul className="wrapper-gallery">
          {gallery_images.map((g, i) => (
            <li key={i}>
              <Image src={g} alt={`image-${i}`} style={{ height: "auto" }} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
