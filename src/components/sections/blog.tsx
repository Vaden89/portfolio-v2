import { listPosts } from "@prudentbird/voxx-core";
import { ViewMoreLink } from "../common/view-more-link";
import { BlogList } from "../common/blog-list";

export async function BlogSection() {
  const posts = await listPosts({ limit: 3 });

  return (
    <section>
      <div className="w-full flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bitcount">Blog</h2>
        <ViewMoreLink link="/blog" />
      </div>
      <BlogList posts={posts.posts} />
    </section>
  );
}
