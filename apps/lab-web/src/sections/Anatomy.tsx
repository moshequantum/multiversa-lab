import { useEffect, useRef, useState } from "react";
import { Chapter, Accent } from "../ui/Chapter";
import { EXTRAS, LAYERS } from "../content/passport";
import { ScrambleText } from "../motion/ScrambleText";
import { EASE_OUT_EXPO, prefersReducedMotion } from "../motion/env";
import { useI18n } from "../i18n";

/** Chapter 01 — anatomy of a Passport: the seven layers, the manifest entry, the files outside. */
export function Anatomy() {
  const { t } = useI18n();
  const a = t.anatomy;
  const [active, setActive] = useState(0);
  const layer = LAYERS[active];
  const layerCopy = a.layers[layer.layer];
  const swapRef = useRef<HTMLDivElement>(null);
  const firstSwap = useRef(true);

  // Manifest swap: the explanatory copy and the entry crossfade; the hash scrambles to settle.
  useEffect(() => {
    if (firstSwap.current) {
      firstSwap.current = false;
      return;
    }
    const root = swapRef.current;
    if (!root || prefersReducedMotion() || typeof root.animate !== "function") return;
    root.querySelectorAll<HTMLElement>("[data-swap]").forEach((el, i) => {
      el.animate([{ opacity: 0.2, transform: "translate3d(0, 4px, 0)" }, { opacity: 1, transform: "none" }], {
        duration: 420,
        delay: i * 40,
        easing: EASE_OUT_EXPO,
        fill: "backwards",
      });
    });
  }, [active]);

  return (
    <Chapter
      id="anatomia"
      n="01"
      label={a.label}
      aside="templates/open-passport-template"
      title={
        <>
          {a.title} <Accent>{a.accent}</Accent>
        </>
      }
      lede={a.lede}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
        {/* Layer index */}
        <ol data-motion="layer-stack" className="lg:col-span-7 border-t hairline" aria-label={a.layersLabel}>
          {LAYERS.map((l, i) => {
            const on = i === active;
            return (
              <li key={l.n} data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }} data-layer={l.layer}>
                <button
                  type="button"
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                  aria-pressed={on}
                  className={`group relative grid w-full grid-cols-[3.25rem_1fr] sm:grid-cols-[5rem_1fr_auto] items-baseline gap-x-4 border-b hairline py-5 sm:py-6 text-left transition-colors ${
                    on ? "bg-white/[0.025]" : "hover:bg-white/[0.015]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-0 h-full w-px origin-top bg-primary transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] ${on ? "scale-y-100" : "scale-y-0"}`}
                  />
                  <span
                    className={`pl-3 font-serif italic text-3xl sm:text-5xl leading-none transition-colors ${
                      on ? "text-primary" : "text-muted/50 group-hover:text-muted"
                    }`}
                  >
                    {l.n}
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-lg sm:text-xl font-medium tracking-tight ${on ? "text-ivory" : "text-ivory/80"}`}>
                      {a.layers[l.layer].title}
                    </span>
                    <span className="mt-1 block font-mono text-[11px] text-muted">{l.path}</span>
                  </span>
                  <span className="hidden sm:block pr-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/70">
                    {l.layer}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Detail: real manifest entry */}
        <div className="lg:col-span-5">
          <div ref={swapRef} className="lg:sticky lg:top-28 space-y-6" data-reveal style={{ ["--reveal-delay" as string]: "200ms" }}>
            <p className="text-xl sm:text-2xl font-light leading-snug text-ivory" aria-live="polite" data-swap>
              <span className="font-serif italic text-primary">{layerCopy.title}.</span> {layerCopy.body}
            </p>

            <figure className="code-surface rounded-2xl overflow-hidden" data-motion="manifest-entry">
              <figcaption className="flex justify-between border-b hairline px-4 py-3 font-mono text-[11px] text-muted">
                <span>{a.entryCaption.replace("{n}", String(active + 1))}</span>
                <span>{a.entryReal}</span>
              </figcaption>
              <pre data-swap className="px-4 py-4 font-mono text-[12px] leading-[1.8] whitespace-pre-wrap [overflow-wrap:anywhere] text-muted">
                <span className="text-ivory">{"{"}</span>
                {"\n  "}
                <span className="text-secondary">"path"</span>: <span className="text-ivory">"{layer.path}"</span>,
                {"\n  "}
                <span className="text-secondary">"layer"</span>: <span className="text-ivory">"{layer.layer}"</span>,
                {"\n  "}
                <span className="text-secondary">"mediaType"</span>: <span className="text-ivory">"text/markdown"</span>,
                {"\n  "}
                <span className="text-secondary">"sha256"</span>: <span className="text-primary" data-motion="hash">"<ScrambleText text={layer.sha256} />"</span>,
                {"\n  "}
                <span className="text-secondary">"visibility"</span>: <span className="text-ivory">"public"</span>
                {"\n"}
                <span className="text-ivory">{"}"}</span>
              </pre>
            </figure>

            <div>
              <p className="kicker">{a.loadOrder}</p>
              <ol className="mt-3 space-y-1.5 font-mono text-[12px] text-muted">
                <li><span className="text-primary">1</span> manifest.json <span className="text-muted/60">· bootstrap</span></li>
                <li><span className="text-primary">2</span> MASTER-PROMPT.md <span className="text-muted/60">· firstContext</span></li>
                <li><span className="text-primary">3</span> profiles[].files <span className="text-muted/60">· {a.loadOrderListed}</span></li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Outside the seven */}
      <div className="mt-20 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4" data-reveal>
          <p className="kicker">{a.outsideTitle}</p>
          <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">
            {a.outsideBody}
          </p>
        </div>
        <dl className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] border hairline rounded-2xl overflow-hidden">
          {EXTRAS.map((e, i) => (
            <div key={e.path} className="bg-canvas p-5 sm:p-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
              <dt className="font-mono text-[13px] text-ivory break-all">{e.path}</dt>
              <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/80">
                {e.layer} · {e.visibility}
              </dd>
              <dd className="mt-3 text-sm text-muted leading-relaxed">{a.extras[e.path]}</dd>
            </div>
          ))}
        </dl>
      </div>

      <aside className="mt-14 grid grid-cols-1 lg:grid-cols-12" data-reveal>
        <p className="lg:col-start-5 lg:col-span-8 border-l-2 border-primary/50 pl-5 text-sm text-muted leading-relaxed">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">{a.labNoteLabel}</span>
          {a.labNote}
        </p>
      </aside>
    </Chapter>
  );
}
