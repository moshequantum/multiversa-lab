import { CUTOFF, CUTOFF_LABEL, GROUP_URL, REPO_URL } from "../content/passport";

export function SiteFooter() {
  return (
    <footer className="relative border-t hairline px-5 sm:px-8 lg:px-12 pt-20 pb-12" data-motion="footer">
      <div className="max-w-page mx-auto">
        <p className="max-w-3xl font-serif italic text-3xl sm:text-5xl leading-[1.1] tracking-tight text-ivory">
          Un cuaderno abierto: lo que intentamos, lo que pasó y <span className="text-primary">lo que falta.</span>
        </p>
        <div className="mt-16 flex flex-col gap-8 border-t hairline pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <img src="/multiversa-wordmark-light.svg" alt="Multiversa" width={136} height={27} className="h-[22px] w-auto opacity-90" />
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">
              Multiversa.Lab · licencia MIT · corte <time dateTime={CUTOFF}>{CUTOFF_LABEL}</time>
              <br />
              Construido en público por Moisés David Vera.
            </p>
          </div>
          <nav aria-label="Enlaces" className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px]">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="text-ivory/85 hover:text-primary">Repositorio</a>
            <a href={`${REPO_URL}/blob/main/ROADMAP.md`} target="_blank" rel="noopener noreferrer" className="text-ivory/85 hover:text-primary">Roadmap</a>
            <a href="#creditos" className="text-ivory/85 hover:text-primary">Créditos</a>
            <a href={GROUP_URL} target="_blank" rel="noopener noreferrer" className="text-ivory/85 hover:text-primary">Multiversa.Group</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
