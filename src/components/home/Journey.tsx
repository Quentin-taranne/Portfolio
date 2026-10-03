import { degreeProgress, education, experience, involvement, milestones } from "@/content/profile";
import type { Locale } from "@/content/types";
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

/** Partie du parcours : panneau encadré, bandeau de titre coloré (le titre porte l'information). */
function Part({ index, id, title, color, children }: { index: string; id: string; title: string; color: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} className="reveal mt-16 border-2 border-foreground lg:mt-20">
      <div className={`flex items-baseline gap-4 border-b-2 border-foreground px-5 py-4 text-signal-ink lg:px-8 lg:py-5 ${color}`}>
        <span className="data tabular">{index}</span>
        <h2 id={id} className="display text-[clamp(1.75rem,3vw,2.75rem)]">
          {title}
        </h2>
      </div>
      <div className="bg-card px-5 lg:px-8">{children}</div>
    </section>
  );
}

/** 01 · Expérience : une ligne par poste, période en grand. */
function ExperiencePart({ locale }: { locale: Locale }) {
  return (
    <Part index="01" id="experience-title" title={ui.experience[locale]} color="bg-sky">
      <ol>
        {experience.map((e) => (
          <li key={e.title.en} className="grid gap-x-8 gap-y-3 border-b py-7 last:border-b-0 lg:grid-cols-12 lg:py-8">
            <p className="display text-[clamp(1.5rem,2.4vw,2.125rem)] tabular lg:col-span-3">{e.period?.[locale]}</p>
            <div className="lg:col-span-4">
              <h3 className="text-xl font-medium">{e.title[locale]}</h3>
              <p className="data mt-1.5 text-muted-foreground">{e.org[locale]}</p>
            </div>
            {e.detail && <p className="text-muted-foreground lg:col-span-5">{e.detail[locale]}</p>}
          </li>
        ))}
      </ol>
    </Part>
  );
}

/** 02 · Engagement : un bloc par rôle, la responsabilité principale en large. */
function InvolvementPart({ locale }: { locale: Locale }) {
  return (
    <Part index="02" id="engagement-title" title={ui.involvement[locale]} color="bg-ember">
      <ul className="grid gap-4 py-7 md:grid-cols-2 lg:grid-cols-4 lg:py-8">
        {involvement.map((e, i) => (
          <li key={e.title.en} className={`flex flex-col border border-input bg-background p-5 ${i === 0 ? "md:col-span-2" : ""}`}>
            <p className="data text-muted-foreground">{e.org[locale]}</p>
            <h3 className={`display mt-3 ${i === 0 ? "text-[clamp(1.5rem,2.6vw,2.25rem)]" : "text-[clamp(1.375rem,2vw,1.75rem)]"}`}>{e.title[locale]}</h3>
            {e.detail && <p className="mt-auto pt-6 text-muted-foreground">{e.detail[locale]}</p>}
          </li>
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
      <div className="grid gap-8 py-7 lg:grid-cols-12 lg:py-10">
        <div className="lg:col-span-7">
          <h3 className="display text-[clamp(1.75rem,3.2vw,2.75rem)]">{d.title[locale]}</h3>
          <p className="data mt-3 text-muted-foreground">
            {d.org[locale]} · {d.period?.[locale]}
          </p>
        </div>
        <div className="lg:col-span-5 lg:self-end">
          <p className="font-medium">
            {current}
            {locale === "fr" ? "e" : "rd"} {ui.yearOf[locale]} {years} · {ui.current[locale]}
          </p>
          <ol className="mt-3 grid grid-cols-5 gap-1" aria-label={`${ui.schoolYear[locale]} ${current}/${years}`}>
            {Array.from({ length: years }, (_, i) => {
              const n = i + 1;
              const state = n < current ? "bg-foreground" : n === current ? "border-2 border-foreground bg-signal" : "border-2 border-input";
              return (
                <li key={n}>
                  <span aria-hidden className={`block h-3 ${state}`} />
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
    <section id="parcours" aria-labelledby="parcours-title" className="mx-auto max-w-[110rem] scroll-mt-16 px-4 py-20 sm:px-8 lg:py-28">
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
