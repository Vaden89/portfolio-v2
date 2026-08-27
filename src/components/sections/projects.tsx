"use client";
import Link from "next/link";
import { useState } from "react";
import {
  motion,
  stagger,
  useMotionValue,
  AnimatePresence,
  type Variants,
} from "motion/react";
import { projects } from "~/data/projects";
import { useIsMobile } from "~/hooks/use-is-mobile";
import { ViewMoreLink } from "../common/view-more-link";
import Image from "next/image";

const projectsListVariant: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: stagger(0.2),
    },
  },
};

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

export const ProjectsSection = () => {
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
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
            name={project.name}
            link={project.link}
            image={project.image}
            description={project.description}
          />
        ))}
      </motion.div>
    </section>
  );
};

const ProjectPill = ({
  name,
  link,
  image,
  description,
}: {
  name: string;
  link: string;
  image: string;
  description: string;
}) => {
  const isMobile = useIsMobile();
  const [hovered, setHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const trackCursor = (e: React.MouseEvent<HTMLElement>) => {
    x.set(e.clientX + 20);
    y.set(e.clientY + 20);
  };

  return (
    <Link target="_blank" href={link} className="shrink-0 font-medium text-sm">
      <motion.div variants={projectVariant}>
        <motion.div
          initial="rest"
          animate="rest"
          whileHover="hover"
          onMouseEnter={
            isMobile
              ? undefined
              : (e) => {
                  trackCursor(e);
                  setHovered(true);
                }
          }
          onMouseMove={isMobile ? undefined : trackCursor}
          onMouseLeave={isMobile ? undefined : () => setHovered(false)}
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

      {!isMobile && (
        <AnimatePresence>
          {hovered && (
            <motion.div
              aria-hidden
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.39, 0.575, 0.565, 1] }}
              style={{ x, y }}
              className="pointer-events-none fixed top-0 left-0 z-50 overflow-hidden rounded"
            >
              <Image
                src={image}
                alt={name}
                className="h-[150px] w-[250px] object-cover object-top"
                width={250}
                height={150}
              />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </Link>
  );
};
