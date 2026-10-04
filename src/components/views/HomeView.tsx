import { BookIntro, introScript } from "@/components/home/BookIntro";
import { Contact } from "@/components/home/Contact";
import { Hero } from "@/components/home/Hero";
import { Journey } from "@/components/home/Journey";
import { ProjectIndex } from "@/components/home/ProjectIndex";
import { Stack } from "@/components/home/Stack";
import { Shell } from "@/components/site/Shell";
import type { Locale } from "@/content/types";
import { otherLocale, routes } from "@/lib/routes";
import { personJsonLd } from "@/lib/seo";

export function HomeView({ locale }: { locale: Locale }) {
  return (
    <>
      {/* Avant tout le reste : décide de l'ouverture « livre » avant le premier affichage. */}
      <script dangerouslySetInnerHTML={{ __html: introScript }} />
      <BookIntro locale={locale} />
      <Shell locale={locale} alternateHref={routes.home(otherLocale(locale))}>
        <script
          type="application/ld+json"
          // JSON-LD sérialisé par nous, sans entrée utilisateur ; « < » échappé par précaution.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(locale)).replace(/</g, "\\u003c") }}
        />
        <Hero locale={locale} />
        <ProjectIndex locale={locale} />
        <Journey locale={locale} />
        <Stack locale={locale} />
        <Contact locale={locale} />
      </Shell>
    </>
  );
}
