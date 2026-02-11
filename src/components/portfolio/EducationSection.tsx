import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, MapPin, Calendar } from "lucide-react";
import { useEducation } from "@/hooks/usePortfolioData";
import { portfolioData } from "@/data/portfolioData";

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: dbEducation } = useEducation();

  const items =
    dbEducation && dbEducation.length > 0
      ? dbEducation.map((e) => ({
        degree: e.degree,
        school: e.school,
        location: e.location || "",
        period: e.period,
        description: e.description || "",
      }))
      : portfolioData.education.items;

  return (
    <section id="education" className="py-24 section-alt">
      <div className="container mx-auto px-6">
        <div ref={ref} className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-12"
          >
            <div className="p-2 rounded-lg bg-primary/10">
              <GraduationCap className="text-primary" size={20} />
            </div>
            <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-blue-600 text-foreground">
              Formation
            </h2>
          </motion.div>

          <div className="space-y-8">
            {items.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.15 * (index + 1) }}
                className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    {item.period}
                  </span>
                  {item.location && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin size={12} />
                      {item.location}
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-xl font-bold text-foreground mb-1">
                  {item.degree}
                </h3>
                <p className="text-primary font-medium mb-4">{item.school}</p>
                {item.description && (
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
