import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Download } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { portfolioData } from "@/data/portfolioData";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [active, setActive] = useState<string>("#");
  const navItems = useMemo(
    () => [
      { label: "À Propos", href: "#about" },
      { label: "Compétences", href: "#skills" },
      { label: "Projets", href: "#projects" },
      { label: "Expériences", href: "#experience" },
      { label: "Formation", href: "#education" },
      { label: "Avis", href: "#feedback" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  useEffect(() => {
    const ids = navItems.map((n) => n.href.replace("#", "")).filter(Boolean);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActive(`#${visible.target.id}`);
      },
      { root: null, threshold: [0.2, 0.35, 0.5], rootMargin: "-20% 0px -65% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [navItems]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[rgba(8,12,20,0.55)] backdrop-blur-xl border-b border-white/10">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group" data-cursor="link" aria-label="Accueil">
          <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-primary/5 border border-primary/10 group-hover:border-primary/30 transition-all duration-300 overflow-hidden shadow-lg shadow-primary/5">
            <img
              src="/images/Logo_oubaha.jpg"
              alt="Oussama Oubaha Logo"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="eager"
              decoding="async"
            />
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
            Oussama
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={[
                    "text-sm transition-colors duration-300 underline-anim",
                    active === item.href ? "text-hero-foreground" : "text-hero-muted hover:text-hero-foreground",
                  ].join(" ")}
                  data-cursor="link"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href={portfolioData.hero.cvUrl}
            download="Oubaha_Oussama.pdf"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition"
            data-cursor="link"
            data-magnetic
          >
            <Download size={16} className="text-[var(--color-primary-light)]" />
            <span className="text-sm text-hero-foreground">Télécharger CV</span>
          </a>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-hero-foreground/10 text-hero-muted hover:text-hero-foreground transition-colors"
            aria-label="Changer de thème"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>

        {/* Mobile controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 text-hero-muted hover:text-hero-foreground transition-colors"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            className="text-hero-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
            data-cursor="link"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden bg-[rgba(8,12,20,0.9)] border-t border-white/10"
          >
            <ul className="flex flex-col px-6 py-6 gap-5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={[
                      "text-base transition-colors duration-300",
                      active === item.href ? "text-hero-foreground" : "text-hero-muted hover:text-hero-foreground",
                    ].join(" ")}
                    data-cursor="link"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={portfolioData.hero.cvUrl}
                  download="Oubaha_Oussama.pdf"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex w-full items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-medium"
                >
                  <Download size={18} />
                  Télécharger CV
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
