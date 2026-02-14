import Navbar from "@/components/portfolio/Navbar";
import HeroSection from "@/components/portfolio/HeroSection";
import AboutSection from "@/components/portfolio/AboutSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import ProjectGrid from "@/components/portfolio/ProjectGrid";
import ExperienceSection from "@/components/portfolio/ExperienceSection";
import EducationSection from "@/components/portfolio/EducationSection";
import FeedbackSection from "@/components/portfolio/FeedbackSection";
import ChatOrb from "@/components/portfolio/ChatOrb";
import Footer from "@/components/portfolio/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectGrid />
      <ExperienceSection />
      <EducationSection />
      <FeedbackSection />
      <Footer />
      <ChatOrb />
    </div>
  );
};

export default Index;
