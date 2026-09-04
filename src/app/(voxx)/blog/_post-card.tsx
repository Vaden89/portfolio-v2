import Link from "next/link";
import type { PostMeta, VoxxConfig } from "@prudentbird/voxx-core";
import { formatDate } from "@prudentbird/voxx-core/util";
import { BlinkCard } from "~/components/common/cards/blink-card";

export function PostCard({
  post,
  config,
}: {
  post: PostMeta;
  config: VoxxConfig;
}) {
  const basePath = config.content.basePath || "/";

  return (
    <BlinkCard className="mb-4">
      <Link
        href={post.url}
        data-transition-ignore
        className="voxx-postcard__link"
      >
        <div className="voxx-postcard__header">
          <h2 className="voxx-postcard__title">{post.title}</h2>
          {config.features.readingTime ? (
            <span className="hidden sm:flex">{`${post.readingTimeMinutes} min read`}</span>
          ) : null}
        </div>

        {post.description ? (
          <p className="voxx-postcard__excerpt">{post.description}</p>
        ) : null}
      </Link>
      <div className="voxx-postcard__footer">
        {config.features.tags && post.tags.length > 0 ? (
          <ul className="voxx-tags">
            {post.tags.map((tag) => (
              <li key={tag}>
                <Link
                  href={`${basePath}?tag=${encodeURIComponent(tag)}`}
                  className="voxx-tag voxx-tag--link"
                >
                  {tag}
                </Link>
              </li>
            ))}
          </ul>
        ) : null}
        <p className="voxx-postcard__meta">
          <time dateTime={post.date}>
            {formatDate(post.date, config.site.locale)}
          </time>
          {config.features.readingTime ? (
            <span className="sm:hidden">
              {" "}
              · {`${post.readingTimeMinutes} min read`}
            </span>
          ) : null}
        </p>
      </div>
    </BlinkCard>
  );
}
