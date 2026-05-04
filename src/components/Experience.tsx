import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, MapPin } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

const ExperienceEntry: React.FC<{
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  missions: string[];
  index: number;
}> = ({ role, company, location, period, type, missions, index }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`mb-20 flex w-full items-center justify-between ${isEven ? 'flex-row-reverse' : ''}`}>
      <div className="hidden w-5/12 lg:block" />
      
      {/* Timeline Dot */}
      <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background border-2 border-primary shadow-[0_0_15px_rgba(59,130,246,0.5)]">
        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
      </div>

      {/* Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="glass-morphism w-full rounded-3xl p-8 lg:w-5/12"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">{period}</span>
          <span className="text-xs font-bold uppercase tracking-widest text-secondary bg-secondary/10 px-3 py-1 rounded-full">{type}</span>
        </div>
        <h3 className="mb-2 font-display text-2xl font-bold text-white">{role}</h3>
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm font-medium text-secondary">
          <span className="flex items-center gap-1">
            <Briefcase size={16} />
            {company}
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <MapPin size={16} />
            {location}
          </span>
        </div>
        <ul className="space-y-2">
          {missions.map((mission, idx) => (
            <li key={idx} className="text-sm leading-relaxed text-muted-foreground flex items-start">
              <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/50 flex-shrink-0" />
              <span>{mission}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

const Experience: React.FC = () => {
  const experiences = portfolioData.experiences.items;
  const titleParts = portfolioData.experiences.title.split(' ');
  const titleFirst = titleParts[0];
  const titleRest = titleParts.slice(1).join(' ');

  return (
    <section id="experience" className="py-32">
      <div className="container px-6">
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-white md:text-6xl"
          >
            {titleFirst} {titleRest && <span className="text-gradient">{titleRest}</span>}
            {!titleRest && <span className="text-gradient"></span>}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-muted-foreground"
          >
            Les étapes clés de mon parcours et de mes réalisations techniques.
          </motion.p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          {/* Vertical Line */}
          <div className="absolute left-5 top-0 h-full w-[2px] bg-gradient-to-b from-primary via-secondary to-transparent lg:left-1/2 lg:-translate-x-1/2" />
          
          <div className="flex flex-col items-center">
            {experiences.map((exp, i) => (
              <ExperienceEntry key={exp.id} {...exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
