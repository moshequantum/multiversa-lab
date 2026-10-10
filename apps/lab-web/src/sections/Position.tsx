import { Chapter, Accent } from "../ui/Chapter";
import { MODELS } from "../content/passport";

const ROWS = [
  { k: "Qué guarda", mem: "Lo que ocurrió: observaciones, decisiones y resúmenes de sesiones.", pp: "Lo que es verdad para el negocio: identidad, oferta, gobierno, estado." },
  { k: "Quién escribe", mem: "El agente, de forma automática o semiautomática.", pp: "El originador, con revisión humana." },
  { k: "Cómo cambia", mem: "Continuamente, en cada sesión.", pp: "Por versión: packageVersion y fecha de corte asOf." },
  { k: "Verificación", mem: "La que ofrezca cada motor.", pp: "SHA-256 por archivo y manifestSelfHash." },
  { k: "Portabilidad", mem: "Vive en su motor: base vectorial, proveedor o binario local.", pp: "Carpeta de texto plano; se carga en cualquier modelo." },
  { k: "Propiedad", mem: "Según la herramienta o el proveedor.", pp: "originator-owned, declarado en el manifest." },
];

/** Connector between strata: a hairline that draws upward (stroke-dashoffset), bottom-up build. */
function StrataLink() {
  return (
    <svg className="strata-link absolute left-6 -top-3 text-primary/60" width="2" height="41" viewBox="0 0 2 41" fill="none" aria-hidden="true">
      <path d="M1 41V0" stroke="currentColor" strokeWidth="1" pathLength={1} />
    </svg>
  );
}

/** Chapter 04 — where Passport sits relative to working-memory systems. */
export function Position() {
  return (
    <Chapter
      id="posicion"
      n="04"
      label="Posición"
      aside="memoria ≠ verdad canónica"
      title={
        <>
          La memoria recuerda. El Passport <Accent>establece.</Accent>
        </>
      }
      lede="No compiten. La memoria de trabajo guarda lo que pasó; el Passport fija lo que es cierto, con versión y hash. Uno vive debajo del otro, y el modelo consulta ambos."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-start">
        {/* Strata diagram */}
        <figure className="lg:col-span-5" data-motion="strata" data-reveal data-reveal-at="0.45">
          <ol className="relative space-y-3">
            <li data-stratum="canonical" className="rounded-2xl border border-primary/45 bg-primary/[0.07] p-5 sm:p-6 shadow-[0_0_60px_-20px_rgba(164,143,255,0.45)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Capa canónica</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-ivory">Passport-Context</p>
              <p className="mt-1 font-mono text-[11px] text-muted">versionado · hasheado · gobernado · del originador</p>
            </li>
            <li aria-hidden="true" data-link="load" className="relative pl-10 font-mono text-[11px] text-muted">
              <StrataLink />
              <span>↓ se carga en</span>
            </li>
            <li data-stratum="models" className="rounded-2xl border hairline bg-surface/50 p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Modelos y agentes</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {MODELS.map((m, i) => (
                  <li key={m} style={{ ["--i" as string]: i }} className="rounded-pill border hairline px-3 py-1 text-[13px] text-ivory/90">{m}</li>
                ))}
                <li className="rounded-pill px-2 py-1 text-[13px] text-muted">…</li>
              </ul>
            </li>
            <li aria-hidden="true" data-link="query" className="relative pl-10 font-mono text-[11px] text-muted">
              <StrataLink />
              <span>↓ consultan</span>
            </li>
            <li data-stratum="memory" className="rounded-2xl border border-dashed border-white/15 p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">Memoria de trabajo</p>
              <p className="mt-2 text-[15px] text-ivory/85">pgvector · memoria del proveedor · Engram</p>
            </li>
          </ol>
          <figcaption className="mt-4 font-mono text-[11px] text-muted">Fig. 4 — Dónde se ubica el Passport.</figcaption>
        </figure>

        {/* Honest comparison */}
        <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "100ms" }}>
          <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[9rem_1fr_1fr] gap-x-5 border-b hairline pb-3 font-mono text-[10px] uppercase tracking-[0.14em]">
            <span className="hidden sm:block text-muted" />
            <span className="text-muted">Memoria de trabajo</span>
            <span className="text-primary">Passport</span>
          </div>
          <dl data-motion="compare-table">
            {ROWS.map((r, i) => (
              <div key={r.k} style={{ ["--i" as string]: i }} className="grid grid-cols-[1fr_1fr] sm:grid-cols-[9rem_1fr_1fr] gap-x-5 gap-y-2 border-b hairline py-5">
                <dt className="col-span-2 sm:col-span-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ivory/70">{r.k}</dt>
                <dd className="text-[14px] leading-relaxed text-muted">{r.mem}</dd>
                <dd className="text-[14px] leading-relaxed text-ivory">{r.pp}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Engram es memoria persistente de código abierto para agentes de programación, de Gentleman Programming. En el Lab es un upstream recomendado, no un rival: recuerda el trabajo; el Passport fija el criterio.
          </p>
        </div>
      </div>
    </Chapter>
  );
}
