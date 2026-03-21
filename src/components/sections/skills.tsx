import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { skills } from "~/data/skills";
import { ViewMoreLink } from "../common/view-more-link";

export const SkillsSection = () => {
  return (
    <section>
      <div className="w-full flex items-center justify-between">
        <h2 className="text-3xl font-bitcount">SKILLS</h2>
        <ViewMoreLink link="/skills" />
      </div>
      <div className="w-full flex flex-wrap gap-2 mt-2">
        {skills.map((skill, index) => {
          return <SkillPill skill={skill} key={index} />;
        })}
      </div>
    </section>
  );
};

const SkillPill = ({ skill }: { skill: string }) => {
  return (
    <span className="border-[#212529] px-2 py-1 border text-[13px] sm:text-xs text-primary-gray">
      {skill}
    </span>
  );
};
