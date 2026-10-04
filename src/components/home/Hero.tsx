import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { offers, profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Locale, T } from "@/content/types";
import { ui } from "@/content/ui";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

type Row = { label: T; value: T };

/**
 * Carte d'une offre : bandeau coloré (intitulé + état), titre, lignes d'information, action.
 * La couleur est un repère : l'intitulé est toujours écrit dans le bandeau.
 */
function Offer({ id, label, status, title, rows, color, children, locale }: { id: string; label: string; status: string; title: string; rows: Row[]; color: string; children: React.ReactNode; locale: Locale }) {
  return (
    <section aria-labelledby={id} className="flex flex-col border border-foreground bg-card">
      <div className={`flex items-baseline justify-between gap-4 border-b border-foreground px-5 py-2.5 text-signal-ink ${color}`}>
        <h2 id={id} className="data font-medium">
          {label}
        </h2>
        <p className="data tabular">{status}</p>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="display text-balance text-[clamp(1.5rem,2.3vw,2.125rem)]">{title}</p>
        <dl className="mt-4 text-sm">
          {rows.map((r) => (
            <div key={r.label.en} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3 border-t py-2">
              <dt className="data pt-0.5 text-muted-foreground">{r.label[locale]}</dt>
              <dd>{r.value[locale]}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-4">{children}</div>
      </div>
    </section>
  );
}

/** Haut de l'accueil : nom, puis ce que je propose en freelance et le stage recherché. */
export function Hero({ locale }: { locale: Locale }) {
  const [first, ...rest] = profile.name.split(" ");
  const { freelance, internship } = offers;
  const example = projects.find((p) => p.slug === freelance.example)!;

  return (
    <section aria-labelledby="hero-title" className="mx-auto grid max-w-[110rem] gap-10 px-4 pt-10 pb-16 sm:px-8 lg:min-h-[calc(100svh-3.5rem)] lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-12">
      <div className="lg:col-span-6 xl:col-span-7">
        <p className="data text-muted-foreground">{profile.role[locale]}</p>
        <h1 id="hero-title" className="display mt-4 text-[clamp(3.25rem,9vw,10.5rem)]">
          <span className="block">{first}</span>
          <span className="block">{rest.join(" ")}</span>
        </h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="#projets">{ui.projects[locale]}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="#contact">{ui.contact[locale]}</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-6 lg:grid-cols-1 xl:col-span-5">
        <Offer
          id="offer-freelance"
          label={ui.freelance[locale]}
          status={freelance.status[locale]}
          title={freelance.title[locale]}
          rows={freelance.rows}
          color="bg-signal"
          locale={locale}
        >
          <Button asChild variant="signal" size="sm">
            <a href={`mailto:${profile.email}?subject=${encodeURIComponent(ui.quoteSubject[locale])}`}>{ui.askQuote[locale]}</a>
          </Button>
          <Link href={routes.project(locale, example.slug)} className="group inline-flex min-h-6 items-center gap-1 text-sm underline-offset-4 hover:underline">
            <span className="data text-muted-foreground">{ui.onlineExample[locale]}</span>
            <span className="font-medium">{example.name}</span>
            <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 ease-out-quart group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </Offer>
        <Offer
          id="offer-internship"
          label={ui.internshipTitle[locale]}
          status={internship.status[locale]}
          title={internship.title[locale]}
          rows={internship.rows}
          color="bg-sky"
          locale={locale}
        >
          <Button asChild variant="outline" size="sm">
            <Link href={routes.cv(locale)}>{ui.viewCv[locale]}</Link>
          </Button>
        </Offer>
      </div>
    </section>
  );
}
