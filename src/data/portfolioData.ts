export const portfolioData = {
  // ── Informations personnelles ──
  name: "Oussama Oubaha",
  title: "Étudiant en Génie Informatique",
  subtitle: "À la recherche d'un stage de fin d'études",
  email: "oussama.oubaha24@gmail.com",
  location: "Maroc",

  // ── Hero ──
  hero: {
    headline: "Oussama Oubaha",
    tagline: "Étudiant en Génie Informatique",
    description:
      "Passionné par le développement web et les technologies modernes. Je recherche un stage de fin d'études de 2 mois pour contribuer à des projets innovants.",
    ctaPrimary: "Télécharger CV",
    ctaSecondary: "Me contacter",
  },

  // ── À propos ──
  about: {
    title: "À Propos",
    paragraphs: [
      "Étudiant en 2ème année de génie informatique, je suis passionné par la conception et le développement de solutions logicielles innovantes.",
      "Actuellement à la recherche d'un stage de fin d'études d'une durée de 2 mois, mon objectif est de contribuer à des projets innovants tout en consolidant mes compétences techniques dans un environnement professionnel stimulant.",
      "Curieux et motivé, j'aime relever des défis techniques et apprendre de nouvelles technologies pour créer des expériences utilisateur de qualité.",
    ],
  },

  // ── Compétences ──
  skills: {
    title: "Compétences",
    categories: [
      {
        name: "Développement",
        icon: "code",
        items: ["C/C++", "Java", "Python", "PHP (Laravel)"],
      },
      {
        name: "Web",
        icon: "globe",
        items: ["React.js", "Tailwind CSS", "HTML/CSS"],
      },
      {
        name: "Data",
        icon: "database",
        items: ["MySQL", "NoSQL", "Big Data", "Machine Learning"],
      },
      {
        name: "Systèmes",
        icon: "server",
        items: ["Linux Ubuntu", "Réseaux", "Sécurité"],
      },
    ],
  },

  // ── Expériences ──
  experiences: {
    title: "Expériences",
    items: [
      {
        role: "Développeur Web Front-end",
        company: "Maktoub-Tech",
        location: "Fès, Maroc",
        period: "2024",
        type: "Stage",
        missions: [
          "Développement d'une plateforme E-commerce complète et performante",
          "Utilisation de React.js et Tailwind CSS pour l'interface utilisateur",
          "Conception UX design centrée utilisateur pour une navigation intuitive",
          "Optimisation responsive pour une expérience parfaite sur tous les appareils",
        ],
      },
    ],
  },

  // ── Formation ──
  education: {
    title: "Formation",
    items: [
      {
        degree: "DUT en Conception et Développement des Logiciels",
        school: "EST d'Oujda",
        location: "Oujda, Maroc",
        period: "2024 – 2026",
        description:
          "Formation approfondie en génie logiciel couvrant la programmation, les bases de données, le développement web et les systèmes d'information.",
      },
    ],
  },

  // ── Navigation ──
  nav: [
    { label: "À Propos", href: "#about" },
    { label: "Compétences", href: "#skills" },
    { label: "Expériences", href: "#experience" },
    { label: "Formation", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
};
