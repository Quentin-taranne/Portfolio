import type { Entry, T } from "./types";

const t = (fr: string, en: string): T => ({ fr, en });

export const profile = {
  name: "Quentin Taranne Payet",
  role: t("Développeur · Epitech, 3e année", "Developer · Epitech, 3rd year"),
  email: "quentinpayetaranne@gmail.com",
  emailSchool: "quentin-stephane.taranne-payet@epitech.eu",
  /** Portrait recadré et sans métadonnées (original dans /uploads, non publié). */
  photo: { src: "/media/portrait.jpg", width: 600, height: 600, alt: t("Portrait de Quentin Taranne Payet", "Portrait of Quentin Taranne Payet") },
  links: {
    github: "https://github.com/Quentin-taranne",
    linkedin: "https://www.linkedin.com/in/quentin-taranne-payet/",
  },
};

/** Lignes du bloc d'en-tête : disponibilité et localisation. */
export const status: { label: T; value: T }[] = [
  {
    label: t("Freelance", "Freelance"),
    value: t("Disponible · sites vitrines, applications web, outils data", "Available · showcase websites, web apps, data tools"),
  },
  {
    label: t("Stage", "Internship"),
    value: t(
      "À partir d'avril 2027 · 4 mois · data / IA, web, logiciel, DevOps",
      "From April 2027 · 4 months · data / AI, web, software, DevOps",
    ),
  },
  { label: t("Lieu", "Location"), value: t("La Réunion (UTC+4) · remote", "Réunion Island (UTC+4) · remote") },
];

/** Accueil : ce qui est recherché (une ligne chacun, avec son action). */
export const offers = {
  freelance: {
    title: t("Missions de freelance", "Freelance work"),
    detail: t("Sites vitrines · applications web · outils data", "Showcase websites · web apps · data tools"),
  },
  internship: {
    title: t("Stage", "Internship"),
    detail: t(
      "Avril 2027 · 4 mois · data / IA, web, logiciel, DevOps · La Réunion ou remote",
      "April 2027 · 4 months · data / AI, web, software, DevOps · Réunion Island or remote",
    ),
  },
};

export const experience: Entry[] = [
  {
    period: t("Depuis févr. 2026", "Since Feb 2026"),
    title: t("Assistant pédagogique", "Teaching assistant"),
    org: t("Epitech Réunion", "Epitech Réunion"),
    span: { from: "2026-02", to: "2027-03" },
    detail: t(
      "En cours, jusqu'en mars 2027 · 2 jours par semaine · étudiants de 1re et 2e année",
      "Ongoing, until March 2027 · 2 days a week · 1st- and 2nd-year students",
    ),
    points: [
      t("Évaluation des étudiants", "Student assessment"),
      t("Mise en place et animation d'ateliers", "Setting up and running workshops"),
      t(
        "Conseil et explications : développement bas niveau, développement web, programmation orientée objet",
        "Advice and explanations: low-level development, web development, object-oriented programming",
      ),
    ],
  },
  {
    period: t("Juil. – déc. 2025", "Jul – Dec 2025"),
    title: t("Stage développement & data", "Development & data internship"),
    org: t("EDF SEI Réunion", "EDF SEI Réunion"),
    span: { from: "2025-07", to: "2025-12" },
    detail: t("Agence APERF (Pilotage et Expertise Réseau Finance) · en binôme", "APERF agency (network steering and finance) · in a pair"),
    points: [
      t(
        "Application Cyclone, affectation des équipes de dépannage après un cyclone : back-end et import / export des données ; utilisée par l'agence APERF de Saint-Leu, testée en exercice de crise",
        "Cyclone app, dispatching repair crews after a cyclone: back end and data import / export; used by the APERF agency in Saint-Leu, tested in crisis drills",
      ),
      t("Automatisations VBA : traitement manuel réduit de 2 h à 3 min", "VBA automation: manual processing cut from 2 h to 3 min"),
      t(
        "Tableau de bord Power BI des campagnes d'élagage · analyse des défaillances réseau en Python",
        "Power BI dashboard for vegetation-management campaigns · grid failure analysis in Python",
      ),
    ],
  },
  {
    period: t("Depuis oct. 2026", "Since Oct 2026"),
    title: t("Prestations informatiques", "IT services"),
    org: t("Micro-entreprise", "Sole proprietorship"),
    span: { from: "2026-10" },
    detail: t("Ouvert à de nouveaux clients", "Open to new clients"),
    points: [
      t("Piano Concerto Festival : site complet en PHP, en ligne", "Piano Concerto Festival: full website in PHP, live"),
      t("Autres projets en cours de réalisation", "Other projects in progress"),
      t("Sites vitrines, applications web, outils data", "Showcase websites, web apps, data tools"),
    ],
  },
];

