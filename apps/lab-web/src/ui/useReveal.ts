import { useEffect, useState } from "react";

/**
 * Motion baseline. One IntersectionObserver for every [data-reveal] element:
 * adds `.is-revealed` once it enters the viewport. Marks <html class="reveal-ready">
 * first, so nothing is hidden when JS never runs. Reduced motion: CSS shows everything.
 */
export function useReveal(): void {
  useEffect(() => {
    const root = document.documentElement;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      nodes.forEach((n) => n.classList.add("is-revealed"));
      return;
    }
    // Anything already on screen at mount is revealed without a transition (no flash).
    const vh = window.innerHeight;
    nodes.forEach((n) => {
      if (n.getBoundingClientRect().top < vh * 0.9) n.classList.add("is-revealed");
    });
    root.classList.add("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );
    nodes.forEach((n) => {
      if (!n.classList.contains("is-revealed")) io.observe(n);
    });
    return () => io.disconnect();
  }, []);
}

/** Tracks which [data-chapter] section is in the reading band. Drives the chapter rail. */
export function useActiveChapter(): string {
  const [active, setActive] = useState("00");
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const id = (e.target as HTMLElement).dataset.chapter;
            if (id) {
              setActive(id);
              document.documentElement.dataset.activeChapter = id;
            }
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);
  return active;
}
