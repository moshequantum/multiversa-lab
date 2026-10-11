import { Chapter, Accent } from "../ui/Chapter";
import { StatusTag } from "../ui/StatusTag";
import { CUTOFF, LAB_TASKS, STATUS_ITEMS } from "../content/passport";
import { useI18n } from "../i18n";

/** Chapter 05 — lab notebook: status board, open Contract V0 tasks, release channel, errata. */
export function Notebook() {
  const { t } = useI18n();
  const nb = t.notebook;
  return (
    <Chapter
      id="cuaderno"
      n="05"
      label={nb.label}
      aside={<>{nb.cutoff} · <time dateTime={CUTOFF}>{t.common.cutoffLabel}</time></>}
      title={
        <>
          {nb.title} <Accent>{nb.accent}</Accent>
        </>
      }
      lede={nb.lede}
    >
      {/* Status board */}
      <ul data-motion="status-board" className="border-t hairline">
        {STATUS_ITEMS.map((s, i) => (
          <li
            key={s.id}
            data-reveal
            data-status={s.status}
            style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
            className="grid grid-cols-1 sm:grid-cols-12 gap-x-6 gap-y-3 border-b hairline py-6"
          >
            <p className="sm:col-span-4 font-mono text-[14px] text-ivory">{s.id === "contract" ? nb.contractTitle : s.name}</p>
            <div className="sm:col-span-3">
              <StatusTag status={s.status} />
            </div>
            <p className="sm:col-span-5 text-[15px] leading-relaxed text-muted">{nb.status[s.id]}</p>
          </li>
        ))}
      </ul>

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
        {/* Contract V0 tasks */}
        <div className="lg:col-span-7" data-reveal>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h3 className="text-2xl font-semibold tracking-tight text-ivory">
              {nb.contractTitle} <span className="font-serif italic font-normal text-muted">{nb.contractProgress}</span>
            </h3>
            <span className="font-mono text-[11px] text-muted break-all">odd/tasks/openpassport-contract-v0.md</span>
          </div>
          <div className="mt-4 h-px w-full origin-left bg-white/[0.08]" aria-hidden="true" data-motion="progress-track">
            {/* Fill = data-value % (scaleX, never width). 0 of 10 done: it stays empty, honestly. */}
            <div className="h-px w-full origin-left bg-primary" data-motion="progress" data-value="0" style={{ ["--v" as string]: 0 }} />
          </div>
          <ol className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8">
            {LAB_TASKS.map((id, i) => (
              <li key={id} className="flex gap-3 border-b hairline py-3" data-task={id} style={{ ["--i" as string]: i }}>
                <span aria-hidden="true" className="mt-1 h-3 w-3 shrink-0 rounded-[3px] border border-white/25" />
                <span className="min-w-0">
                  <span className="block font-mono text-[11px] text-primary">{id}</span>
                  <span className="block text-[14px] leading-snug text-ivory/85">{nb.tasks[id]}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* Release channel + errata */}
        <div className="lg:col-span-5 space-y-12">
          <div data-reveal>
            <p className="kicker">{nb.releaseTitle}</p>
            <dl className="mt-4 rounded-2xl border hairline divide-y divide-white/[0.06]">
              {nb.release.map((r, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 px-5 py-4">
                  <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{r.k}</dt>
                  <dd className="text-[14px] text-ivory sm:text-right">{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal>
            <p className="kicker">{nb.errataTitle}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted">
              {nb.errataIntro}
            </p>
            <ul className="mt-3 space-y-2 text-[15px] leading-relaxed">
              {nb.errata.map((e, i) => (
                <li key={i} className="text-muted">
                  <span className="text-ivory/60 line-through decoration-primary/70">{e.claim}</span>{" "}
                  {e.correction}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
