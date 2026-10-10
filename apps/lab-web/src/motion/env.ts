/** Shared motion tokens for WAAPI (mirror the CSS custom properties in motion.css). */
export const EASE_OUT_EXPO = "cubic-bezier(0.16, 1, 0.3, 1)";
export const EASE_IN_OUT_SINE = "cubic-bezier(0.37, 0, 0.63, 1)";

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches === true;
}

export function supportsScrollTimeline(): boolean {
  return typeof CSS !== "undefined" && CSS.supports?.("animation-timeline: scroll()") === true;
}
