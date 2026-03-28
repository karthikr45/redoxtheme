import Image from "next/image";

interface BlogPost {
  title: string;
  author: string;
  content: string;
  image: string;
  tags: string;
  createdAt: string;
}

export default function BlogDetailsDynamic({ post }: { post: BlogPost }) {
  const tags = post.tags ? post.tags.split(",").map((t) => t.trim()) : [];
  const date = post.createdAt ? new Date(post.createdAt).getFullYear().toString() : new Date().getFullYear().toString();

  return (
    <section className="blog-details-area">
      <div className="blog-details-area-inner section-spacing-top">
        <div className="container large">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="title-wrapper">
                <h2 className="section-title font-sequelsans-romanbody">{post.title}</h2>
              </div>
            </div>
            <div className="meta">
              <span className="name">By <span>{post.author}</span></span>
              {tags[0] && <span className="tag has-left-line">{tags[0]}</span>}
              <span className="date has-left-line">{date}</span>
            </div>
          </div>
        </div>
        {post.image && (
          <div className="image-wrapper parallax-view fade-anim">
            <Image className="w-100" src={post.image} alt={post.title} width={1600} height={900} data-speed="0.8" style={{ height: "auto" }} />
          </div>
        )}
        <div className="container">
          <div className="section-details fade-anim">
            <div className="text-wrapper">
              {post.content.split("\n\n").map((paragraph, idx) => (
                <p key={idx} className="text">{paragraph}</p>
              ))}
            </div>
            {tags.length > 0 && (
              <div className="tags-wrapper">
                <span className="heading">Tags:</span>
                <div className="tags">
                  {tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
