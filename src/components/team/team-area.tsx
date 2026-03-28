"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import teamPage from "@/data/content/team-page.json";
import EditableText from "@/components/admin/editable-text";

export const TeamWrapperArea = () => {
  return (
    <div className="team-wrapper">
      {teamPage.members.map((member, idx) => (
        <div className="team-box" key={member.name + idx}>
          <div className="thumb">
            <Link href="/team-details">
              <Image src={member.img} alt={member.name} width={440} height={600} style={{ height: "auto" }} />
            </Link>
          </div>
          <div className="content">
            <h3 className="name">
              <Link href="/team-details">
                <EditableText section="team-page" field="name" index={idx} as="span">
                  {member.name}
                </EditableText>
              </Link>
            </h3>
            <EditableText section="team-page" field="post" index={idx} as="span" className="post">
              {member.post}
            </EditableText>
          </div>
        </div>
      ))}
    </div>
  );
};

export default function TeamArea() {
  return (
    <section className="team-area">
      <div className="container large">
        <div className="team-area-inner section-spacing">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <EditableText section="team-page" field="headerHeading" as="h2" className="section-title font-sequelsans-romanbody rr_title_anim">
                  {teamPage.headerHeading}
                </EditableText>
              </div>
            </div>
            <div className="text-wrapper">
              <EditableText section="team-page" field="headerDescription" as="p" className="text" multiline>
                {teamPage.headerDescription}
              </EditableText>
            </div>
          </div>
          <div className="team-wrapper-box fade-anim">
            <TeamWrapperArea />
          </div>
        </div>
      </div>
    </section>
  );
}
