import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { I18nProvider } from "./i18n";
// Brand typography, self-hosted (same origin; CSP font-src 'self'). Same families as Multiversa.Group.
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/newsreader/opsz.css";
import "@fontsource-variable/newsreader/opsz-italic.css";
import "@fontsource-variable/jetbrains-mono";
import "./index.css";
import "./motion/motion.css";
import { captureShellTimeline } from "./motion/heroSync";

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

captureShellTimeline();

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>
);
