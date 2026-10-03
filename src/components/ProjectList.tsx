import { Fragment } from "react";
import type { Locale, MinorProject, Project } from "@/content/types";
import { Gallery } from "./Gallery";

const row = "grid gap-x-6 md:grid-cols-[13rem_1fr_10rem_15rem]";

function ProjectRow({ p, locale }: { p: Project; locale: Locale }) {
  return (
    <details id={p.slug} className="group border-b border-rule">
      <summary className={`${row} cursor-pointer grid-cols-[1fr_auto] gap-y-1 py-4 transition-colors hover:bg-soft md:-mx-3 md:px-3`}>
        <span className="font-medium group-hover:text-accent">{p.name}</span>
        <span className="flex items-start justify-end gap-3 text-right md:order-last">
          {p.result && <span className="font-medium">{p.result[locale]}</span>}
          <span className="toggle inline-block w-3 text-muted transition-transform" aria-hidden>
            +
          </span>
        </span>
        <span className="col-span-2 text-muted md:col-span-1">{p.summary[locale]}</span>
        <span className="col-span-2 font-mono text-xs leading-6 text-muted md:col-span-1">
          {p.stack.map((s, i) => (
            <Fragment key={s}>
              <span className="whitespace-nowrap">{s}</span>
              {i < p.stack.length - 1 && "\u00a0· "}
            </Fragment>
          ))}
        </span>
      </summary>

      <div className="grid gap-6 pt-2 pb-10 md:grid-cols-[13rem_1fr] md:gap-x-6">
        <dl className="space-y-3 text-sm md:col-start-2 md:max-w-2xl md:grid md:grid-cols-[7rem_1fr] md:gap-x-4 md:gap-y-3 md:space-y-0">
          {p.fields.map((f) => (
            <div key={f.label.en} className="md:contents">
              <dt className="text-muted">{f.label[locale]}</dt>
              <dd>{f.value[locale]}</dd>
            </div>
          ))}
          {p.links?.map((l) => (
            <div key={l.href} className="md:contents">
              <dt className="text-muted">{locale === "fr" ? "Lien" : "Link"}</dt>
              <dd>
                <a href={l.href} target="_blank" rel="noreferrer" className="ln">
                  {l.label[locale]} ↗
                </a>
              </dd>
            </div>
          ))}
        </dl>
        {p.media && p.media.length > 0 && (
          <div className="md:col-start-2">
            <Gallery media={p.media} locale={locale} />
          </div>
        )}
      </div>
    </details>
  );
}

export function ProjectList({ projects, locale }: { projects: Project[]; locale: Locale }) {
  return (
    <div className="border-t border-fg">
      {projects.map((p) => (
        <ProjectRow key={p.slug} p={p} locale={locale} />
      ))}
    </div>
  );
}

export function MinorList({ items, locale }: { items: MinorProject[]; locale: Locale }) {
  return (
    <ul className="text-sm">
      {items.map((m) => (
        <li key={m.name} className={`${row} grid-cols-[1fr_auto] border-b border-rule py-2.5`}>
          <span>{m.name}</span>
          <span className="font-mono text-xs leading-6 text-muted md:order-last md:col-span-2 md:text-left">{m.stack}</span>
          <span className="col-span-2 text-muted md:col-span-1">{m.summary[locale]}</span>
        </li>
      ))}
    </ul>
  );
}
