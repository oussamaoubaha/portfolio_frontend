import React from 'react';
import { motion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../../constants/skillCategories';
import './Skills.css';

export function Skills() {
  return (
    <section id="skills" className="skills-section relative py-32 overflow-hidden">
      <div className="container relative z-10 px-6">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-[0.4em] text-primary"
          >
            MES COMPÉTENCES
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 font-display text-4xl font-bold text-white md:text-6xl"
          >
            Mon <span className="text-gradient">Savoir-Faire</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-muted-foreground"
          >
            Un aperçu des technologies et outils que j'utilise pour donner vie à des projets web innovants.
          </motion.p>
        </div>

        {/* Cards Grid Container */}
        <div className="skills-grid-container grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, index) => (
            <SkillCard 
              key={category.id} 
              category={category} 
              animationDelay={index * 0.1} 
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCard({ category, animationDelay }: { category: any, animationDelay: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: animationDelay, duration: 0.5 }}
      className="skill-card"
      style={{ 
        "--accent": category.accentColor, 
        "--accent-faint": category.accentColor + "18",
      } as React.CSSProperties}
    >
      <div className="card-header">
        <span className="card-emoji">{category.icon}</span>
        <span className="card-label">{category.label}</span>
      </div>

      <div className="skills-grid">
        {category.skills.map((skill: any) => (
          <SkillItem key={skill.name} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
}

function SkillItem({ skill }: { skill: any }) {
  return (
    <div 
      className="skill-item" 
      style={{ 
        "--skill-color": skill.color, 
        "--skill-glow": skill.glow,
      } as React.CSSProperties}
    >
      <skill.icon className="skill-icon" />
      <span className="skill-name">{skill.name}</span>
    </div>
  );
}
