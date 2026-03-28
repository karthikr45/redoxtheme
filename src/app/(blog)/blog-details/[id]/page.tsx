import { Metadata } from "next";
import { notFound } from "next/navigation";
import HeaderTwo from "@/layout/header/header-two-server";
import MainWrapper from "@/components/wrapper/main-wrapper";
import FooterInner from "@/layout/footer/footer-inner";
import { allBlogs } from "@/data/blog-data";
import BlogWrapper from "../../blog/_components/blog-wrapper";
import BlogDetailsArea from "@/components/blog/blog-details-area";
import BlogDetailsDynamic from "@/components/blog/blog-details-dynamic";
import RecentBlogs from "@/components/blog/recent-blogs";
import { getBlogs } from "@/lib/db";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  // Try DB first
  try {
    if (ObjectId.isValid(id)) {
      const blogs = await getBlogs();
      const post = await blogs.findOne({ _id: new ObjectId(id) });
      if (post) return { title: post.title };
    }
  } catch {}

  // Fall back to static data
  const post = allBlogs.find((p) => p.id === Number(id));
  return { title: post?.title || "Blog Details" };
}

export default async function BlogDetailsPage({ params }: Props) {
  const { id } = await params;

  // Try fetching from MongoDB
  try {
    if (ObjectId.isValid(id)) {
      const blogs = await getBlogs();
      const post = await blogs.findOne({ _id: new ObjectId(id) });
      if (post) {
        return (
          <>
            <HeaderTwo />
            <MainWrapper bodyCls={["body-wrapper", "body-page-inner", "font-heading-sequelsans-romanbody"]}>
              <BlogWrapper>
                <main>
                  <BlogDetailsDynamic post={{
                    title: post.title,
                    author: post.author,
                    content: post.content,
                    image: post.image,
                    tags: post.tags,
                    createdAt: post.createdAt?.toISOString?.() || "",
                  }} />
                  <RecentBlogs />
                </main>
                <FooterInner />
              </BlogWrapper>
            </MainWrapper>
          </>
        );
      }
    }
  } catch {}

  // Fall back to static blog data
  const post = allBlogs.find((p) => p.id === Number(id));
  if (!post) notFound();

  return (
    <>
      <HeaderTwo />
      <MainWrapper bodyCls={["body-wrapper", "body-page-inner", "font-heading-sequelsans-romanbody"]}>
        <BlogWrapper>
          <main>
            <BlogDetailsArea />
            <RecentBlogs />
          </main>
          <FooterInner />
        </BlogWrapper>
      </MainWrapper>
    </>
  );
}
