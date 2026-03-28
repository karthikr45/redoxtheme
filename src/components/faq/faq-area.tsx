"use client";
import React, { useState } from "react";
import faqPage from "@/data/content/faq-page.json";
import EditableText from "@/components/admin/editable-text";

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
}

export const AccordionWrapper = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>(
    faqPage.items.map((item, idx) => ({
      ...item,
      isOpen: idx === 1,
    }))
  );

  const toggleFAQ = (id: string) => {
    setFaqs((prevFaqs) =>
      prevFaqs.map((faq) =>
        faq.id === id ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
      )
    );
  };

  return (
    <div className="accordion-wrapper fade-anim">
      <div className="accordion" id="accordionExample">
        {faqs.map((faq, idx) => (
          <div key={faq.id} className="accordion-item">
            <h2 className="accordion-header">
              <button
                className={`accordion-button ${faq.isOpen ? "" : "collapsed"}`}
                type="button"
                onClick={() => toggleFAQ(faq.id)}
                aria-expanded={faq.isOpen}
                aria-controls={faq.id}
              >
                <EditableText section="faq-page" field="question" index={idx} as="span">
                  {faq.question}
                </EditableText>
              </button>
            </h2>
            <div
              id={faq.id}
              className={`accordion-collapse collapse ${faq.isOpen ? "show" : ""}`}
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                <EditableText section="faq-page" field="answer" index={idx} as="span" multiline>
                  {faq.answer}
                </EditableText>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FAQArea = () => {
  return (
    <section className="faq-area">
      <div className="container large">
        <div className="faq-area-inner section-spacing-top">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <EditableText section="faq-page" field="subtitle" as="span" className="section-subtitle">
                  {faqPage.subtitle}
                </EditableText>
              </div>
              <div className="title-wrapper">
                <EditableText section="faq-page" field="heading" as="h2" className="section-title font-sequelsans-romanbody" multiline>
                  {faqPage.heading}
                </EditableText>
              </div>
            </div>
          </div>

          {/* accordion wrapper */}
          <AccordionWrapper />
          {/* accordion wrapper */}
        </div>
      </div>
    </section>
  );
};

export default FAQArea;
