import { Big_Shoulders, Geist, Geist_Mono } from "next/font/google";

// Uniquement les graisses utilisées : polices plus légères, LCP plus rapide.

// Titres et chiffres : grotesque condensée, façon panneau d'affichage.
export const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  weight: ["800"],
  display: "swap",
  // Pas de métriques connues pour l'ajustement automatique : secours condensé proche.
  adjustFontFallback: false,
  fallback: ["Impact", "Haettenschweiler", "Arial Narrow Bold", "sans-serif"],
});

export const geist = Geist({ variable: "--font-geist", subsets: ["latin"], weight: ["400", "500"], display: "swap" });

// Petites capitales de données (navigation incluse) : préchargées, sinon leur arrivée décale la page (CLS).
export const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], weight: ["400"], display: "swap" });

export const fontClasses = `${bigShoulders.variable} ${geist.variable} ${geistMono.variable}`;
