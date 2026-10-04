import { Download } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";

/** Fichiers générés par `npm run cv:pdf`. */
const PDF = { fr: "/cv/CV-Quentin-Taranne-Payet-FR.pdf", en: "/cv/CV-Quentin-Taranne-Payet-EN.pdf" } as const;
const PREVIEW = { fr: "/cv/cv-preview-fr.png", en: "/cv/cv-preview-en.png" } as const;

/** Code-barres décoratif, dérivé d'une chaîne (toujours le même dessin). */
function Barcode({ seed }: { seed: string }) {
  const bars = Array.from(seed.repeat(6)).map((c, i) => ((c.charCodeAt(0) * (i + 7)) % 4) + 1);
  let x = 0;
  return (
    <svg aria-hidden viewBox={`0 0 ${bars.reduce((a, w) => a + w * 2, 0)} 40`} className="h-10 w-36 text-background" preserveAspectRatio="none">
      {bars.map((w, i) => {
        const rect = <rect key={i} x={x} y={0} width={w} height={40} fill="currentColor" />;
        x += w * 2;
        return rect;
      })}
    </svg>
  );
}

/** Quatrième de couverture : le dos du livre dont la couverture s'ouvre au chargement. Mène au CV. */
export function BackCover({ locale }: { locale: Locale }) {
  const ranks = projects
    .filter((p) => p.rank)
    .sort((a, b) => a.rank! - b.rank!)
    .map((p) => `${p.rank}${ui.rankSuffix[p.rank!][locale]} ${p.name.split(" · ")[0]}`)
    .join(" · ");
  const facts = [profile.role[locale], ui.available[locale], ui.internship[locale], ranks];

  return (
    <section aria-labelledby="cv-title" className="mx-auto max-w-[110rem] px-4 pb-20 sm:px-8 lg:pb-28">
      <div className="reveal flex border-2 border-foreground">
        <div className="flex flex-1 flex-col">
          <div className="grid gap-8 p-5 sm:p-8 md:grid-cols-[minmax(0,15rem)_1fr] md:items-center lg:gap-12 lg:p-12">
            <Link href={routes.cv(locale)} className="group block border bg-white" tabIndex={-1} aria-hidden>
              <Image
                src={PREVIEW[locale]}
                alt=""
                width={794}
                height={1123}
                sizes="15rem"
                className="h-auto w-full transition-transform duration-500 ease-out-quart group-hover:-translate-y-1"
              />
            </Link>
            <div>
              <p className="data text-muted-foreground">{ui.backCover[locale]}</p>
              <h2 id="cv-title" className="display mt-2 text-[clamp(2.25rem,4.5vw,4rem)]">
                {ui.cv[locale]}
              </h2>
              <ul className="mt-5 space-y-2 border-t pt-4">
                {facts.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 bg-foreground" />
                    {f}
                  </li>
                ))}
              </ul>
              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild variant="signal">
                  <a href={PDF[locale]} download>
                    <Download aria-hidden />
                    {ui.downloadPdf[locale]}
                  </a>
                </Button>
                <Button asChild variant="outline">
                  <Link href={routes.cv(locale)}>{ui.viewCv[locale]}</Link>
                </Button>
              </div>
            </div>
          </div>
          {/* Bande « éditeur », comme au dos d'un livre : code-barres, marque, format. */}
          <div className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t-2 border-foreground bg-foreground px-5 py-3 text-background sm:px-8 lg:px-12">
            <Barcode seed="QTP2026" />
            <span className="data">{ui.cvFormat[locale]}</span>
            <span className="display border-2 border-background px-3 pt-1 pb-0.5 text-xl">QTP.</span>
          </div>
        </div>
        {/* Dos du livre, à droite : miroir de la couverture d'ouverture. */}
        <div className="hidden w-14 shrink-0 items-center justify-center border-l-2 border-foreground bg-foreground sm:flex">
          <span className="data whitespace-nowrap text-background [writing-mode:vertical-rl]">{profile.name} — Portfolio</span>
        </div>
      </div>
    </section>
  );
}
