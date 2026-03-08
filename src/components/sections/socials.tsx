import Image from "next/image";
import Link from "next/link";
import { socials } from "~/data/links";

export const SocialsSection = () => {
  return (
    <section>
      <h2 className="text-2xl font-bitcount">Connect</h2>
      <div className="w-full flex flex-wrap gap-2 ">
        {socials.map((item, index) => {
          return (
            <SocialPill
              key={index}
              icon={item.img}
              link={item.link}
              platform={item.platform}
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
}: {
  link: string;
  platform: string;
  icon: string;
}) => {
  return (
    <div className="flex items-center gap-2">
      <Image src={icon} alt={platform} width={24} height={24} />
      <Link href={link} target="_blank" rel="noopener noreferrer">
        {platform}
      </Link>
      <span className="w-1 h-1 mx-2 bg-gray-400 rounded-full" />
    </div>
  );
};
