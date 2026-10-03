type Props = {
  id: string;
  title: string;
  /** Nombre d'entrées, affiché comme un compteur de résultats. */
  count?: number;
  /** h1 sur une page dédiée, h2 dans une section de l'accueil. */
  level?: 1 | 2;
};

/** Titre de section aligné à gauche, compteur à droite. */
export function SectionHeading({ id, title, count, level = 2 }: Props) {
  const Tag = level === 1 ? "h1" : "h2";
  return (
    <div className="flex items-end justify-between gap-6">
      <Tag id={id} className="display text-[clamp(2.25rem,4.5vw,4rem)]">
        {title}
      </Tag>
      {count !== undefined && (
        <p className="data pb-1 text-muted-foreground tabular" aria-hidden>
          {String(count).padStart(2, "0")}
        </p>
      )}
    </div>
  );
}
