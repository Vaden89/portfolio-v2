"use client";
import { ChevronsDownUp, ChevronsUpDown, CodeXml } from "lucide-react";
import { HomeButton } from "~/components/common/home-btn";
import { work } from "~/data/work";
import { ReactNode, useState } from "react";
import { AnimatePresence, motion, Variants } from "motion/react";
import { Footer } from "~/components/sections/footer";
import { PageHeader } from "~/components/common/page-header";
import { TechnologiesBlock } from "~/components/common/technologies-block";
import Image from "next/image";

export default function WorkPage() {
  const currentRoles = work.filter((role) => role.endDate === "Present");
  const previousRoles = work.filter((role) => role.endDate !== "Present");

  return (
    <main className="flex flex-col gap-5">
      <HomeButton />
      <PageHeader
        title="My Experience"
        subtitle="My professional Journey and the amazing teams I'm proud to have been a part of."
      />
      <ContentBlock heading="CURRENT">
        <div className="flex flex-col gap-4">
          {currentRoles.map((job, index) => {
            return (
              <CareerBlock
                key={index}
                role={job.role}
                location="Remote"
                image={job.image}
                endDate={job.endDate}
                company={job.employer}
                startDate={job.startDate}
                description={job.description}
                technologies={job.technologies}
              />
            );
          })}
        </div>
      </ContentBlock>
      <ContentBlock heading="PREVIOUS">
        <div className="flex flex-col gap-4">
          {previousRoles.map((job, index) => {
            return (
              <CareerBlock
                key={index}
                role={job.role}
                location="Remote"
                image={job.image}
                endDate={job.endDate}
                company={job.employer}
                startDate={job.startDate}
                description={job.description}
                technologies={job.technologies}
              />
            );
          })}
        </div>
      </ContentBlock>
      <Footer />
    </main>
  );
}

interface CareerBlockProps {
  role: string;
  image?: string;
  company: string;
  endDate: string;
  location: string;
  startDate: string;
  description: string[];
  technologies: string[];
}

const CareerBlock = ({
  company,
  role,
  startDate,
  endDate,
  location,
  description,
  technologies,
  image,
}: CareerBlockProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const containerVariants = {
    hidden: { height: 0, overflow: "hidden" },
    visible: {
      height: "auto",
      overflow: "hidden",
      transition: {
        height: { duration: description.length > 3 ? 0.8 : 0.3 },
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      animate={{ height: "100%" }}
      className={`w-full flex flex-col gap-3 border p-4 font-montserrat`}
    >
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center dark:bg-[#101113] border border-[#343a40/20] rounded-sm text-primary-gray text-sm font-semibold">
            {image ? (
              <Image
                src={image}
                alt={company}
                className="w-5 h-5 object-contain "
                width={24}
                height={24}
              />
            ) : (
              company.charAt(0).toUpperCase()
            )}
          </div>
          <span className="font-semibold">{company}</span>
        </div>
        {endDate === "Present" && (
          <div className="flex items-center gap-2 text-xs">
            <span className="w-2 h-2 bg-emerald-500 rounded-full" />
            <span>Now</span>
          </div>
        )}
      </div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between"
      >
        <div className="flex items-start gap-2">
          <div className="p-1 rounded-md bg-primary-dark-gray text-primary-gray border-t border-l">
            <CodeXml size={14} />
          </div>
          <div className="flex flex-col">
            <span className="w-fit text-sm">{role}</span>
            <div className="flex text-xs gap-2 items-center text-primary-gray">
              <span>{location}</span> |{" "}
              <span>
                {startDate} - {endDate}
              </span>
            </div>
          </div>
        </div>
        <span className="text-primary-gray">
          {isOpen ? <ChevronsDownUp size={16} /> : <ChevronsUpDown size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="-mt-3 flex flex-col gap-2 px-4 sm:px-8"
          >
            <>
              {description.map((desc, index) => (
                <JDBlock key={index} index={index} jobDescription={desc} />
              ))}
              <TechnologiesBlock technologies={technologies} />
            </>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const JDBlock = ({
  jobDescription,
  index,
}: {
  jobDescription: string;
  index: number;
}) => {
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={`flex gap-2 items-start ${index === 0 && "mt-3"}`}
    >
      <div className="w-1.5 h-1.5 rounded-full bg-gray-700 shrink-0 mt-1.5" />
      <p className="text-sm">{jobDescription}</p>
    </motion.div>
  );
};

const ContentBlock = ({
  heading,
  children,
}: {
  heading: string;
  children: ReactNode;
}) => {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="capitalize text-sm text-primary-gray font-semibold font-montserrat">
        {heading}
      </h2>
      {children}
    </section>
  );
};
