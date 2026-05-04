import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const About: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const stats = [
    { label: 'Projets Complétés', value: 15, suffix: '+' },
    { label: 'Technologies', value: 20, suffix: '+' },
    { label: 'Mois d\'Expérience', value: 12, suffix: '+' },
  ];

  const text = "Je suis un développeur Full Stack passionné par la création d'interfaces numériques exceptionnelles. Actuellement étudiant de l'EST à l'UMP Oujda en Conception et Développement de Logiciels (CDL), je mets mes compétences au service de projets innovants en tant que stagiaire .";
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <div className="container px-6">
        <div className="grid gap-20 lg:grid-cols-2">
          {/* Left Side: Text Reveal */}
          <div ref={ref}>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              className="mb-8 text-xs font-bold uppercase tracking-[0.4em] text-primary"
            >
              À Propos de Moi
            </motion.h2>

            <div className="flex flex-wrap gap-x-3 gap-y-4">
              {text.split(' ').map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.03,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="font-display text-3xl font-medium leading-tight text-white md:text-5xl"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Right Side: Stats & Facts */}
          <div className="flex flex-col justify-center">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="glass-morphism rounded-3xl p-8"
                >
                  <div className="mb-2 font-display text-5xl font-bold text-gradient">
                    {inView ? (
                      <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                    ) : (
                      '0'
                    )}
                  </div>
                  <div className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary p-8 text-white"
              >
                <div className="relative z-10 text-xl font-bold">
                  Toujours prêt pour de nouveaux défis.
                </div>
                <div className="relative z-10 mt-4 text-sm font-medium opacity-80">
                  Basé à Oujda, Maroc, disponible pour stage.
                </div>
                {/* Decorative circle */}
                <div className="absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-white/10 blur-2xl transition-transform group-hover:scale-150" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
