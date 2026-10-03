import type { Metadata } from "next";
import { ui } from "@/content/ui";
import { fontClasses } from "../fonts";
import "../globals.css";

export const metadata: Metadata = {
  title: ui.title.en,
  description: ui.description.en,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClasses}>
      <body>{children}</body>
    </html>
  );
}
