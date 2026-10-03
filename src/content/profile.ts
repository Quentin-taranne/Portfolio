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

/** Chiffres clés, affichés en grand. */
export const keyFigures: { value: T; label: T }[] = [
  { value: t("2 h → 3 min", "2 h → 3 min"), label: t("Traitement manuel automatisé chez EDF", "Manual processing automated at EDF") },
  { value: t("6 mois", "6 months"), label: t("De stage chez EDF SEI Réunion", "Internship at EDF SEI Réunion") },
  { value: t("2 / mois", "2 / month"), label: t("Ateliers de programmation, en responsable", "Programming workshops, as lead") },
  { value: t("10–30", "10–30"), label: t("Étudiants par atelier", "Students per workshop") },
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
      t("Ticket Tout · septembre", "Ticket Tout · September"),
    ],
  },
  { year: "2027", items: [t("Stage de 3e année · avril", "3rd-year internship · April")] },
];
