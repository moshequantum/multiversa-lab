import { ArrowUpRight } from "lucide-react";
import { Chapter, Accent } from "../ui/Chapter";
import { CopyButton } from "../ui/CopyButton";
import { GROUP_URL } from "../content/passport";
import { useI18n } from "../i18n";

/** Commands are code: identical in every language. Titles and notes live in src/i18n (getIt.steps). */
const STEPS = [
  { n: "01", cmd: "git clone https://github.com/moshequantum/multiversa-lab.git && cd multiversa-lab" },
  { n: "02", cmd: "pnpm install && pnpm build:core && pnpm test" },
  { n: "03", cmd: "cd cli && go build -o multiversa ." },
  { n: "04", cmd: "./multiversa passport verify ../templates/open-passport-template" },
  { n: "05", cmd: "./multiversa passport init ./mi-passport --name \"MiNegocio\" --originator \"Tu nombre\"" },
  { n: "06", cmd: "./multiversa passport build ./mi-passport" },
];

/** Chapter 07 — get it: real, locally verified commands + the business-owner exit to Group. */
export function GetIt() {
  const { t } = useI18n();
  const g = t.getIt;
  return (
    <Chapter
      id="usalo"
      n="07"
      label={g.label}
      aside={g.aside}
      title={
        <>
          {g.title} <Accent>{g.accent}</Accent>
        </>
      }
      lede={g.lede}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-start">
        <ol className="lg:col-span-8 space-y-4" data-motion="steps">
          {STEPS.map((s, i) => {
            const copy = g.steps[i];
            return (
            <li key={s.n} data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }} className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr] gap-x-3">
              <span className="pt-3 font-serif italic text-2xl sm:text-3xl text-primary/80 leading-none">{s.n}</span>
              <div className="min-w-0">
                <p className="text-[15px] font-medium text-ivory">{copy.title}</p>
                <div className="mt-2 code-surface flex items-start justify-between gap-2 rounded-xl py-2 pl-4 pr-2">
                  <code className="min-w-0 py-1.5 font-mono text-[12px] sm:text-[13px] leading-relaxed text-ivory/90 [overflow-wrap:anywhere]">
                    <span className="select-none text-primary">$ </span>
                    {s.cmd}
                  </code>
                  <CopyButton text={s.cmd} label={t.common.copyCommand} copiedLabel={t.common.copied} />
                </div>
                {copy.out && <p className="mt-2 font-mono text-[11px] text-muted">{copy.out}</p>}
              </div>
            </li>
            );
          })}
        </ol>

        <aside className="lg:col-span-4 lg:sticky lg:top-28" data-reveal>
          <div className="relative overflow-hidden rounded-2xl border hairline bg-surface/50 p-7">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <p className="kicker relative">{g.ownerKicker}</p>
            <p className="relative mt-4 text-xl font-semibold tracking-tight text-ivory leading-snug">
              {g.ownerTitle}
            </p>
            <p className="relative mt-3 text-[15px] leading-relaxed text-muted">
              {g.ownerBody}
            </p>
            <a
              href={GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="relative mt-6 inline-flex items-center gap-2 rounded-pill bg-ivory px-5 py-3 text-sm font-semibold text-canvas transition-transform hover:scale-[1.02]"
            >
              multiversa.group
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </aside>
      </div>
    </Chapter>
  );
}
