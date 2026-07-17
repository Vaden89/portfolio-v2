"use client";
import Link from "next/link";
import { motion, stagger, type Variants } from "motion/react";
import { projects } from "~/data/projects";
import { ViewMoreLink } from "../common/view-more-link";

const projectsListVariant: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: stagger(0.2),
    },
  },
};

export const ProjectsSection = () => {
  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="font-bitcount text-3xl">Projects</h2>
        <ViewMoreLink link="/projects" />
      </div>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={projectsListVariant}
      >
        {projects.map((project, index) => (
          <ProjectPill
            key={index}
            description={project.description}
            name={project.name}
            link={project.link}
          />
        ))}
      </motion.div>
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
  const underlineVariant: Variants = {
    rest: { width: 0 },
    hover: { width: "100%" },
  };

  const projectVariant: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.45, ease: "easeOut" },
    },
  };

  return (
    <Link target="_blank" href={link} className="shrink-0 font-medium text-sm">
      <motion.div variants={projectVariant}>
        <motion.div
          initial="rest"
          animate="rest"
          whileHover="hover"
          className="w-full flex items-center gap-4 py-1 font-montserrat"
        >
          <div className="flex flex-col shrink-0">
            {name}

            <motion.div
              variants={underlineVariant}
              transition={{ duration: 0.5 }}
              className="h-0.5 bg-white"
            />
          </div>

          <p className="truncate text-primary-gray text-[13px]">
            {description}
          </p>
        </motion.div>
      </motion.div>
    </Link>
  );
};
