import { GitBranch } from "lucide-react";
import { MultiversaLogo } from "@multiversa/design-system";
import { REPO_URL } from "../content/passport";
import { LANGUAGE_PATHS, LANGUAGES, useI18n } from "../i18n";

/** Chapter anchors stay stable across languages (shared links keep working); labels are translated. */
export const CHAPTERS = [
  { n: "01", id: "anatomia" },
  { n: "02", id: "integridad" },
  { n: "03", id: "gobernanza" },
  { n: "04", id: "posicion" },
  { n: "05", id: "cuaderno" },
  { n: "06", id: "bitacora" },
  { n: "07", id: "usalo" },
] as const;

/**
 * ES/EN pill, same pattern as the Group navbar in the Lab's hairline style. Each language is its own
 * prerendered page (/ and /en/), so these are real links (crawlable, work without JS). With JS the
 * current #chapter is carried over, since anchors are identical in both languages.
 */
function LanguageToggle() {
  const { language, t } = useI18n();
  return (
    <nav
      aria-label={t.header.languageGroup}
      data-motion="lang-toggle"
      className="flex items-center rounded-pill border hairline bg-surface/60 p-0.5 font-mono text-[10px] sm:text-[11px]"
    >
      {LANGUAGES.map((lang) => {
        const on = language === lang;
        const href = LANGUAGE_PATHS[lang];
        return (
          <a
            key={lang}
            href={href}
            lang={lang}
            hrefLang={lang}
            aria-current={on ? "page" : undefined}
            aria-label={t.header.languages[lang]}
            onClick={(e) => {
              if (on) {
                e.preventDefault();
                return;
              }
              if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
              e.preventDefault();
              window.location.assign(href + window.location.hash);
            }}
            className={`rounded-pill px-2 sm:px-2.5 py-1 uppercase tracking-[0.08em] transition-colors ${
              on ? "bg-ivory font-semibold text-canvas" : "text-muted hover:text-ivory"
            }`}
          >
            {lang}
          </a>
        );
      })}
    </nav>
  );
}

export function SiteHeader({ active }: { active: string }) {
  const { t } = useI18n();
  return (
    <header
      data-motion="site-header"
      className="fixed inset-x-0 top-0 z-50 border-b hairline bg-canvas/75 backdrop-blur-xl backdrop-saturate-150 px-5 sm:px-8 lg:px-12"
    >
      <div className="max-w-page mx-auto flex h-14 sm:h-16 items-center justify-between gap-3 sm:gap-4">
        {/* Official lockup (white, from the design system) + "Lab" as the sub-brand. */}
        <a href="#top" className="flex min-w-0 items-center gap-2.5 sm:gap-3 text-white" aria-label={t.header.homeLabel}>
          <MultiversaLogo decorative height={22} className="h-[19px] w-auto shrink-0 sm:h-[22px]" />
          <span aria-hidden="true" className="h-4 w-px shrink-0 bg-white/20" />
          <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-muted">{t.header.lab}</span>
          <span className="ml-1 hidden sm:inline-flex lg:hidden 2xl:inline-flex shrink-0 rounded-pill border hairline px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            {t.header.researchPreview}
          </span>
        </a>

        <nav aria-label={t.header.chaptersNav} className="hidden lg:flex items-center gap-1 font-mono text-[11px]">
          {CHAPTERS.map((c) => (
            <a
              key={c.n}
              href={`#${c.id}`}
              aria-current={active === c.n ? "true" : undefined}
              className={`rounded-md px-2.5 py-1.5 transition-colors ${
                active === c.n ? "text-ivory bg-white/[0.05]" : "text-muted hover:text-ivory"
              }`}
            >
              <span className="text-primary/80">{c.n}</span> {t.header.chapters[c.n]}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageToggle />
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t.header.codeLabel}
            className="inline-flex items-center gap-2 rounded-pill border hairline bg-surface/60 p-2 sm:px-3.5 sm:py-1.5 font-mono text-[11px] text-ivory transition-colors hover:border-primary/50"
          >
            <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">{t.header.code}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
