import { themeScript } from "@/components/site/ThemeToggle";
import { TooltipProvider } from "@/components/ui/tooltip";
import { fontClasses } from "../fonts";
import "../globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={fontClasses} suppressHydrationWarning>
      <head>
        {/* Thème choisi par le visiteur, appliqué avant le premier affichage. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
