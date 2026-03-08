"use client";

import { useEffect, useRef, useCallback } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

export function useKonamiCode(onActivate: () => void) {
  const indexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const reset = useCallback(() => {
    indexRef.current = 0;
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      if (e.key === KONAMI_SEQUENCE[indexRef.current]) {
        indexRef.current++;
        if (indexRef.current === KONAMI_SEQUENCE.length) {
          onActivate();
          reset();
        } else {
          timeoutRef.current = setTimeout(reset, 3000);
        }
      } else {
        reset();
      }
    };

    window.addEventListener("keydown", handler);
    return () => {
      window.removeEventListener("keydown", handler);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [onActivate, reset]);
}
