import IntroLoader from "@/components/IntroLoader";
import Hero from "@/components/Hero";
import WorkGallery from "@/components/WorkGallery";
import About from "@/components/About";
import WhatIDo from "@/components/WhatIDo";
import RecentProjects from "@/components/RecentProjects";
import Footer from "@/components/Footer";
import SectionNav from "@/components/SectionNav";

export default function Home() {
  return (
    <>
      <IntroLoader />
      <SectionNav />
      <Hero />
      <WorkGallery />
      <About />
      <WhatIDo />
      <RecentProjects />
      <Footer />
    </>
  );
}
