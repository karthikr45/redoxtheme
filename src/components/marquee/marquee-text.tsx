import marqueeContent from "@/data/content/marquee.json";

export default function MarqueeText() {
  return (
    <section className="marquee-text-area">
      <div className="moving-text">
        <div className="wrapper-text">
          <h2 className="section-title font-bdogrotesk-regular">{marqueeContent.text}</h2>
        </div>
      </div>
    </section>
  )
}
