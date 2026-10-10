import { useEffect, useRef, useState } from "react";
import { Chapter, Accent } from "../ui/Chapter";
import { EXTRAS, LAYERS } from "../content/passport";
import { ScrambleText } from "../motion/ScrambleText";
import { EASE_OUT_EXPO, prefersReducedMotion } from "../motion/env";

/** Chapter 01 — anatomy of a Passport: the seven layers, the manifest entry, the files outside. */
export function Anatomy() {
  const [active, setActive] = useState(0);
  const layer = LAYERS[active];
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
      label="Anatomía"
      aside="templates/open-passport-template"
      title={
        <>
          Un Passport es una carpeta. Su contrato es el <Accent>manifest.</Accent>
        </>
      }
      lede="Siete capas en Markdown, numeradas en el orden en que un modelo debe leerlas. Un manifest.json declara cada archivo: capa, tipo, visibilidad y hash. Lo que no está en el manifest no forma parte del Passport."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10">
        {/* Layer index */}
        <ol data-motion="layer-stack" className="lg:col-span-7 border-t hairline" aria-label="Las siete capas">
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
                      {l.title}
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
              <span className="font-serif italic text-primary">{layer.title}.</span> {layer.body}
            </p>

            <figure className="code-surface rounded-2xl overflow-hidden" data-motion="manifest-entry">
              <figcaption className="flex justify-between border-b hairline px-4 py-3 font-mono text-[11px] text-muted">
                <span>manifest.json → files[{active + 1}]</span>
                <span>real</span>
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
              <p className="kicker">Orden de carga · loadContract</p>
              <ol className="mt-3 space-y-1.5 font-mono text-[12px] text-muted">
                <li><span className="text-primary">1</span> manifest.json <span className="text-muted/60">· bootstrap</span></li>
                <li><span className="text-primary">2</span> MASTER-PROMPT.md <span className="text-muted/60">· firstContext</span></li>
                <li><span className="text-primary">3</span> profiles[].files <span className="text-muted/60">· en el orden listado</span></li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Outside the seven */}
      <div className="mt-20 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4" data-reveal>
          <p className="kicker">Fuera de las siete</p>
          <p className="mt-3 text-sm text-muted leading-relaxed max-w-xs">
            Archivos que el manifest también declara. Runtime y capa privada existen en el Passport de Multiversa.Group v0.3.0; en la plantilla son opcionales.
          </p>
        </div>
        <dl className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.06] border hairline rounded-2xl overflow-hidden">
          {EXTRAS.map((e, i) => (
            <div key={e.path} className="bg-canvas p-5 sm:p-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}>
              <dt className="font-mono text-[13px] text-ivory break-all">{e.path}</dt>
              <dd className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/80">
                {e.layer} · {e.visibility}
              </dd>
              <dd className="mt-3 text-sm text-muted leading-relaxed">{e.body}</dd>
            </div>
          ))}
        </dl>
      </div>

      <aside className="mt-14 grid grid-cols-1 lg:grid-cols-12" data-reveal>
        <p className="lg:col-start-5 lg:col-span-8 border-l-2 border-primary/50 pl-5 text-sm text-muted leading-relaxed">
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">Nota de laboratorio · </span>
          Las siete capas son lo que funciona hoy. El Contrato V0 propone diez dominios (Identity, Business, Brand &amp; Voice, Offer, Customers, Operations, Knowledge, Governance, Evidence, Current State) y una migración determinista desde las siete capas que reporta lo que no pudo mapear (LAB-001, LAB-003). Mientras no exista, no lo anunciamos como estándar.
        </p>
      </aside>
    </Chapter>
  );
}
