import Image from "next/image";
import Link from "next/link";

interface CtaData {
  headingLine1?: string;
  headingLine2?: string;
  heading?: string;
  link?: string;
}

export default function CtaAreaFour({ data }: { data?: CtaData }) {
  const line1 = data?.headingLine1 || "Let's";
  const line2 = data?.headingLine2 || "build a brand now";
  const link = data?.link || "/contact";

  return (
    <section className="cta-area-4">
      <div className="container large">
        <div className="cta-area-4-inner section-spacing-top">
          <div className="section-header fade-anim" data-direction="left">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <h2 className="section-title font-bdogrotesk-regular">
                  <Link href={link}>
                    {line1}
                    <span className="icon">
                      <Image className="first" src="/assets/imgs/icon/icon-9.webp" alt="icon" width={101} height={101} style={{ height: 'auto' }} />
                      <Image className="second" src="/assets/imgs/icon/icon-9.webp" alt="icon" width={101} height={101} style={{ height: 'auto' }} />
                    </span>{" "}
                    <br />
                    {line2}
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
