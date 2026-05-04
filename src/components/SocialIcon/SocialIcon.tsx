import React, { useState } from "react";
import "./SocialIcon.css";

interface SocialIconProps {
  name: string;
  url: string;
  icon: React.ElementType;
  color: string;
  glow: string;
  bg: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ name, url, icon: Icon, color, glow, bg }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="social-icon-wrapper">
      {/* Tooltip */}
      <span className={`social-tooltip ${hovered ? "visible" : ""}`}>
        {name}
      </span>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Visiter mon profil ${name}`}
        className={`social-icon-link ${hovered ? "hovered" : ""}`}
        style={{
          "--brand-bg": bg,
          "--brand-glow": glow,
          "--brand-color": color,
        } as React.CSSProperties}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Icon />
      </a>
    </div>
  );
};
