import { useLayoutEffect, useRef } from "react";
import { prefersReducedMotion } from "./env";

const HEX = "0123456789abcdef";

/**
 * Renders `text`; when it changes, unsettled characters cycle through hex glyphs and settle
 * left to right (~0.5 s). The DOM text is owned here (not by React children) so the scramble
 * never fights reconciliation. First paint and reduced motion show the final value directly.
 */
export function ScrambleText({ text, duration = 520 }: { text: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef<string | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (shown.current === null || prefersReducedMotion()) {
      el.textContent = text;
      shown.current = text;
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const settled = Math.floor((1 - Math.pow(1 - p, 3)) * text.length);
      let out = text.slice(0, settled);
      for (let i = settled; i < text.length; i++) {
        out += HEX.includes(text[i]) ? HEX[(Math.random() * 16) | 0] : text[i];
      }
      el.textContent = out;
      if (p < 1) raf = requestAnimationFrame(tick);
      else shown.current = text;
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      el.textContent = text;
    };
  }, [text, duration]);

  return <span ref={ref} />;
}
