import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Linkedin } from 'lucide-react';
import { portfolioData } from '@/data/portfolioData';

const TestimonialCard: React.FC<{
  name: string;
  role: string;
  content: string;
  avatar: string;
  linkedin: string;
  index: number;
}> = ({ name, role, content, avatar, linkedin, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="glass-morphism relative rounded-3xl p-8 flex flex-col h-full"
    >
      <Quote size={40} className="absolute top-6 right-8 text-primary/10" />
      
      <p className="mb-8 text-lg leading-relaxed text-foreground/80 italic flex-grow">
        "{content}"
      </p>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 overflow-hidden rounded-full border border-primary/20 bg-primary/5">
            <img src={avatar} alt={name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-white">{name}</p>
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {role}
            </p>
          </div>
        </div>
        {linkedin && linkedin !== '#' && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-[#0A66C2] transition-colors p-2"
            title={`Profil LinkedIn de ${name}`}
            aria-label={`Visiter le profil LinkedIn de ${name}`}
          >
            <Linkedin size={20} />
          </a>
        )}
      </div>
    </motion.div>
  );
};

const Testimonials: React.FC = () => {
  const reviews = portfolioData.testimonials?.items || [];
  const titleParts = (portfolioData.testimonials?.title || "Ce qu'ils disent").split(' ');
  const titleFirst = titleParts.slice(0, 2).join(' '); // "Ce qu'ils"
  const titleRest = titleParts.slice(2).join(' '); // "disent"

  if (reviews.length === 0) return null;

  return (
    <section id="avis" className="py-32">
      <div className="container px-6">
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-white md:text-6xl"
          >
            {titleFirst} <span className="text-gradient">{titleRest}</span>
          </motion.h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {reviews.map((review, i) => (
            <TestimonialCard key={i} {...review} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
