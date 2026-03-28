"use client";
import aboutPage from "@/data/content/about-page.json";
import EditableText from "@/components/admin/editable-text";

export default function InfoAreaAbout() {
  return (
    <section className="info-area-page-about">
      <div className="container large">
        <div className="info-area-page-about-inner section-spacing-top">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <EditableText section="about-page" field="infoSubtitle" as="span" className="section-subtitle">
                  {aboutPage.infoSubtitle}
                </EditableText>
              </div>
              <div className="title-wrapper">
                <EditableText section="about-page" field="infoHeading" as="h2" className="section-title font-sequelsans-romanbody" multiline>
                  {aboutPage.infoHeading}
                </EditableText>
              </div>
            </div>
          </div>
          <div className="counter-wrapper-box fade-anim">
            <div className="counter-wrapper">
              {aboutPage.stats.map((stat, idx) => (
                <div className="funfact-item" key={idx}>
                  <EditableText section="about-page" field={`stats.${idx}.label`} as="p" className="text">
                    {stat.label}
                  </EditableText>
                  <EditableText section="about-page" field={`stats.${idx}.value`} as="h3" className="number t-counter">
                    {stat.value}
                  </EditableText>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
