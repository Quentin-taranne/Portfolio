import { ArrowRight } from "lucide-react";
import { timeline, type TimelineType } from "@/content/profile";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Couleur du point selon le type d'étape ; le type est toujours écrit à côté.
const DOT: Record<TimelineType, string> = {
  school: "bg-signal",
  work: "bg-sky",
  competition: "bg-ember",
  project: "bg-foreground",
};

/**
 * Bouton qui ouvre la frise animée en plein écran.
 * Animation en CSS (transform / opacity), rejouée à chaque ouverture, coupée si « réduire les animations ».
 */
export function Timeline({ locale }: { locale: Locale }) {
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
        className="top-0 left-0 h-svh w-screen max-w-none translate-x-0 translate-y-0 overflow-y-auto p-6 sm:max-w-none sm:p-10 lg:p-14"
      >
        <div className="mx-auto w-full max-w-[110rem] lg:flex lg:h-full lg:flex-col lg:justify-center">
          <DialogTitle className="display pr-14 text-[clamp(2rem,4.5vw,4rem)]">{ui.timelineTitle[locale]}</DialogTitle>
          <DialogDescription className="mt-3 text-muted-foreground">{ui.timelineDescription[locale]}</DialogDescription>

          <ol className="relative mt-12 grid gap-10 lg:mt-20 lg:grid-cols-8 lg:gap-6">
            {/* La ligne se trace : verticale sur mobile, horizontale sur grand écran. */}
            <span aria-hidden className="frise-line-y absolute top-0 bottom-0 left-[0.4375rem] w-0.5 bg-foreground lg:hidden" />
            <span aria-hidden className="frise-line-x absolute top-[0.4375rem] right-0 left-0 hidden h-0.5 bg-foreground lg:block" />

            {timeline.map((s, i) => (
              <li key={s.title.en} className="frise-item relative pl-10 lg:pt-10 lg:pl-0" style={{ "--i": i } as React.CSSProperties}>
                <span
                  aria-hidden
                  className={`frise-dot absolute top-0 left-0 size-4 border-2 border-foreground ${s.upcoming ? "bg-background" : DOT[s.type]}`}
                />
                <p className="data text-muted-foreground tabular">{s.when[locale]}</p>
                <h3 className="display mt-2 text-[clamp(1.5rem,2vw,1.875rem)]">{s.title[locale]}</h3>
                {s.detail && <p className="mt-2 text-sm text-muted-foreground">{s.detail[locale]}</p>}
                <p className="data mt-3 text-muted-foreground">
                  {s.upcoming ? ui.upcoming[locale] : ui.timelineTypes[s.type][locale]}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </DialogContent>
    </Dialog>
  );
}
