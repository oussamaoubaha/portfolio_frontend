import React, { useState } from "react";
import "./SkillIcon.css";

interface SkillIconProps {
  name: string;
  icon: React.ElementType;
  color: string;
}

export const SkillIcon: React.FC<SkillIconProps> = ({ name, icon: Icon, color }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="skill-icon-wrapper">
      <span className={`skill-tooltip ${hovered ? "visible" : ""}`}>
        {name}
      </span>
      <div
        className={`skill-icon-box ${hovered ? "hovered" : ""}`}
        style={{
          "--skill-color": color,
          "--skill-glow": `${color}4D`, // 30% opacity in hex
        } as React.CSSProperties}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Icon />
      </div>
    </div>
  );
};
