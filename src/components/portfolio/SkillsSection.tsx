import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code, Globe, Database, Server } from "lucide-react";
import { useSkillCategories } from "@/hooks/usePortfolioData";
import { portfolioData } from "@/data/portfolioData";

const iconMap: Record<string, React.ElementType> = {
  code: Code,
  globe: Globe,
  database: Database,
  server: Server,
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { data: dbCategories } = useSkillCategories();

  // Use DB data if available, otherwise fallback to static data
  const categories =
    dbCategories && dbCategories.length > 0
      ? dbCategories.map((c) => ({
        name: c.name,
        icon: c.icon,
        items: (c.skills || [])
          .sort((a: any, b: any) => a.display_order - b.display_order)
          .map((s: any) => s.name),
      }))
      : portfolioData.skills.categories;

  return (
    <section id="skills" className="py-24 section-alt">
      <div className="container mx-auto px-6">
        <div ref={ref} className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-slate-900 dark:text-white text-3xl font-bold">
              Compétences
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => {
              const Icon = iconMap[category.icon] || Code;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="bg-card rounded-xl p-6 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="p-3 rounded-lg bg-primary/10 w-fit mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="text-primary" size={22} />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-4">
                    {category.name}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-muted-foreground flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
