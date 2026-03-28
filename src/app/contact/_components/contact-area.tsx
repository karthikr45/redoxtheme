"use client";
import { FormEvent, useState } from "react";

interface SocialLink { label: string; href: string; }
interface ContactData {
  subtitle?: string;
  heading?: string;
  email?: string;
  socialLinks?: SocialLink[];
  submitButtonLabel?: string;
  [key: string]: unknown;
}

export default function ContactArea({ data }: { data?: ContactData | null }) {
  const [budget, setBudget] = useState("");
  const subtitle = (data?.subtitle as string) || "Contact";
  const heading = (data?.heading as string) || "Let's drop us a line and get the project started.";
  const email = (data?.email as string) || "hello@redoxagency.com";
  const socialLinks = (data?.socialLinks as SocialLink[]) || [
    { label: "Facebook", href: "#" }, { label: "Twitter", href: "#" },
    { label: "LinkedIn", href: "#" }, { label: "Instagram", href: "#" },
    { label: "Dribbble", href: "#" }, { label: "Behance", href: "#" },
  ];
  const submitLabel = (data?.submitButtonLabel as string) || "Send Message";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => { e.preventDefault(); };

  return (
    <section className="contact-area-contact-page">
      <div className="container large">
        <div className="contact-area-contact-page-inner section-spacing-top">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <span className="section-subtitle">{subtitle}</span>
              </div>
              <div className="title-wrapper">
                <h2 className="section-title font-sequelsans-romanbody">{heading}</h2>
              </div>
            </div>
          </div>
          <div className="section-content-wrapper fade-anim">
            <div className="section-content">
              <div className="contact-mail">
                <p className="title">Get in touch</p>
                <p className="text">
                  We&apos;re excited to hear from you and let&apos;s start something special together <br />
                  <a href={`mailto:${email}`}>{email}</a>
                </p>
              </div>
              <div className="contact-social">
                <p className="title">Follow</p>
                <div className="social-links">
                  {socialLinks.map((link, idx) => (
                    <a key={idx} href={link.href}>{link.label}</a>
                  ))}
                </div>
              </div>
            </div>
            <div className="contact-wrap">
              <form onSubmit={handleSubmit} id="contact__form">
                <div className="contact-formwrap">
                  <div className="contact-formfield"><input type="text" name="name" placeholder="Name*" /></div>
                  <div className="contact-formfield"><input type="text" name="email" placeholder="Email*" /></div>
                  <div className="contact-formfield"><input type="text" name="phone" placeholder="Phone*" /></div>
                  <div className="contact-formfield"><input type="text" name="company" placeholder="Company" /></div>
                  <div className="contact-formfield">
                    <select name="Budget" value={budget} onChange={(e) => setBudget(e.target.value)}>
                      <option value="" disabled>Budget*</option>
                      <option value="1">5,000 - 10,000</option>
                      <option value="2">10,000 - 15,000</option>
                      <option value="3">15,000 - 20,000</option>
                      <option value="4">20,000 - 25,000</option>
                      <option value="5">25,000 - Above</option>
                    </select>
                  </div>
                  <div className="contact-formfield"><input type="text" name="solution" placeholder="Solution*" /></div>
                  <div className="contact-formfield message"><input type="text" name="message" placeholder="Message*" /></div>
                </div>
                <div className="submit-btn">
                  <button type="submit" className="rr-btn">
                    <span className="btn-wrap">
                      <span className="text-one">{submitLabel}</span>
                      <span className="text-two">{submitLabel}</span>
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
