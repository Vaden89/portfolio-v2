import Link from "next/link";
import { File, Mail } from "lucide-react";
import { HeaderPattern } from "../common/header-pattern";
import { LettersPullUp } from "../common/split-text";

export const HeroSection = () => {
  const words = ["Software Engineer", "Always Learning"];

  return (
    <section className="text-sm font-montserrat flex sm:text-[13px] flex-col gap-4 text-primary-gray">
      <HeaderPattern />
      <span>Hey there! I&apos;m</span>
      <div>
        <h1 className="font-bitcount text-white text-8xl leading-[60%]">
          Isaac
        </h1>
        <LettersPullUp words={words} />
      </div>

      <p className="leading-[150%]">
        I build software that solves real problems and holds up in production.
        My focus is on creating{" "}
        <span className="text-white font-medium">Reliable Systems</span>,
        thoughtful{" "}
        <span className="font-medium text-white">User Experiences </span>, and
        products that feel fast, intuitive, and well-crafted. I care about the
        small details as much as the larger{" "}
        <span className="text-white font-medium">Architecture</span> — because
        good software lives in both.
      </p>

      <p>
        Most of my work revolves around turning{" "}
        <span className="text-white font-medium">Complex Ideas</span> into
        working products. From internal tools and operational dashboards to full
        platforms used by real users, I enjoy taking things from concept to
        something people depend on everyday. I approach software with a strong
        sense of <span className="text-white font-medium">Ownership</span>,
        balancing speed, quality, and long-term maintainability.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <Link href="#">
          <span className="text-[13px] underline underline-offset-2 font-medium">
            Learn more about my experience
          </span>
        </Link>
        <div className="flex gap-2 text-xs">
          <Link
            href="mailto:isaacshosanya89@gmail.com"
            className="px-2 py-1 shadow-sm border border-[#212529] rounded-lg flex items-center gap-2"
          >
            <Mail size={14} />
            Email me
          </Link>
          <Link
            href="https://drive.google.com/file/d/13z0pubEaiH5lGhkQ4l-jWN6sU6tjNeeD/view?usp=sharing"
            target="_blank"
            className="px-2 py-1 shadow-sm border border-[#212529] rounded-lg flex items-center gap-2"
          >
            <File size={14} />
            My resume
          </Link>
        </div>
      </div>
    </section>
  );
};
