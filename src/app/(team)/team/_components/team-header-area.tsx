"use client";
import Image from "next/image";
import teamPage from "@/data/content/team-page.json";
import EditableText from "@/components/admin/editable-text";

export default function TeamHeaderArea() {
  return (
    <section className="team-area-team-page">
      <div className="team-area-team-page-inner">
        <div className="container large">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="team-info">
                <div className="team-group">
                  <Image src="/assets/imgs/team/team-11.webp" alt="image" width={60} height={60} />
                  <Image src="/assets/imgs/team/team-12.webp" alt="image" width={60} height={60} />
                  <Image src="/assets/imgs/team/team-13.webp" alt="image" width={60} height={60} />
                </div>
                <div className="text-wrapper">
                  <p className="text" dangerouslySetInnerHTML={{ __html: teamPage.headerText }} />
                </div>
              </div>
              <div className="title-wrapper">
                <EditableText section="team-page" field="headerHeading" as="h2" className="section-title font-sequelsans-romanbody">
                  {teamPage.headerHeading}
                </EditableText>
                <EditableText section="team-page" field="headerDescription" as="p" className="text" multiline>
                  {teamPage.headerDescription}
                </EditableText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
