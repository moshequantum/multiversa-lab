import { createContext, useContext, type ReactNode } from "react";
import type { Language, TranslationSchema } from "./types";
import { esTranslations } from "./es";
import { enTranslations } from "./en";

export type { Language, TranslationSchema } from "./types";

/** Same shape as the Group site's i18n (multiversaOS/apps/web/src/lib/i18n), minus the setter. */
interface I18nContextType {
  language: Language;
  t: TranslationSchema;
}

export const DICTIONARIES: Record<Language, TranslationSchema> = { es: esTranslations, en: enTranslations };
export const LANGUAGES: Language[] = ["es", "en"];

/**
 * One prerendered page per language: "/" (es, default) and "/en/" (en). The URL is the only
 * source of the language: no navigator sniffing and no automatic redirects, so crawlers and
 * humans always get the page they asked for.
 */
export const LANGUAGE_PATHS: Record<Language, string> = { es: "/", en: "/en/" };

export const isLanguage = (v: unknown): v is Language => v === "es" || v === "en";

export function languageFromPath(pathname: string): Language {
  return /^\/en(\/|$)/.test(pathname) ? "en" : "es";
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children, language }: { children: ReactNode; language: Language }) {
  return <I18nContext.Provider value={{ language, t: DICTIONARIES[language] }}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextType {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
