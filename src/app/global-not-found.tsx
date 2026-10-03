import type { Metadata } from "next";
import Link from "next/link";
import { fontClasses } from "./fonts";
import "./globals.css";

export const metadata: Metadata = { title: "404" };

export default function GlobalNotFound() {
  return (
    <html lang="fr" className={fontClasses}>
      <body>
        <main className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-wider text-muted">404</p>
          <p className="mt-3">Page introuvable · Page not found</p>
          <p className="mt-6 flex gap-4 text-sm">
            <Link href="/" className="ln">Accueil</Link>
            <Link href="/en" className="ln">Home</Link>
          </p>
        </main>
      </body>
    </html>
  );
}
