import { education, experience, involvement, milestones } from "@/content/profile";
import type { Entry, Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { SectionHeading } from "./SectionHeading";

function EntryList({ title, items, locale }: { title: string; items: Entry[]; locale: Locale }) {
  return (
    <div>
      <h3 className="data mb-3 text-muted-foreground">{title}</h3>
      <ul className="border-t-2 border-foreground">
        {items.map((e) => (
          <li key={e.title.en + e.org.en} className="reveal border-b py-4">
            <p className="flex flex-wrap items-baseline justify-between gap-x-4">
              <span className="font-medium">{e.title[locale]}</span>
              {e.period && <span className="data text-muted-foreground tabular">{e.period[locale]}</span>}
            </p>
            <p className="text-muted-foreground">{e.org[locale]}</p>
            {e.detail && <p className="mt-1 text-sm text-muted-foreground">{e.detail[locale]}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Parcours : règle des années, puis expérience, engagement, formation. */
export function Journey({ locale }: { locale: Locale }) {
  return (
    <section id="parcours" aria-labelledby="parcours-title" className="mx-auto max-w-[110rem] scroll-mt-16 px-4 py-20 sm:px-8 lg:py-28">
      <SectionHeading id="parcours-title" title={ui.journey[locale]} />

      {/* Règle 2024 → 2027 : graduation horizontale sur grand écran, verticale sur mobile. */}
      <ol className="mt-12 grid gap-8 md:grid-cols-4 md:gap-0">
        {milestones.map((m, i) => (
          <li key={m.year} className="reveal relative border-l-2 border-foreground pl-5 md:border-t-2 md:border-l-0 md:pt-5 md:pl-0 md:pr-6">
            <span aria-hidden className={`absolute -top-[7px] left-[-7px] hidden size-3 md:block ${i === milestones.length - 1 ? "bg-signal outline-2 outline-foreground" : "bg-foreground"}`} />
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

      <div className="mt-16 grid gap-12 lg:grid-cols-3 lg:gap-8">
        <EntryList title={ui.experience[locale]} items={experience} locale={locale} />
        <EntryList title={ui.involvement[locale]} items={involvement} locale={locale} />
        <EntryList title={ui.education[locale]} items={education} locale={locale} />
      </div>
    </section>
  );
}
