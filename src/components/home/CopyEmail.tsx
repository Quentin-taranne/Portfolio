"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

type Props = { email: string; label: string; done: string };

/** Copie l'adresse dans le presse-papiers ; le résultat est annoncé aux lecteurs d'écran. */
export function CopyEmail({ email, label, done }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Presse-papiers indisponible : l'adresse reste lisible et sélectionnable à l'écran.
    }
  };

  return (
    <>
      <Tooltip open={copied || undefined}>
        <TooltipTrigger asChild>
          <Button type="button" variant="default" onClick={copy}>
            {copied ? <Check aria-hidden /> : <Copy aria-hidden />}
            {label}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{copied ? done : email}</TooltipContent>
      </Tooltip>
      <span role="status" className="sr-only">
        {copied ? done : ""}
      </span>
    </>
  );
}
