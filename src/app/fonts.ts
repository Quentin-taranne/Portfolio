import { Big_Shoulders, Geist, Geist_Mono } from "next/font/google";

// Titres et chiffres : grotesque condensée, façon panneau d'affichage.
export const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  // Pas de métriques connues pour l'ajustement automatique : secours condensé proche.
  adjustFontFallback: false,
  fallback: ["Impact", "Haettenschweiler", "Arial Narrow Bold", "sans-serif"],
});

export const geist = Geist({ variable: "--font-geist", subsets: ["latin"], display: "swap" });

export const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

export const fontClasses = `${bigShoulders.variable} ${geist.variable} ${geistMono.variable}`;
