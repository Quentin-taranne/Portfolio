import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/project/ProjectPage";
import { Shell } from "@/components/site/Shell";
import { projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { otherLocale, routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export const projectParams = () => projects.map((p) => ({ slug: p.slug }));

const find = (slug: string) => projects.find((p) => p.slug === slug);

export function projectMetadata(locale: Locale, slug: string) {
  const p = find(slug);
  if (!p) return {};
  return pageMetadata({
    locale,
    title: `${p.name} · ${ui.title[locale].split(" · ")[0]}`,
    description: `${p.line[locale]}. ${p.summary[locale]}`,
    paths: { fr: routes.project("fr", slug), en: routes.project("en", slug) },
  });
}

export function ProjectView({ locale, slug }: { locale: Locale; slug: string }) {
  const p = find(slug);
  if (!p) notFound();
  return (
    <Shell locale={locale} alternateHref={routes.project(otherLocale(locale), slug)}>
      <ProjectPage project={p} locale={locale} />
    </Shell>
  );
}