export const involvement: Entry[] = [
  {
    period: t("Depuis nov. 2024", "Since Nov 2024"),
    title: t("Responsable des ateliers de programmation", "Programming workshops lead"),
    org: t("Epitech Académie", "Epitech Académie"),
    span: { from: "2024-11", step: { at: "2026-03", label: t("Responsable", "Lead") } },
    detail: t("Membre de l'équipe depuis nov. 2024 · responsable depuis mars 2026", "Team member since Nov 2024 · lead since Mar 2026"),
    points: [
      t("Ateliers pour lycéens : bases de la programmation, shell UNIX, variables, boucles, POO", "Workshops for high-school students: programming basics, UNIX shell, variables, loops, OOP"),
      t("2 ateliers par mois · 10 à 30 participants", "2 workshops a month · 10 to 30 participants"),
    ],
  },
  {
    period: t("Depuis mars 2025", "Since Mar 2025"),
    title: t("Trésorier", "Treasurer"),
    org: t("BDE Epitech Réunion", "Epitech Réunion student union"),
    span: { from: "2025-03" },
    points: [t("Gestion de l'ensemble de la trésorerie", "Manages all of the association's finances")],
  },
  {
    period: t("Depuis nov. 2024", "Since Nov 2024"),
    title: t("Ambassadeur", "Ambassador"),
    org: t("Epitech", "Epitech"),
    span: { from: "2024-11", step: { at: "2026-03", label: t("Référent", "Lead") } },
    detail: t("Ambassadeur référent depuis mars 2026", "Lead ambassador since Mar 2026"),
    points: [t("Présentation de l'école dans les forums et les lycées", "Presenting the school at education fairs and high schools")],
  },
];

/** Avancement du diplôme : 5 années, la 3e en cours. */
export const degreeProgress = { years: 5, current: 3, start: 2024 };

/** Stage de 3e année, à venir : affiché sur la frise. */
export const nextInternship: Entry = {
  period: t("À partir d'avril 2027 · 4 mois", "From April 2027 · 4 months"),
  title: t("Stage de 3e année", "3rd-year internship"),
  org: t("À venir", "Upcoming"),
  span: { from: "2027-04", to: "2027-07" },
};

export const education: Entry[] = [
  {
    period: t("2024 – 2029", "2024 – 2029"),
    title: t("Expert en technologies de l'information (RNCP niveau 7)", "IT Expert, Master's level (RNCP level 7)"),
    org: t("Epitech", "Epitech"),
    span: { from: "2024", to: "2029" },
  },
];

export const skills: { label: T; items: string }[] = [
  { label: t("Langages", "Languages"), items: "C, C++, Python, TypeScript, JavaScript, PHP, Rust, SQL" },
  { label: t("Web", "Web"), items: "Svelte, React, NestJS, Supabase, PostgreSQL" },
  { label: t("Data & IA", "Data & AI"), items: "Power BI, Excel/VBA, pandas, scikit-learn, PyTorch" },
  { label: t("DevOps", "DevOps"), items: "Docker, Ansible, Jenkins, GitHub Actions, Linux" },
];

export const extras: { label: T; value: T }[] = [
  { label: t("Langues", "Languages"), value: t("Français (natif) · Anglais (intermédiaire)", "French (native) · English (intermediate)") },
  {
    label: t("Hors code", "Outside code"),
    value: t(
      "Piano classique (Chopin, Beethoven, Tchaïkovski, Schubert) · Tennis en compétition",
      "Classical piano (Chopin, Beethoven, Tchaikovsky, Schubert) · Competitive tennis",
    ),
  },
];

/** Repères du parcours : uniquement des dates connues. */
export const milestones: { year: string; items: T[] }[] = [
  {
    year: "2024",
    items: [t("Entrée à Epitech", "Joined Epitech"), t("Ateliers Epitech Académie et ambassadeur · nov.", "Epitech Académie workshops and ambassador · Nov")],
  },
  {
    year: "2025",
    items: [
      t("Trésorier du BDE · mars", "Student union treasurer · Mar"),
      t("Lego × Gemini, en 3 jours", "Lego × Gemini, in 3 days"),
      t("Stage EDF SEI Réunion · juil.–déc.", "EDF SEI Réunion internship · Jul–Dec"),
    ],
  },
  {
    year: "2026",
    items: [
      t("Assistant pédagogique · février", "Teaching assistant · February"),
      t("Responsable des ateliers · mars", "Workshops lead · March"),
      t("Zappy · 1er régional", "Zappy · 1st regional"),
      t("CartePro · septembre", "CartePro · September"),
      t("Micro-entreprise · octobre", "Sole proprietorship · October"),
    ],
  },
  { year: "2027", items: [t("Stage de 3e année · avril", "3rd-year internship · April")] },
];


