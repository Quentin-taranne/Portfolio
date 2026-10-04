export type Locale = "fr" | "en";

/** Texte bilingue. */
export type T = { fr: string; en: string };

export type Media =
  | { kind: "image"; src: string; alt: T; width: number; height: number }
  | { kind: "video"; src: string; poster: string; alt: T; width: number; height: number };

export type Field = { label: T; value: T };

export type Project = {
  slug: string;
  name: string;
  /** Catégorie affichée dans l'index : Freelance, EDF, Compétition… */
  kind: T;
  /** Une ligne courte pour l'index (≈ 6-8 mots). */
  line: T;
  /** Introduction de la page projet. */
  summary: T;
  /** Projet principal, affiché sur l'accueil. */
  featured?: boolean;
  /** Place sur le podium, pour les compétitions classées. */
  rank?: 1 | 2 | 3;
  stack: string[];
  /** Résultat affiché en fin de ligne. */
  result?: T;
  fields: Field[];
  media?: Media[];
  links?: { href: string; label: T }[];
};

/** Projet secondaire, une seule ligne. */
export type MinorProject = { name: string; summary: T; stack: string };

export type Entry = {
  period?: T;
  title: T;
  org: T;
  /** Une ligne de contexte (rythme, lieu, cadre). */
  detail?: T;
  /** Points détaillés, affichés sur la page Parcours et le CV. */
  points?: T[];
  /**
   * Dates pour la frise, au format « AAAA-MM » (ou « AAAA » si le mois n'est pas connu).
   * Sans `to` : en cours. `step` : changement de rôle (date et nouveau rôle).
   */
  span?: { from: string; to?: string; step?: { at: string; label: T } };
};
