import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";

// Lazy load below-fold sections
const About        = lazy(() => import("@/components/About"));
const Skills       = lazy(() => import("@/components/Skills/Skills").then(m => ({ default: m.Skills })));
const Projects     = lazy(() => import("@/components/Projects"));
const Experience   = lazy(() => import("@/components/Experience"));
const Formation    = lazy(() => import("@/components/Formation"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const Contact      = lazy(() => import("@/components/Contact"));
const Footer       = lazy(() => import("@/components/Footer"));

const SectionFallback = () => <div className="py-16" />;

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Formation />
          <Testimonials />
          <Contact />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
