import { ArrowUpRight } from "lucide-react";
import { Chapter, Accent } from "../ui/Chapter";
import { CREDITS, GENTLEMAN_LINKS, LOGBOOK } from "../content/logbook";

function formatDate(iso: string) {
  return iso.replace(/-/g, "·");
}

/** Chapter 06 — bitácora (dated log, data in src/content/logbook.ts) and tool credits. */
export function Logbook() {
  return (
    <Chapter
      id="bitacora"
      n="06"
      label="Bitácora"
      aside="src/content/logbook.ts"
      title={
        <>
          Qué hicimos, cuándo y <Accent>con qué.</Accent>
        </>
      }
      lede="Un registro fechado de cómo trabaja el Lab y qué herramientas usa. Una línea por entrada; lo más reciente arriba."
    >
      <ol data-motion="logbook" className="border-t hairline">
        {LOGBOOK.map((e, i) => (
          <li
            key={`${e.date}-${i}`}
            data-reveal
            data-log-tag={e.tag}
            style={{ ["--reveal-delay" as string]: `${i * 60}ms` }}
            className="grid grid-cols-[auto_1fr] sm:grid-cols-[9rem_6rem_1fr] gap-x-4 sm:gap-x-6 gap-y-1.5 border-b hairline py-5"
          >
            <time dateTime={e.date} className="font-mono text-[12px] text-ivory/80 tabular-nums">
              {formatDate(e.date)}
            </time>
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary self-center">{e.tag}</span>
            <p className="col-span-2 sm:col-span-1 text-[15px] leading-relaxed text-muted">
              {e.text.split("`").map((part, j) =>
                j % 2 === 1 ? (
                  <code key={j} className="font-mono text-[13px] text-ivory">
                    {part}
                  </code>
                ) : (
                  part
                )
              )}
            </p>
          </li>
        ))}
      </ol>

      {/* Credits */}
      <div className="mt-20 sm:mt-24 grid grid-cols-1 lg:grid-cols-12 gap-10" id="creditos">
        <div className="lg:col-span-4" data-reveal>
          <h3 className="text-2xl font-semibold tracking-tight text-ivory">
            Herramientas <span className="font-serif italic font-normal text-primary">y créditos</span>
          </h3>
          <p className="mt-4 text-[15px] leading-relaxed text-muted max-w-sm">
            Crédito donde corresponde. Estas herramientas son parte de nuestro flujo de trabajo. Es atribución, no aval: ninguno de sus autores patrocina ni respalda a Multiversa, y sus nombres y marcas pertenecen a ellos.
          </p>
          <p className="mt-5 font-mono text-[11px] text-muted leading-relaxed">
            Gentleman Programming:{" "}
            {GENTLEMAN_LINKS.map((l, i) => (
              <span key={l.href}>
                {i > 0 && " · "}
                <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-ivory underline decoration-white/20 underline-offset-4 hover:decoration-primary">
                  {l.label}
                </a>
              </span>
            ))}
          </p>
        </div>

        <ul data-motion="credits" className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-px overflow-hidden rounded-2xl border hairline bg-white/[0.06]">
          {CREDITS.map((c, i) => (
            <li key={c.name} className="flex flex-col bg-canvas p-6" data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }}>
              <p className="text-lg font-semibold tracking-tight text-ivory">{c.name}</p>
              <p className="mt-1 font-mono text-[11px] text-primary">{c.by}</p>
              <p className="mt-4 flex-1 text-[14px] leading-relaxed text-muted">{c.body}</p>
              {c.license && <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted/80">{c.license}</p>}
              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {c.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[12px] text-ivory hover:text-primary"
                  >
                    {l.label}
                    <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Chapter>
  );
}
