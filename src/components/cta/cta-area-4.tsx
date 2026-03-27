import Image from "next/image";
import Link from "next/link";
import ctaContent from "@/data/content/cta.json";

export default function CtaAreaFour() {
  return (
    <section className="cta-area-4">
      <div className="container large">
        <div className="cta-area-4-inner section-spacing-top">
          <div className="section-header fade-anim" data-direction="left">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <h2 className="section-title font-bdogrotesk-regular">
                  <Link href={ctaContent.link}>
                    {ctaContent.headingLine1}
                    <span className="icon">
                      <Image
                        className="first"
                        src="/assets/imgs/icon/icon-9.webp"
                        alt="icon"
                        width={101}
                        height={101}
                        style={{height:'auto'}}
                      />
                      <Image
                        className="second"
                        src="/assets/imgs/icon/icon-9.webp"
                        alt="icon"
                        width={101}
                        height={101}
                        style={{height:'auto'}}
                      />
                    </span>{" "}
                    <br />
                    {ctaContent.headingLine2}
                  </Link>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
