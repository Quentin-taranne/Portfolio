import { degreeProgress, education, experience, involvement, milestones } from "@/content/profile";
import type { Entry, Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { SectionHeading } from "./SectionHeading";

/** Repères 2024 → 2027 : une colonne par année, un repère par ligne. */
export function MilestoneRuler({ locale }: { locale: Locale }) {
  return (
    <ol className="mt-10 grid gap-10 md:grid-cols-4 md:gap-6">
      {milestones.map((m, i) => (
        <li key={m.year} className="reveal relative border-l-2 border-foreground pl-5 md:border-t-2 md:border-l-0 md:pt-5 md:pl-0">
          <span
            aria-hidden
            className={`absolute -top-[7px] left-[-7px] hidden size-3 border border-foreground md:block ${i === milestones.length - 1 ? "bg-signal" : "bg-foreground"}`}
          />
          <p className="display text-[clamp(2.25rem,3.5vw,3.25rem)] tabular">{m.year}</p>
          <ul className="mt-4">
            {m.items.map((it) => (
              <li key={it.en} className="border-t py-2.5">
                {it[locale]}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

/** Puces d'information (expérience, engagement). */
function Points({ items, locale }: { items?: Entry["points"]; locale: Locale }) {
  if (!items?.length) return null;
  return (
    <ul className="mt-3 space-y-1.5">
      {items.map((p) => (
        <li key={p.en} className="flex gap-3">
          <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-foreground" />
          {p[locale]}
        </li>
      ))}
    </ul>
  );
}

/**
 * Partie du parcours : filet, puis titre (colonne collante) et entrées.
 * La couleur n'est qu'un repère, comme la catégorie des projets : le titre porte l'information.
 */
function Part({ index, id, title, color, children }: { index: string; id: string; title: string; color: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="reveal mt-16 grid gap-6 border-t border-foreground pt-6 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,3fr)] lg:gap-10">
      <div className="lg:sticky lg:top-24 lg:self-start">
        <p className="data flex items-center gap-2 text-muted-foreground tabular">
          <span aria-hidden className={`size-2.5 border border-foreground ${color}`} />
          {index}
        </p>
        <h2 id={id} className="display mt-3 text-[clamp(2rem,3.4vw,3rem)]">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}

/** Une entrée : période, intitulé et organisation, puis contexte et puces. */
function EntryRow({ entry, locale }: { entry: Entry; locale: Locale }) {
  return (
    <li className="grid gap-x-8 gap-y-3 border-b py-6 first:pt-0 md:grid-cols-[9.5rem_minmax(0,1fr)] xl:grid-cols-[10.5rem_minmax(0,0.85fr)_minmax(0,1.15fr)]">
      <p className="data pt-1.5 text-muted-foreground tabular">{entry.period?.[locale]}</p>
      <div>
        <h3 className="display text-balance text-[clamp(1.375rem,1.9vw,1.75rem)]">{entry.title[locale]}</h3>
        <p className="data mt-1.5 text-muted-foreground">{entry.org[locale]}</p>
      </div>
      <div className="md:col-start-2 xl:col-start-auto">
        {entry.detail && <p className="text-muted-foreground">{entry.detail[locale]}</p>}
        <Points items={entry.points} locale={locale} />
      </div>
    </li>
  );
}

/** 01 · Expérience */
function ExperiencePart({ locale }: { locale: Locale }) {
  return (
    <Part index="01" id="experience-title" title={ui.experience[locale]} color="bg-sky">
      <ol>
        {experience.map((e) => (
          <EntryRow key={e.title.en} entry={e} locale={locale} />
        ))}
      </ol>
    </Part>
  );
}

/** 02 · Engagement */
function InvolvementPart({ locale }: { locale: Locale }) {
  return (
    <Part index="02" id="engagement-title" title={ui.involvement[locale]} color="bg-ember">
      <ul>
        {involvement.map((e) => (
          <EntryRow key={e.title.en} entry={e} locale={locale} />
        ))}
      </ul>
    </Part>
  );
}

/** 03 · Diplôme : intitulé et avancement sur 5 ans (texte + barre, jamais la couleur seule). */
function DegreePart({ locale }: { locale: Locale }) {
  const d = education[0];
  const { years, current, start } = degreeProgress;
  return (
    <Part index="03" id="diplome-title" title={ui.education[locale]} color="bg-signal">
      <div className="grid gap-x-8 gap-y-5 md:grid-cols-[9.5rem_minmax(0,1fr)] xl:grid-cols-[10.5rem_minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <p className="data pt-1.5 text-muted-foreground tabular">{d.period?.[locale]}</p>
        <div>
          <h3 className="display text-balance text-[clamp(1.375rem,1.9vw,1.75rem)]">{d.title[locale]}</h3>
          <p className="data mt-1.5 text-muted-foreground">{d.org[locale]}</p>
        </div>
        <div className="md:col-start-2 xl:col-start-auto">
          <p>
            {current}
            {locale === "fr" ? "e" : "rd"} {ui.yearOf[locale]} {years} · {ui.current[locale]}
          </p>
          <ol className="mt-3 grid grid-cols-5 gap-1" aria-label={`${ui.schoolYear[locale]} ${current}/${years}`}>
            {Array.from({ length: years }, (_, i) => {
              const n = i + 1;
              const state = n < current ? "bg-foreground" : n === current ? "border border-foreground bg-signal" : "border border-input";
              return (
                <li key={n}>
                  <span aria-hidden className={`block h-2 ${state}`} />
                  <span className="data mt-2 block text-muted-foreground tabular">
                    {start + i}
                    {n === current && <span className="sr-only"> · {ui.current[locale]}</span>}
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Part>
  );
}

/** Expérience, engagement, diplôme : trois parties distinctes. */
export function JourneyDetails({ locale }: { locale: Locale }) {
  return (
    <>
      <ExperiencePart locale={locale} />
      <InvolvementPart locale={locale} />
      <DegreePart locale={locale} />
    </>
  );
}

/** Section de l'accueil : la règle, puis un lien vers la page complète. */
export function Journey({ locale }: { locale: Locale }) {
  return (
    <section id="parcours" aria-labelledby="parcours-title" className="mx-auto max-w-[110rem] scroll-mt-28 sm:scroll-mt-16 px-4 py-20 sm:px-8 lg:py-28">
      <SectionHeading id="parcours-title" title={ui.journey[locale]} />
      <MilestoneRuler locale={locale} />
      <div className="mt-10 flex justify-end">
        <Button asChild variant="outline">
          <Link href={routes.journey(locale)}>
            {ui.fullJourney[locale]}
            <ArrowUpRight aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  );
}
