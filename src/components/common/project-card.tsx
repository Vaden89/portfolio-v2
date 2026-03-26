"use client";

import Image from "next/image";
import { useRef } from "react";
import Link from "next/link";
import { useInView, motion } from "motion/react";
import { useIsMobile } from "~/hooks/use-is-mobile";
import { Github, SquareArrowOutUpRight } from "lucide-react";
import { TechnologiesBlock } from "./technologies-block";

export const ProjectCard = ({
  name,
  category,
  description,
  image,
  technologies,
  live_url,
  github_url,
}: {
  name: string;
  image: string;
  category: string;
  live_url: string;
  github_url: string;
  description: string;
  technologies: string[];
}) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  const isInView = useInView(containerRef, {
    margin: "-45% 0px -40% 0px",
  });

  const animateState = isMobile ? (isInView ? "hover" : "rest") : "rest";

  return (
    <div
      ref={containerRef}
      className="w-full h-auto min-h-[470px] border border-primary-dark-gray font-montserrat "
    >
      <motion.div
        className="h-1/2 max-h-[224px] w-full shrink-0 overflow-hidden"
        initial="rest"
        animate={animateState}
        whileHover={isMobile ? undefined : "hover"}
      >
        <motion.div
          className="relative w-full h-full"
          variants={{
            rest: { filter: "grayscale(100%)" },
            hover: { filter: "grayscale(0%)" },
          }}
          transition={{ duration: isMobile ? 1 : 0.4, ease: "easeInOut" }}
        >
          <motion.div
            className="w-full h-full cursor-pointer"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.05 },
            }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            <Image
              fill
              src={image}
              className="object-cover"
              alt={`${name}-preview-image`}
            />
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="h-1/2 flex flex-col justify-between gap-2 p-3">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{name}</span>
            <span className="text-xs text-primary-gray">{category}</span>
          </div>
          <p className="h-fit flex-1 text-sm sm:text-[13px] text-primary-gray">
            {description}
          </p>
          <TechnologiesBlock technologies={technologies} />
        </div>
        <div className="border-t flex items-center justify-between pt-2">
          <Link href={live_url} target="_blank">
            <SquareArrowOutUpRight size={20} />
          </Link>

          {github_url && (
            <Link href={github_url} target="_blank">
              <Github color="white" size={20} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
