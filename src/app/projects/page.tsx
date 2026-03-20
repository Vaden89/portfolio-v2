import { HomeButton } from "~/components/common/home-btn";
import { PageHeader } from "~/components/common/page-header";
import { Footer } from "~/components/sections/footer";

export default function ProjectsPage() {
  return (
    <main className="flex flex-col gap-5">
      <HomeButton />
      <PageHeader
        title="Projects"
        subtitle="A curated collection of projects, tools and open source contributions I've worked on."
      />
      <div className="w-full h-[70vh]"></div>
      <Footer />
    </main>
  );
}
