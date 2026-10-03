import Link from "next/link";
import { Shell } from "@/components/site/Shell";
import { accessibilityStatement } from "@/content/accessibility";
import { profile } from "@/content/profile";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { otherLocale, routes } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export function accessibilityMetadata(locale: Locale) {
  return pageMetadata({
    locale,
    title: `${ui.accessibilityTitle[locale]} · ${profile.name}`,
    description:
      locale === "fr"
        ? "État de conformité au RGAA 4.1.2 du site de Quentin Taranne Payet."
        : "RGAA 4.1.2 compliance status of Quentin Taranne Payet's website.",
    paths: { fr: routes.accessibility("fr"), en: routes.accessibility("en") },
  });
}

export function AccessibilityView({ locale }: { locale: Locale }) {
  const s = accessibilityStatement;
  return (
    <Shell locale={locale} alternateHref={routes.accessibility(otherLocale(locale))}>
      <article className="mx-auto max-w-4xl px-4 pt-10 pb-24 sm:px-8">
        <Link href={routes.home(locale)} className="data inline-flex min-h-11 items-center underline-offset-4 hover:underline">
          ← {ui.home[locale]}
        </Link>
        <h1 className="display mt-6 text-title">{ui.accessibilityTitle[locale]}</h1>
        <p className="data mt-4 text-muted-foreground">
          {locale === "fr" ? "Mise à jour" : "Updated"} : {s.updated[locale]}
        </p>
        {s.sections.map((sec) => (
          <section key={sec.title.en} className="mt-10 border-t-2 border-foreground pt-5">
            <h2 className="display text-[clamp(1.75rem,3vw,2.5rem)]">{sec.title[locale]}</h2>
            {sec.body.map((b) => (
              <p key={b.en} className="mt-3 max-w-prose text-lead">
                {b[locale]}
              </p>
            ))}
          </section>
        ))}
        <p className="mt-10 text-lead">
          <a href={`mailto:${profile.email}`} className="font-medium underline decoration-1 underline-offset-4 hover:decoration-2">
            {profile.email}
          </a>
        </p>
      </article>
    </Shell>
  );
}
