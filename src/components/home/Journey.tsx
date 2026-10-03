import { degreeProgress, education, experience, involvement, milestones } from "@/content/profile";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { SectionHeading } from "./SectionHeading";

/** Règle 2024 → 2027 : graduation horizontale sur grand écran, verticale sur mobile. */
export function MilestoneRuler({ locale }: { locale: Locale }) {
  return (
    <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-0">
      {milestones.map((m, i) => (
        <li key={m.year} className="reveal relative border-l-2 border-foreground pl-5 md:border-t-2 md:border-l-0 md:pt-5 md:pl-0 md:pr-6">
          <span
            aria-hidden
            className={`absolute -top-[7px] left-[-7px] hidden size-3 md:block ${i === milestones.length - 1 ? "bg-signal outline-2 outline-foreground" : "bg-foreground"}`}
          />
          <p className="display text-[clamp(2.75rem,5vw,4.5rem)] tabular">{m.year}</p>
          <ul className="mt-3 space-y-1.5">
            {m.items.map((it) => (
              <li key={it.en} className="text-muted-foreground">
                {it[locale]}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}

/** Titre numéroté d'une partie du parcours. */
function PartHeading({ index, title, id }: { index: string; title: string; id: string }) {
  return (
    <div className="flex items-baseline gap-4 border-t-2 border-foreground pt-5">
      <span className="data text-muted-foreground tabular">{index}</span>
      <h2 id={id} className="display text-[clamp(1.75rem,3vw,2.75rem)]">
        {title}
      </h2>
    </div>
  );
}

/** 01 · Expérience : frise en lignes, période en grand. */
function ExperiencePart({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="experience-title" className="mt-20">
      <PartHeading index="01" id="experience-title" title={ui.experience[locale]} />
      <ol className="mt-6">
        {experience.map((e) => (
          <li key={e.title.en} className="reveal grid gap-x-8 gap-y-2 border-b py-6 lg:grid-cols-12 lg:py-8">
            <p className="display text-[clamp(1.75rem,3vw,2.5rem)] tabular lg:col-span-3">{e.period?.[locale]}</p>
            <div className="lg:col-span-5">
              <h3 className="text-xl font-medium">{e.title[locale]}</h3>
              <p className="data mt-1 text-muted-foreground">{e.org[locale]}</p>
            </div>
            {e.detail && <p className="text-muted-foreground lg:col-span-4">{e.detail[locale]}</p>}
          </li>
        ))}
      </ol>
    </section>
  );
}

/** 02 · Engagement : blocs encadrés, la responsabilité principale en large. */
function InvolvementPart({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="engagement-title" className="mt-20">
      <PartHeading index="02" id="engagement-title" title={ui.involvement[locale]} />
      <ul className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {involvement.map((e, i) => (
          <li key={e.title.en} className={`reveal flex flex-col border-2 border-foreground p-5 lg:p-6 ${i === 0 ? "md:col-span-2" : ""}`}>
            <p className="data text-muted-foreground">{e.org[locale]}</p>
            <h3 className={`display mt-3 leading-[0.95] ${i === 0 ? "text-[clamp(1.75rem,3vw,2.5rem)]" : "text-[clamp(1.5rem,2.2vw,1.875rem)]"}`}>{e.title[locale]}</h3>
            {e.detail && <p className="mt-auto pt-6 text-muted-foreground">{e.detail[locale]}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** 03 · Diplôme : intitulé en grand et avancement sur 5 ans (texte + barre, jamais la couleur seule). */
function DegreePart({ locale }: { locale: Locale }) {
  const d = education[0];
  const { years, current, start } = degreeProgress;
  return (
    <section aria-labelledby="diplome-title" className="mt-20">
      <PartHeading index="03" id="diplome-title" title={ui.education[locale]} />
      <div className="reveal mt-6 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h3 className="display text-[clamp(2rem,4vw,3.5rem)] leading-[0.95]">{d.title[locale]}</h3>
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
    </section>
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
