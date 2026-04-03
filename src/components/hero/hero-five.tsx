import Image from "next/image";
import shape from '@/assets/imgs/shape/shape-19.webp';
import Link from "next/link";
import { RenderText } from "@/lib/render-text";

interface HeroData {
  heading?: string;
  description?: string;
  buttonLabel?: string;
  buttonLink?: string;
  videoUrl?: string;
}

export default function HeroFive({ data }: { data?: HeroData }) {
  const heading = data?.heading || "Where visionary concepts come to life";
  const description = data?.description || "We're a leading digital product agency focused on branding, UI/UX design, mobile, and web development.";
  const buttonLabel = data?.buttonLabel || "Send message";
  const buttonLink = data?.buttonLink || "/contact";
  const videoUrl = data?.videoUrl || "https://rrdevs.net/project-video/xfire.webm";

  return (
    <section className="hero-area-5">
      <div className="container large">
        <div className="hero-area-5-inner section-spacing">
          <div className="section-content-wrapper">
            <div className="hero-video fade-anim" data-direction="left" data-delay="0.45" data-offset="100" data-ease="back.out(3)">
              <video className="title-video" loop muted autoPlay playsInline>
                <source src={videoUrl} type="video/mp4" />
              </video>
            </div>
            <div className="section-content">
              <div className="section-title-wrapper">
                <div className="title-wrapper fade-anim">
                  <RenderText content={heading} as="h1" className="section-title font-bdogrotesk-regular char-anim" />
                </div>
              </div>
              <div className="text-btn-wrapper fade-anim" data-delay="0.60">
                <div className="text-wrapper fade-anim" data-delay="0.75">
                  <RenderText content={description} as="p" className="text" />
                </div>
                <div className="btn-wrapper fade-anim" data-delay="0.90">
                  <Link href={buttonLink} className="rr-btn">
                    <span className="btn-wrap">
                      <span className="text-one">{buttonLabel}</span>
                      <span className="text-two">{buttonLabel}</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-shape-1 section-spacing-top">
            <Image className="fade-anim" data-direction="right" data-offset="100" data-delay="1.05" src={shape} alt="image" style={{ height: 'auto' }} />
          </div>
        </div>
      </div>
    </section>
  );
}
