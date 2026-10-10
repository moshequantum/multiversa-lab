import { renderToStaticMarkup } from "react-dom/server";
import { SiteHeader } from "./sections/SiteHeader";
import { Hero } from "./sections/Hero";

/** Static first paint used by scripts/hero-shell.mjs. Mirrors the top of <App />. */
export function renderShell(): string {
  return renderToStaticMarkup(
    <>
      <SiteHeader active="00" />
      <main id="main">
        <Hero />
      </main>
    </>
  );
}
