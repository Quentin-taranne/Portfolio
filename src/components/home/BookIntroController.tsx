"use client";

import { useEffect } from "react";

/**
 * Ouvre la couverture au clic, à une touche ou à la molette, puis la retire à la fin de la rotation.
 * Un clic sur l'entrée de l'autre langue mène à l'accueil dans cette langue (la couverture s'y ouvre aussitôt).
 */
export function BookIntroController() {
  useEffect(() => {
    const html = document.documentElement;
    if (html.dataset.intro !== "1" && html.dataset.intro !== "open") return;
    const intro = document.querySelector(".book-intro");
    const cover = document.querySelector(".book-cover");
    const keys = ["keydown", "wheel"] as const;
    const remove = () => {
      intro?.removeEventListener("click", onClick);
      keys.forEach((e) => window.removeEventListener(e, open));
      cover?.removeEventListener("animationend", end);
    };
    // Fin de la rotation : la couverture disparaît, la page et le podium finissent leur arrivée.
    const end = (e: Event) => {
      if (e.target !== cover) return;
      html.dataset.intro = "done";
      remove();
    };
    const open = () => {
      if (html.dataset.intro !== "1") return;
      html.dataset.intro = "open";
    };
    const onClick = (e: Event) => {
      const choice = (e.target as Element).closest<HTMLElement>("[data-enter]");
      if (choice && !("current" in choice.dataset)) {
        try {
          sessionStorage.setItem("qtp-intro", "open");
        } catch {}
        window.location.assign(choice.dataset.enter!);
        return;
      }
      open();
    };
    cover?.addEventListener("animationend", end);
    intro?.addEventListener("click", onClick);
    keys.forEach((e) => window.addEventListener(e, open, { passive: true }));
    return remove;
  }, []);
  return null;
}
