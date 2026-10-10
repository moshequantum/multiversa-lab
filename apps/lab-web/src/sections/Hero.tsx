import { ArrowDown, GitBranch } from "lucide-react";
import { REPO_URL } from "../content/passport";

/**
 * Chapter 00 — the problem.
 * IMPORTANT: index.html contains a static copy of this markup (first paint before JS).
 * Keep both in sync: same classes, same text.
 */
const FRAGMENTS = [
  { model: "ChatGPT", claim: "oferta: la del PDF de marzo", tag: "desactualizado" },
  { model: "Claude", claim: "tono: el del último chat", tag: "deriva" },
  { model: "Gemini", claim: "estado actual: —", tag: "sin contexto" },
];

export function Hero() {
  return (
    <section id="top" data-chapter="00" className="hero relative overflow-hidden grain px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-32 pb-20 sm:pb-28">
      <div aria-hidden="true" data-motion="hero-glow" className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(55% 45% at 78% 30%, rgba(124,92,255,0.20), transparent 70%), radial-gradient(40% 35% at 10% 80%, rgba(192,132,252,0.08), transparent 70%)" }} />
      <div aria-hidden="true" className="absolute inset-0 grid-paper opacity-40 pointer-events-none [mask-image:radial-gradient(70%_60%_at_70%_30%,black,transparent)]" />

      <div className="relative max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <p className="kicker flex items-center gap-3">
            <span className="h-px w-8 bg-primary" aria-hidden="true"></span>
            <span><span className="text-primary">00</span> — Cuaderno abierto de OpenPassport</span>
          </p>
          <h1 data-motion="hero-title" className="mt-7 display font-sans font-semibold text-[2.6rem] sm:text-6xl lg:text-[4.6rem] text-ivory">
            Cada modelo empieza de cero. La verdad de tu negocio se <span className="accent-serif text-primary">diluye.</span>
          </h1>
          <p className="mt-6 max-w-prose lede text-base sm:text-lg text-muted font-light">
            Cambias de ChatGPT a Claude, de Claude a Gemini, de una persona a otra, y el contexto se reconstruye a mano. Cada copia diverge. OpenPassport es nuestro experimento para fijar esa verdad: Markdown versionado, un manifest con hashes SHA-256 y perfiles de exposición. Lo carga cualquier modelo; lo verifica cualquier persona; le pertenece a quien lo origina.
          </p>
          <dl className="mt-8 grid grid-cols-3 border-y hairline py-4 max-w-xl">
            <div className="pr-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Formato</dt>
              <dd className="mt-1 text-[13px] sm:text-sm font-medium text-ivory">Markdown + manifest</dd>
            </div>
            <div className="border-x hairline px-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Integridad</dt>
              <dd className="mt-1 text-[13px] sm:text-sm font-medium text-ivory">SHA-256 · UTF-8 · LF</dd>
            </div>
            <div className="pl-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Estado</dt>
              <dd className="mt-1 text-[13px] sm:text-sm font-medium text-ok">Prototipo funcional</dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#anatomia" className="inline-flex items-center gap-2 rounded-pill bg-ivory px-6 py-3.5 text-sm font-semibold text-canvas transition-transform hover:scale-[1.02]">
              Leer el cuaderno
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-pill border hairline bg-surface/60 px-6 py-3.5 text-sm font-medium text-ivory transition-colors hover:border-primary/50">
              <GitBranch className="h-4 w-4" aria-hidden="true" />
              Ver el repositorio
            </a>
          </div>
        </div>

        <figure data-motion="hero-fragments" className="lg:col-span-5 code-surface rounded-2xl p-5 sm:p-6">
          <figcaption className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            <span>Fig. 0</span>
            <span>La misma empresa, tres verdades</span>
          </figcaption>
          <ul className="mt-5 divide-y divide-white/[0.06]">
            {FRAGMENTS.map((f) => (
              <li key={f.model} data-fragment="" className="flex items-center justify-between gap-3 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ivory">{f.model}</p>
                  <p className="mt-0.5 font-mono text-[12px] text-muted truncate">{f.claim}</p>
                </div>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-warn/90">{f.tag}</span>
              </li>
            ))}
          </ul>
          <p className="mt-2 flex items-center gap-3 font-mono text-[11px] text-muted">
            <span className="h-px flex-1 bg-white/10" aria-hidden="true"></span>
            un Passport, cargado en los tres
            <span className="h-px flex-1 bg-white/10" aria-hidden="true"></span>
          </p>
          <div data-motion="hero-passport" className="mt-4 rounded-xl border border-primary/35 bg-primary/[0.06] p-4">
            <p className="font-mono text-[12px] text-ivory">passport/ · manifest.json</p>
            <p className="mt-1 font-mono text-[11px] text-muted">7 capas · sha256 por archivo · perfiles</p>
            <p className="mt-3 font-mono text-[11px] text-ok">verify → 100% PASS</p>
          </div>
        </figure>
      </div>
    </section>
  );
}
