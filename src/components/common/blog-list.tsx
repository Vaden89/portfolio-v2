"use client";
import Link from "next/link";
import { BlinkCard } from "./cards/blink-card";
import { PostMeta } from "@prudentbird/voxx-core";
import { formatDate } from "../../lib/date";

export function BlogList({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="flex flex-col gap-3">
      {posts.map((post) => (
        <BlogPostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

function BlogPostCard({ post }: { post: PostMeta }) {
  return (
    <BlinkCard className="p-4 group">
      <Link href={`/blog/${post.slug}`} className="flex flex-col gap-2">
        <h2 className="font-semibold group-hover:text-primary transition-colors duration-200">
          {post.title}
        </h2>
        <p className="text-xs text-primary-gray">
          <span>{formatDate(post.date)}</span> ·{" "}
          <span>{post.readingTimeMinutes} min read</span>
        </p>
      </Link>
    </BlinkCard>
  );
}
