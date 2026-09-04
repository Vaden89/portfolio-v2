import Image from "next/image";
import { HomeButton } from "~/components/common/home-btn";
import { PageHeader } from "~/components/common/page-header";
import { SoftSkillBlock } from "~/components/common/soft-skill";
import { Footer } from "~/components/sections/footer";
import {
  coreLangs,
  databaseAndDataTools,
  developmentTools,
  frameWorksAndLibraries,
  softSkills,
} from "~/data/skills";

export default function SkillsPage() {
  return (
    <main className="flex flex-col gap-5">
      <HomeButton />
      <PageHeader
        title="Skills"
        subtitle="A curated collection of technologies, tools, and practices I use to deliver clean, reliable, and innovative software."
      />
      <section className="flex flex-col gap-4">
        <ContentBlock
          header="Programming Languages"
          subHeader="Core languages I rely on to write maintainable, performant, and scalable code."
        >
          <div className="flex flex-wrap gap-4">
            {coreLangs.map((lang, index) => (
              <ProgrammingLanguageBlock
                key={index}
                icon={lang.icon}
                name={lang.name}
              />
            ))}
          </div>
        </ContentBlock>
        <ContentBlock
          header="Soft Skills"
          subHeader="The interpersonal and organizational skills that drive effective collaboration and delivery."
        >
          <div className="w-full grid sm:grid-cols-3 grid-cols-2 gap-3">
            {softSkills.map((skill, index) => (
              <SoftSkillBlock key={index} skill={skill} />
            ))}
          </div>
        </ContentBlock>
        <ContentBlock
          header="Libraries & Frameworks"
          subHeader="Frameworks and libraries that speed up development and provide structure."
        >
          <div className="flex flex-wrap gap-4">
            {frameWorksAndLibraries.map((lang, index) => (
              <ProgrammingLanguageBlock
                key={index}
                icon={lang.icon}
                name={lang.name}
              />
            ))}
          </div>
        </ContentBlock>
        <ContentBlock
          header="Databases & Data Tools"
          subHeader="SQL, NoSQL, caching, and ORM tools for robust, high-performance data management."
        >
          <div className="flex flex-wrap gap-4">
            {databaseAndDataTools.map((lang, index) => (
              <ProgrammingLanguageBlock
                key={index}
                icon={lang.icon}
                name={lang.name}
              />
            ))}
          </div>
        </ContentBlock>
        <ContentBlock
          header="IDEs & Development Tools"
          subHeader="Editors, AI Tools, and utilities that streamline workflows and boost my development productivity"
        >
          <div className="flex flex-wrap gap-4">
            {developmentTools.map((tool, index) => (
              <ProgrammingLanguageBlock
                key={index}
                icon={tool.icon}
                name={tool.name}
              />
            ))}
          </div>
        </ContentBlock>
      </section>
      <Footer />
    </main>
  );
}

const ContentBlock = ({
  header,
  subHeader,
  children,
}: {
  header: string;
  subHeader?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div className="p-4 flex flex-col gap-4 border font-montserrat">
      <div>
        <h2 className="text-sm font-medium">{header}</h2>
        {subHeader && (
          <h3 className="text-primary-gray text-xs">{subHeader}</h3>
        )}
      </div>
      {children}
    </div>
  );
};

const ProgrammingLanguageBlock = ({
  icon,
  name,
}: {
  icon: string;
  name: string;
}) => {
  return (
    <div className="flex items-center gap-2 border p-2">
      <Image
        src={icon}
        width={18}
        height={18}
        alt=""
        className="invert dark:invert-0"
      />
      <span className="text-[13px] font-medium">{name}</span>
    </div>
  );
};
