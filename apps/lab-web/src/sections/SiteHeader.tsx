import { GitBranch } from "lucide-react";
import { Isotype } from "../ui/Isotype";
import { REPO_URL } from "../content/passport";

export const CHAPTERS = [
  { n: "01", id: "anatomia", label: "Anatomía" },
  { n: "02", id: "integridad", label: "Integridad" },
  { n: "03", id: "gobernanza", label: "Gobernanza" },
  { n: "04", id: "posicion", label: "Posición" },
  { n: "05", id: "cuaderno", label: "Cuaderno" },
  { n: "06", id: "bitacora", label: "Bitácora" },
  { n: "07", id: "usalo", label: "Úsalo" },
];

export function SiteHeader({ active }: { active: string }) {
  return (
    <header
      data-motion="site-header"
      className="fixed inset-x-0 top-0 z-50 border-b hairline bg-canvas/75 backdrop-blur-xl backdrop-saturate-150 px-5 sm:px-8 lg:px-12"
    >
      <div className="max-w-page mx-auto flex h-14 sm:h-16 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2.5 text-ivory" aria-label="Multiversa.Lab, inicio">
          <Isotype className="h-5 w-5 text-primary" />
          <span className="font-sans text-[15px] font-semibold tracking-tight">
            Multiversa<span className="text-muted">.Lab</span>
          </span>
          <span className="ml-1 hidden sm:inline-flex rounded-pill border hairline px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Research preview
          </span>
        </a>

        <nav aria-label="Capítulos" className="hidden lg:flex items-center gap-1 font-mono text-[11px]">
          {CHAPTERS.map((c) => (
            <a
              key={c.n}
              href={`#${c.id}`}
              aria-current={active === c.n ? "true" : undefined}
              className={`rounded-md px-2.5 py-1.5 transition-colors ${
                active === c.n ? "text-ivory bg-white/[0.05]" : "text-muted hover:text-ivory"
              }`}
            >
              <span className="text-primary/80">{c.n}</span> {c.label}
            </a>
          ))}
        </nav>

        <a
          href={REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-pill border hairline bg-surface/60 px-3.5 py-1.5 font-mono text-[11px] text-ivory transition-colors hover:border-primary/50"
        >
          <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Código · MIT</span>
        </a>
      </div>
    </header>
  );
}
