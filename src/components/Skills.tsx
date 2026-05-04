import React from 'react';
import { motion } from 'framer-motion';
import { SkillIcon } from './SkillIcon/SkillIcon';
import { SKILL_DATA } from '../constants/skillIcons';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative py-32">
      {/* Huge Ghost Text */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 select-none font-display text-[15vw] font-black text-white/[0.02]">
        SKILLS
      </div>

      <div className="container relative z-10 px-6">
        <div className="mb-20 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-bold text-white md:text-6xl"
          >
            Mes <span className="text-gradient">Compétences</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-2xl text-muted-foreground"
          >
            Un aperçu des technologies et outils que j'utilise pour donner vie à des projets web innovants.
          </motion.p>
        </div>

        <div className="flex flex-wrap justify-center gap-8">
          {SKILL_DATA.map((skill) => (
            <SkillIcon key={skill.name} {...skill} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
