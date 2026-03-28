import Link from "next/link";
import Image from "next/image";
import { getBlogs } from "@/lib/db";
import { blogItemsTwo } from "@/data/blog-data";
import BlogItem from "./blog-item";

export default async function BlogAreaTwoServer() {
  let dbPosts: { _id: string; title: string; author: string; image: string; createdAt: Date; status: string }[] = [];

  try {
    const blogs = await getBlogs();
    const posts = await blogs.find({ status: "published" }).sort({ createdAt: -1 }).toArray();
    dbPosts = posts.map((p) => ({
      _id: p._id.toString(),
      title: p.title,
      author: p.author,
      image: p.image,
      createdAt: p.createdAt,
      status: p.status,
    }));
  } catch {
    // DB not available
  }

  return (
    <section className="blog-area-2">
      <div className="container large">
        <div className="blog-area-2-inner">
          <div className="section-header fade-anim">
            <div className="section-title-wrapper">
              <div className="subtitle-wrapper">
                <span className="section-subtitle">Recent blog</span>
              </div>
              <div className="title-wrapper">
                <h2 className="section-title font-sequelsans-romanbody">Learn our recent journal</h2>
              </div>
            </div>
          </div>
          <div className="blogs-wrapper-box">
            <div className="blogs-wrapper">
              {/* DB posts first */}
              {dbPosts.map((post) => (
                <Link key={post._id} href={`/blog-details/${post._id}`}>
                  <article className="blog fade-anim">
                    <div className="thumb">
                      {post.image && (
                        <Image src={post.image} alt={post.title} width={500} height={353} style={{ height: "auto" }} />
                      )}
                    </div>
                    <div className="content-wrapper">
                      <div className="content">
                        <h2 className="title">
                          {post.title}
                          <span className="arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 14" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M8.98834 0.661257C8.91884 0.781628 8.85302 0.903885 8.79094 1.02786C8.47298 1.49122 8.0835 1.90234 7.63629 2.2455C7.07879 2.67328 6.4425 2.98707 5.76373 3.16894C5.08497 3.35082 4.37702 3.39722 3.68033 3.3055C2.98363 3.21377 2.31182 2.98572 1.70325 2.63437L0.869521 4.07843C1.66772 4.53928 2.54888 4.83839 3.46268 4.95869C4.37648 5.079 5.30502 5.01814 6.1953 4.77959C6.36565 4.73394 6.53397 4.68196 6.6999 4.62381L2.03475 12.7041L3.47584 13.5361L8.16052 5.42201C8.19489 5.61171 8.23713 5.80022 8.28719 5.98704C8.52574 6.87732 8.9373 7.71189 9.49839 8.44311C10.0595 9.17433 10.7591 9.78788 11.5573 10.2487L12.391 8.80466C11.7825 8.4533 11.2491 7.98552 10.8213 7.42803C10.3935 6.87053 10.0797 6.23423 9.89783 5.55547C9.71595 4.8767 9.66955 4.16876 9.76128 3.47206C9.83484 2.91326 9.99611 2.37047 10.2384 1.86349C10.3146 1.74781 10.3875 1.62977 10.457 1.50948L10.4323 1.49521L10.4324 1.49499L8.98834 0.661257Z" fill="#111111" />
                            </svg>
                          </span>
                        </h2>
                        <div className="meta">
                          <span className="name">By <span>{post.author}</span></span>
                          <span className="date has-left-line">{post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ""}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}

              {/* Fallback to static posts if no DB posts */}
              {dbPosts.length === 0 && blogItemsTwo.map((item) => (
                <Link key={item.id} href={`/blog-details/${item.id}`}>
                  <BlogItem item={item} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
