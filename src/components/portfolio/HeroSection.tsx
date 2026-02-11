import { motion } from "framer-motion";
import { Download, Mail, ChevronDown } from "lucide-react";
import { useProfile } from "@/hooks/usePortfolioData";
import { portfolioData } from "@/data/portfolioData";
import SocialLinks from "./SocialLinks";

const HeroSection = () => {
  const { data: profile } = useProfile();

  const name = profile?.full_name || portfolioData.hero.headline;
  const title = profile?.title || portfolioData.hero.tagline;
  const subtitle = profile?.subtitle || portfolioData.hero.description;
  const photoUrl = profile?.photo_url;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero overflow-hidden pt-32">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--hero-foreground)) 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Accent glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full bg-primary/10 blur-[120px]" />
      <div className="absolute bottom-1/4 -left-32 w-72 h-72 rounded-full bg-primary/5 blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Profile photo with Definitive External Aura */}
          <div className="relative flex items-center justify-center mx-auto mb-12">
            {/* Double Layer Aura (Animated breathing effect) */}
            <motion.div
              animate={{
                opacity: [0.4, 0.9, 0.4],
                scale: [0.95, 1.05, 0.95]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              {/* Outer Soft Glow */}
              <div className="absolute w-64 h-64 bg-blue-500/40 blur-[40px] rounded-full" />
              {/* Inner Neon Ring */}
              <div className="absolute w-48 h-48 rounded-full shadow-[0_0_30px_rgba(59,130,246,0.8)]" />
            </motion.div>

            {/* Static Profile Photo */}
            <div
              className="relative w-48 h-48 rounded-full overflow-hidden border border-white/5 shadow-2xl z-10 bg-black"
            >
              <img
                src={photoUrl || "/OUSSAMA.jpg"}
                alt={name}
                className="w-full h-full object-cover object-[center_25%]"
              />
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-medium mb-4 tracking-wide uppercase text-sm"
          >
            {title}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-bold text-hero-foreground mb-6 leading-tight"
          >
            {name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-hero-muted text-lg sm:text-xl mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href={portfolioData.hero.cvUrl}
              download="Oubaha_Oussama.pdf"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 glow animate-pulse-subtle"
            >
              <Download size={18} />
              Télécharger CV
            </a>
            <a
              href={`mailto:${profile?.email || portfolioData.email}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-hero-foreground/20 text-hero-foreground font-medium hover:bg-hero-foreground/5 transition-all duration-300"
            >
              <Mail size={18} />
              Me contacter
            </a>
          </motion.div>

          <SocialLinks />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-hero-muted" size={24} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
