import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User } from "lucide-react";
import { useProfile } from "@/hooks/usePortfolioData";
import { portfolioData } from "@/data/portfolioData";
import ScrollReveal from "@/components/ui/ScrollReveal";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: profile } = useProfile();

  const aboutText = profile?.about_text || portfolioData.about.paragraphs.join("\n\n");
  const paragraphs = aboutText.split("\n\n").filter((p) => p.trim());

  return (
    <>
      <section id="about" className="section-fade-top py-24">
        <div className="container mx-auto px-6">
          <div ref={ref} className="max-w-3xl mx-auto">
            <ScrollReveal direction="up" delay={0}>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-lg bg-primary/10">
                  <User className="text-primary" size={20} />
                </div>
                <h2 className="font-heading text-3xl font-bold text-foreground">
                  À Propos
                </h2>
              </div>
            </ScrollReveal>

            <div className="space-y-5">
              {paragraphs.map((paragraph, index) => (
                <ScrollReveal key={index} direction="up" delay={index * 0.1}>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {paragraph}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
