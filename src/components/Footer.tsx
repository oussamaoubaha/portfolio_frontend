import React from 'react';
import { SocialIcon } from './SocialIcon/SocialIcon';
import { SOCIAL_LINKS } from '../constants/socialLinks';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5 py-12">
      <div className="container px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold tracking-tighter text-gradient">OO</span>
            <div className="h-4 w-[1px] bg-white/10" />
            <p className="text-sm text-muted-foreground">
              © {currentYear} Oussama Oubaha. Tous droits réservés.
            </p>
          </div>

          <div className="flex gap-4">
            {SOCIAL_LINKS.map((social) => (
              <SocialIcon key={social.name} {...social} />
            ))}
          </div>

          <div className="flex gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="transition-colors hover:text-white">Accueil</a>
            <a href="#projects" className="transition-colors hover:text-white">Projets</a>
            <a href="#about" className="transition-colors hover:text-white">À Propos</a>
            <a href="#contact" className="transition-colors hover:text-white">Contact</a>
          </div>

          <p className="text-xs text-muted-foreground/50">
            Fait avec ❤️ par Oussama
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
