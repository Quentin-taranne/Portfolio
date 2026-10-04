"use client";

import { useEffect } from "react";

/**
 * Lance la composition de chaque groupe d'infos ([data-reveal]) quand il entre dans l'écran :
 * tout de suite sur ordinateur, au défilement sur téléphone. Pendant que la couverture attend, le CSS garde tout en pause.
 */
export function HeroReveal() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.dataset.hero) return;
    // Le script de la page tourne : le filet de sécurité du script d'en-tête n'a plus lieu d'être.
    html.dataset.hero = "ready";
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          (e.target as HTMLElement).dataset.shown = "";
          io.unobserve(e.target);
        }
      },
      { threshold: 0.35 },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
