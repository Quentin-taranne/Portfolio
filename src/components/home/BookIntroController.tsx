"use client";

import { useEffect } from "react";

/** Termine l'ouverture « livre » à la fin de l'animation, ou l'interrompt (clic, touche, défilement). */
export function BookIntroController() {
  useEffect(() => {
    const html = document.documentElement;
    if (!html.dataset.intro) return;
    const cover = document.querySelector(".book-cover");
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    const remove = () => {
      events.forEach((e) => window.removeEventListener(e, skip));
      cover?.removeEventListener("animationend", end);
    };
    // Fin de la rotation : la couverture disparaît, mais la page et le podium finissent leur arrivée.
    const end = () => {
      html.dataset.intro = "done";
      remove();
    };
    const skip = () => {
      if (html.dataset.intro === "skip") return;
      html.dataset.intro = "skip";
      setTimeout(() => {
        delete html.dataset.intro;
        remove();
      }, 200);
    };
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));
    cover?.addEventListener("animationend", end);
    return remove;
  }, []);
  return null;
}
