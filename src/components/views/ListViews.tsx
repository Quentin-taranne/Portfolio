import { JourneyDetails, MilestoneRuler } from "@/components/home/Journey";
import { MinorProjects, ProjectList } from "@/components/home/ProjectIndex";
import { SectionHeading } from "@/components/home/SectionHeading";
import { Shell } from "@/components/site/Shell";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { otherLocale, routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

const page = "mx-auto max-w-[110rem] px-4 pt-12 pb-24 sm:px-8 lg:pt-16";

export const projectsMetadata = (locale: Locale) =>
  pageMetadata({
    locale,
    title: `${ui.projects[locale]} · ${profile.name}`,
    description: ui.projectsPageDescription[locale],
    paths: { fr: routes.projects("fr"), en: routes.projects("en") },
  });

export const journeyMetadata = (locale: Locale) =>
  pageMetadata({
    locale,
    title: `${ui.journey[locale]} · ${profile.name}`,
    description: ui.journeyPageDescription[locale],
    paths: { fr: routes.journey("fr"), en: routes.journey("en") },
  });

/** Page de tous les projets. */
export function ProjectsView({ locale }: { locale: Locale }) {
  return (
    <Shell locale={locale} alternateHref={routes.projects(otherLocale(locale))}>
      <div className={page}>
        <SectionHeading id="projets-title" title={ui.projects[locale]} count={projects.length} level={1} />
        <ProjectList items={projects} locale={locale} />
        <MinorProjects locale={locale} />
      </div>
    </Shell>
  );
}

/** Page du parcours : repères, expérience, engagement, formation. */
export function JourneyView({ locale }: { locale: Locale }) {
  return (
    <Shell locale={locale} alternateHref={routes.journey(otherLocale(locale))}>
      <div className={page}>
        <SectionHeading id="parcours-title" title={ui.journey[locale]} level={1} />
        <MilestoneRuler locale={locale} />
        <JourneyDetails locale={locale} />
      </div>
    </Shell>
  );
}
