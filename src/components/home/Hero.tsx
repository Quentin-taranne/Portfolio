import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { experience, involvement, offers, profile } from "@/content/profile";
import type { Entry, Locale, T } from "@/content/types";
import { ui } from "@/content/ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { HeroReveal } from "./HeroReveal";

/**
 * Avant le premier affichage : prépare l'animation des infos de droite (sauf « réduire les animations »).
 * Sans JS, rien n'est masqué. Filet de sécurité : si le script de la page ne démarre pas (« ready » jamais posé),
 * tout s'affiche au bout de 4 s.
 */
export const heroScript = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){var h=document.documentElement;h.dataset.hero="wait";setTimeout(function(){if(h.dataset.hero==="wait"&&h.dataset.intro!=="1")h.dataset.hero="go"},4000)}}catch(e){}`;

// En ce moment : le poste et la responsabilité en cours (mêmes données que la page Parcours).
const current = [experience[0], involvement[0]];

/** Délai d'un élément dans la composition (ms). */
const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/** Texte qui monte depuis sa ligne de base (masque + translation). */
function Line({ at, className = "", children }: { at: number; className?: string; children: React.ReactNode }) {
  return (
    <span className={`h-mask block ${className}`}>
      <span className="h-line block" style={d(at)}>
        {children}
      </span>
    </span>
  );
}

/** Ligne « recherche » : lien sur toute la ligne, intitulé, détail, action écrite à droite. */
function Wanted({ at, href, title, detail, action, color, live, locale }: { at: number; href: string; title: T; detail: T; action: T; color: string; live?: boolean; locale: Locale }) {
  const Tag = href.startsWith("mailto:") ? "a" : Link;
  return (
    <li className="relative">
      <Tag
        href={href}
        className="group grid gap-x-6 gap-y-2 py-4 transition-colors duration-300 hover:bg-muted/60 focus-visible:bg-muted/60 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center"
      >
        <span className="min-w-0">
          <span className="flex items-center gap-2.5 text-lg font-medium">
            <span aria-hidden className={`h-stamp relative size-2.5 shrink-0 border border-foreground ${color} ${live ? "h-live" : ""}`} style={d(at)} />
            <Line at={at + 40}>{title[locale]}</Line>
          </span>
          <Line at={at + 120} className="mt-1 text-muted-foreground">
            {detail[locale]}
          </Line>
        </span>
        <span className="h-arrow data inline-flex items-center gap-1.5 text-foreground" style={d(at + 260)}>
          {action[locale]}
          <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </Tag>
      <span aria-hidden className="h-rule absolute inset-x-0 bottom-0 h-px bg-border" style={d(at + 180)} />
    </li>
  );
}

/** Ligne « en ce moment ». */
function Now({ at, entry, locale }: { at: number; entry: Entry; locale: Locale }) {
  return (
    <li className="relative py-3">
      <Line at={at}>
        <span className="font-medium">{entry.title[locale]}</span>
        <span className="text-muted-foreground"> · {entry.org[locale]}</span>
      </Line>
      {entry.detail && (
        <Line at={at + 80} className="mt-0.5 text-sm text-muted-foreground">
          {entry.detail[locale]}
        </Line>
      )}
      <span aria-hidden className="h-rule absolute inset-x-0 bottom-0 h-px bg-border" style={d(at + 140)} />
    </li>
  );
}

/** Titre de groupe et filet supérieur, qui se trace. */
function Group({ id, at, title, className = "", children }: { id: string; at: number; title: string; className?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={id} data-reveal className={className}>
      <h2 id={id} className="data mb-3 text-muted-foreground">
        <Line at={at}>{title}</Line>
      </h2>
      <span aria-hidden className="h-rule block h-px bg-foreground" style={d(at + 60)} />
      <ul>{children}</ul>
    </section>
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

      {/* À droite : ce qui est recherché, puis ce qui est en cours. Composition animée (voir globals.css). */}
      <div data-hero-block className="space-y-10 lg:col-span-5 lg:pb-2">
        <HeroReveal />
        <Group id="hero-wanted" at={0} title={ui.lookingFor[locale]}>
          <Wanted at={200} href={quote} title={offers.freelance.title} detail={offers.freelance.detail} action={ui.askQuote} color="bg-signal" live locale={locale} />
          <Wanted at={460} href={routes.cv(locale)} title={offers.internship.title} detail={offers.internship.detail} action={ui.viewCv} color="bg-sky" locale={locale} />
        </Group>
        {/* Groupe déclenché à part (au défilement sur téléphone) ; sur ordinateur, il suit le premier. */}
        <Group id="hero-now" at={0} title={ui.now[locale]} className="lg:[--g:760ms]">
          {current.map((e, i) => (
            <Now key={e.title.en} at={140 + i * 180} entry={e} locale={locale} />
          ))}
        </Group>
      </div>
    </section>
  );
}
