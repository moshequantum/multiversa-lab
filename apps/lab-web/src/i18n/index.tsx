import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import type { Language, TranslationSchema } from "./types";
import { esTranslations } from "./es";
import { enTranslations } from "./en";

export type { Language, TranslationSchema } from "./types";

/** Same shape as the Group site's i18n (multiversaOS/apps/web/src/lib/i18n). */
interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationSchema;
}

const DICTIONARIES: Record<Language, TranslationSchema> = { es: esTranslations, en: enTranslations };
const STORAGE_KEY = "multiversa-lab:lang";
const isLanguage = (v: unknown): v is Language => v === "es" || v === "en";

/**
 * Initial language, browser only: ?lang=es|en > saved choice > navigator.language ("es*" → es,
 * anything else → en). Storage can throw (private mode, blocked cookies), so it is optional.
 */
export function detectLanguage(): Language {
  if (typeof window === "undefined") return "es";
  const fromQuery = new URLSearchParams(window.location.search).get("lang");
  if (isLanguage(fromQuery)) return fromQuery;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (isLanguage(saved)) return saved;
  } catch {
    /* storage unavailable */
  }
  return (navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en";
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

/**
 * `initialLanguage` pins the language (the static hero shell renders in Spanish at build time);
 * without it the provider detects the visitor's language on mount.
 */
export function I18nProvider({ children, initialLanguage }: { children: ReactNode; initialLanguage?: Language }) {
  const [language, setLanguageState] = useState<Language>(() => initialLanguage ?? detectLanguage());

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable: the choice lasts for this visit */
    }
    // Keep an explicit ?lang= in the URL consistent with the choice (it wins on reload).
    const url = new URL(window.location.href);
    if (url.searchParams.has("lang")) {
      url.searchParams.set("lang", lang);
      window.history.replaceState(window.history.state, "", url);
    }
  }, []);

  const t = DICTIONARIES[language];

  // Keep <html lang> (WCAG 3.1.1), the title and the meta description in sync.
  useEffect(() => {
    document.documentElement.lang = language;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", t.meta.description);
  }, [language, t]);

  return <I18nContext.Provider value={{ language, setLanguage, t }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
