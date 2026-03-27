import Image from "next/image";
import shape from '@/assets/imgs/shape/shape-19.webp';
import Link from "next/link";
import heroContent from "@/data/content/hero.json";

export default function HeroFive() {
  return (
    <section className="hero-area-5">
      <div className="container large">
        <div className="hero-area-5-inner section-spacing">
          <div className="section-content-wrapper">
            <div
              className="hero-video fade-anim"
              data-direction="left"
              data-delay="0.45"
              data-offset="100"
              data-ease="back.out(3)"
            >
              <video className="title-video" loop muted autoPlay playsInline>
                <source
                  src={heroContent.videoUrl}
                  type="video/mp4"
                />
              </video>
            </div>
            <div className="section-content">
              <div className="section-title-wrapper">
                <div className="title-wrapper fade-anim">
                  <h1 className="section-title font-bdogrotesk-regular char-anim">
                    {heroContent.heading}
                  </h1>
                </div>
              </div>
              <div className="text-btn-wrapper fade-anim" data-delay="0.60">
                <div className="text-wrapper fade-anim" data-delay="0.75">
                  <p className="text">
                    {heroContent.description}
                  </p>
                </div>
                <div className="btn-wrapper fade-anim" data-delay="0.90">
                  <Link href={heroContent.buttonLink} className="rr-btn">
                    <span className="btn-wrap">
                      <span className="text-one">{heroContent.buttonLabel}</span>
                      <span className="text-two">{heroContent.buttonLabel}</span>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-shape-1 section-spacing-top">
            <Image
              className="fade-anim"
              data-direction="right"
              data-offset="100"
              data-delay="1.05"
              src={shape}
              alt="image"
              style={{height:'auto'}}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
