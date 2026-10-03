import type { Locale, T } from "./types";

const t = (fr: string, en: string): T => ({ fr, en });

/** Libellés de l'interface. */
export const ui = {
  skip: t("Aller au contenu", "Skip to content"),
  navLabel: t("Navigation principale", "Main navigation"),
  home: t("Accueil", "Home"),
  projects: t("Projets", "Projects"),
  journey: t("Parcours", "Journey"),
  contact: t("Contact", "Contact"),
  switchTo: t("English", "Français"),
  switchToLabel: t("Read in English", "Lire en français"),

  podium: t("Podium", "Podium"),
  podiumHint: t("Classements obtenus en compétition", "Competition rankings"),
  rankSuffix: { 1: t("er", "st"), 2: t("e", "nd"), 3: t("e", "rd") } as Record<1 | 2 | 3, T>,
  available: t("Freelance : disponible", "Freelance: available"),
  internship: t("Stage : avril 2027 · 4 mois", "Internship: April 2027 · 4 months"),

  index: t("Index des projets", "Project index"),
  alsoBuilt: t("Aussi", "Also"),
  experience: t("Expérience", "Experience"),
  involvement: t("Engagement", "Involvement"),
  education: t("Formation", "Education"),
  skills: t("Stack", "Stack"),

  copyEmail: t("Copier l'adresse", "Copy address"),
  copied: t("Copiée", "Copied"),
  writeMe: t("Écrire un email", "Send an email"),

  back: t("Tous les projets", "All projects"),
  previous: t("Projet précédent", "Previous project"),
  next: t("Projet suivant", "Next project"),
  details: t("Fiche", "Details"),
  gallery: t("Images", "Images"),
  enlarge: t("Agrandir", "Enlarge"),
  close: t("Fermer", "Close"),
  play: t("Lire la vidéo", "Play video"),
  pause: t("Mettre en pause", "Pause video"),
  link: t("Lien", "Link"),

  accessibility: t("Accessibilité", "Accessibility"),
  accessibilityTitle: t("Déclaration d'accessibilité", "Accessibility statement"),

  title: t("Quentin Taranne Payet · Développeur", "Quentin Taranne Payet · Developer"),
  description: t(
    "Développeur, étudiant à Epitech. Freelance : sites et applications web, outils data, automatisation. Stage à partir d'avril 2027.",
    "Developer and Epitech student. Freelance: websites and web apps, data tools, automation. Internship from April 2027.",
  ),
};

export const tr = (text: T, locale: Locale) => text[locale];
