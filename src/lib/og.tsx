import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import type { Locale } from "@/content/types";
import { ui } from "@/content/ui";

export const ogSize = { width: 1200, height: 630 };

const font = (name: string) => readFile(join(process.cwd(), "src/assets/fonts", name));

const PAPER = "#f3f2ee";
const INK = "#1b1a17";
const SIGNAL = "#e4ff3a";

type Props = {
  /** Petite ligne du haut (catégorie, rôle). */
  eyebrow: string;
  title: string;
  /** Résultat mis en avant dans un bloc jaune. */
  result?: string;
  footer: string;
};

/** Image de partage au format 1200 × 630, dans la direction « Classement ». */
export async function renderOg({ eyebrow, title, result, footer }: Props) {
  const [display, mono] = await Promise.all([font("BigShoulders-ExtraBold.woff"), font("GeistMono-Medium.woff")]);
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: PAPER, color: INK, padding: 64 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "Geist Mono", fontSize: 26, letterSpacing: 2, textTransform: "uppercase" }}>
          <span>{eyebrow}</span>
          <span>QTP.</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontFamily: "Big Shoulders", fontSize: title.length > 18 ? 120 : 168, lineHeight: 0.85, textTransform: "uppercase" }}>{title}</div>
          {result && (
            <div style={{ display: "flex" }}>
              <span style={{ background: SIGNAL, padding: "10px 18px 4px", fontFamily: "Big Shoulders", fontSize: 56, textTransform: "uppercase" }}>{result}</span>
            </div>
          )}
        </div>
        <div style={{ display: "flex", borderTop: `4px solid ${INK}`, paddingTop: 20, fontFamily: "Geist Mono", fontSize: 24, letterSpacing: 2, textTransform: "uppercase" }}>
          {footer}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Big Shoulders", data: display, weight: 800, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}

// ---- Contenus des images, par page ----


export const homeOg = (locale: Locale) =>
  renderOg({ eyebrow: profile.role[locale], title: profile.name, result: ui.available[locale], footer: ui.internship[locale] });

export const projectOg = (locale: Locale, slug: string) => {
  const p = projects.find((x) => x.slug === slug)!;
  return renderOg({ eyebrow: p.kind[locale], title: p.name, result: p.result?.[locale], footer: `${p.line[locale]} · ${profile.name}` });
};
