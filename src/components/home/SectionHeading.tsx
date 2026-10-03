type Props = {
  id: string;
  title: string;
  /** Nombre d'entrées, affiché comme un compteur de résultats. */
  count?: number;
};

/** Titre de section : très grand, aligné à gauche, compteur à droite. */
export function SectionHeading({ id, title, count }: Props) {
  return (
    <div className="flex items-end justify-between gap-6">
      <h2 id={id} className="display text-giant">
        {title}
      </h2>
      {count !== undefined && (
        <p className="display pb-1 text-title text-muted-foreground tabular" aria-hidden>
          {String(count).padStart(2, "0")}
        </p>
      )}
    </div>
  );
}
