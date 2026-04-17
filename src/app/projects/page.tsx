import { projects } from "~/data/projects";
import { Footer } from "~/components/sections/footer";
import { HomeButton } from "~/components/common/home-btn";
import { PageHeader } from "~/components/common/page-header";
import { ProjectCard } from "~/components/common/project-card";

export default function ProjectsPage() {
  return (
    <main className="flex flex-col gap-5">
      <HomeButton />
      <PageHeader
        title="Projects"
        subtitle="A curated collection of projects, tools and open source contributions I've worked on."
      />
      <div className="columns-1 sm:columns-2 gap-4">
        {projects.map((project, index) => (
          <div key={index} className="break-inside-avoid mb-4">
            <ProjectCard
              name={project.name}
              image={project.image}
              github_url={project.github}
              category={project.category}
              live_url={project.live_link}
              description={project.description}
              technologies={project.technologies}
            />
          </div>
        ))}
      </div>
      <Footer />
    </main>
  );
}
