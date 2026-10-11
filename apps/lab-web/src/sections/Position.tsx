import { Chapter, Accent } from "../ui/Chapter";
import { MODELS } from "../content/passport";
import { useI18n } from "../i18n";

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
  const { t } = useI18n();
  const p = t.position;
  return (
    <Chapter
      id="posicion"
      n="04"
      label={p.label}
      aside={p.aside}
      title={
        <>
          {p.title} <Accent>{p.accent}</Accent>
        </>
      }
      lede={p.lede}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-start">
        {/* Strata diagram */}
        <figure className="lg:col-span-5" data-motion="strata" data-reveal data-reveal-at="0.45">
          <ol className="relative space-y-3">
            <li data-stratum="canonical" className="rounded-2xl border border-primary/45 bg-primary/[0.07] p-5 sm:p-6 shadow-[0_0_60px_-20px_rgba(164,143,255,0.45)]">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">{p.canonicalLayer}</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-ivory">Passport-Context</p>
              <p className="mt-1 font-mono text-[11px] text-muted">{p.canonicalTraits}</p>
            </li>
            <li aria-hidden="true" data-link="load" className="relative pl-10 font-mono text-[11px] text-muted">
              <StrataLink />
              <span>{p.loadsInto}</span>
            </li>
            <li data-stratum="models" className="rounded-2xl border hairline bg-surface/50 p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{p.modelsAndAgents}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {MODELS.map((m, i) => (
                  <li key={m} style={{ ["--i" as string]: i }} className="rounded-pill border hairline px-3 py-1 text-[13px] text-ivory/90">{m}</li>
                ))}
                <li className="rounded-pill px-2 py-1 text-[13px] text-muted">…</li>
              </ul>
            </li>
            <li aria-hidden="true" data-link="query" className="relative pl-10 font-mono text-[11px] text-muted">
              <StrataLink />
              <span>{p.queries}</span>
            </li>
            <li data-stratum="memory" className="rounded-2xl border border-dashed border-white/15 p-5 sm:p-6">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{p.workingMemory}</p>
              <p className="mt-2 text-[15px] text-ivory/85">{p.memoryExamples}</p>
            </li>
          </ol>
          <figcaption className="mt-4 font-mono text-[11px] text-muted">{p.figCaption}</figcaption>
        </figure>

        {/* Honest comparison */}
        <div className="lg:col-span-7" data-reveal style={{ ["--reveal-delay" as string]: "100ms" }}>
          <div className="grid grid-cols-[1fr_1fr] sm:grid-cols-[9rem_1fr_1fr] gap-x-5 border-b hairline pb-3 font-mono text-[10px] uppercase tracking-[0.14em]">
            <span className="hidden sm:block text-muted" />
            <span className="text-muted">{p.workingMemory}</span>
            <span className="text-primary">Passport</span>
          </div>
          <dl data-motion="compare-table">
            {p.rows.map((r, i) => (
              <div key={i} style={{ ["--i" as string]: i }} className="grid grid-cols-[1fr_1fr] sm:grid-cols-[9rem_1fr_1fr] gap-x-5 gap-y-2 border-b hairline py-5">
                <dt className="col-span-2 sm:col-span-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ivory/70">{r.k}</dt>
                <dd className="text-[14px] leading-relaxed text-muted">{r.mem}</dd>
                <dd className="text-[14px] leading-relaxed text-ivory">{r.pp}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            {p.engramNote}
          </p>
        </div>
      </div>
    </Chapter>
  );
}
