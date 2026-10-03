import Image from "next/image";
import type { Locale, Media } from "@/content/types";
import { ui } from "@/content/ui";
import { VideoClip } from "./VideoClip";

type Props = {
  media: Media;
  locale: Locale;
  /** Attribut `sizes` de l'image, pour un srcset adapté. */
  sizes: string;
  /** Image LCP : chargée tout de suite, en priorité haute. */
  eager?: boolean;
  className?: string;
};

/** Affiche une image optimisée (AVIF/WebP via next/image) ou une vidéo avec contrôle. */
export function MediaView({ media, locale, sizes, eager, className }: Props) {
  const alt = media.alt[locale];
  if (media.kind === "video") {
    return (
      <VideoClip
        src={media.src}
        poster={media.poster}
        label={alt}
        width={media.width}
        height={media.height}
        playLabel={`${ui.play[locale]} : ${alt}`}
        pauseLabel={`${ui.pause[locale]} : ${alt}`}
        className={className}
      />
    );
  }
  return (
    <Image
      src={media.src}
      alt={alt}
      width={media.width}
      height={media.height}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      className={className}
    />
  );
}

/** Image de couverture d'un projet : l'aperçu de la vidéo s'il s'agit d'une vidéo. */
export function coverOf(media?: Media[]): { src: string; width: number; height: number; alt: Media["alt"] } | null {
  const first = media?.[0];
  if (!first) return null;
  return { src: first.kind === "video" ? first.poster : first.src, width: first.width, height: first.height, alt: first.alt };
}
