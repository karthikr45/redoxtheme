interface MarqueeData {
  text?: string;
}

export default function MarqueeText({ data }: { data?: MarqueeData }) {
  const text = data?.text || "Crafting digital products";
  return (
    <section className="marquee-text-area">
      <div className="moving-text">
        <div className="wrapper-text">
          <h2 className="section-title font-bdogrotesk-regular">{text}</h2>
        </div>
      </div>
    </section>
  );
}
