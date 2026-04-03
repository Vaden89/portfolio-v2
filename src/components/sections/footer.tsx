import { ArrowUpRight, Copyright, Quote } from "lucide-react";
import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="w-full flex flex-col pb-5 font-montserrat -mt-5 sm:-mt-0">
      <div className="h-[30vh] flex flex-col gap-3 items-center justify-center text-center">
        <Quote />
        <span className="font-semibold text-xl">
          "I was not born with a whole lot of natural talent... but I work hard
          and I never give up"
        </span>
        <div className="flex items-center gap-2">
          <div className="w-8 h-0.5 bg-foreground" />
          <span>ROCK LEE</span>
          <div className="w-8 h-0.5 bg-foreground" />
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-3 lg:gap-6">
        <span className="text-xl sm:text-2xl lg:text-3xl font-bold">
          Want to build something cool?
        </span>
        <div className="flex gap-2">
          <Link
            href="mailto:isaacshosanya89@gmail.com"
            className="bg-foreground text-background px-2 py-1 lg:px-4 sm:py-2 rounded text-sm font-medium shrink-0"
          >
            Let&apos;s Talk
          </Link>
          <Link
            href="/work"
            className="flex px-2 py-1.5 lg:px-4 sm:py-2 bg-[#343a40] rounded text-sm font-medium shrink-0"
          >
            <span>My Work</span>
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
      <div className="w-full mt-7 flex text-xs sm:text-sm items-center justify-between font-montserrat text-[#adb5bd]">
        <span>
          Built by <span className="text-[#ced4da] font-medium">Isaac</span>
        </span>
        <div className="flex items-center gap-2">
          <Copyright size={16} />
          <span>2026 Isaac</span>
        </div>
      </div>
    </footer>
  );
};
