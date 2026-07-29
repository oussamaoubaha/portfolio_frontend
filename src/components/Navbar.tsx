import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Download, Moon, Sun } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'À Propos', href: '#about' },
    { name: 'Compétences', href: '#skills' },
    { name: 'Projets', href: '#projects' },
    { name: 'Expériences', href: '#experience' },
    { name: 'Formation', href: '#formation' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Handle visibility on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // Handle background glass effect
      setIsScrolled(currentScrollY > 20);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed left-1/2 top-6 z-[100] w-[90%] max-w-5xl -translate-x-1/2 transition-all duration-500 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-20 opacity-0'
        }`}
    >
      <div className={`flex items-center justify-between rounded-full border border-white/10 px-6 py-3 transition-all duration-300 ${isScrolled ? 'bg-background/40 backdrop-blur-xl' : 'bg-transparent'
        }`}>
        {/* Logo */}
        <a href="#" className="text-2xl font-bold tracking-tighter">
          <span className="text-gradient">OO</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="group relative text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-primary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA & Actions */}
        <div className="flex items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/Oubaha_Oussama_CV.pdf"
            className="hidden items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-primary/20 lg:flex"
          >
            <Download size={16} />
            CV
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-foreground lg:hidden"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-0 top-20 w-full overflow-hidden rounded-3xl border border-white/10 bg-background/95 p-6 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-foreground/80 transition-colors hover:text-primary"
                >
                  {link.name}
                </a>
              ))}
              <hr className="border-white/10" />
              <a
                href="/Oubaha_Oussama.pdf"
                className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary py-3 font-semibold text-white"
              >
                <Download size={18} />
                Télécharger CV
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
