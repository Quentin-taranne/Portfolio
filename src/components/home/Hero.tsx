import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { experience, involvement, offers, profile } from "@/content/profile";
import type { Locale, T } from "@/content/types";
import { ui } from "@/content/ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

// En ce moment : le poste et la responsabilité en cours (mêmes données que la page Parcours).
const current = [experience[0], involvement[0]];

/** Ligne « recherche » : lien sur toute la ligne, intitulé, détail, action écrite à droite. */
function Wanted({ href, title, detail, action, color, locale }: { href: string; title: T; detail: T; action: T; color: string; locale: Locale }) {
  const Tag = href.startsWith("mailto:") ? "a" : Link;
  return (
    <li className="border-b">
      <Tag
        href={href}
        className="group grid gap-x-6 gap-y-2 py-4 transition-colors duration-300 hover:bg-muted/60 focus-visible:bg-muted/60 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
      >
        <span className="min-w-0">
          <span className="flex items-center gap-2.5 text-lg font-medium">
            <span aria-hidden className={`size-2.5 shrink-0 border border-foreground ${color}`} />
            {title[locale]}
          </span>
          <span className="mt-1 block text-muted-foreground">{detail[locale]}</span>
        </span>
        <span className="data inline-flex items-center gap-1.5 text-foreground">
          {action[locale]}
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Tag>
    </li>
  );
}

export function Hero({ locale }: { locale: Locale }) {
  const [first, ...rest] = profile.name.split(" ");
  const quote = `mailto:${profile.email}?subject=${encodeURIComponent(ui.quoteSubject[locale])}`;

  return (
    <section aria-labelledby="hero-title" className="mx-auto grid max-w-[110rem] gap-12 px-4 pt-10 pb-16 sm:px-8 lg:min-h-[calc(100svh-3.5rem)] lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-12">
      <div className="lg:col-span-7">
        <p className="data text-muted-foreground">{profile.role[locale]}</p>
        <h1 id="hero-title" className="display mt-4 text-[clamp(3.25rem,10vw,10.5rem)]">
          <span className="block">{first}</span>
          <span className="block">{rest.join(" ")}</span>
        </h1>
        <ul className="mt-8 flex flex-wrap gap-2" aria-label={locale === "fr" ? "Disponibilités" : "Availability"}>
          <li>
            <Badge variant="signal" className="px-3 py-2">
              {ui.available[locale]}
            </Badge>
          </li>
          <li>
            <Badge variant="sky" className="px-3 py-2">
              {ui.internship[locale]}
            </Badge>
          </li>
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="#projets">{ui.projects[locale]}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="#contact">{ui.contact[locale]}</Link>
          </Button>
        </div>
      </div>

      {/* À droite : ce qui est recherché, puis ce qui est en cours. Texte courant, filets fins. */}
      <div className="space-y-10 lg:col-span-5 lg:pb-2">
        <section aria-labelledby="hero-wanted">
          <h2 id="hero-wanted" className="data mb-3 text-muted-foreground">
            {ui.lookingFor[locale]}
          </h2>
          <ul className="border-t border-foreground">
            <Wanted href={quote} title={offers.freelance.title} detail={offers.freelance.detail} action={ui.askQuote} color="bg-signal" locale={locale} />
            <Wanted href={routes.cv(locale)} title={offers.internship.title} detail={offers.internship.detail} action={ui.viewCv} color="bg-sky" locale={locale} />
          </ul>
        </section>

        <section aria-labelledby="hero-now">
          <h2 id="hero-now" className="data mb-3 text-muted-foreground">
            {ui.now[locale]}
          </h2>
          <ul className="border-t border-foreground">
            {current.map((e) => (
              <li key={e.title.en} className="border-b py-3">
                <p>
                  <span className="font-medium">{e.title[locale]}</span>
                  <span className="text-muted-foreground"> · {e.org[locale]}</span>
                </p>
                {e.detail && <p className="mt-0.5 text-sm text-muted-foreground">{e.detail[locale]}</p>}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </section>
  );
}
