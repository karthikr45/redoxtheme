"use client";
import React from "react";
import Image from "next/image";
import servicesContent from "@/data/content/services.json";
import EditableText from "@/components/admin/editable-text";
import EditableImage from "@/components/admin/editable-image";

type IProps = {
  spacing?: string;
  title_font?: string;
};

const ServiceAreaFive = ({
  spacing = "section-spacing-top",
  title_font = "font-bdogrotesk-regular",
}: IProps) => {
  return (
    <section className="service-area-5">
      <div className="container large">
        <div className={`service-area-5-inner ${spacing}`}>
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <EditableText section="services" field="subtitle" as="span" className="section-subtitle">
                  {servicesContent.subtitle}
                </EditableText>
              </div>
              <div className="title-wrapper tt_title_anim">
                <EditableText
                  section="services"
                  field="heading"
                  as="h2"
                  className={`section-title ${title_font}`}
                >
                  {servicesContent.heading}
                </EditableText>
              </div>
            </div>
          </div>

          <div className="services-wrapper-box">
            <div className="text-wrapper fade-anim">
              <EditableText section="services" field="description" as="p" className="info-text" multiline>
                {servicesContent.description}
              </EditableText>
            </div>

            <div className="services-wrapper-5">
              {servicesContent.items.map((service, idx) => (
                <a href={service.link} key={service.id}>
                  <div className="service-box fade-anim">
                    <div className="count">
                      <span className="number">{service.number}</span>
                    </div>
                    <div className="content">
                      <EditableText section="services" field="title" index={idx} as="h3" className="title">
                        {service.title}
                      </EditableText>
                      <EditableText section="services" field="text" index={idx} as="p" className="text">
                        {service.text}
                      </EditableText>
                    </div>
                    <div className="thumb">
                      <EditableImage section="services" field="image" currentSrc={service.image}>
                      <Image
                        src={service.image}
                        alt={service.title}
                        width={165}
                        height={92}
                      />
                      </EditableImage>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceAreaFive;
