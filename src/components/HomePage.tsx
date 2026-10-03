import Link from "next/link";
import type { ReactNode } from "react";
import { education, experience, extras, involvement, profile, skills, status } from "@/content/profile";
import { minorProjects, projects } from "@/content/projects";
import type { Entry, Locale, T } from "@/content/types";
import { ui } from "@/content/ui";
import { MinorList, ProjectList } from "./ProjectList";

const label = "font-mono text-xs uppercase tracking-wider text-muted";

function Section({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="mt-16 md:mt-20">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 className={label}>{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

/** Ligne libellé / valeur, utilisée partout sauf dans la liste des projets. */
function Row({ term, children }: { term: ReactNode; children: ReactNode }) {
  return (
    <div className="grid gap-x-6 gap-y-0.5 border-b border-rule py-3 md:grid-cols-[13rem_1fr]">
      <dt className="text-muted">{term}</dt>
      <dd>{children}</dd>
    </div>
  );
}

function Entries({ items, locale }: { items: Entry[]; locale: Locale }) {
  return (
    <dl className="border-t border-fg">
      {items.map((e) => (
        <Row key={e.title.en + e.org.en} term={e.period?.[locale] ?? e.org[locale]}>
          <span className="font-medium">{e.title[locale]}</span>
          {e.period && <span className="text-muted"> · {e.org[locale]}</span>}
          {e.detail && <span className="block text-sm text-muted">{e.detail[locale]}</span>}
        </Row>
      ))}
    </dl>
  );
}

export function HomePage({ locale }: { locale: Locale }) {
  const tr = (x: T) => x[locale];
  const other = locale === "fr" ? "/en" : "/";
  const contacts = [
    { href: `mailto:${profile.email}`, text: profile.email },
    { href: `mailto:${profile.emailSchool}`, text: profile.emailSchool },
    { href: profile.links.github, text: "GitHub" },
    { href: profile.links.linkedin, text: "LinkedIn" },
    ...(profile.links.cv ? [{ href: profile.links.cv, text: tr(ui.cv) }] : []),
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 pt-10 pb-16 sm:px-6 md:pt-16">
      <header>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">{profile.name}</h1>
            <p className="mt-1 text-muted">{tr(profile.role)}</p>
          </div>
          <Link href={other} hrefLang={locale === "fr" ? "en" : "fr"} className="ln shrink-0 pt-1 text-sm text-muted">
            {tr(ui.switchTo)}
          </Link>
        </div>

        <dl className="mt-8 border-t border-fg">
          {status.map((s) => (
            <Row key={s.label.en} term={tr(s.label)}>
              {tr(s.value)}
            </Row>
          ))}
          <Row term={tr(ui.contact)}>
            <span className="flex flex-wrap gap-x-4 gap-y-1">
              {contacts.map((c) => (
                <a key={c.href} href={c.href} className="ln" {...(c.href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
                  {c.text}
                </a>
              ))}
            </span>
          </Row>
        </dl>
      </header>

      <main>
        <Section title={tr(ui.projects)} aside={<p className="hidden text-xs text-muted sm:block">{tr(ui.openHint)}</p>}>
          <ProjectList projects={projects} locale={locale} />
          <h3 className={`${label} mt-10 mb-3`}>{tr(ui.alsoBuilt)}</h3>
          <div className="border-t border-rule">
            <MinorList items={minorProjects} locale={locale} />
          </div>
        </Section>

        <Section title={tr(ui.experience)}>
          <Entries items={experience} locale={locale} />
        </Section>

        <Section title={tr(ui.involvement)}>
          <Entries items={involvement} locale={locale} />
        </Section>

        <Section title={tr(ui.education)}>
          <Entries items={education} locale={locale} />
        </Section>

        <Section title={tr(ui.skills)}>
          <dl className="border-t border-fg">
            {skills.map((s) => (
              <Row key={s.label.en} term={tr(s.label)}>
                {s.items}
              </Row>
            ))}
            {extras.map((x) => (
              <Row key={x.label.en} term={tr(x.label)}>
                {tr(x.value)}
              </Row>
            ))}
          </dl>
        </Section>
      </main>

      <footer className="mt-20 flex flex-wrap justify-between gap-4 border-t border-rule pt-4 text-xs text-muted">
        <span>© {new Date().getFullYear()} {profile.name}</span>
        <a href={`mailto:${profile.email}`} className="ln">
          {profile.email}
        </a>
      </footer>
    </div>
  );
}
