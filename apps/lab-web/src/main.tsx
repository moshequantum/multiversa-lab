import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { I18nProvider, LANGUAGE_PATHS, isLanguage, languageFromPath } from "./i18n";
// Brand typography, self-hosted (same origin; CSP font-src 'self'). Same families as Multiversa.Group.
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/jetbrains-mono";
import "./index.css";
import "./motion/motion.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const language = languageFromPath(window.location.pathname);

// Legacy ?lang=es|en links: the URL path is the language now. vercel.json redirects these on the
// edge; this covers local preview and any host without those rules. No other automatic redirect.
const url = new URL(window.location.href);
const requested = url.searchParams.get("lang");
if (isLanguage(requested) && requested !== language) {
  window.location.replace(LANGUAGE_PATHS[requested] + url.hash);
} else {
  if (url.searchParams.has("lang")) {
    url.searchParams.delete("lang");
    window.history.replaceState(window.history.state, "", url);
  }

  const app = (
    <React.StrictMode>
      <I18nProvider language={language}>
        <App />
      </I18nProvider>
    </React.StrictMode>
  );

  // Production pages are prerendered (scripts/prerender.mjs): hydrate them. `vite dev` serves the
  // empty template, so render from scratch there.
  if (rootElement.firstElementChild) ReactDOM.hydrateRoot(rootElement, app);
  else ReactDOM.createRoot(rootElement).render(app);
}
