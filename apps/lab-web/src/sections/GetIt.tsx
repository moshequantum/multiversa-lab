import { ArrowUpRight } from "lucide-react";
import { Chapter, Accent } from "../ui/Chapter";
import { CopyButton } from "../ui/CopyButton";
import { GROUP_URL } from "../content/passport";

const STEPS = [
  { n: "01", title: "Clona el laboratorio", cmd: "git clone https://github.com/moshequantum/multiversa-lab.git && cd multiversa-lab", out: "" },
  { n: "02", title: "Core en TypeScript", cmd: "pnpm install && pnpm build:core && pnpm test", out: "# tests 3 · pass 3 · fail 0" },
  { n: "03", title: "CLI en Go", cmd: "cd cli && go build -o multiversa .", out: "go 1.23+ · binario local" },
  { n: "04", title: "Verifica la plantilla", cmd: "./multiversa passport verify ../templates/open-passport-template", out: "[100% PASS]" },
  { n: "05", title: "Crea el tuyo", cmd: "./multiversa passport init ./mi-passport --name \"MiNegocio\" --originator \"Tu nombre\"", out: "escribe las 7 capas, .gitattributes y MASTER-PROMPT.md" },
  { n: "06", title: "Edita las capas y séllalo", cmd: "./multiversa passport build ./mi-passport", out: "hashes + manifestSelfHash + generation.receipt.json · luego: export --profile core-public" },
];

/** Chapter 07 — get it: real, locally verified commands + the business-owner exit to Group. */
export function GetIt() {
  return (
    <Chapter
      id="usalo"
      n="07"
      label="Úsalo"
      aside="MIT · código abierto"
      title={
        <>
          Clona. Verifica. <Accent>Decide tú.</Accent>
        </>
      }
      lede="Todo lo de esta página está en el repositorio, con licencia MIT. Estos comandos se ejecutaron tal cual antes de publicarlos."
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-start">
        <ol className="lg:col-span-8 space-y-4" data-motion="steps">
          {STEPS.map((s, i) => (
            <li key={s.n} data-reveal style={{ ["--reveal-delay" as string]: `${i * 60}ms` }} className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3.5rem_1fr] gap-x-3">
              <span className="pt-3 font-serif italic text-2xl sm:text-3xl text-primary/80 leading-none">{s.n}</span>
              <div className="min-w-0">
                <p className="text-[15px] font-medium text-ivory">{s.title}</p>
                <div className="mt-2 code-surface flex items-start justify-between gap-2 rounded-xl py-2 pl-4 pr-2">
                  <code className="min-w-0 py-1.5 font-mono text-[12px] sm:text-[13px] leading-relaxed text-ivory/90 [overflow-wrap:anywhere]">
                    <span className="select-none text-primary">$ </span>
                    {s.cmd}
                  </code>
                  <CopyButton text={s.cmd} />
                </div>
                {s.out && <p className="mt-2 font-mono text-[11px] text-muted">{s.out}</p>}
              </div>
            </li>
          ))}
        </ol>

        <aside className="lg:col-span-4 lg:sticky lg:top-28" data-reveal>
          <div className="relative overflow-hidden rounded-2xl border hairline bg-surface/50 p-7">
            <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
            <p className="kicker relative">Para quien dirige un negocio</p>
            <p className="relative mt-4 text-xl font-semibold tracking-tight text-ivory leading-snug">
              ¿Prefieres no abrir una terminal?
            </p>
            <p className="relative mt-3 text-[15px] leading-relaxed text-muted">
              Multiversa.Group construye el Passport contigo, en lenguaje de negocio. El Lab no vende nada: aquí está el código; allá, el acompañamiento.
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
