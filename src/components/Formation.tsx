import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, MapPin } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

const FormationCard: React.FC<{
  degree: string;
  school: string;
  location: string;
  period: string;
  description: string;
  index: number;
}> = ({ degree, school, location, period, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-morphism relative overflow-hidden rounded-3xl p-8"
    >
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10 text-secondary">
        <GraduationCap size={28} />
      </div>
      
      <span className="mb-4 inline-block rounded-full bg-secondary/10 px-4 py-1 text-xs font-bold text-secondary">
        {period}
      </span>
      
      <h3 className="mb-2 font-display text-2xl font-bold text-white">{degree}</h3>
      <div className="mb-4 flex flex-col gap-1">
        <p className="font-medium text-foreground/80">{school}</p>
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <MapPin size={14} />
          {location}
        </p>
      </div>
      <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      
      {/* Decorative Gradient */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-secondary/5 blur-3xl" />
    </motion.div>
  );
};

const Formation: React.FC = () => {
  const formations = portfolioData.education.items;

  return (
    <section id="formation" className="py-32 section-alt">
      <div className="container px-6">
        <div className="mb-20">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-white md:text-6xl"
          >
            Ma <span className="text-gradient">Formation</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 max-w-2xl text-muted-foreground"
          >
            Mon parcours académique et mes certifications qui m'ont permis d'acquérir les bases solides nécessaires à mon métier.
          </motion.p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {formations.map((form, i) => (
            <FormationCard key={form.id} {...form} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Formation;
