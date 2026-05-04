export const portfolioData = {
  // ── Informations personnelles ──
  name: "Oussama Oubaha",
  title: "Développeur Full Stack Junior",
  subtitle: "Étudiant en Génie Informatique | DUT CDL 2024-2026",
  email: "oussama.oubaha24@ump.ac.ma",
  phone: "+212 628 841 979",
  location: "Oujda, Maroc",
  age: "20 ans",
  available: "Disponible pour stage de fin d'études (2 mois)",
  languages: ["Français", "Arabe", "Anglais"],

  // ── Hero ──
  hero: {
    headline: "Oussama Oubaha",
    tagline: "Développeur Full Stack Junior",
    description:
      "Étudiant passionné en 2ème année de génie informatique, spécialisé en développement web et applications intelligentes. Je recherche un stage de fin d'études de 2 mois pour appliquer mes compétences et contribuer à des projets innovants.",
    ctaPrimary: "Télécharger CV",
    ctaSecondary: "Me contacter",
    cvUrl: "/Oubaha_Oussama_CV.pdf",
  },

  // ── À propos ──
  about: {
    title: "À Propos",
    paragraphs: [
      "Étudiant en 2ème année de DUT Conception et Développement des Logiciels à l'EST d'Oujda, je suis passionné par le développement web et les technologies modernes.",
      "Spécialisé en développement full-stack avec une expertise en React.js, Laravel, Node.js et les bases de données MySQL/MongoDB. J'aime créer des applications performantes et intuitives.",
      "Actuellement à la recherche d'un stage de fin d'études de 2 mois pour appliquer mes compétences techniques et contribuer à des projets innovants dans un environnement professionnel.",
      "Curieux, autonome et toujours motivé par l'apprentissage de nouvelles technologies. Je relève avec enthousiasme les défis techniques complexes.",
    ],
  },

  // ── Compétences ──
  skills: {
    title: "Compétences Techniques",
    categories: [
      {
        name: "Frontend",
        icon: "monitor",
        items: ["React.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript ES6+", "Responsive Design"],
      },
      {
        name: "Backend",
        icon: "server",
        items: ["Laravel", "PHP", "REST APIs", "JWT Authentication"],
      },
      {
        name: "Bases de Données",
        icon: "database",
        items: ["MySQL", "MongoDB", "NoSQL", "PostgreSQL"],
      },
      {
        name: "Langages de Programmation",
        icon: "code",
        items: ["JavaScript", "TypeScript", "Python", "PHP", "C/C++", "Java"],
      },
      {
        name: "IA & Machine Learning",
        icon: "brain",
        items: ["TensorFlow", "OpenCV", "Computer Vision", "MediaPipe", "Scikit-learn"],
      },
      {
        name: "Outils & DevOps",
        icon: "tools",
        items: ["Git", "GitHub", "VS Code", "Figma",],
      },
      {
        name: "Systèmes & Réseaux",
        icon: "network",
        items: ["Linux Ubuntu", "Windows Server", "Réseaux TCP/IP", "Sécurité"],
      },
    ],
  },

  // ── Expériences ──
  experiences: {
    title: "Expériences",
    items: [
      /*
      {
        id: 1,
        role: "Développeur Web Fullstack",
        company: "SupMti",
        location: "Oujda, Maroc",
        period: "2026 (Avril - Aujourd'hui)",
        type: "Stage",
        missions: [
          "Création d'une application de Gestion Scolaire performante",
          "Développement du Backend avec Laravel et structuration des données sous MySQL",
          "Architecture Decoupled : Frontend avec React.js et stylisation via Tailwind CSS",
          "Conception intuitive centrée utilisateur et compatibilité multi-appareils",
        ],
      },
      */
      {
        id: 2,
        role: "Développeur Web Front-end",
        company: "Projet de Fin d'Études (PFE) — AquaManager",
        location: "Oujda, Maroc",
        period: "2026 (Février - Avril)",
        type: "PFE",
        missions: [
          "Conception et développement de l'application web AquaManager pour la gestion intelligente",
          "Développement d'une API REST avec Laravel pour une gestion robuste des données et de la logique métier",
          "Création d'une interface utilisateur (SPA) moderne et réactive avec React.js",
          "Utilisation de Tailwind CSS pour un design épuré et une expérience utilisateur (UX) fluide",
          "Modélisation et gestion de la persistance des données avec MySQL",
        ],
      },
      {
        id: 3,
        role: "Développeur Web Fullstack",
        company: "MediaTower-tech",
        location: "Fès, Maroc",
        period: "2025 - 2026 (Décembre - Avril)",
        type: "Stage",
        missions: [
          "Conception et développement intégral de la plateforme machro3y.com",
          "Mise en place d'un Backend robuste avec Laravel et gestion de base de données MySQL",
          "Développement d'interfaces dynamiques avec Laravel Blade et Tailwind CSS",
          "Focus sur l'UX Design et l'optimisation responsive pour mobile et desktop",
        ],
      },
      {
        id: 4,
        role: "Développeur Web Front-end",
        company: "Maktoub-Tech",
        location: "Fès, Maroc",
        period: "2025",
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
        id: 1,
        degree: "DUT en Conception et Développement des Logiciels",
        school: "EST d'Oujda",
        location: "Oujda, Maroc",
        period: "2024 – 2026",
        description:
          "Formation approfondie en génie logiciel couvrant la programmation, les bases de données, le développement web et les systèmes d'information.",
      },
      {
        id: 2,
        degree: "Baccalauréat, Option Sciences Physiques",
        school: "Lycée",
        location: "El-Hajeb, Maroc",
        period: "2023 – 2024",
        description:
          "Obtention du baccalauréat avec une solide base scientifique et analytique.",
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

  // ── Projets ──
  projects: {
    title: "Projets",
    items: [
      {
        id: 10,
        title: "AquaManager (PFE)",
        description: "Application web pour la gestion intelligente de l'eau. Architecture découplée avec une API REST robuste et une interface utilisateur (SPA) moderne et réactive.",
        image_url: "/assets/projects/aqua_manager.webp",
        technologies: ["React.js", "Laravel", "Tailwind CSS", "MySQL", "REST API"],
        category: "web",
        project_url: "https://aquamanagerpfe.xyz/",
      },
      {
        id: 1,
        title: "Système de Détection de Somnolence (AI)",
        description: "Programme intelligent basé sur Python et OpenCV qui surveille l'état des yeux en temps réel pour prévenir les accidents de la route.",
        image_url: "/assets/projects/gesture_controller.webp",
        technologies: ["Python", "OpenCV", "TensorFlow", "Machine Learning"],
        category: "ia",
        project_url: "https://drowsiness-detection-demo.com",
        github_url: "https://github.com/oussama-oubaha/drowsiness-detection",
      },
      {
        id: 2,
        title: "Plateforme de Gestion RH & Pointage",
        description: "Système complet d'automatisation des processus RH (Pointage, Congés, Paie) avec analytics temps réel.",
        image_url: "/assets/projects/rh_dashboard.webp",
        technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
        category: "web",
        project_url: "https://rh-management-demo.com",
        github_url: "https://github.com/oussama-oubaha/rh-management",
      },
      {
        id: 3,
        title: "AI Gesture Controller (Virtual Mouse)",
        description: "Interface homme-machine (HMI) sans contact permettant de contrôler l'ordinateur par des gestes de la main en temps réel.",
        image_url: "/assets/projects/gesture_controller.webp",
        technologies: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
        category: "ia",
        project_url: "https://gesture-controller-demo.com",
        github_url: "https://github.com/oussama-oubaha/gesture-controller",
      },
      {
        id: 4,
        title: "MAKTOUB-TECH (PFA 2025)",
        description: "Conception et développement d'une interface web réactive et intuitive pour la gestion des candidats et des commissions. Focus sur l'expérience utilisateur (UX) et la fluidité de la navigation.",
        image_url: "/assets/projects/maktoub.webp",
        technologies: ["React.js", "Laravel", "MySQL", "Tailwind CSS"],
        category: "web",
        project_url: "https://maktoub-tech.com",
        github_url: "https://github.com/oussama-oubaha/maktoub-pfa",
      },
      {
        id: 5,
        title: "Personal Portfolio & Admin Dashboard",
        description: "Plateforme dynamique avec un espace d'administration pour gérer mes projets, compétences et messages en temps réel. Intégration d'un assistant intelligent (AI) pour l'interaction utilisateur.",
        image_url: "/assets/projects/portfolio-project.webp",
        technologies: ["React.js", "Node.js", "MongoDB", "Express.js", "AI"],
        category: "web",
        project_url: "https://portfolio-demo.com",
        github_url: "https://github.com/oussama-oubaha/portfolio-admin",
      },
      {
        id: 9,
        title: "Machro3y.com",
        description: "Plateforme de services professionnels avec système de réservation en ligne, gestion des rendez-vous et interface client moderne.",
        image_url: "/assets/projects/machro3y.webp",
        technologies: ["React.js", "Node.js", "MongoDB", "Express.js"],
        category: "web",
        project_url: "https://machro3y.com",
        github_url: "https://github.com/oussama-oubaha/machro3y-platform",
      },
    ],
  },

  // ── Témoignages ──
  testimonials: {
    title: "Ce qu'ils disent",
    items: [
      {
        name: "Omar Squali",
        role: "Maktoub-tech",
        content: "Oussama a fait preuve d'un grand professionnalisme lors de son passage chez Maktoub-Tech. Sa capacité d'adaptation et son sens de l'innovation ont été un réel atout.",
        avatar: "/assets/testimonials/omar.jpeg",
        linkedin: "https://www.linkedin.com/in/oussama-oubaha/"
      },
      {
        name: "Hafid Maktoub",
        role: "CEO @ MediaTower.tech",
        content: "Un développeur prometteur avec une excellente vision technique. Son travail sur notre plateforme a largement dépassé nos attentes.",
        avatar: "/assets/testimonials/hafid.jpeg",
        linkedin: "https://www.linkedin.com/in/hafid-el-maktoub-0b140b189/"
      },
      {
        name: "Abdelhafid Serghini",
        role: "AquaManager (PFE)",
        content: "Oussama a mené son Projet de Fin d'Études avec rigueur et excellence. Une architecture logicielle bien pensée et une réalisation technique impeccable.",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Abdelhafid%20Serghini&backgroundColor=3178C6",
        linkedin: "https://www.linkedin.com/in/oussama-oubaha/"
      },
      /*
        {
        name: "Mohammed Besraoui",
        role: "SupMti",
        content: "Un développeur brillant et passionné. Sa curiosité technique et sa persévérance font de lui un profil Full Stack très complet et polyvalent.",
        avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Mohammed%20Besraoui&backgroundColor=47A248",
        linkedin: "https://www.linkedin.com/in/oussama-oubaha/"
      }*/
    ]
  },

  // ── Social Links ──
  social: {
    linkedin: "https://www.linkedin.com/in/oussama-oubaha-75951436a/",
    github: "https://github.com/oussama-oubaha",
    facebook: "https://www.facebook.com/oussama.ou.9699",
    instagram: "https://www.instagram.com/oussama.ou18/",
    whatsapp: "https://wa.me/+212628841979", // Example number, adjust if needed
  },
};
