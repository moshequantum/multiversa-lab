import { renderToStaticMarkup } from "react-dom/server";
import { SiteHeader } from "./sections/SiteHeader";
import { Hero } from "./sections/Hero";
import { I18nProvider } from "./i18n";

/** Static first paint used by scripts/hero-shell.mjs. Mirrors the top of <App />, in Spanish (default). */
export function renderShell(): string {
  return renderToStaticMarkup(
    <I18nProvider initialLanguage="es">
      <SiteHeader active="00" />
      <main id="main">
        <Hero />
      </main>
    </I18nProvider>
  );
}
