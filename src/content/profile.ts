import type { Entry, T } from "./types";

const t = (fr: string, en: string): T => ({ fr, en });

export const profile = {
  name: "Quentin Taranne Payet",
  role: t("Développeur · Epitech, 3e année", "Developer · Epitech, 3rd year"),
  email: "quentinpayetaranne@gmail.com",
  emailSchool: "quentin-stephane.taranne-payet@epitech.eu",
  links: {
    github: "https://github.com/Quentin-taranne",
    linkedin: "https://www.linkedin.com/in/quentin-taranne-payet/",
    // Chemin d'un PDF dans /public (ex. "/cv.pdf"). `null` : le lien n'est pas affiché.
    cv: null as string | null,
  },
};

/** Lignes du bloc d'en-tête : disponibilité et localisation. */
export const status: { label: T; value: T }[] = [
  {
    label: t("Freelance", "Freelance"),
    value: t(
      "Disponible · sites et applications web, outils data, automatisation",
      "Available · websites and web apps, data tools, automation",
    ),
  },
  { label: t("Stage", "Internship"), value: t("À partir d'avril 2027 · 4 mois", "From April 2027 · 4 months") },
  { label: t("Lieu", "Location"), value: t("La Réunion (UTC+4) · remote", "Réunion Island (UTC+4) · remote") },
];

export const experience: Entry[] = [
  {
    period: t("2026 – 2027", "2026 – 2027"),
    title: t("Assistant pédagogique", "Teaching assistant"),
    org: t("Epitech Réunion", "Epitech Réunion"),
    detail: t(
      "Accompagnement et évaluation des étudiants de 1re et 2e année · 2 jours par semaine",
      "Coaching and assessing 1st- and 2nd-year students · 2 days a week",
    ),
  },
  {
    period: t("2025", "2025"),
    title: t("Stage développement & data", "Development & data internship"),
    org: t("EDF SEI Réunion", "EDF SEI Réunion"),
    detail: t(
      "Juillet–décembre · agence APERF · application Cyclone, automatisations VBA, Power BI, analyse Python",
      "July–December · APERF agency · Cyclone app, VBA automation, Power BI, Python analysis",
    ),
  },
  {
    period: t("En cours", "Ongoing"),
    title: t("Prestations informatiques", "IT services"),
    org: t("Micro-entreprise", "Sole proprietorship"),
    detail: t("Client : Piano Concerto Festival", "Client: Piano Concerto Festival"),
  },
];

export const involvement: Entry[] = [
  {
    title: t("Responsable des ateliers de programmation", "Programming workshops lead"),
    org: t("Epitech Académie", "Epitech Académie"),
    detail: t("2 ateliers par mois · 10 à 30 étudiants", "2 workshops a month · 10 to 30 students"),
  },
  { title: t("Trésorier", "Treasurer"), org: t("BDE Epitech Réunion", "Epitech Réunion student union") },
  {
    title: t("Ambassadeur", "Ambassador"),
    org: t("Epitech", "Epitech"),
    detail: t("Forums et lycées", "Education fairs and high schools"),
  },
];

/** Avancement du diplôme : 5 années, la 3e en cours. */
export const degreeProgress = { years: 5, current: 3, start: 2024 };

export const education: Entry[] = [
  {
    period: t("2024 – 2029", "2024 – 2029"),
    title: t("Expert en technologies de l'information (RNCP niveau 7)", "IT Expert, Master's level (RNCP level 7)"),
    org: t("Epitech", "Epitech"),
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
  { year: "2024", items: [t("Entrée à Epitech", "Joined Epitech")] },
  {
    year: "2025",
    items: [t("Lego × Gemini, en 3 jours", "Lego × Gemini, in 3 days"), t("Stage EDF SEI Réunion · juil.–déc.", "EDF SEI Réunion internship · Jul–Dec")],
  },
  {
    year: "2026",
    items: [
      t("Assistant pédagogique · dès février", "Teaching assistant · from February"),
      t("Zappy · 1er régional", "Zappy · 1st regional"),
      t("CartePro · septembre", "CartePro · September"),
    ],
  },
  { year: "2027", items: [t("Stage de 3e année · avril", "3rd-year internship · April")] },
];

/** Grandes étapes de la frise animée (page Parcours). Uniquement des dates connues. */
export type TimelineType = "school" | "work" | "competition" | "project";

export const timeline: { when: T; title: T; detail?: T; type: TimelineType; upcoming?: boolean }[] = [
  { when: t("2024", "2024"), title: t("Entrée à Epitech", "Joined Epitech"), detail: t("Expert en technologies de l'information", "IT Expert programme"), type: "school" },
  { when: t("Juin 2025", "June 2025"), title: t("Lego × Gemini", "Lego × Gemini"), detail: t("Recréé en 3 jours, sans expérience web", "Rebuilt in 3 days, no prior web experience"), type: "project" },
  { when: t("Juil.–déc. 2025", "Jul–Dec 2025"), title: t("Stage EDF SEI Réunion", "EDF SEI Réunion internship"), detail: t("Cyclone, automatisation 2 h → 3 min", "Cyclone app, 2 h → 3 min automation"), type: "work" },
  { when: t("Févr. 2026", "Feb 2026"), title: t("Assistant pédagogique", "Teaching assistant"), detail: t("Epitech Réunion, 2 jours par semaine", "Epitech Réunion, 2 days a week"), type: "work" },
  { when: t("Juin 2026", "June 2026"), title: t("Zappy · 1er régional", "Zappy · 1st regional"), detail: t("IA des joueurs, niveau 8 atteint", "Player AI, reaches level 8"), type: "competition" },
  { when: t("Été 2026", "Summer 2026"), title: t("Robocar · 3e place", "Robocar · 3rd place"), detail: t("Compétition à Epitech Paris", "Competition at Epitech Paris"), type: "competition" },
  { when: t("Sept. 2026", "Sept 2026"), title: t("CartePro", "CartePro"), detail: t("MVP livré en 2 semaines, équipe de 4", "MVP shipped in 2 weeks, team of 4"), type: "project" },
  { when: t("Avril 2027", "April 2027"), title: t("Stage de 3e année", "3rd-year internship"), detail: t("4 mois", "4 months"), type: "work", upcoming: true },
];
