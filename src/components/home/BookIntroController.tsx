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
    const end = () => {
      delete html.dataset.intro;
      remove();
    };
    const skip = () => {
      if (html.dataset.intro === "skip") return;
      html.dataset.intro = "skip";
      setTimeout(end, 200);
    };
    events.forEach((e) => window.addEventListener(e, skip, { passive: true }));
    cover?.addEventListener("animationend", end);
    return remove;
  }, []);
  return null;
}
