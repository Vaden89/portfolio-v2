import Link from "next/link";
import { File, Mail } from "lucide-react";

export const HeroSection = () => {
  return (
    <section className="text-base font-montserrat flex flex-col gap-4">
      <span>Hey there! I&apos;m</span>
      <div>
        <h1 className="font-bitcount text-8xl font-semibold leading-[60%]">
          Isaac
        </h1>
        <span className="text-lg">Software Engineer</span>
      </div>

      <p>
        I engineer software that scales, from Ai-powered products to
        cloud-native systems and everything in between. I care about craft:
        clean APIs, maintainable code, scalable architecture and user
        experiences that feel just right
      </p>

      <p>
        Currently on a side quest building on the edge of AI and the modern web,
        turning small ideas into production grade software, Whether it&apos;s
        crafting beautiful user experiences, designing a scalable backend to
        handle massive amounts of traffic, or shipping full-stack products end
        to end, I bring along the same standards I hold myself to.
      </p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <Link href="#">
          <span className="text-sm underline underline-offset-2 font-medium">
            Learn more about my experience
          </span>
        </Link>
        <div className="flex gap-2">
          <Link
            href="mailto:isaacshosanya89@gmail.com"
            className="text-sm px-2 py-1 shadow-sm border border-[#212529] rounded-lg flex items-center gap-2"
          >
            <Mail size={14} />
            Email me
          </Link>
          <Link
            href="https://drive.google.com/file/d/1NrYDrZ3RLgLwFV1gAYxx5Bv_mvGLH9zR/view?usp=drive_link"
            target="_blank"
            className="text-sm px-2 py-1 shadow-sm border border-[#212529] rounded-lg flex items-center gap-2"
          >
            <File size={14} />
            My resume
          </Link>
        </div>
      </div>
    </section>
  );
};
