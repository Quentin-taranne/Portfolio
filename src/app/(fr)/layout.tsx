import type { Metadata } from "next";
import { ui } from "@/content/ui";
import { fontClasses } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: ui.title.fr,
  description: ui.description.fr,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={fontClasses}>
      <body>{children}</body>
    </html>
  );
}
