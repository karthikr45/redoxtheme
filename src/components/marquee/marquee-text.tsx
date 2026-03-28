"use client";
import marqueeContent from "@/data/content/marquee.json";
import EditableText from "@/components/admin/editable-text";

export default function MarqueeText() {
  return (
    <section className="marquee-text-area">
      <div className="moving-text">
        <div className="wrapper-text">
          <EditableText
            section="marquee"
            field="text"
            as="h2"
            className="section-title font-bdogrotesk-regular"
          >
            {marqueeContent.text}
          </EditableText>
        </div>
      </div>
    </section>
  );
}
