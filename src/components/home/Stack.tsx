import { extras, skills } from "@/content/profile";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { Badge } from "@/components/ui/badge";

/** Stack en badges groupés, puis langues et hors code. */
export function Stack({ locale }: { locale: Locale }) {
  return (
    <section aria-labelledby="stack-title" className="mx-auto max-w-[110rem] px-4 pb-20 sm:px-8 lg:pb-28">
      <h2 id="stack-title" className="data mb-3 text-muted-foreground">
        {ui.skills[locale]}
      </h2>
      <dl className="border-t-2 border-foreground">
        {skills.map((s) => (
          <div key={s.label.en} className="grid gap-3 border-b py-4 md:grid-cols-[14rem_1fr]">
            <dt className="font-medium">{s.label[locale]}</dt>
            <dd>
              <ul className="flex flex-wrap gap-1.5">
                {s.items.split(", ").map((item) => (
                  <li key={item}>
                    <Badge>{item}</Badge>
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
        {extras.map((x) => (
          <div key={x.label.en} className="grid gap-3 border-b py-4 md:grid-cols-[14rem_1fr]">
            <dt className="font-medium">{x.label[locale]}</dt>
            <dd className="text-muted-foreground">{x.value[locale]}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
