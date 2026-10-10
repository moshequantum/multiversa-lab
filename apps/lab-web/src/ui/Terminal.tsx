import type { ReactNode } from "react";

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

/** Terminal window. Lines wrap (break-all) so long hashes never cause horizontal page scroll. */
export function Terminal({ title, lines, footer }: { title: string; lines: TermLine[]; footer?: ReactNode }) {
  return (
    <figure className="code-surface overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]" data-motion="terminal">
      <div className="flex items-center gap-3 border-b hairline px-4 py-3">
        <span aria-hidden="true" className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        </span>
        <figcaption className="font-mono text-[11px] text-muted truncate">{title}</figcaption>
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
