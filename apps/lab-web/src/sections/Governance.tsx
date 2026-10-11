import { Fragment } from "react";
import { Chapter, Accent } from "../ui/Chapter";
import { StatusTag } from "../ui/StatusTag";
import { PROFILES, PROFILE_ROWS } from "../content/passport";
import { useI18n } from "../i18n";
import { Rich } from "../ui/Rich";

/** Chapter 03 — governance: profiles matrix, fail-closed, human authority. */
export function Governance() {
  const { t } = useI18n();
  const g = t.governance;
  const quoteA = g.quoteA.split(" ");
  const quoteB = g.quoteB.split(" ");
  return (
    <Chapter
      id="gobernanza"
      n="03"
      label={g.label}
      aside="profiles[] · fail-closed"
      title={
        <>
          {g.title} <Accent>{g.accent}</Accent>
        </>
      }
      lede={g.lede}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10">
        {/* Profile matrix */}
        <figure className="lg:col-span-7" data-reveal data-motion="profile-matrix">
          <div className="overflow-hidden rounded-2xl border hairline">
            <table className="w-full table-fixed border-collapse text-left">
              <caption className="sr-only">{g.tableCaption}</caption>
              <thead>
                <tr className="border-b hairline bg-white/[0.02]">
                  <th scope="col" className="w-[50%] sm:w-[40%] px-3 sm:px-5 py-4 font-mono text-[10px] font-normal uppercase tracking-[0.14em] text-muted">
                    {g.fileColumn}
                  </th>
                  {PROFILES.map((p) => {
                    const [a, b] = p.split("-");
                    return (
                      <th key={p} scope="col" title={p} className="px-1 py-4 text-center font-mono text-[9px] sm:text-[10px] font-normal leading-tight text-ivory/85">
                        <span className="sm:hidden" aria-hidden="true">{a.slice(0, 4)}</span>
                        <span className="sr-only sm:not-sr-only">{a}</span>
                        <br />
                        <span className="text-muted">{b === "private" ? g.priv : g.pub}</span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {PROFILE_ROWS.map((r, ri) => (
                  <tr key={r.file} data-row={r.file} className={`border-b last:border-b-0 hairline ${ri === 7 ? "border-t border-t-white/15" : ""}`}>
                    <th scope="row" className="px-3 sm:px-5 py-3 font-mono text-[10.5px] sm:text-[12px] font-normal text-ivory/90 truncate">
                      {r.file}
                    </th>
                    {r.in.map((v, i) => (
                      <td key={i} className="py-3 text-center">
                        {v ? (
                          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_12px_rgba(164,143,255,0.55)]" data-cell="in" aria-label={g.included} style={{ ["--c" as string]: i, ["--r" as string]: ri }} />
                        ) : (
                          <span className="inline-block h-2.5 w-2.5 rounded-full border border-white/15" data-cell="out" aria-label={g.excluded} style={{ ["--c" as string]: i, ["--r" as string]: ri }} />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <figcaption className="mt-4 font-mono text-[11px] text-muted">
            {g.figCaption}
          </figcaption>
        </figure>

        {/* Principles */}
        <div className="lg:col-span-5 space-y-10">
          <article data-reveal>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-xl font-semibold tracking-tight text-ivory">{g.failClosedTitle}</h3>
              <StatusTag status="lab" label={g.failClosedTag} />
            </div>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              <Rich text={g.failClosedBody} />
            </p>
          </article>

          <article data-reveal>
            <h3 className="text-xl font-semibold tracking-tight text-ivory">{g.authorityTitle}</h3>
            <pre className="mt-4 code-surface rounded-xl px-4 py-4 font-mono text-[12px] leading-[1.8] whitespace-pre-wrap [overflow-wrap:anywhere] text-muted">
              <span className="text-secondary">"ownership"</span>: <span className="text-ivory">"originator-owned"</span>,{"\n"}
              <span className="text-secondary">"authorityGrantedByPackage"</span>: <span className="text-primary">false</span>,{"\n"}
              <span className="text-secondary">"implicitMemory"</span>: <span className="text-primary">false</span>
            </pre>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              {g.authorityBody}
            </p>
          </article>

          <article data-reveal>
            <h3 className="text-xl font-semibold tracking-tight text-ivory">{g.vocabularyTitle}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              <Rich text={g.vocabularyBody} />
            </p>
          </article>
        </div>
      </div>

      <blockquote className="mt-20 sm:mt-28 text-center" data-reveal data-motion="pull-quote">
        <p className="font-serif italic text-3xl sm:text-5xl lg:text-6xl leading-tight tracking-tight text-ivory">
          {/* Words drift in from a wider tracking and settle (transform only, no reflow). */}
          {quoteA.map((w, i) => (
            <Fragment key={`a${i}`}>
              <span className="qw" style={{ ["--d" as string]: i - quoteA.length + 0.5 }}>{w}</span>{" "}
            </Fragment>
          ))}
          <span className="text-primary">
            {quoteB.map((w, i) => (
              <Fragment key={`b${i}`}>
                {i > 0 && " "}
                <span className="qw" style={{ ["--d" as string]: i + 0.5 }}>{w}</span>
              </Fragment>
            ))}
          </span>
          <span className="qw" style={{ ["--d" as string]: quoteB.length }}>”</span>
        </p>
      </blockquote>
    </Chapter>
  );
}
