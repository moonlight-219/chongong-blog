import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { ShowcaseCarousel } from "@/components/ShowcaseCarousel";
// import { UploadButton } from "@/components/UploadButton";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <ShowcaseCarousel />
      {/* <UploadButton /> */}
    </>
  );
}
