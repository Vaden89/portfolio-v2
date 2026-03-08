import { Footer } from "~/components/sections/footer";
import { HeroSection } from "~/components/sections/hero";
import { SkillsSection } from "~/components/sections/skills";
import { SocialsSection } from "~/components/sections/socials";
import { WorkSection } from "~/components/sections/work";

export default function Home() {
  return (
    <main className="flex flex-col gap-10 sm:gap-16 ">
      <HeroSection />
      <SkillsSection />
      <WorkSection />
      <SocialsSection />
      <Footer />
    </main>
  );
}
