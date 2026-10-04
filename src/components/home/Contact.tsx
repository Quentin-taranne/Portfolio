import Link from "next/link";
import { profile } from "@/content/profile";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";
import { Button } from "@/components/ui/button";
import { routes } from "@/lib/routes";
import { CopyEmail } from "./CopyEmail";

const link = "inline-flex min-h-6 items-center font-medium underline decoration-1 underline-offset-4 hover:decoration-2";

/** Contact : bloc jaune, adresse en très grand. Le texte est toujours en encre fixe. */
export function Contact({ locale }: { locale: Locale }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-28 sm:scroll-mt-16 bg-signal text-signal-ink [--ring:var(--signal-ink)]">
      <div className="mx-auto max-w-[110rem] px-4 py-20 sm:px-8 lg:py-28">
        <h2 id="contact-title" className="display text-giant">
          {ui.contact[locale]}
        </h2>
        {/* Sur téléphone, l'adresse passe à la ligne avant « @ », jamais au milieu de « .com ». */}
        <p className="mt-8 font-display text-[clamp(1.75rem,5.5vw,5rem)] leading-[1.1] font-extrabold">
          <a href={`mailto:${profile.email}`} className="underline decoration-2 underline-offset-[0.12em] hover:decoration-4">
            {profile.email.split("@")[0]}
            <wbr />@{profile.email.split("@")[1]}
          </a>
        </p>
        <div className="mt-8 flex flex-wrap gap-3 [--background:var(--signal)] [--foreground:var(--signal-ink)] [--primary:var(--signal-ink)] [--primary-foreground:var(--signal)]">
          <CopyEmail email={profile.email} label={ui.copyEmail[locale]} done={ui.copied[locale]} />
          <Button asChild variant="outline" className="border-signal-ink">
            <a href={`mailto:${profile.email}`}>{ui.writeMe[locale]}</a>
          </Button>
          <Button asChild variant="outline" className="border-signal-ink">
            <Link href={routes.cv(locale)}>{ui.cv[locale]}</Link>
          </Button>
        </div>
        <ul className="mt-12 grid gap-x-10 gap-y-5 border-t-2 border-signal-ink pt-6 sm:grid-cols-2 lg:grid-cols-5">
          <li className="lg:col-span-2">
            <span className="data block">Epitech</span>
            <a href={`mailto:${profile.emailSchool}`} className={`${link} [overflow-wrap:anywhere]`}>
              {profile.emailSchool}
            </a>
          </li>
          <li>
            <span className="data block">GitHub</span>
            <a href={profile.links.github} rel="me" className={link}>
              Quentin-taranne
            </a>
          </li>
          <li>
            <span className="data block">LinkedIn</span>
            <a href={profile.links.linkedin} rel="me" className={link}>
              quentin-taranne-payet
            </a>
          </li>
          <li>
            <span className="data block">{locale === "fr" ? "Disponibilité" : "Availability"}</span>
            <span>{ui.available[locale]}</span>
            <span className="block">{ui.internship[locale]}</span>
          </li>
        </ul>
      </div>
    </section>
  );
}
