import { Download } from "lucide-react";
import Image from "next/image";
import QRCode from "qrcode";
import type { ReactNode } from "react";
import { PrintButton } from "@/components/cv/PrintButton";
import { Button } from "@/components/ui/button";
import { Shell } from "@/components/site/Shell";
import { degreeProgress, education, experience, extras, involvement, profile, skills, status } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Entry, Locale } from "@/content/types";
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

/** Fichiers générés par `npm run cv:pdf` (scripts/generate-cv-pdf.mjs). */
const pdfFile = { fr: "CV-Quentin-Taranne-Payet-FR.pdf", en: "CV-Quentin-Taranne-Payet-EN.pdf" } as const;

const short = (url: string) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

/** Rubrique du CV : titre mono souligné d'un filet, puis contenu. */
function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="break-inside-avoid">
      <h2 className="data border-b-2 border-foreground pb-1 font-medium text-foreground">{title}</h2>
      <div className="mt-2.5 print:mt-1.5">{children}</div>
    </section>
  );
}

/** Contexte et puces d'une entrée (expérience, engagement). */
function Points({ entry, locale }: { entry: Entry; locale: Locale }) {
  return (
    <>
      {entry.detail && <p className="text-muted-foreground">{entry.detail[locale]}</p>}
      {entry.points && (
        <ul className="mt-0.5 space-y-px print:mt-0 print:space-y-0">
          {entry.points.map((p) => (
            <li key={p.en} className="flex gap-2">
              <span aria-hidden className="mt-[0.55em] size-1 shrink-0 bg-foreground" />
              {p[locale]}
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

/** Ligne d'en-tête d'une entrée : titre · organisation, période à droite. */
function EntryHead({ entry, locale }: { entry: Entry; locale: Locale }) {
  return (
    <p className="flex flex-wrap justify-between gap-x-3">
      <span>
        <span className="font-medium">{entry.title[locale]}</span> · {entry.org[locale]}
      </span>
      <span className="data text-muted-foreground tabular">{entry.period?.[locale]}</span>
    </p>
  );
}

/**
 * CV généré à partir des données du site (src/content).
 * À l'écran : une feuille A4 ; à l'impression : la feuille seule, en thème clair, sur une page.
 */
export async function CvView({ locale }: { locale: Locale }) {
  // Les projets sont sur le portfolio : le CV en donne l'adresse et un QR code.
  const projectsUrl = `${siteUrl}${routes.projects(locale)}`;
  const qr = await QRCode.toString(projectsUrl, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#000000", light: "#ffffff" } });
  const main = projects.filter((p) => p.featured).map((p) => p.name);
  const ranked = projects.filter((p) => p.rank).sort((a, b) => a.rank! - b.rank!);
  const degree = education[0];

  return (
    <Shell locale={locale} alternateHref={routes.cv(otherLocale(locale))}>
      <div className="mx-auto max-w-[110rem] px-4 pt-8 pb-20 sm:px-8 print:p-0">
        <div className="mx-auto mb-6 flex max-w-[210mm] flex-wrap justify-end gap-3 print:hidden">
          <Button asChild variant="signal">
            <a href={`/cv/${pdfFile[locale]}`} download>
              <Download aria-hidden />
              {ui.downloadPdf[locale]}
            </a>
          </Button>
          <PrintButton label={ui.print[locale]} />
        </div>

        {/* La feuille : 210 mm de large, texte compact pour tenir sur une page A4. */}
        <article className="cv-sheet mx-auto max-w-[210mm] border bg-card p-6 text-[0.8125rem] leading-snug sm:p-[12mm] print:max-w-none print:text-[9.5pt] print:leading-[1.27] print:border-0 print:bg-transparent print:p-0">
          <header className="grid gap-4 border-b-2 border-foreground pb-4 sm:grid-cols-[auto_1fr_auto] sm:gap-6 print:pb-2.5">
            <Image
              src={profile.photo.src}
              alt={profile.photo.alt[locale]}
              width={profile.photo.width}
              height={profile.photo.height}
              sizes="7rem"
              loading="eager"
              className="size-28 border object-cover print:size-[27mm]"
            />
            <div>
              <h1 className="display text-[2.25rem] print:text-[1.75rem]">
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

          <div className="mt-5 grid gap-6 sm:grid-cols-[1fr_15rem] sm:gap-8 print:mt-3 print:grid-cols-[1fr_56mm] print:gap-6">
            <div className="space-y-5 print:space-y-4">
              <Block title={ui.experience[locale]}>
                <ul className="space-y-3 print:space-y-1.5">
                  {experience.map((e) => (
                    <li key={e.title.en} className="break-inside-avoid">
                      <EntryHead entry={e} locale={locale} />
                      <Points entry={e} locale={locale} />
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title={ui.involvement[locale]}>
                <ul className="space-y-3 print:space-y-1.5">
                  {involvement.map((e) => (
                    <li key={e.title.en} className="break-inside-avoid">
                      <EntryHead entry={e} locale={locale} />
                      <Points entry={e} locale={locale} />
                    </li>
                  ))}
                </ul>
              </Block>

              <Block title={ui.projects[locale]}>
                <div className="flex items-center gap-4">
                  <div
                    role="img"
                    aria-label={ui.qrAlt[locale]}
                    className="size-20 shrink-0 bg-white p-1 print:size-[19mm] [&_svg]:size-full"
                    dangerouslySetInnerHTML={{ __html: qr }}
                  />
                  <div>
                    <p>{ui.cvProjectsNote[locale]}</p>
                    <p>
                      <a href={projectsUrl} className="inline-flex min-h-6 items-center font-medium underline underline-offset-2 print:min-h-0">
                        {short(projectsUrl)}
                      </a>
                    </p>
                    <p className="text-muted-foreground">{main.join(", ")}</p>
                  </div>
                </div>
              </Block>

            </div>

            <aside className="space-y-5 print:space-y-4">
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
                <dl className="space-y-1.5 print:space-y-1">
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
