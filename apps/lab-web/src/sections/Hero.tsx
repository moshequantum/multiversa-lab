import { Fragment } from "react";
import { ArrowDown, GitBranch } from "lucide-react";
import { REPO_URL } from "../content/passport";
import { useI18n } from "../i18n";

/**
 * Chapter 00 — the problem.
 * IMPORTANT: index.html contains a static copy of this markup (first paint before JS).
 * Keep both in sync: same classes, same text. Regenerate with `pnpm --filter @multiversa/lab-web hero-shell`
 * (the shell renders the Spanish dictionary; React re-renders in the visitor's language on mount).
 */
export function Hero() {
  const { t } = useI18n();
  const h = t.hero;
  return (
    <section id="top" data-chapter="00" className="hero relative overflow-hidden grain px-5 sm:px-8 lg:px-12 pt-28 sm:pt-36 lg:pt-32 pb-20 sm:pb-28">
      <div aria-hidden="true" data-motion="hero-glow" className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(55% 45% at 78% 30%, rgba(124,92,255,0.20), transparent 70%), radial-gradient(40% 35% at 10% 80%, rgba(192,132,252,0.08), transparent 70%)" }} />
      <div aria-hidden="true" className="absolute inset-0 grid-paper opacity-40 pointer-events-none [mask-image:radial-gradient(70%_60%_at_70%_30%,black,transparent)]" />

      <div className="relative max-w-page mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center">
        <div className="lg:col-span-7">
          <p className="kicker flex items-center gap-3">
            <span className="h-px w-8 bg-primary" aria-hidden="true" data-motion="hero-rule"></span>
            <span data-motion="hero-kicker"><span className="text-primary">00</span> — {h.kicker}</span>
          </p>
          {/* Words are split for the mask-rise entrance (CSS only, runs from the static shell). */}
          <h1 data-motion="hero-title" className="mt-7 display font-sans font-semibold text-[2.6rem] sm:text-6xl lg:text-[4.6rem] text-ivory">
            {h.title.split(" ").map((w, i) => (
              <Fragment key={i}>
                <span className="hw" style={{ ["--i" as string]: i }}>{w}</span>{" "}
              </Fragment>
            ))}
            <span className="accent-serif text-primary" data-motion="hero-accent">{h.accent}</span>
          </h1>
          <p className="mt-6 max-w-prose lede text-base sm:text-lg text-muted font-light">
            {h.lede}
          </p>
          <dl data-motion="hero-meta" className="mt-8 grid grid-cols-3 border-y hairline py-4 max-w-xl">
            <div className="pr-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{h.meta.formatLabel}</dt>
              <dd className="mt-1 text-[13px] sm:text-sm font-medium text-ivory">{h.meta.formatValue}</dd>
            </div>
            <div className="border-x hairline px-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{h.meta.integrityLabel}</dt>
              <dd className="mt-1 text-[13px] sm:text-sm font-medium text-ivory">{h.meta.integrityValue}</dd>
            </div>
            <div className="pl-3">
              <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{h.meta.stateLabel}</dt>
              <dd className="mt-1 text-[13px] sm:text-sm font-medium text-ok">{h.meta.stateValue}</dd>
            </div>
          </dl>
          <div data-motion="hero-cta" className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#anatomia" className="inline-flex items-center gap-2 rounded-pill bg-ivory px-6 py-3.5 text-sm font-semibold text-canvas transition-transform hover:scale-[1.02]">
              {h.ctaRead}
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={REPO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-pill border hairline bg-surface/60 px-6 py-3.5 text-sm font-medium text-ivory transition-colors hover:border-primary/50">
              <GitBranch className="h-4 w-4" aria-hidden="true" />
              {h.ctaRepo}
            </a>
          </div>
        </div>

        <figure data-motion="hero-fragments" data-reveal="fade" className="lg:col-span-5 code-surface rounded-2xl p-5 sm:p-6">
          <figcaption className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
            <span>{h.figLabel}</span>
            <span>{h.figCaption}</span>
          </figcaption>
          <ul className="mt-5 divide-y divide-white/[0.06]">
            {h.fragments.map((f, i) => (
              <li key={f.model} data-fragment="" style={{ ["--i" as string]: i }} className="flex items-center justify-between gap-3 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-medium text-ivory">{f.model}</p>
                  <p className="mt-0.5 font-mono text-[12px] text-muted truncate">{f.claim}</p>
                </div>
                <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-warn/90">{f.tag}</span>
              </li>
            ))}
          </ul>
          <p data-motion="hero-converge" className="mt-2 flex items-center gap-3 font-mono text-[11px] text-muted">
            <span className="h-px flex-1 bg-white/10" aria-hidden="true"></span>
            <span>{h.converge}</span>
            <span className="h-px flex-1 bg-white/10" aria-hidden="true"></span>
          </p>
          <div data-motion="hero-passport" className="mt-4 rounded-xl border border-primary/35 bg-primary/[0.06] p-4">
            <p className="font-mono text-[12px] text-ivory">passport/ · manifest.json</p>
            <p className="mt-1 font-mono text-[11px] text-muted">{h.passportSummary}</p>
            <p className="mt-3 font-mono text-[11px] text-ok"><span data-motion="hero-verify" className="inline-block">{h.verify}</span></p>
          </div>
        </figure>
      </div>
    </section>
  );
}
