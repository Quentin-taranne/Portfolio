import type { Locale, Media } from "@/content/types";
import { VideoClip } from "./VideoClip";

const frame = "block rounded-md border border-rule bg-soft";

function Item({ m, locale, lead }: { m: Media; locale: Locale; lead: boolean }) {
  const portrait = m.height > m.width;
  // Le premier média prend toute la largeur (ou une hauteur fixe s'il est en portrait).
  const size = lead
    ? portrait
      ? "h-[26rem] w-auto max-w-full"
      : "h-auto w-full"
    : "h-36 w-auto sm:h-44";
  const alt = m.alt[locale];

  if (m.kind === "video") {
    return (
      <figure className="shrink-0">
        <VideoClip src={m.src} poster={m.poster} label={alt} width={m.width} height={m.height} className={`${frame} ${size} cursor-pointer object-cover`} />
        <figcaption className="mt-1.5 text-xs text-muted">{alt}</figcaption>
      </figure>
    );
  }
  return (
    <figure className="shrink-0">
      <a href={m.src} target="_blank" rel="noreferrer" title={alt}>
        {/* Images déjà redimensionnées et compressées dans public/media : site statique, sans optimiseur. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={m.src} alt={alt} width={m.width} height={m.height} loading="lazy" decoding="async" className={`${frame} ${size} object-cover`} />
      </a>
      <figcaption className="mt-1.5 text-xs text-muted">{alt}</figcaption>
    </figure>
  );
}

export function Gallery({ media, locale }: { media: Media[]; locale: Locale }) {
  const [lead, ...rest] = media;
  return (
    <div className="min-w-0">
      <Item m={lead} locale={locale} lead />
      {rest.length > 0 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
          {rest.map((m) => (
            <Item key={m.src} m={m} locale={locale} lead={false} />
          ))}
        </div>
      )}
    </div>
  );
}
