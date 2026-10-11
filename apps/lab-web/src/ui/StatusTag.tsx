import type { Status } from "../content/passport";
import { useI18n } from "../i18n";

const STYLES: Record<Status, { cls: string; dot: string }> = {
  works: { cls: "text-ok border-ok/30 bg-ok/[0.06]", dot: "bg-ok" },
  lab: { cls: "text-warn border-warn/30 bg-warn/[0.06]", dot: "bg-warn" },
  pending: { cls: "text-primary border-primary/35 bg-primary/[0.07]", dot: "bg-primary" },
};

export function StatusTag({ status, label }: { status: Status; label?: string }) {
  const { t } = useI18n();
  const s = STYLES[status];
  return (
    <span
      data-status={status}
      className={`inline-flex items-center gap-1.5 rounded-pill border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] whitespace-nowrap ${s.cls}`}
    >
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {label ?? t.status[status]}
    </span>
  );
}
