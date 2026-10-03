import type { Locale } from "@/content/types";

/** Chemins localisés : /projets/… en français, /en/projects/… en anglais. */
export const routes = {
  home: (l: Locale) => (l === "fr" ? "/" : "/en"),
  projects: (l: Locale) => (l === "fr" ? "/projets" : "/en/projects"),
  cv: (l: Locale) => (l === "fr" ? "/cv" : "/en/cv"),
  journey: (l: Locale) => (l === "fr" ? "/parcours" : "/en/journey"),
  project: (l: Locale, slug: string) => (l === "fr" ? `/projets/${slug}` : `/en/projects/${slug}`),
  accessibility: (l: Locale) => (l === "fr" ? "/accessibilite" : "/en/accessibility"),
};

export const otherLocale = (l: Locale): Locale => (l === "fr" ? "en" : "fr");
