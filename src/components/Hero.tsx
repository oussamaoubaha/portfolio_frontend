import React from 'react';
import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { SocialIcon } from './SocialIcon/SocialIcon';
import { SOCIAL_LINKS } from '../constants/socialLinks';

const HexagonGrid: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden opacity-20 [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)]">
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="hexagons"
            width="50"
            height="43.4"
            patternUnits="userSpaceOnUse"
            patternTransform="scale(2)"
          >
            <path
              d="M25 0.7735026918962576L46.65063509461097 13.273502691896258L46.65063509461097 38.27350269189626L25 50.77350269189626L3.349364905389033 38.27350269189626L3.349364905389033 13.273502691896258Z"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-primary/30"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hexagons)" />
      </svg>
    </div>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <HexagonGrid />

      {/* Glowing Blobs */}
      <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/20 blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-secondary/20 blur-[120px] animate-pulse delay-1000" />

      <div className="container relative z-10 px-6 text-center">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/5 px-4 py-2 text-xs font-semibold text-green-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
          </span>
          {/* DISPONIBLE POUR STAGE */}
          Disponible pour de nouveaux projets
        </motion.div>

        {/* Profile Image with Ring */}
        <div
          className="relative mx-auto mb-10 h-32 w-32"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary p-[2px] animate-spin-slow">
            <div className="h-full w-full rounded-full bg-background" />
          </div>
          <img
            src="/OUSSAMA.webp"
            alt="Oussama Oubaha"
            width={120}
            height={120}
            // @ts-ignore - HTML attribute must be lowercase
            fetchpriority="high"
            loading="eager"
            decoding="sync"
            className="absolute inset-[4px] h-[calc(100%-8px)] w-[calc(100%-8px)] rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-4 text-xs font-bold uppercase tracking-[0.4em] text-muted-foreground"
        >
          Développeur Full Stack Junior
        </motion.p>

        {/* Name */}
        <h1 className="mb-6 font-display text-6xl font-bold tracking-tight text-white md:text-8xl lg:text-9xl">
          Oussama <span className="text-gradient">Oubaha</span>
        </h1>

        {/* Typed Roles */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8 h-8 text-xl font-medium text-foreground/80 md:text-2xl"
        >
          <Typewriter
            words={[
              'Étudiant en Génie Informatique',
              'Développeur Full Stack',
              'Passionné de React & Laravel',
              'Créateur d\'expériences web'
            ]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            deleteSpeed={50}
            delaySpeed={2000}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-bold text-black transition-all hover:scale-105"
          >
            Voir mes projets
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-bold backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-105"
          >
            Me contacter
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mt-12 flex items-center justify-center gap-6"
        >
          {SOCIAL_LINKS.map((social) => (
            <SocialIcon key={social.name} {...social} />
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-[10px] font-bold uppercase tracking-widest">Scroll</span>
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
