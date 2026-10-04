import { profile } from "@/content/profile";
import type { Locale } from "@/content/types";
import { BookIntroController } from "./BookIntroController";

const KEY = "qtp-intro";

/**
 * Script exécuté avant le premier affichage : active l'ouverture une seule fois par visite,
 * jamais avec « réduire les animations », jamais sur téléphone (< 768 px). Sans JS, rien ne s'affiche.
 */
export const introScript = `try{if(!sessionStorage.getItem("${KEY}")&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&matchMedia("(min-width: 768px)").matches){document.documentElement.dataset.intro="1"}sessionStorage.setItem("${KEY}","1")}catch(e){}`;

const subtitle = { fr: "Développeur · Epitech", en: "Developer · Epitech" };
const hint = { fr: "Cliquer pour entrer", en: "Click to enter" };

/**
 * Couverture de livre sur l'accueil : fermée jusqu'au clic (ou une touche, ou la molette), puis elle s'ouvre.
 * Calque décoratif (aria-hidden) : le site est déjà chargé dessous et lisible par les lecteurs d'écran.
 */
export function BookIntro({ locale }: { locale: Locale }) {
  const [first, ...rest] = profile.name.split(" ");

  return (
    <>
      <BookIntroController />
      <div aria-hidden className="book-intro pointer-events-none fixed inset-0 z-[90]">
        <div className="book-cover absolute inset-0">
          {/* Face avant : tri-band (bande auteur, bande titre encadrée, bande éditeur) et dos à gauche. */}
          <div className="book-face absolute inset-0 flex bg-background text-foreground">
            <div className="flex w-10 shrink-0 items-center justify-center border-r-2 border-foreground bg-foreground sm:w-14">
              <span className="data rotate-180 whitespace-nowrap text-background [writing-mode:vertical-rl]">
                {profile.name} — Portfolio
              </span>
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex basis-[24%] items-center justify-center border-b-2 border-foreground bg-signal px-6 text-signal-ink">
                <p className="display text-center text-[clamp(1.5rem,3.4vw,2.75rem)] tracking-[0.06em]">
                  {first} {rest.join(" ")}
                </p>
              </div>
              <div className="flex flex-1 items-center justify-center p-5 sm:p-10">
                <div className="flex h-full w-full flex-col items-center justify-center border border-foreground p-2">
                  <div className="flex h-full w-full flex-col items-center justify-center gap-6 border-2 border-foreground px-4 text-center">
                    <p className="display text-[clamp(3.5rem,13vw,11rem)]">Portfolio</p>
                    <span className="block h-0.5 w-16 bg-foreground" />
                    <p className="data text-muted-foreground">{subtitle[locale]}</p>
                    <p className="display text-[clamp(1.25rem,2.4vw,2rem)] tabular">2024 → 2027</p>
                    <p className="book-hint data mt-4 border-2 border-foreground bg-signal px-4 py-2 text-signal-ink">{hint[locale]}</p>
                  </div>
                </div>
              </div>
              <div className="flex basis-[16%] items-center justify-center border-t-2 border-foreground bg-foreground">
                <span className="display border-2 border-background px-4 pt-1.5 pb-0.5 text-2xl text-background sm:text-3xl">QTP.</span>
              </div>
            </div>
            <div className="book-shade absolute inset-0 bg-black" />
          </div>
          {/* Revers : page de garde, visible pendant la rotation. */}
          <div className="book-back absolute inset-0 bg-sky" />
        </div>
      </div>
    </>
  );
}
