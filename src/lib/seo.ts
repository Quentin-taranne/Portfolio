import type { Metadata } from "next";
import { profile } from "@/content/profile";
import type { Locale } from "@/content/types";

/**
 * URL publique du site : NEXT_PUBLIC_SITE_URL si définie, sinon le domaine de production
 * fourni par Vercel (sans protocole), sinon localhost en développement.
 */
export const siteUrl = (() => {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  return "http://localhost:3000";
})();

type PageMeta = {
  locale: Locale;
  title: string;
  description: string;
  /** Chemins de la même page dans chaque langue. */
  paths: Record<Locale, string>;
  image?: string;
};

/** Métadonnées d'une page : titre unique, description, canonique, hreflang, Open Graph, Twitter. */
export function pageMetadata({ locale, title, description, paths, image }: PageMeta): Metadata {
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {
      canonical: paths[locale],
      languages: { fr: paths.fr, en: paths.en, "x-default": paths.fr },
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      locale: locale === "fr" ? "fr_FR" : "en_US",
      alternateLocale: locale === "fr" ? "en_US" : "fr_FR",
      url: paths[locale],
      title,
      description,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
  };
}

/** Données structurées Person + WebSite (JSON-LD). */
export function personJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#person`,
        name: profile.name,
        url: siteUrl,
        email: `mailto:${profile.email}`,
        jobTitle: locale === "fr" ? "Développeur" : "Developer",
        affiliation: { "@type": "CollegeOrUniversity", name: "Epitech" },
        sameAs: [profile.links.github, profile.links.linkedin],
        knowsLanguage: ["fr", "en"],
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: profile.name,
        inLanguage: locale === "fr" ? "fr-FR" : "en",
        author: { "@id": `${siteUrl}/#person` },
      },
    ],
  };
}
