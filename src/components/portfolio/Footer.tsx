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
    <footer id="footer" className="bg-hero py-20">
      <div className="container mx-auto px-6">
        <div ref={ref} className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="glass-card p-8 mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-hero-foreground mb-3">
                Merci de votre visite.
              </h2>
              <p className="text-hero-muted text-lg">
                Vous pouvez me contacter à tout moment — je suis ouvert aux opportunités de stage et aux projets web.
              </p>
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4 text-left">
                <span className="text-xs text-hero-muted label-tag">console</span>
                <pre className="mt-2 text-sm text-hero-foreground/90 overflow-x-auto custom-scrollbar">
{`const developer = "${portfolioData.name}";`}
                </pre>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 text-hero-muted hover:text-hero-foreground transition-colors"
                data-cursor="link"
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
              data-cursor="link"
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
