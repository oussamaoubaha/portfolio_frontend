import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { User } from "lucide-react";
import { useProfile } from "@/hooks/usePortfolioData";
import { portfolioData } from "@/data/portfolioData";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: profile } = useProfile();

  const aboutText = profile?.about_text || portfolioData.about.paragraphs.join("\n\n");
  const paragraphs = aboutText.split("\n\n").filter((p) => p.trim());

  return (
    <section id="about" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div ref={ref} className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <User className="text-primary" size={20} />
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              À Propos
            </h2>
          </motion.div>

          <div className="space-y-5">
            {paragraphs.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                className="text-muted-foreground leading-relaxed text-lg"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
