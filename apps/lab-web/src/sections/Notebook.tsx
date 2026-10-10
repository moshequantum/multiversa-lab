import { Chapter, Accent } from "../ui/Chapter";
import { StatusTag } from "../ui/StatusTag";
import { CUTOFF, CUTOFF_LABEL, LAB_TASKS, STATUS_ITEMS } from "../content/passport";

const RELEASE = [
  { k: "Repositorio", v: "Laboratorio abierto. main se mueve." },
  { k: "Versión estable", v: "La release etiquetada que controla el fundador." },
  { k: "Etiquetas publicadas", v: "Ninguna." },
  { k: "Primera etiqueta", v: "v0.1.0 · pendiente" },
];

/** Chapter 05 — lab notebook: status board, open Contract V0 tasks, release channel, errata. */
export function Notebook() {
  return (
    <Chapter
      id="cuaderno"
      n="05"
      label="Cuaderno de laboratorio"
      aside={<>corte · <time dateTime={CUTOFF}>{CUTOFF_LABEL}</time></>}
      title={
        <>
          Lo que funciona, lo que falta y lo que <Accent>no prometemos.</Accent>
        </>
      }
      lede="Esto es un laboratorio, no un producto empaquetado. Publicamos el estado verificado con fecha de corte, y lo corregimos en público cuando nos equivocamos."
    >
      {/* Status board */}
      <ul data-motion="status-board" className="border-t hairline">
        {STATUS_ITEMS.map((s, i) => (
          <li
            key={s.name}
            data-reveal
            data-status={s.status}
            style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
            className="grid grid-cols-1 sm:grid-cols-12 gap-x-6 gap-y-3 border-b hairline py-6"
          >
            <p className="sm:col-span-4 font-mono text-[14px] text-ivory">{s.name}</p>
            <div className="sm:col-span-3">
              <StatusTag status={s.status} />
            </div>
            <p className="sm:col-span-5 text-[15px] leading-relaxed text-muted">{s.note}</p>
          </li>
        ))}
      </ul>

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
        {/* Contract V0 tasks */}
        <div className="lg:col-span-7" data-reveal>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h3 className="text-2xl font-semibold tracking-tight text-ivory">
              Contrato V0 <span className="font-serif italic font-normal text-muted">· 0 de 10</span>
            </h3>
            <span className="font-mono text-[11px] text-muted break-all">odd/tasks/openpassport-contract-v0.md</span>
          </div>
          <div className="mt-4 h-px w-full origin-left bg-white/[0.08]" aria-hidden="true" data-motion="progress-track">
            {/* Fill = data-value % (scaleX, never width). 0 of 10 done: it stays empty, honestly. */}
            <div className="h-px w-full origin-left bg-primary" data-motion="progress" data-value="0" style={{ ["--v" as string]: 0 }} />
          </div>
          <ol className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {LAB_TASKS.map((t, i) => (
              <li key={t.id} className="flex gap-3 border-b hairline py-3" data-task={t.id} style={{ ["--i" as string]: i }}>
                <span aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 rounded-[3px] border border-white/25" />
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] text-primary">{t.id}</span>
                  <span className="block text-[14px] leading-snug text-ivory/85">{t.title}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Release channel + errata */}
        <div className="lg:col-span-5 space-y-12">
          <div data-reveal>
            <p className="kicker">Canal de release</p>
            <dl className="mt-4 rounded-2xl border hairline divide-y divide-white/[0.06]">
              {RELEASE.map((r) => (
                <div key={r.k} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 px-5 py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{r.k}</dt>
                  <dd className="text-[14px] text-ivory sm:text-right">{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal>
            <p className="kicker">Erratas</p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              Retiramos dos afirmaciones de versiones anteriores de esta página:
            </p>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed">
              <li className="text-muted">
                <span className="text-ivory/60 line-through decoration-primary/70">OpenPassport v1.0 como estándar emitido.</span>{" "}
                El código existe; la release, no.
              </li>
              <li className="text-muted">
                <span className="text-ivory/60 line-through decoration-primary/70">Validado en 8 proyectos reales.</span>{" "}
                No había evidencia que lo respaldara.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
