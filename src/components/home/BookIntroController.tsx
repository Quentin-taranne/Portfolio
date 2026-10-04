"use client";

import { useEffect } from "react";

/** Ouvre la couverture au clic, à une touche ou à la molette, puis la retire à la fin de la rotation. */
export function BookIntroController() {
  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro !== "1") return;
    const intro = document.querySelector(".book-intro");
    const cover = document.querySelector(".book-cover");
    const keys = ["keydown", "wheel"] as const;
    const remove = () => {
      intro?.removeEventListener("click", open);
      keys.forEach((e) => window.removeEventListener(e, open));
    };
    // Fin de la rotation : la couverture disparaît, la page et le podium finissent leur arrivée.
    const end = (e: Event) => {
      if (e.target !== cover) return;
      html.dataset.intro = "done";
      cover?.removeEventListener("animationend", end);
    };
    const open = () => {
      if (html.dataset.intro !== "1") return;
      remove();
      cover?.addEventListener("animationend", end);
      html.dataset.intro = "open";
    };
    intro?.addEventListener("click", open);
    keys.forEach((e) => window.addEventListener(e, open, { passive: true }));
    return remove;
  }, []);
  return null;
}
