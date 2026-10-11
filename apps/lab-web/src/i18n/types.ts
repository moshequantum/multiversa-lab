import type { CreditId, LogId, LogTag } from "../content/logbook";
import type { ExtraPath, LayerId, StatusItemId, TaskId } from "../content/passport";

export type Language = "es" | "en";

/**
 * Rich strings: `code` renders as inline mono code and *text* as ivory emphasis (see ui/Rich.tsx).
 * Everything else is plain text. Keep commands, hashes, paths and proper names untouched.
 */
type Rich = string;

/** A headline: plain words (split for the mask-rise entrance) + the serif accent that lands last. */
interface Headline {
  title: string;
  accent: string;
}

interface ChapterCopy extends Headline {
  label: string;
  lede: string;
}

export interface TranslationSchema {
  meta: {
    title: string;
    description: string;
    /** Alt text of the social preview image (public/og-image*.png). */
    ogImageAlt: string;
  };
  common: {
    cutoffLabel: string;
    skipToContent: string;
    copyCommand: string;
    copied: string;
    replayRun: string;
    replay: string;
  };
  header: {
    homeLabel: string;
    lab: string;
    researchPreview: string;
    chaptersNav: string;
    code: string;
    codeLabel: string;
    languageGroup: string;
    languages: Record<Language, string>;
    chapters: Record<"01" | "02" | "03" | "04" | "05" | "06" | "07", string>;
  };
  status: {
    works: string;
    lab: string;
    pending: string;
  };
  hero: Headline & {
    kicker: string;
    lede: string;
    meta: { formatLabel: string; formatValue: string; integrityLabel: string; integrityValue: string; stateLabel: string; stateValue: string };
    ctaRead: string;
    ctaRepo: string;
    figLabel: string;
    figCaption: string;
    fragments: { model: string; claim: string; tag: string }[];
    converge: string;
    passportSummary: string;
    verify: string;
  };
  anatomy: ChapterCopy & {
    layersLabel: string;
    layers: Record<LayerId, { title: string; body: string }>;
    entryCaption: string;
    entryReal: string;
    loadOrder: string;
    loadOrderListed: string;
    outsideTitle: string;
    outsideBody: string;
    extras: Record<ExtraPath, string>;
    labNoteLabel: string;
    labNote: string;
  };
  integrity: ChapterCopy & {
    specs: { title: string; body: Rich }[];
    termNote: string;
    termFooter: Rich;
    provesTitle: string;
    provesBody: Rich;
    notYetTitle: string;
    notYetBody: Rich;
  };
  governance: ChapterCopy & {
    fileColumn: string;
    tableCaption: string;
    included: string;
    excluded: string;
    priv: string;
    pub: string;
    figCaption: string;
    failClosedTitle: string;
    failClosedTag: string;
    failClosedBody: Rich;
    authorityTitle: string;
    authorityBody: string;
    vocabularyTitle: string;
    vocabularyBody: Rich;
    quoteA: string;
    quoteB: string;
  };
  position: ChapterCopy & {
    aside: string;
    canonicalLayer: string;
    canonicalTraits: string;
    loadsInto: string;
    modelsAndAgents: string;
    queries: string;
    workingMemory: string;
    memoryExamples: string;
    figCaption: string;
    rows: { k: string; mem: string; pp: string }[];
    engramNote: string;
  };
  notebook: ChapterCopy & {
    cutoff: string;
    status: Record<StatusItemId, string>;
    contractTitle: string;
    contractProgress: string;
    tasks: Record<TaskId, string>;
    releaseTitle: string;
    release: { k: string; v: string }[];
    errataTitle: string;
    errataIntro: string;
    errata: { claim: string; correction: string }[];
  };
  logbook: ChapterCopy & {
    tags: Record<LogTag, string>;
    entries: Record<LogId, Rich>;
    creditsTitle: string;
    creditsAccent: string;
    creditsBody: string;
    credits: Record<CreditId, { body: string; license?: string }>;
  };
  getIt: ChapterCopy & {
    aside: string;
    steps: { title: string; out: string }[];
    ownerKicker: string;
    ownerTitle: string;
    ownerBody: string;
  };
  /**
   * Visible FAQ. It is also the only source of the FAQPage JSON-LD (src/seo.ts), so every answer
   * must restate what the page already says. Rich markers (`code`, *em*) are stripped for JSON-LD.
   */
  faq: {
    label: string;
    title: string;
    accent: string;
    items: { q: string; a: Rich }[];
  };
  footer: {
    quote: string;
    quoteAccent: string;
    license: string;
    cutoff: string;
    builtBy: string;
    linksLabel: string;
    repo: string;
    roadmap: string;
    credits: string;
    faq: string;
  };
}
