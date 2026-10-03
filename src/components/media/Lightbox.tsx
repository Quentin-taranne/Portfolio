"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  enlargeLabel: string;
  closeLabel: string;
};

/** Vignette cliquable qui ouvre l'image en grand (Dialog Radix : focus piégé, Échap, retour du focus). */
export function Lightbox({ src, alt, width, height, sizes, enlargeLabel, closeLabel }: Props) {
  return (
    <Dialog>
      <DialogTrigger className="group relative block w-full cursor-zoom-in text-left">
        <Image src={src} alt={alt} width={width} height={height} sizes={sizes} className="h-auto w-full border" />
        <span className="data absolute top-2 right-2 inline-flex items-center gap-1.5 bg-signal px-2 py-1.5 text-signal-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="size-3.5" aria-hidden />
          {enlargeLabel}
        </span>
      </DialogTrigger>
      <DialogContent closeLabel={closeLabel} className="max-h-[92svh] w-auto max-w-[min(96vw,110rem)] border-0 bg-transparent p-0 sm:max-w-[min(96vw,110rem)]">
        <DialogTitle className="sr-only">{alt}</DialogTitle>
        <DialogDescription className="sr-only">{alt}</DialogDescription>
        <Image src={src} alt={alt} width={width} height={height} sizes="96vw" className="max-h-[92svh] w-auto object-contain" />
      </DialogContent>
    </Dialog>
  );
}
