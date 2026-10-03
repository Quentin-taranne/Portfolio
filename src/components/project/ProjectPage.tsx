import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ViewTransition } from "react";
import { projects } from "@/content/projects";
import type { Locale, Project } from "@/content/types";
import { ui } from "@/content/ui";
import { Badge } from "@/components/ui/badge";
import { Lightbox } from "@/components/media/Lightbox";
import { MediaView } from "@/components/media/MediaView";
import { routes } from "@/lib/routes";

const navLink = "group flex min-h-11 flex-col gap-1 py-6 hover:bg-signal hover:text-signal-ink focus-visible:bg-signal focus-visible:text-signal-ink";

/** Page détail d'un projet : en-tête, média principal, fiche, galerie, navigation. */
export function ProjectPage({ project: p, locale }: { project: Project; locale: Locale }) {
  const i = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const [lead, ...gallery] = p.media ?? [];

  return (
    <article className="mx-auto max-w-[110rem] px-4 pt-8 pb-20 sm:px-8">
      <Link href={routes.projects(locale)} className="data inline-flex min-h-11 items-center gap-2 underline-offset-4 hover:underline">
        <ArrowLeft className="size-4" aria-hidden />
        {ui.back[locale]}
      </Link>

      <header className="mt-6 grid gap-6 border-b-2 border-foreground pb-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-8">
          <p className="data text-muted-foreground">
            {p.kind[locale]}
            {p.rank && <> · {p.rank}{ui.rankSuffix[p.rank][locale]}</>}
          </p>
          <ViewTransition name={`title-${p.slug}`} share="morph" default="none">
            <h1 className="display mt-3 text-giant">{p.name}</h1>
          </ViewTransition>
          <p className="mt-5 max-w-3xl text-lead text-muted-foreground">{p.summary[locale]}</p>
        </div>
        <div className="flex flex-col gap-4 lg:col-span-4 lg:items-end">
          {p.result && (
            <p className="display w-fit bg-signal px-3 pt-2 pb-1 text-[clamp(1.75rem,3vw,2.75rem)] text-signal-ink">{p.result[locale]}</p>
          )}
          <ul className="flex flex-wrap gap-1.5 lg:justify-end" aria-label="Stack">
            {p.stack.map((s) => (
              <li key={s}>
                <Badge>{s}</Badge>
              </li>
            ))}
          </ul>
        </div>
      </header>

      {lead && (
        <div className={`mt-8 ${lead.height > lead.width ? "mx-auto max-w-md" : ""}`}>
          <MediaView media={lead} locale={locale} eager sizes="(min-width: 1760px) 1696px, 96vw" className="h-auto w-full border" />
        </div>
      )}

      <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-8">
        <section aria-labelledby="fiche" className="lg:col-span-4">
          <div className="lg:sticky lg:top-24">
            <h2 id="fiche" className="data mb-3 text-muted-foreground">
              {ui.details[locale]}
            </h2>
            <dl className="border-t-2 border-foreground">
              {p.fields.map((f) => (
                <div key={f.label.en} className="border-b py-4">
                  <dt className="data text-muted-foreground">{f.label[locale]}</dt>
                  <dd className="mt-1">{f.value[locale]}</dd>
                </div>
              ))}
              {p.links?.map((l) => (
                <div key={l.href} className="border-b py-4">
                  <dt className="data text-muted-foreground">{ui.link[locale]}</dt>
                  <dd className="mt-1">
                    <a href={l.href} className="inline-flex min-h-6 items-center font-medium underline decoration-1 underline-offset-4 hover:decoration-2">
                      {l.label[locale]}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {gallery.length > 0 && (
          <section aria-labelledby="images" className="lg:col-span-8">
            <h2 id="images" className="data mb-3 text-muted-foreground">
              {ui.gallery[locale]}
            </h2>
            <ul className="grid gap-4 border-t-2 border-foreground pt-4 sm:grid-cols-2">
              {gallery.map((m) => (
                <li key={m.src} className={`reveal ${m.width > m.height ? "sm:col-span-2" : ""}`}>
                  <figure>
                    {m.kind === "video" ? (
                      <MediaView media={m} locale={locale} sizes="(min-width: 1024px) 60vw, 96vw" className="h-auto w-full border" />
                    ) : (
                      <Lightbox
                        src={m.src}
                        alt={m.alt[locale]}
                        width={m.width}
                        height={m.height}
                        sizes={m.width > m.height ? "(min-width: 1024px) 60vw, 96vw" : "(min-width: 1024px) 30vw, 96vw"}
                        enlargeLabel={ui.enlarge[locale]}
                        closeLabel={ui.close[locale]}
                      />
                    )}
                    <figcaption className="mt-2 text-sm text-muted-foreground">{m.alt[locale]}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <nav aria-label={locale === "fr" ? "Autres projets" : "Other projects"} className="mt-20 grid border-t-2 border-foreground sm:grid-cols-2">
        <Link href={routes.project(locale, prev.slug)} className={`${navLink} border-b px-2 sm:border-r sm:border-b-0`}>
          <span className="data inline-flex items-center gap-2">
            <ArrowLeft className="size-4" aria-hidden />
            {ui.previous[locale]}
          </span>
          <span className="display text-title">{prev.name}</span>
        </Link>
        <Link href={routes.project(locale, next.slug)} className={`${navLink} px-2 text-right sm:items-end`}>
          <span className="data inline-flex items-center gap-2">
            {ui.next[locale]}
            <ArrowRight className="size-4" aria-hidden />
          </span>
          <span className="display text-title">{next.name}</span>
        </Link>
      </nav>
    </article>
  );
}
