import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { minorProjects, projects } from "@/content/projects";
import type { Locale, Project } from "@/content/types";
import { ui } from "@/content/ui";
import { Badge } from "@/components/ui/badge";
import { coverOf } from "@/components/media/MediaView";
import { routes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";

const pad = (n: number) => String(n).padStart(2, "0");

/** Liste de projets : une ligne sobre par projet, vignette fixe, survol en CSS. */
export function ProjectList({ items, locale }: { items: Project[]; locale: Locale }) {
  return (
    <ol className="mt-8 border-t border-foreground" aria-label={ui.index[locale]}>
      {items.map((p, i) => {
        const cover = coverOf(p.media);
        return (
          <li key={p.slug} className="reveal border-b">
            <Link
              href={routes.project(locale, p.slug)}
              className="group grid grid-cols-[2rem_minmax(0,1fr)] items-center gap-x-4 py-4 transition-colors duration-300 hover:bg-muted/60 focus-visible:bg-muted/60 sm:grid-cols-[2.5rem_6.5rem_minmax(0,1fr)] lg:grid-cols-[2.5rem_7.5rem_minmax(0,1fr)_minmax(0,1.1fr)_11rem_1.5rem] lg:gap-x-6"
            >
              <span className="data self-start pt-1 text-muted-foreground tabular sm:self-center sm:pt-0">
                {pad(i + 1)}
              </span>

              {/* Vignette : toujours présente, légère mise à l'échelle au survol (transform uniquement). */}
              <span className="relative hidden aspect-[16/10] overflow-hidden border bg-muted sm:block" aria-hidden>
                {cover ? (
                  <Image
                    src={cover.src}
                    alt=""
                    fill
                    sizes="7.5rem"
                    className="object-cover transition-transform duration-500 ease-out-quart group-hover:scale-105 group-focus-visible:scale-105"
                  />
                ) : (
                  <span className="display absolute inset-0 grid place-items-center px-1 text-center text-lg text-muted-foreground">
                    {p.result?.[locale] ?? "—"}
                  </span>
                )}
              </span>

              <span className="min-w-0">
                <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
                  <span className="display block w-fit text-[clamp(1.375rem,1.9vw,1.875rem)] leading-none transition-transform duration-300 ease-out-quart group-hover:translate-x-1 group-focus-visible:translate-x-1">
                    {p.name}
                  </span>
                </ViewTransition>
                <span className="data mt-1.5 block text-muted-foreground">
                  {p.kind[locale]}
                  {p.result && <span className="text-foreground lg:hidden"> · {p.result[locale]}</span>}
                </span>
                <span className="mt-2 block text-sm text-muted-foreground lg:hidden">{p.line[locale]}</span>
              </span>

              <span className="hidden min-w-0 lg:block">
                <span className="block text-muted-foreground">{p.line[locale]}</span>
                <span className="mt-2 flex flex-wrap gap-1">
                  {p.stack.map((s) => (
                    <Badge key={s} variant="muted">
                      {s}
                    </Badge>
                  ))}
                </span>
              </span>

              <span className="data hidden justify-self-end text-right text-foreground lg:block">{p.result?.[locale] ?? ""}</span>

              <ArrowUpRight
                aria-hidden
                className="hidden size-5 justify-self-end text-muted-foreground transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground lg:block"
              />
            </Link>
          </li>
        );
      })}
    </ol>
  );
}

/** Projets secondaires, une ligne chacun. */
export function MinorProjects({ locale }: { locale: Locale }) {
  return (
    <>
      <h2 className="data mt-14 mb-4 text-muted-foreground">{ui.alsoBuilt[locale]}</h2>
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
    </>
  );
}

/** Section de l'accueil : les projets principaux, puis un lien vers la page complète. */
export function ProjectIndex({ locale }: { locale: Locale }) {
  const featured = projects.filter((p) => p.featured);
  return (
    <section id="projets" aria-labelledby="projets-title" className="mx-auto max-w-[110rem] scroll-mt-16 px-4 py-20 sm:px-8 lg:py-28">
      <SectionHeading id="projets-title" title={ui.projects[locale]} count={projects.length} />
      <ProjectList items={featured} locale={locale} />
      <div className="mt-8 flex justify-end">
        <Button asChild variant="outline">
          <Link href={routes.projects(locale)}>
            {ui.allProjects[locale]} ({projects.length})
            <ArrowUpRight aria-hidden />
          </Link>
        </Button>
      </div>
    </section>
  );
}
