"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import worksContent from "@/data/content/works.json";
import EditableImage from "@/components/admin/editable-image";
import EditableText from "@/components/admin/editable-text";

const WorkAreaFour = () => {
  return (
    <section className="work-area-4">
      <div className="container large">
        <div className="work-area-4-inner section-spacing-top">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <EditableText section="works" field="subtitle" as="span" className="section-subtitle">
                  {worksContent.subtitle}
                </EditableText>
              </div>
              <div className="title-wrapper">
                <EditableText
                  section="works"
                  field="heading"
                  as="h2"
                  className="section-title font-bdogrotesk-regular fade-anim"
                  multiline
                >
                  {worksContent.heading}
                </EditableText>
                <div className="btn-wrapper fade-anim">
                  <Link href={worksContent.buttonLink} className="rr-btn-underline">
                    <EditableText section="works" field="buttonLabel" as="span">
                      {worksContent.buttonLabel}
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
                </div>
              </div>
            </div>
          </div>

          <div className="works-wrapper-box section-spacing-top">
            <div className="works-wrapper-4 fade-anim">
              {worksContent.items.map((work, index) => (
                <div className="work-box" key={index}>
                  <div className="thumb">
                    <div
                      className="image scale"
                      data-cursor-text="View Details"
                      data-cursor-text-red
                    >
                      <Link href="/portfolio-details">
                        <EditableImage section="works" field="image" currentSrc={work.image}>
                          <Image
                            src={work.image}
                            alt="image"
                            width={805}
                            height={630}
                            style={{ height: "auto" }}
                          />
                        </EditableImage>
                      </Link>
                    </div>
                  </div>
                  <div className="content">
                    <h3 className="title">
                      <Link href="/portfolio-details">
                        <EditableText section="works" field="title" index={index} as="span">
                          {work.title}
                        </EditableText>
                      </Link>
                    </h3>
                    <div className="meta">
                      <EditableText section="works" field="tag" index={index} as="span" className="tag">
                        {work.tag}
                      </EditableText>
                      <EditableText section="works" field="date" index={index} as="span" className="date">
                        {work.date}
                      </EditableText>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkAreaFour;
