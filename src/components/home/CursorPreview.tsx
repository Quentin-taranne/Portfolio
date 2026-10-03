"use client";

import Image from "next/image";
import { AnimatePresence, LazyMotion, domAnimation, m, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

type Props = {
  /** Identifiant de la liste dont les liens portent un attribut data-preview. */
  targetId: string;
  label: string;
};

/**
 * Aperçu qui suit le curseur au survol d'une ligne de projet.
 * Purement décoratif (aria-hidden) : ordinateur uniquement, désactivé si « réduire les animations ».
 */
export function CursorPreview({ targetId, label }: Props) {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [src, setSrc] = useState<string | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 400, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 400, damping: 40, mass: 0.6 });

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setEnabled(query.matches && !reduce);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [reduce]);

  useEffect(() => {
    const list = document.getElementById(targetId);
    if (!enabled || !list) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const row = (e.target as HTMLElement).closest<HTMLElement>("[data-preview]");
      setSrc(row?.dataset.preview || null);
    };
    const leave = () => setSrc(null);
    list.addEventListener("pointermove", move);
    list.addEventListener("pointerleave", leave);
    return () => {
      list.removeEventListener("pointermove", move);
      list.removeEventListener("pointerleave", leave);
    };
  }, [enabled, targetId, x, y]);

  if (!enabled) return null;

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div aria-hidden className="pointer-events-none fixed top-0 left-0 z-30" style={{ x: sx, y: sy }}>
        <AnimatePresence>
          {src && (
            <m.div
              key={src}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.25, 1, 0.5, 1] }}
              className="absolute top-6 left-6 w-72 origin-top-left border-2 border-foreground bg-background"
            >
              <span className="relative block aspect-[16/10] overflow-hidden">
                <Image src={src} alt="" fill sizes="18rem" className="object-cover object-top" />
              </span>
              <span className="data absolute -top-3 -left-3 border-2 border-signal-ink bg-signal px-2 py-1 text-signal-ink">{label} →</span>
            </m.div>
          )}
        </AnimatePresence>
      </m.div>
    </LazyMotion>
  );
}
