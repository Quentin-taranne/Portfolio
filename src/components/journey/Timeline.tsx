import { ArrowRight } from "lucide-react";
import { education, experience, involvement, nextInternship } from "@/content/profile";
import type { Entry, Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

/** Échelle de la frise, en mois (« AAAA-MM »). */
const AXIS = { from: "2024-09", to: "2027-09" };

/** « AAAA-MM » → nombre de mois ; « AAAA » seul → janvier (ramené au début de l'échelle). */
const month = (d: string) => {
  const [y, m] = d.split("-").map(Number);
  return y * 12 + (m ? m - 1 : 0);
};
const START = month(AXIS.from);
const END = month(AXIS.to);
/** Position en % sur l'échelle, bornée. */
const pos = (m: number) => Math.min(100, Math.max(0, ((m - START) / (END - START)) * 100));

// Date de génération de la page : la frise est recalculée à chaque déploiement.
const now = new Date();
const TODAY = now.getFullYear() * 12 + now.getMonth() + (now.getDate() - 1) / 31;

const years = Array.from({ length: Number(AXIS.to.slice(0, 4)) - Number(AXIS.from.slice(0, 4)) + 1 }, (_, i) => Number(AXIS.from.slice(0, 4)) + i);

type Group = { title: string; color: string; items: Entry[] };

const byStart = (a: Entry, b: Entry) => month(a.span!.from) - month(b.span!.from);

/** Barre d'une entrée : début → fin (ou aujourd'hui si en cours), changement de rôle marqué par une graduation. */
function Bar({ entry, color, index, locale }: { entry: Entry; color: string; index: number; locale: Locale }) {
  const span = entry.span!;
  const from = pos(month(span.from));
  // Le mois de fin est inclus.
  const end = span.to ? month(span.to) + 1 : TODAY;
  const to = pos(end);
  const upcoming = entry === nextInternship;
  const clipped = end > END;
  const step = span.step ? ((pos(month(span.step.at)) - from) / (to - from)) * 100 : null;

  return (
    <span
      aria-hidden
      className={`frise-bar absolute top-1/2 -mt-[7px] h-3.5 min-w-2 border border-foreground ${upcoming ? "border-dashed bg-transparent" : color} ${clipped ? "border-r-0" : ""}`}
      style={{ left: `${from}%`, width: `${to - from}%`, "--i": index } as React.CSSProperties}
    >
      {/* Avant le changement de rôle : même couleur, éclaircie. */}
      {step !== null && (
        <>
          <span className="absolute inset-y-0 left-0 border-r border-foreground bg-background/60" style={{ width: `${step}%` }} />
          <span className="data absolute bottom-full mb-1 hidden whitespace-nowrap text-muted-foreground md:block" style={{ left: `${step}%` }}>
            {span.step!.label[locale]}
          </span>
        </>
      )}
    </span>
  );
}

/**
 * Frise : expérience, engagement et diplôme sur une même échelle de temps.
 * Chaque ligne est du texte (intitulé, organisation, période) ; les barres sont un repère visuel.
 * Animation en CSS (transform / opacity), rejouée à chaque ouverture, coupée si « réduire les animations ».
 */
export function Timeline({ locale }: { locale: Locale }) {
  const groups: Group[] = [
    { title: ui.experience[locale], color: "bg-sky", items: [...[...experience].sort(byStart), nextInternship] },
    { title: ui.involvement[locale], color: "bg-ember", items: [...involvement].sort(byStart) },
    { title: ui.education[locale], color: "bg-signal", items: education },
  ];
  const today = new Intl.DateTimeFormat(locale === "fr" ? "fr-FR" : "en-GB", { month: "short", year: "numeric" }).format(now);
  let row = 0;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="signal" size="lg">
          {ui.openTimeline[locale]}
          <ArrowRight aria-hidden />
        </Button>
      </DialogTrigger>
      <DialogContent
        closeLabel={ui.close[locale]}
        className="top-0 left-0 h-svh w-screen max-w-none translate-x-0 translate-y-0 overflow-y-auto p-6 sm:max-w-none sm:p-10 lg:px-14 lg:py-12"
      >
        <div className="mx-auto w-full max-w-[110rem] min-w-0 lg:flex lg:min-h-full lg:flex-col lg:justify-center">
          <DialogTitle className="display pr-14 text-[clamp(2rem,3.8vw,3.5rem)]">{ui.timelineTitle[locale]}</DialogTitle>
          <DialogDescription className="mt-3 text-muted-foreground">{ui.timelineDescription[locale]}</DialogDescription>

          {/* Petit écran : le texte, puis la barre sur toute la largeur. À partir de md : texte à gauche, échelle à droite. */}
          <div className="mt-8 lg:mt-10">
            <div className="relative pt-7 [--track:0px] md:[--track:calc(var(--label)+1.5rem)] md:[--label:13rem] lg:[--label:19rem]">
              {/* Graduations : une ligne par 1er janvier, et la date du jour. */}
              <div aria-hidden className="pointer-events-none absolute inset-y-0 right-0 left-(--track)">
                {years.slice(1).map((y) => (
                  <span key={y} className="absolute inset-y-0 w-px bg-border" style={{ left: `${pos(y * 12)}%` }} />
                ))}
                <span className="frise-today absolute top-0 bottom-0 w-0.5 bg-foreground" style={{ left: `${pos(TODAY)}%` }}>
                  <span className="data absolute top-0 right-2 whitespace-nowrap text-foreground md:right-auto md:left-2">
                    {ui.today[locale]} · {today}
                  </span>
                </span>
              </div>

              {/* Années, centrées sur leur portion d'échelle. */}
              <div aria-hidden className="grid gap-x-6 border-b border-foreground pb-2 md:grid-cols-[var(--label)_minmax(0,1fr)]">
                <span className="hidden md:block" />
                <span className="relative h-5">
                  {years.map((y) => {
                    const a = pos(y * 12);
                    const b = pos((y + 1) * 12);
                    return (
                      <span key={y} className="data absolute top-0 -translate-x-1/2 text-muted-foreground tabular" style={{ left: `${(a + b) / 2}%` }}>
                        {y}
                      </span>
                    );
                  })}
                </span>
              </div>

              <div className="pt-4">
                {groups.map((g) => (
                  <section key={g.title} aria-label={g.title} className="mt-4 first:mt-0">
                    <h3 className="data flex items-center gap-2 border-b py-2 text-muted-foreground">
                      <span aria-hidden className={`size-2.5 border border-foreground ${g.color}`} />
                      {g.title}
                    </h3>
                    <ol>
                      {g.items.map((e) => (
                        <li key={e.title.en} className="grid gap-x-6 border-b py-2 md:grid-cols-[var(--label)_minmax(0,1fr)]">
                          {/* Le texte passe devant les graduations (petit écran : elles traversent la ligne). */}
                          <div className="relative *:w-fit *:bg-background">
                            <p className="font-medium">{e.title[locale]}</p>
                            <p className="text-sm text-muted-foreground">
                              {e.org[locale]} · {e.period?.[locale]}
                            </p>
                            {/* Changement de rôle : écrit sur petit écran, marqué sur la barre ensuite. */}
                            {e.span?.step && e.detail && <p className="text-sm text-muted-foreground md:sr-only">{e.detail[locale]}</p>}
                          </div>
                          <div className="relative h-6 md:h-auto">
                            <Bar entry={e} color={g.color} index={row++} locale={locale} />
                          </div>
                        </li>
                      ))}
                    </ol>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
