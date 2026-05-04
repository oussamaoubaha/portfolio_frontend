import {
  IconReact, IconJavascript, IconTypescript, IconHtml, IconCss, IconTailwind,
  IconPhp, IconLaravel, IconApi,
  IconMysql, IconMongodb, IconPostgres,
  IconGit, IconGithub, IconDocker, IconVite, IconPostman,
  IconFigma, IconFramer
} from "@/components/UI/Icons";

export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    label: "Développement Frontend",
    icon: "🎨",
    accentColor: "#61DAFB",
    skills: [
      { name: "React.js", icon: IconReact, color: "#61DAFB", glow: "rgba(97,218,251,0.35)" },
      { name: "JavaScript", icon: IconJavascript, color: "#F7DF1E", glow: "rgba(247,223,30,0.35)" },
      { name: "TypeScript", icon: IconTypescript, color: "#3178C6", glow: "rgba(49,120,198,0.35)" },
      { name: "HTML5", icon: IconHtml, color: "#E34F26", glow: "rgba(227,79,38,0.35)" },
      { name: "CSS3", icon: IconCss, color: "#1572B6", glow: "rgba(21,114,182,0.35)" },
      { name: "TailwindCSS", icon: IconTailwind, color: "#06B6D4", glow: "rgba(6,182,212,0.35)" },
    ]
  },
  {
    id: "backend",
    label: "Développement Backend",
    icon: "⚙️",
    accentColor: "#339933",
    skills: [
      { name: "PHP", icon: IconPhp, color: "#777BB4", glow: "rgba(119,123,180,0.35)" },
      { name: "Laravel", icon: IconLaravel, color: "#FF2D20", glow: "rgba(255,45,32,0.35)" },
      { name: "REST API", icon: IconApi, color: "#06B6D4", glow: "rgba(6,182,212,0.35)" },
    ]
  },
  {
    id: "database",
    label: "Base de Données",
    icon: "🗄️",
    accentColor: "#4479A1",
    skills: [
      { name: "MySQL", icon: IconMysql, color: "#4479A1", glow: "rgba(68,121,161,0.35)" },
      { name: "MongoDB", icon: IconMongodb, color: "#47A248", glow: "rgba(71,162,72,0.35)" },
      { name: "PostgreSQL", icon: IconPostgres, color: "#336791", glow: "rgba(51,103,145,0.35)" },
    ]
  },
  {
    id: "tools",
    label: "Outils & DevOps",
    icon: "🛠️",
    accentColor: "#F05032",
    skills: [
      { name: "Git", icon: IconGit, color: "#F05032", glow: "rgba(240,80,50,0.35)" },
      { name: "GitHub", icon: IconGithub, color: "#ffffff", glow: "rgba(255,255,255,0.2)" },
      { name: "Postman", icon: IconPostman, color: "#FF6C37", glow: "rgba(255,108,55,0.35)" },
    ]
  },
  {
    id: "design",
    label: "Design & UI/UX",
    icon: "✏️",
    accentColor: "#F24E1E",
    skills: [
      { name: "Figma", icon: IconFigma, color: "#F24E1E", glow: "rgba(242,78,30,0.35)" },
    ]
  },
];
