import type { T } from "./types";

const t = (fr: string, en: string): T => ({ fr, en });

/** Déclaration d'accessibilité, structurée selon le modèle RGAA. */
export const accessibilityStatement = {
  updated: t("Octobre 2026", "October 2026"),
  sections: [
    {
      title: t("Engagement", "Commitment"),
      body: [
        t(
          "Ce site personnel n'est pas soumis à l'obligation légale d'accessibilité (réservée aux organismes publics et aux entreprises de plus de 250 M€ de chiffre d'affaires). Il vise néanmoins le niveau AA du RGAA 4.1.2, de manière volontaire.",
          "This personal site is not legally required to be accessible (the obligation applies to public bodies and companies above €250M turnover). It voluntarily targets RGAA 4.1.2 level AA, the French counterpart of WCAG 2.1 AA.",
        ),
      ],
    },
    {
      title: t("État de conformité", "Compliance status"),
      body: [
        t(
          "Partiellement conforme. Aucun audit RGAA complet par un organisme tiers n'a été réalisé : l'état indiqué repose sur une auto-évaluation outillée.",
          "Partially compliant. No full third-party RGAA audit has been carried out: this status relies on a tool-assisted self-assessment.",
        ),
      ],
    },
    {
      title: t("Établissement de la déclaration", "Preparation of this statement"),
      body: [
        t(
          "Technologies : HTML, CSS, JavaScript (Next.js, React, Radix UI). Pages vérifiées : accueil, une page projet par langue, cette déclaration, en thème clair et sombre.",
          "Technologies: HTML, CSS, JavaScript (Next.js, React, Radix UI). Pages checked: home, one project page per language, this statement, in light and dark themes.",
        ),
        t(
          "Résultats : aucune erreur détectée par axe-core 4.13 (règles WCAG 2.0 à 2.2, niveaux A et AA). Contrastes du texte calculés entre 5,8:1 et 16,8:1. Navigation au clavier complète, lien d'évitement, focus visible, fenêtres modales qui gardent et rendent le focus. Aucun défilement horizontal de 320 à 1920 px de large. Animations coupées avec le réglage « réduire les animations » ; chaque vidéo a un bouton lecture / pause.",
          "Results: no issues found by axe-core 4.13 (WCAG 2.0 to 2.2 rules, levels A and AA). Text contrast computed between 5.8:1 and 16.8:1. Full keyboard navigation, skip link, visible focus, modal dialogs that trap and return focus. No horizontal scrolling from 320 to 1920px wide. Animations disabled with the “reduce motion” setting; every video has a play / pause button.",
        ),
      ],
    },
    {
      title: t("Contenus non accessibles connus", "Known non-accessible content"),
      body: [
        t(
          "Les captures d'écran de projets n'ont pas de transcription détaillée de leur contenu : leur texte alternatif décrit l'écran, pas chaque donnée affichée. Les vidéos sont muettes et sans sous-titres, car elles ne contiennent aucune parole.",
          "Project screenshots have no detailed transcript: their alternative text describes the screen, not every value shown. Videos are silent and have no captions, as they contain no speech.",
        ),
        t(
          "Non testé à ce jour avec un lecteur d'écran (NVDA, VoiceOver).",
          "Not yet tested with a screen reader (NVDA, VoiceOver).",
        ),
      ],
    },
    {
      title: t("Retour d'information et contact", "Feedback and contact"),
      body: [
        t(
          "Si un contenu vous est inaccessible, écrivez-moi : je vous le fournirai sous une autre forme et corrigerai le problème.",
          "If any content is inaccessible to you, email me: I will provide it in another form and fix the issue.",
        ),
      ],
    },
    {
      title: t("Voies de recours", "Remedies"),
      body: [
        t(
          "Si vous n'obtenez pas de réponse satisfaisante, vous pouvez contacter le Défenseur des droits (defenseurdesdroits.fr).",
          "If you do not get a satisfactory answer, you can contact the French Défenseur des droits (defenseurdesdroits.fr).",
        ),
      ],
    },
  ],
};
