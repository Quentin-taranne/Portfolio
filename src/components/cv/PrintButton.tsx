"use client";

import { Printer } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Ouvre la fenêtre d'impression du navigateur (enregistrement en PDF possible). */
export function PrintButton({ label }: { label: string }) {
  return (
    <Button type="button" variant="outline" onClick={() => window.print()}>
      <Printer aria-hidden />
      {label}
    </Button>
  );
}
