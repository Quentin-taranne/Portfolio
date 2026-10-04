import { TooltipProvider } from "@/components/ui/tooltip";
import { fontClasses } from "../fonts";
import "../globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontClasses} suppressHydrationWarning>
      <body>
        <TooltipProvider delayDuration={300}>{children}</TooltipProvider>
      </body>
    </html>
  );
}
