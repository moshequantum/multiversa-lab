import { useEffect } from "react";
import { prefersReducedMotion, supportsScrollTimeline } from "./env";

/**
 * Header auto-hide (down hides, up reveals) and the reading-progress fallback.
 * One passive scroll listener, coalesced to one rAF; it reads only scrollY (no layout reads).
 * Document height is cached by a ResizeObserver. Where CSS scroll timelines exist, progress
 * is fully declarative (motion.css) and this hook only handles the header.
 */
export function useScrollChrome(): void {
  useEffect(() => {
    const root = document.documentElement;
    const header = document.querySelector<HTMLElement>("[data-motion='site-header']");
    const reduced = prefersReducedMotion();
    const jsProgress = reduced || !supportsScrollTimeline();
    if (jsProgress) root.classList.add("mv-progress-js");

    let maxScroll = 1;
    const measure = () => {
      maxScroll = Math.max(1, root.scrollHeight - window.innerHeight);
    };
    measure();
    const ro = "ResizeObserver" in window ? new ResizeObserver(measure) : null;
    ro?.observe(document.body);

    let lastY = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      if (jsProgress) root.style.setProperty("--mv-progress", String(Math.min(1, Math.max(0, y / maxScroll))));
      if (!header || reduced) return;
      const dy = y - lastY;
      if (y < 96) {
        header.dataset.header = "shown";
        lastY = y;
      } else if (Math.abs(dy) > 10) {
        header.dataset.header = dy > 0 ? "hidden" : "shown";
        lastY = y;
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      ro?.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}
