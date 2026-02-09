import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, MapPin, ArrowUp } from "lucide-react";
import { useProfile } from "@/hooks/usePortfolioData";
import { portfolioData } from "@/data/portfolioData";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { data: profile } = useProfile();

  const email = profile?.email || portfolioData.email;
  const location = profile?.location || portfolioData.location;
  const name = profile?.full_name || portfolioData.name;

  return (
    <footer id="contact" className="bg-hero py-20">
      <div className="container mx-auto px-6">
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-3xl font-bold text-hero-foreground mb-4">
              Me contacter
            </h2>
            <p className="text-hero-muted mb-8 text-lg">
              N'hésitez pas à me contacter pour discuter de vos projets ou
              d'une opportunité de stage.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-hero-muted hover:text-hero-foreground transition-colors"
              >
                <Mail size={18} className="text-primary" />
                {email}
              </a>
              <span className="flex items-center gap-2 text-hero-muted">
                <MapPin size={18} className="text-primary" />
                {location}
              </span>
            </div>
          </motion.div>

          <div className="border-t border-hero-foreground/10 pt-8 flex items-center justify-between">
            <p className="text-sm text-hero-muted">
              © {new Date().getFullYear()} {name}. Tous droits réservés.
            </p>
            <a
              href="#"
              className="p-2 rounded-lg border border-hero-foreground/10 text-hero-muted hover:text-hero-foreground hover:border-hero-foreground/20 transition-all"
              aria-label="Retour en haut"
            >
              <ArrowUp size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
