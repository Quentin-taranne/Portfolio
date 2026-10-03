import type { Locale, T } from "./types";

const t = (fr: string, en: string): T => ({ fr, en });

/** Libellés de l'interface. */
export const ui = {
  projects: t("Projets", "Projects"),
  alsoBuilt: t("Aussi", "Also"),
  experience: t("Expérience", "Experience"),
  involvement: t("Engagement", "Involvement"),
  education: t("Formation", "Education"),
  skills: t("Compétences", "Skills"),
  contact: t("Contact", "Contact"),
  openHint: t("Cliquer sur une ligne pour le détail.", "Click a row for details."),
  cv: t("CV", "Résumé"),
  switchTo: t("English", "Français"),
  title: t("Quentin Taranne Payet · Développeur", "Quentin Taranne Payet · Developer"),
  description: t(
    "Développeur, étudiant à Epitech. Freelance : sites et applications web, outils data, automatisation. Stage à partir d'avril 2027.",
    "Developer and Epitech student. Freelance: websites and web apps, data tools, automation. Internship from April 2027.",
  ),
};

export const tr = (text: T, locale: Locale) => text[locale];
