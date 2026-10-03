import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { coverOf } from "@/components/media/MediaView";
import { routes } from "@/lib/routes";

// Ordre visuel d'un podium : 2e, 1er, 3e.
const ORDER = [2, 1, 3] as const;
const HEIGHT: Record<1 | 2 | 3, string> = { 1: "h-full", 2: "h-[80%]", 3: "h-[64%]" };
// Une couleur par marche ; le rang reste écrit en chiffres.
const COLOR: Record<1 | 2 | 3, string> = { 1: "bg-signal", 2: "bg-sky", 3: "bg-ember" };

export function Hero({ locale }: { locale: Locale }) {
  const [first, ...rest] = profile.name.split(" ");
  const ranked = ORDER.map((rank) => projects.find((p) => p.rank === rank)!);

  return (
    <section aria-labelledby="hero-title" className="mx-auto grid max-w-[110rem] gap-10 px-4 pt-10 pb-16 sm:px-8 lg:min-h-[calc(100svh-3.5rem)] lg:grid-cols-12 lg:items-end lg:gap-8 lg:pb-12">
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

      <div className="lg:col-span-5">
        <h2 className="data mb-3 text-muted-foreground">
          {ui.podium[locale]} <span className="sr-only">· {ui.podiumHint[locale]}</span>
        </h2>
        <ol className="flex h-[19rem] items-end gap-2 overflow-hidden sm:h-[26rem] lg:h-[32rem]">
          {ranked.map((p) => {
            const rank = p.rank!;
            const cover = coverOf(p.media);
            return (
              <li key={p.slug} className={`rise ${HEIGHT[rank]} flex-1`} style={{ "--delay": `${(3 - rank) * 140 + 150}ms` } as React.CSSProperties}>
                <Link
                  href={routes.project(locale, p.slug)}
                  className={`group flex h-full flex-col overflow-hidden border border-signal-ink p-3 text-signal-ink [--ring:var(--signal-ink)] focus-visible:outline-offset-[-7px] sm:p-4 ${COLOR[rank]}`}
                >
                  <span className="display text-[clamp(4.5rem,11vw,10rem)] leading-[0.75] tabular">
                    {rank}
                    <span className="align-top text-[0.32em]">{ui.rankSuffix[rank][locale]}</span>
                  </span>
                  {/* Zone image : jamais de texte par-dessus. */}
                  <span className="relative my-3 block flex-1 overflow-hidden" aria-hidden>
                    {cover && (
                      <Image
                        src={cover.src}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 14vw, 33vw"
                        className="scale-105 object-cover opacity-0 transition-[opacity,transform] duration-500 ease-out-quart group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                      />
                    )}
                  </span>
                  <span>
                    <span className="block font-medium leading-tight">{p.name.split(" · ")[0]}</span>
                    <span className="data mt-1 block">{p.result?.[locale]}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
