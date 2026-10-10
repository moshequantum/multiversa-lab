import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { RotateCcw } from "lucide-react";
import { EASE_OUT_EXPO, prefersReducedMotion } from "../motion/env";

export type TermLine =
  | { kind: "cmd"; text: string }
  | { kind: "out"; text: string }
  | { kind: "ok"; text: string }
  | { kind: "err"; text: string }
  | { kind: "note"; text: string };

const TONE: Record<TermLine["kind"], string> = {
  cmd: "text-ivory",
  out: "text-muted",
  ok: "text-ok",
  err: "text-[oklch(0.75_0.15_20)]",
  note: "text-muted/70 italic",
};

/* Session cadence (ms). Commands type per character; output lands after a "work" pause. */
const CHAR_MS = 14;
const MAX_TYPE_MS = 800;
const PAUSE: Record<TermLine["kind"], number> = { cmd: 360, out: 220, ok: 480, err: 520, note: 420 };

type RunState = "idle" | "armed" | "playing" | "done";

/**
 * Plays the session once with Web Animations (no timers, no per-frame JS): commands type,
 * output lands, PASS glows green, the one-byte edit lands, FAIL shakes once with a red pulse.
 * Every line stays in the DOM the whole time (opacity/clip-path only), so screen readers and
 * layout never change. Reduced motion, or already on screen at mount → final state, no run.
 */
function play(lines: HTMLElement[]): Animation[] {
  const anims: Animation[] = [];
  let t = 260;
  let firstErr = true;
  lines.forEach((el, i) => {
    const kind = (el.dataset.line ?? "out") as TermLine["kind"];
    if (i > 0) t += PAUSE[kind];
    if (kind === "cmd") {
      const n = Math.max(1, (el.textContent ?? "").length);
      const d = Math.min(MAX_TYPE_MS, n * CHAR_MS);
      anims.push(
        el.animate(
          [
            { opacity: 1, clipPath: "inset(0 100% 0 0)" },
            { opacity: 1, clipPath: "inset(0 0% 0 0)" },
          ],
          { delay: t, duration: d, easing: `steps(${Math.min(n, 60)}, end)`, fill: "both" }
        )
      );
      t += d;
      return;
    }
    anims.push(
      el.animate([{ opacity: 0, transform: "translate3d(0, 4px, 0)" }, { opacity: 1, transform: "none" }], {
        delay: t,
        duration: 320,
        easing: EASE_OUT_EXPO,
        fill: "both",
      })
    );
    if (kind === "ok") {
      anims.push(
        el.animate(
          [
            { filter: "brightness(1) drop-shadow(0 0 0 rgba(110, 231, 183, 0))" },
            { filter: "brightness(1.35) drop-shadow(0 0 10px rgba(110, 231, 183, 0.55))", offset: 0.18 },
            { filter: "brightness(1) drop-shadow(0 0 0 rgba(110, 231, 183, 0))" },
          ],
          { delay: t + 120, duration: 1500, easing: "ease-out" }
        )
      );
    }
    if (kind === "err" && firstErr) {
      firstErr = false;
      anims.push(
        el.animate(
          [
            { transform: "translate3d(0,0,0)" },
            { transform: "translate3d(-4px,0,0)" },
            { transform: "translate3d(4px,0,0)" },
            { transform: "translate3d(-2.5px,0,0)" },
            { transform: "translate3d(1.5px,0,0)" },
            { transform: "translate3d(0,0,0)" },
          ],
          { delay: t + 140, duration: 420, easing: "cubic-bezier(0.36, 0.07, 0.19, 0.97)" }
        ),
        el.animate(
          [
            { filter: "brightness(1) drop-shadow(0 0 0 rgba(251, 113, 133, 0))" },
            { filter: "brightness(1.3) drop-shadow(0 0 12px rgba(251, 113, 133, 0.6))", offset: 0.2 },
            { filter: "brightness(1) drop-shadow(0 0 0 rgba(251, 113, 133, 0))" },
          ],
          { delay: t + 140, duration: 1400, easing: "ease-out" }
        )
      );
    }
  });
  return anims;
}

function useTerminalRun(enabled: boolean) {
  const ref = useRef<HTMLElement>(null);
  const anims = useRef<Animation[]>([]);
  const [state, setState] = useState<RunState>("idle");

  const run = useCallback(() => {
    const fig = ref.current;
    if (!fig) return;
    anims.current.forEach((a) => a.cancel());
    const lines = Array.from(fig.querySelectorAll<HTMLElement>("[data-line]"));
    const current = play(lines);
    anims.current = current;
    setState("playing");
    Promise.all(current.map((a) => a.finished))
      .then(() => {
        if (anims.current !== current) return;
        current.forEach((a) => a.cancel());
        anims.current = [];
        setState("done");
      })
      .catch(() => {
        /* cancelled by a replay */
      });
  }, []);

  useEffect(() => {
    const fig = ref.current;
    if (!enabled || !fig || !("IntersectionObserver" in window) || typeof fig.animate !== "function") {
      setState("done");
      return;
    }
    // Already in view at mount (deep link / reload): show the final state, offer replay.
    if (fig.getBoundingClientRect().top < window.innerHeight * 0.85) {
      setState("done");
      return;
    }
    setState("armed");
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          run();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(fig);
    return () => {
      io.disconnect();
      anims.current.forEach((a) => a.cancel());
    };
  }, [enabled, run]);

  return { ref, state, run };
}

/** Terminal window. Lines wrap (break-all) so long hashes never cause horizontal page scroll. */
export function Terminal({
  title,
  lines,
  footer,
  session = false,
}: {
  title: string;
  lines: TermLine[];
  footer?: ReactNode;
  /** Play the lines as a live session when the window scrolls into view. */
  session?: boolean;
}) {
  const [motionOk] = useState(() => session && !prefersReducedMotion());
  const { ref, state, run } = useTerminalRun(motionOk);

  return (
    <figure
      ref={ref}
      className="code-surface overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
      data-motion="terminal"
      data-run={motionOk ? state : undefined}
    >
      <div className="flex items-center gap-3 border-b hairline px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </span>
        <figcaption className="min-w-0 flex-1 font-mono text-[11px] text-muted truncate">{title}</figcaption>
        {motionOk && (
          <button
            type="button"
            onClick={run}
            aria-label="Repetir la ejecución"
            className="-my-1 inline-flex shrink-0 items-center gap-1.5 rounded-md px-2 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:bg-white/5 hover:text-ivory"
          >
            <RotateCcw className="h-3 w-3" aria-hidden="true" />
            <span className="hidden sm:inline">Repetir</span>
          </button>
        )}
      </div>
      <pre className="px-4 sm:px-6 py-5 font-mono text-[12px] sm:text-[13px] leading-[1.75] whitespace-pre-wrap [overflow-wrap:anywhere]">
        {lines.map((l, i) => (
          <div key={i} className={TONE[l.kind]} data-line={l.kind}>
            {l.kind === "cmd" && <span className="select-none text-primary">$ </span>}
            {l.text}
          </div>
        ))}
      </pre>
      {footer && <div className="border-t hairline px-4 sm:px-6 py-3 font-mono text-[11px] text-muted">{footer}</div>}
    </figure>
  );
}
