import { keyFigures } from "@/content/profile";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";

/** Chiffres clés : la valeur en très grand, le libellé dessous. */
export function Figures({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="chiffres-title" className="border-y-2 border-foreground">
      <div className="mx-auto max-w-[110rem] px-4 py-14 sm:px-8 lg:py-20">
        <h2 id="chiffres-title" className="data text-muted-foreground">
          {ui.figures[locale]}
        </h2>
        <dl className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {keyFigures.map((f) => (
            <div key={f.label.en} className="reveal flex flex-col-reverse gap-3 border-t pt-4">
              <dt className="text-muted-foreground">{f.label[locale]}</dt>
              <dd className="display text-[clamp(2.75rem,4.6vw,4.75rem)] whitespace-nowrap tabular">{f.value[locale]}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
