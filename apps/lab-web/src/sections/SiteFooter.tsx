import { MultiversaLogo } from "@multiversa/design-system";
import { CUTOFF, GROUP_URL, REPO_URL } from "../content/passport";
import { useI18n } from "../i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="relative border-t hairline px-5 sm:px-8 lg:px-12 pt-20 pb-12" data-motion="footer">
      <div className="max-w-page mx-auto">
        <p className="max-w-3xl font-serif italic text-3xl sm:text-5xl leading-[1.1] tracking-tight text-ivory">
          {t.footer.quote} <span className="text-primary">{t.footer.quoteAccent}</span>
        </p>
        <div className="mt-16 flex flex-col gap-8 border-t hairline pt-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            {/* Official lockup from the design system, white on night (never re-tinted). */}
            <MultiversaLogo height={22} className="h-[22px] w-auto text-white opacity-90" />
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-muted">
              {t.footer.license} · {t.footer.cutoff} <time dateTime={CUTOFF}>{t.common.cutoffLabel}</time>
              <br />
              {t.footer.builtBy}
            </p>
          </div>
          <nav aria-label={t.footer.linksLabel} className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[12px]">
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="text-ivory/85 hover:text-primary">{t.footer.repo}</a>
            <a href={`${REPO_URL}/blob/main/ROADMAP.md`} target="_blank" rel="noopener noreferrer" className="text-ivory/85 hover:text-primary">{t.footer.roadmap}</a>
            <a href="#creditos" className="text-ivory/85 hover:text-primary">{t.footer.credits}</a>
            <a href="#preguntas" className="text-ivory/85 hover:text-primary">{t.footer.faq}</a>
            <a href={GROUP_URL} target="_blank" rel="noopener noreferrer" className="text-ivory/85 hover:text-primary">Multiversa.Group</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
