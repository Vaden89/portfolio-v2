"use client";
import Link from "next/link";
import { motion } from "motion/react";
import { projects } from "~/data/projects";
import { ViewMoreLink } from "../common/view-more-link";

export const ProjectsSection = () => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="font-bitcount text-3xl">Projects</h2>
        <ViewMoreLink link="/projects" />
      </div>
      <div>
        {projects.map((project, index) => (
          <ProjectPill
            key={index}
            description={project.description}
            name={project.name}
            link={project.link}
          />
        ))}
      </div>
    </section>
  );
};

const ProjectPill = ({
  name,
  link,
  description,
}: {
  name: string;
  link: string;
  description: string;
}) => {
  const underlineVariant = {
    initial: { width: 0 },
    hover: { width: "100%" },
    transition: { duration: 0.5 },
  };

  return (
    <div className="w-full flex items-center gap-4 py-1 font-montserrat">
      <motion.div
        initial="initial"
        whileHover="hover"
        className="flex flex-col"
      >
        <Link
          target="_blank"
          href={link}
          className="shrink-0 font-medium text-sm"
        >
          {name}
        </Link>
        <motion.div variants={underlineVariant} className="h-0.5 bg-white" />
      </motion.div>
      <p className="truncate text-[#ced4da] text-[13px]">{description}</p>
    </div>
  );
};
