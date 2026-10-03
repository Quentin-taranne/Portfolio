import Image from "next/image";
import type { ReactNode } from "react";
import { PrintButton } from "@/components/cv/PrintButton";
import { Shell } from "@/components/site/Shell";
import { degreeProgress, education, experience, extras, involvement, profile, skills, status } from "@/content/profile";
import { minorProjects, projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { otherLocale, routes } from "@/lib/routes";
import { pageMetadata, siteUrl } from "@/lib/seo";

export const cvMetadata = (locale: Locale) =>
  pageMetadata({
    locale,
    title: `${ui.cv[locale]} · ${profile.name}`,
    description: ui.cvDescription[locale],
    paths: { fr: routes.cv("fr"), en: routes.cv("en") },
  });

const short = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** Rubrique du CV : titre mono souligné d'un filet, puis contenu. */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="break-inside-avoid">
      <h2 className="data border-b-2 border-foreground pb-1 font-medium text-foreground">{title}</h2>
      <div className="mt-2.5">{children}</div>
    </section>
  );
}

/**
 * CV généré à partir des données du site (src/content).
 * À l'écran : une feuille A4 ; à l'impression : la feuille seule, en thème clair, sur une page.
 */
export function CvView({ locale }: { locale: Locale }) {
  // Projets sélectionnés : les principaux et ceux classés en compétition.
  const selected = projects.filter((p) => p.featured || p.rank);
  const others = [...projects.filter((p) => !p.featured && !p.rank).map((p) => p.name), ...minorProjects.map((m) => m.name)];
  const ranked = projects.filter((p) => p.rank).sort((a, b) => a.rank! - b.rank!);
  const degree = education[0];

  return (
    <Shell locale={locale} alternateHref={routes.cv(otherLocale(locale))}>
      <div className="mx-auto max-w-[110rem] px-4 pt-8 pb-20 sm:px-8 print:p-0">
        <div className="mx-auto mb-6 flex max-w-[210mm] flex-wrap items-center justify-between gap-4 print:hidden">
          <p className="text-sm text-muted-foreground">{ui.printHint[locale]}</p>
          <PrintButton label={ui.print[locale]} />
        </div>

        {/* La feuille : 210 mm de large, texte compact pour tenir sur une page A4. */}
        <article className="cv-sheet mx-auto max-w-[210mm] border bg-card p-6 text-[0.8125rem] leading-snug sm:p-[12mm] print:max-w-none print:border-0 print:bg-transparent print:p-0">
          <header className="grid gap-4 border-b-2 border-foreground pb-4 sm:grid-cols-[auto_1fr_auto] sm:gap-6">
            <Image
              src={profile.photo.src}
              alt={profile.photo.alt[locale]}
              width={profile.photo.width}
              height={profile.photo.height}
              sizes="7rem"
              loading="eager"
              className="size-28 border object-cover print:size-[30mm]"
            />
            <div>
              <h1 className="display text-[2.25rem]">
                <span className="block">{profile.name.split(" ")[0]}</span>
                <span className="block">{profile.name.split(" ").slice(1).join(" ")}</span>
              </h1>
              <p className="mt-1 text-sm font-medium">{profile.role[locale]}</p>
              <ul className="mt-2 space-y-0.5 text-muted-foreground">
                {status.map((s) => (
                  <li key={s.label.en}>
                    <span className="font-medium text-foreground">{s.label[locale]}</span> · {s.value[locale]}
                  </li>
                ))}
              </ul>
            </div>
            <ul className="space-y-0.5 sm:text-right">
              <li>
                <a href={`mailto:${profile.email}`} className="inline-flex min-h-6 items-center underline-offset-2 hover:underline print:min-h-0">
                  {profile.email}
                </a>
              </li>
              <li>
                <a href={`mailto:${profile.emailSchool}`} className="inline-flex min-h-6 items-center underline-offset-2 hover:underline print:min-h-0">
                  {profile.emailSchool}
                </a>
              </li>
              <li>
                <a href={profile.links.github} className="inline-flex min-h-6 items-center underline-offset-2 hover:underline print:min-h-0">
                  {short(profile.links.github)}
                </a>
              </li>
              <li>
                <a href={profile.links.linkedin} className="inline-flex min-h-6 items-center underline-offset-2 hover:underline print:min-h-0">
                  {short(profile.links.linkedin)}
                </a>
              </li>
              {/* Adresse du site : seulement une fois un vrai domaine configuré (pas en local). */}
              {!siteUrl.includes("localhost") && (
                <li>
                  <a href={`${siteUrl}${routes.home(locale)}`} className="inline-flex min-h-6 items-center underline-offset-2 hover:underline print:min-h-0">
                    {short(siteUrl)}
                  </a>
                </li>
              )}
            </ul>
          </header>

          <div className="mt-5 grid gap-6 sm:grid-cols-[1fr_15rem] sm:gap-8 print:grid-cols-[1fr_58mm]">
            <div className="space-y-5">
              <Block title={ui.experience[locale]}>
                <ul className="space-y-3">
                  {experience.map((e) => (
                    <li key={e.title.en} className="break-inside-avoid">
                      <p className="flex flex-wrap justify-between gap-x-3">
                        <span>
                          <span className="font-medium">{e.title[locale]}</span> · {e.org[locale]}
                        </span>
                        <span className="data text-muted-foreground tabular">{e.period?.[locale]}</span>
                      </p>
                      {e.detail && <p className="text-muted-foreground">{e.detail[locale]}</p>}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title={ui.selectedProjects[locale]}>
                <ul className="space-y-2.5">
                  {selected.map((p) => (
                    <li key={p.slug} className="break-inside-avoid">
                      <p className="flex flex-wrap justify-between gap-x-3">
                        <span>
                          <span className="font-medium">{p.name}</span> · {p.line[locale]}
                        </span>
                        {p.result && <span className="font-medium">{p.result[locale]}</span>}
                      </p>
                      <p className="data text-muted-foreground">
                        {p.kind[locale]} · {p.stack.join(", ")}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-2.5 text-muted-foreground">
                  <span className="font-medium text-foreground">{ui.otherProjects[locale]}</span> · {others.join(", ")}
                </p>
              </Block>

              <Block title={ui.involvement[locale]}>
                <ul className="space-y-1.5">
                  {involvement.map((e) => (
                    <li key={e.title.en}>
                      <span className="font-medium">{e.title[locale]}</span> · {e.org[locale]}
                      {e.detail && <span className="text-muted-foreground"> · {e.detail[locale]}</span>}
                    </li>
                  ))}
                </ul>
              </Block>
            </div>

            <aside className="space-y-5">
              <Block title={ui.results[locale]}>
                <ul className="space-y-1">
                  {ranked.map((p) => (
                    <li key={p.slug} className="flex items-baseline gap-2">
                      <span className="display w-9 text-xl tabular">
                        {p.rank}
                        <span className="font-sans text-[0.55em] font-medium normal-case">{ui.rankSuffix[p.rank!][locale]}</span>
                      </span>
                      <span>{p.name.split(" · ")[0]}</span>
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title={ui.education[locale]}>
                <p className="font-medium">{degree.title[locale]}</p>
                <p className="text-muted-foreground">
                  {degree.org[locale]} · {degree.period?.[locale]}
                </p>
                <p className="mt-1">
                  {degreeProgress.current}
                  {locale === "fr" ? "e" : "rd"} {ui.yearOf[locale]} {degreeProgress.years}
                </p>
              </Block>

              <Block title={ui.skills[locale]}>
                <dl className="space-y-1.5">
                  {skills.map((s) => (
                    <div key={s.label.en}>
                      <dt className="font-medium">{s.label[locale]}</dt>
                      <dd className="text-muted-foreground">{s.items}</dd>
                    </div>
                  ))}
                </dl>
              </Block>

              {extras.map((x) => (
                <Block key={x.label.en} title={x.label[locale]}>
                  <p className="text-muted-foreground">{x.value[locale]}</p>
                </Block>
              ))}
            </aside>
          </div>
        </article>
      </div>
    </Shell>
  );
}
