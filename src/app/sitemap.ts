import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { routes } from "@/lib/routes";
import { siteUrl } from "@/lib/seo";

/** Plan du site : chaque page dans les deux langues, avec ses alternatives hreflang. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pairs: { fr: string; en: string; priority: number }[] = [
    { fr: routes.home("fr"), en: routes.home("en"), priority: 1 },
    { fr: routes.projects("fr"), en: routes.projects("en"), priority: 0.9 },
    { fr: routes.journey("fr"), en: routes.journey("en"), priority: 0.7 },
    { fr: routes.cv("fr"), en: routes.cv("en"), priority: 0.6 },
    ...projects.map((p) => ({ fr: routes.project("fr", p.slug), en: routes.project("en", p.slug), priority: 0.8 })),
    { fr: routes.accessibility("fr"), en: routes.accessibility("en"), priority: 0.3 },
  ];
  return pairs.flatMap(({ fr, en, priority }) =>
    [fr, en].map((path) => ({
      url: `${siteUrl}${path}`,
      priority,
      alternates: { languages: { fr: `${siteUrl}${fr}`, en: `${siteUrl}${en}` } },
    })),
  );
}
