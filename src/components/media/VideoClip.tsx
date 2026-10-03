"use client";

import { Pause, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "cn";
import { Button } from "@/components/ui/button";

type Props = {
  src: string;
  poster: string;
  label: string;
  width: number;
  height: number;
  playLabel: string;
  pauseLabel: string;
  /** Aperçu prioritaire (LCP) : chargé tout de suite, en AVIF/WebP. */
  eager?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * Boucle vidéo muette.
 * - Lecture automatique seulement si elle est visible et sans « animations réduites ».
 * - Bouton lecture / pause toujours présent (contenu animé de plus de 5 s).
 */
export function VideoClip({ src, poster, label, width, height, playLabel, pauseLabel, eager, sizes = "100vw", className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  // Une pause demandée par l'utilisateur n'est jamais annulée par le scroll.
  const userPaused = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) userPaused.current = true;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !userPaused.current) video.play().catch(() => {});
      else if (!entry.isIntersecting) video.pause();
    });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) {
      userPaused.current = false;
      video.play().catch(() => {});
    } else {
      userPaused.current = true;
      video.pause();
    }
  };

  return (
    <div className={cn("relative", className)}>
      {/* Aperçu optimisé sous la vidéo : la vidéo, transparente tant qu'elle n'a pas d'image, le recouvre ensuite. */}
      <Image
        src={poster}
        alt=""
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className="object-cover"
      />
      <video
        ref={ref}
        src={src}
        width={width}
        height={height}
        aria-label={label}
        muted
        loop
        playsInline
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        className="relative block h-full w-full object-cover"
      />
      <Button
        type="button"
        variant="signal"
        size="icon"
        onClick={toggle}
        aria-label={playing ? pauseLabel : playLabel}
        className="absolute right-3 bottom-3"
      >
        {playing ? <Pause aria-hidden /> : <Play aria-hidden />}
      </Button>
    </div>
  );
}
