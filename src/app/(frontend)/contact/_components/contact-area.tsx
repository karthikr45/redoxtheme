"use client";
import { FormEvent, useState } from "react";
import contactPage from "@/data/content/contact-page.json";
import EditableText from "@/components/admin/editable-text";

export default function ContactArea() {
  const [budget, setBudget] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <section className="contact-area-contact-page">
      <div className="container large">
        <div className="contact-area-contact-page-inner section-spacing-top">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <EditableText section="contact-page" field="subtitle" as="span" className="section-subtitle">
                  {contactPage.subtitle}
                </EditableText>
              </div>
              <div className="title-wrapper">
                <EditableText section="contact-page" field="heading" as="h2" className="section-title font-sequelsans-romanbody" multiline>
                  {contactPage.heading}
                </EditableText>
              </div>
            </div>
          </div>
          <div className="section-content-wrapper fade-anim">
            <div className="section-content">
              <div className="contact-mail">
                <EditableText section="contact-page" field="getInTouchTitle" as="p" className="title">
                  {contactPage.getInTouchTitle}
                </EditableText>
                <p className="text">
                  <EditableText section="contact-page" field="getInTouchText" as="span">
                    {contactPage.getInTouchText}
                  </EditableText>
                  <br />
                  <a href={`mailto:${contactPage.email}`}>
                    <EditableText section="contact-page" field="email" as="span">
                      {contactPage.email}
                    </EditableText>
                  </a>
                </p>
              </div>
              <div className="contact-social">
                <EditableText section="contact-page" field="followTitle" as="p" className="title">
                  {contactPage.followTitle}
                </EditableText>
                <div className="social-links">
                  {contactPage.socialLinks.map((link, idx) => (
                    <a href={link.href} key={idx}>
                      <EditableText section="contact-page" field={`socialLinks.${idx}.label`} as="span">
                        {link.label}
                      </EditableText>
                    </a>
                  ))}
                </div>
              </div>
            </div>
            <div className="contact-wrap">
              <form onSubmit={handleSubmit} id="contact__form">
                <div className="contact-formwrap">
                  <div className="contact-formfield">
                    <input type="text" name="name" id="name" placeholder="Name*" />
                  </div>
                  <div className="contact-formfield">
                    <input type="text" name="email" id="email" placeholder="Email*" />
                  </div>
                  <div className="contact-formfield">
                    <input type="text" name="phone" id="phone" placeholder="Phone*" />
                  </div>
                  <div className="contact-formfield">
                    <input type="text" name="company" id="company" placeholder="Company" />
                  </div>
                  <div className="contact-formfield">
                    <select name="Budget" id="Budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
                      <option value="" disabled>Budget*</option>
                      <option value="1">5,000 - 10,000</option>
                      <option value="2">10,000 - 15,000</option>
                      <option value="3">15,000 - 20,000</option>
                      <option value="4">20,000 - 25,000</option>
                      <option value="5">25,000 - Above</option>
                    </select>
                  </div>
                  <div className="contact-formfield">
                    <input type="text" name="solution" id="solution" placeholder="Solution*" />
                  </div>
                  <div className="contact-formfield message">
                    <input type="text" name="message" id="message" placeholder="Message*" />
                  </div>
                </div>
                <div className="submit-btn">
                  <button type="submit" className="rr-btn">
                    <span className="btn-wrap">
                      <EditableText section="contact-page" field="submitButtonLabel" as="span" className="text-one">
                        {contactPage.submitButtonLabel}
                      </EditableText>
                      <span className="text-two">{contactPage.submitButtonLabel}</span>
                    </span>
                  </button>
                </div>
                <div id="response-message"></div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
