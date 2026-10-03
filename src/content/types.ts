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
  summary: T;
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
  detail?: T;
};
