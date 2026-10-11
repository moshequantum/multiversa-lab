import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { I18nProvider, type Language } from "./i18n";

export { renderHead, PAGES } from "./seo";

/** Full landing as HTML for one language. Must match what src/main.tsx hydrates. */
export function renderApp(language: Language): string {
  return renderToString(
    <StrictMode>
      <I18nProvider language={language}>
        <App />
      </I18nProvider>
    </StrictMode>
  );
}
