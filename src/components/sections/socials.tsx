import Link from "next/link";
import { socials } from "~/data/links";

export const SocialsSection = () => {
  return (
    <section>
      <h2 className="text-3xl font-bitcount">Connect</h2>
      <div className="w-full flex flex-wrap gap-2 mt-2 ">
        {socials.map((item, index) => {
          return (
            <SocialPill
              key={index}
              icon={item.img}
              link={item.link}
              platform={item.platform}
              index={index}
            />
          );
        })}
      </div>
    </section>
  );
};

const SocialPill = ({
  link,
  platform,
  icon,
  index,
}: {
  link: string;
  platform: string;
  icon: string;
  index: number;
}) => {
  return (
    <div className="flex items-center gap-2 text-sm">
      <span
        aria-hidden
        role="img"
        style={{ maskImage: `url(${icon})`, WebkitMaskImage: `url(${icon})` }}
        className="w-5 h-5 bg-foreground [mask-size:contain] [mask-repeat:no-repeat] [mask-position:center]"
      />
      <Link
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline underline-offset-1"
      >
        {platform}
      </Link>
      {index !== socials.length - 1 && (
        <span className="w-1 h-1 mx-2 bg-gray-400 rounded-full" />
      )}
    </div>
  );
};
