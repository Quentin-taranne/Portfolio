import type { T } from "@/content/types";

/**
 * Couleur de surface associée à une catégorie de projet.
 * Toujours décorative : le nom de la catégorie est affiché à côté.
 */
const BY_KIND: Record<string, string> = {
  Freelance: "bg-signal",
  EDF: "bg-sky",
  Competition: "bg-ember",
};

export const kindAccent = (kind: T) => BY_KIND[kind.en] ?? "bg-transparent";
