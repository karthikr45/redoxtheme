"use client";
import EditableText from "@/components/admin/editable-text";

export default function PageTitle({ title, section, field }: { title: string; section?: string; field?: string }) {
  return (
    <section className="page-title-area">
      <div className="container large">
        <div className="page-title-area-inner section-spacing-top">
          <div className="page-title-wrapper">
            {section ? (
              <EditableText section={section} field={field || "pageTitle"} as="h2" className="page-title fade-anim">
                {title}
              </EditableText>
            ) : (
              <h2 className="page-title fade-anim">{title}</h2>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
