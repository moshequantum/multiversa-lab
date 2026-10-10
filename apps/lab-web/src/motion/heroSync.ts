/**
 * The hero entrance is pure CSS and starts on the static HTML shell (first paint, before JS).
 * createRoot() then replaces that shell with identical React nodes, which would restart every
 * CSS animation (a visible flash). We capture the shell's animation start time before React
 * mounts and re-anchor the new nodes' animations to it, so the choreography simply continues.
 */
let shellStart: number | null = null;

const MOBILE = "(max-width: 1023.98px)";

export function captureShellTimeline(): void {
  const root = document.getElementById("root");
  if (!root || typeof root.getAnimations !== "function") return;
  for (const a of root.getAnimations({ subtree: true })) {
    const t = a.startTime;
    if (typeof t === "number") shellStart = shellStart === null ? t : Math.min(shellStart, t);
  }
}

/**
 * Call from a layout effect right after the first commit. If the shell never reached a frame
 * (fast load: JS ran before first paint), there is nothing to continue; we still anchor every
 * hero animation to one clock so the sequence stays in lockstep.
 */
export function resyncHeroTimeline(): void {
  const hero = document.getElementById("top");
  if (!hero || typeof hero.getAnimations !== "function") return;
  const now = document.timeline?.currentTime;
  const anchor = shellStart ?? (typeof now === "number" ? now : null);
  if (anchor === null) return;
  // Below lg the figure waits for its own reveal (it is off-screen at load), so leave it alone.
  const figure = window.matchMedia(MOBILE).matches ? hero.querySelector("[data-motion='hero-fragments']") : null;
  for (const a of hero.getAnimations({ subtree: true })) {
    const target = (a.effect as KeyframeEffect | null)?.target;
    if (figure && target && figure.contains(target)) continue;
    if (a.playState === "paused" || a.timeline !== document.timeline) continue;
    a.startTime = anchor;
  }
  shellStart = null;
}
