import { motion } from "framer-motion";
import { Download, Mail, ChevronDown } from "lucide-react";
import { useProfile } from "@/hooks/usePortfolioData";
import { portfolioData } from "@/data/portfolioData";

const HeroSection = () => {
  const { data: profile } = useProfile();

  const name = profile?.full_name || portfolioData.hero.headline;
  const title = profile?.title || portfolioData.hero.tagline;
  const subtitle = profile?.subtitle || portfolioData.hero.description;
  const photoUrl = profile?.photo_url;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-hero overflow-hidden">
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
          {/* Profile photo */}
          {photoUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-8 w-32 h-32 aspect-square rounded-full overflow-hidden border-4 border-primary/20 shadow-xl shadow-primary/20"
            >
              <img
                src={photoUrl}
                alt={name}
                className="w-full h-full object-cover object-[center_20%]"
              />
            </motion.div>
          )}

          {!photoUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mx-auto mb-8 w-32 h-32 aspect-square rounded-full overflow-hidden border-4 border-primary/20 shadow-xl shadow-primary/20 bg-primary/10"
            >
              <img
                src="/OUSSAMA.jpg"
                alt={name}
                className="w-full h-full object-cover object-[center_20%]"
              />
            </motion.div>
          )}

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
              href="/Oubaha_Oussama.pdf"
              download="Oubaha_Oussama.pdf"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all duration-300 glow"
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
