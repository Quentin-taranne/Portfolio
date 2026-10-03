import Link from "next/link";
import type { ReactNode } from "react";
import { profile } from "@/content/profile";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { otherLocale, routes } from "@/lib/routes";

type Props = {
  locale: Locale;
  /** Même page dans l'autre langue. */
  alternateHref: string;
  children: ReactNode;
};

const navLink =
  "data inline-flex min-h-11 min-w-11 items-center justify-center underline-offset-4 decoration-2 hover:underline hover:decoration-signal-ink";

/** Enveloppe commune : lien d'évitement, en-tête, contenu principal, pied de page. */
export function Shell({ locale, alternateHref, children }: Props) {
  const home = routes.home(locale);
  const other = otherLocale(locale);

  return (
    <>
      <a
        href="#contenu"
        className="data fixed top-2 left-2 z-[100] -translate-y-24 bg-signal px-4 py-3 text-signal-ink focus-visible:translate-y-0"
      >
        {ui.skip[locale]}
      </a>

      <header className="sticky top-0 z-40 border-b bg-background">
        <div className="mx-auto flex max-w-[110rem] flex-wrap items-center justify-between gap-x-6 px-4 sm:px-8">
          <Link href={home} className="display inline-flex min-h-11 items-center text-2xl" aria-label={`${profile.name} · ${ui.home[locale]}`}>
            QTP<span className="text-muted-foreground">.</span>
          </Link>
          <nav aria-label={ui.navLabel[locale]}>
            <ul className="flex flex-wrap items-center gap-x-5 sm:gap-x-8">
              <li>
                <Link href={`${home}#projets`} className={navLink}>
                  {ui.projects[locale]}
                </Link>
              </li>
              <li className="hidden sm:block">
                <Link href={`${home}#parcours`} className={navLink}>
                  {ui.journey[locale]}
                </Link>
              </li>
              <li>
                <Link href={`${home}#contact`} className={navLink}>
                  {ui.contact[locale]}
                </Link>
              </li>
              <li>
                <Link href={alternateHref} hrefLang={other} lang={other} className={navLink} aria-label={ui.switchToLabel[locale]}>
                  {other.toUpperCase()}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="contenu" tabIndex={-1} className="outline-none">
        {children}
      </main>

      <footer className="border-t">
        <div className="mx-auto flex max-w-[110rem] flex-wrap items-center justify-between gap-x-8 gap-y-2 px-4 py-6 sm:px-8">
          <p className="data text-muted-foreground">
            © {new Date().getFullYear()} {profile.name}
          </p>
          <ul className="flex flex-wrap gap-x-6">
            <li>
              <a href={`mailto:${profile.email}`} className={navLink}>
                Email
              </a>
            </li>
            <li>
              <a href={profile.links.github} className={navLink} rel="me">
                GitHub
              </a>
            </li>
            <li>
              <a href={profile.links.linkedin} className={navLink} rel="me">
                LinkedIn
              </a>
            </li>
            <li>
              <Link href={routes.accessibility(locale)} className={navLink}>
                {ui.accessibility[locale]}
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </>
  );
}
