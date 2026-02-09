import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { useExperiences } from "@/hooks/usePortfolioData";
import { portfolioData } from "@/data/portfolioData";

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: dbExperiences } = useExperiences();

  const experiences =
    dbExperiences && dbExperiences.length > 0
      ? dbExperiences.map((e) => ({
          role: e.role,
          company: e.company,
          location: e.location || "",
          period: e.period,
          type: e.type || "Stage",
          missions: Array.isArray(e.missions) ? (e.missions as string[]) : [],
        }))
      : portfolioData.experiences.items;

  return (
    <section id="experience" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div ref={ref} className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <Briefcase className="text-primary" size={20} />
            </div>
            <h2 className="font-heading text-3xl font-bold text-foreground">
              Expériences
            </h2>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * (index + 1) }}
                className="relative bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="absolute left-0 top-8 bottom-8 w-1 rounded-full bg-primary/60" />

                <div className="ml-4">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                      {exp.type}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      {exp.period}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                    {exp.role}
                  </h3>

                  <p className="text-muted-foreground font-medium flex items-center gap-2 mb-5">
                    {exp.company}
                    {exp.location && (
                      <span className="flex items-center gap-1 text-sm">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    )}
                  </p>

                  <ul className="space-y-3">
                    {exp.missions.map((mission, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-muted-foreground"
                      >
                        <CheckCircle2
                          className="text-primary mt-0.5 flex-shrink-0"
                          size={16}
                        />
                        <span className="text-sm leading-relaxed">{mission}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
