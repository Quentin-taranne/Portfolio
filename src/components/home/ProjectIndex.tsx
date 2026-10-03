import Link from "next/link";
import { ViewTransition } from "react";
import { minorProjects, projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { Badge } from "@/components/ui/badge";
import { coverOf } from "@/components/media/MediaView";
import { routes } from "@/lib/routes";
import { CursorPreview } from "./CursorPreview";
import { SectionHeading } from "./SectionHeading";

const pad = (n: number) => String(n).padStart(2, "0");

/** Index des projets, façon tableau de classement. */
export function ProjectIndex({ locale }: { locale: Locale }) {
  return (
    <section id="projets" aria-labelledby="projets-title" className="mx-auto max-w-[110rem] scroll-mt-16 px-4 py-20 sm:px-8 lg:py-28">
      <SectionHeading id="projets-title" title={ui.projects[locale]} count={projects.length} />

      <ol id="index-projets" className="mt-10 border-t-2 border-foreground" aria-label={ui.index[locale]}>
        {projects.map((p, i) => {
          const cover = coverOf(p.media);
          return (
            <li key={p.slug} className="reveal border-b">
              <Link
                href={routes.project(locale, p.slug)}
                data-preview={cover?.src}
                className="group relative isolate grid grid-cols-[2.25rem_minmax(0,1fr)] items-baseline gap-x-3 gap-y-2 py-5 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-x-4 lg:grid-cols-[5rem_minmax(0,1.1fr)_9rem_minmax(0,1fr)_minmax(0,12rem)] lg:gap-x-8 lg:py-6"
              >
                {/* Balayage jaune au survol : transform uniquement. */}
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-signal transition-transform duration-500 ease-out-quart group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span className="data text-muted-foreground tabular group-hover:text-signal-ink group-focus-visible:text-signal-ink">{pad(i + 1)}</span>
                <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
                  <span className="display text-[clamp(2rem,4.2vw,3.75rem)] leading-[0.95] group-hover:text-signal-ink group-focus-visible:text-signal-ink">
                    {p.name}
                  </span>
                </ViewTransition>
                <span className="display col-start-2 text-[clamp(1.25rem,2vw,1.75rem)] leading-none lg:col-start-auto lg:justify-self-end lg:text-right group-hover:text-signal-ink group-focus-visible:text-signal-ink lg:order-last">
                  {p.result?.[locale] ?? <span className="text-muted-foreground group-hover:text-signal-ink">—</span>}
                </span>
                <span className="data col-start-2 text-muted-foreground group-hover:text-signal-ink group-focus-visible:text-signal-ink lg:col-start-auto">
                  {p.kind[locale]}
                </span>
                <span className="col-start-2 text-lead text-muted-foreground group-hover:text-signal-ink group-focus-visible:text-signal-ink lg:col-start-auto">
                  {p.line[locale]}
                  <span className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((s) => (
                      <Badge key={s} className="group-hover:border-signal-ink group-hover:text-signal-ink group-focus-visible:border-signal-ink group-focus-visible:text-signal-ink">
                        {s}
                      </Badge>
                    ))}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ol>

      <CursorPreview targetId="index-projets" label={ui.openProject[locale]} />

      <h3 className="data mt-14 mb-4 text-muted-foreground">{ui.alsoBuilt[locale]}</h3>
      <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
        {minorProjects.map((m) => (
          <li key={m.name} className="reveal flex items-baseline justify-between gap-4 border-b py-3">
            <span>
              <span className="font-medium">{m.name}</span>
              <span className="block text-sm text-muted-foreground">{m.summary[locale]}</span>
            </span>
            <Badge variant="muted">{m.stack}</Badge>
          </li>
        ))}
      </ul>
    </section>
  );
}
