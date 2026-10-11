// Renders the social preview images (1200×630 PNG) from scripts/og/template.html:
//   public/og-image.png     (es, used by /)
//   public/og-image-en.png  (en, used by /en/)
// Copy comes from src/i18n (hero kicker, headline and status), so the image says what the page says.
//
//   pnpm --filter @multiversa/lab-web og-image
//
// Needs a Playwright Chromium (PLAYWRIGHT_BROWSERS_PATH or `pnpm exec playwright-core install chromium`).
// If ImageMagick is on PATH the PNGs are quantized to a 256-colour palette (optional, smaller files).
import { execFileSync } from "node:child_process";
import { mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const require = createRequire(import.meta.url);
const font = (pkg, file) => pathToFileURL(require.resolve(`@fontsource-variable/${pkg}/files/${file}`)).href;
const escapeHtml = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const PAGES = [
  { language: "es", out: "public/og-image.png", path: "", integrity: "SHA-256 por archivo" },
  { language: "en", out: "public/og-image-en.png", path: "/en", integrity: "SHA-256 per file" },
];

const vite = await createServer({
  root,
  logLevel: "error",
  server: { middlewareMode: true },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, include: [] },
});
let DICTIONARIES;
try {
  ({ DICTIONARIES } = await vite.ssrLoadModule("/src/i18n/index.tsx"));
} finally {
  await vite.close();
}

const template = await readFile(join(root, "scripts/og/template.html"), "utf8");
// Official white lockup from the design system (never re-tinted).
const wordmark = (await readFile(join(root, "../../packages/design-system/assets/multiversa-wordmark-light.svg"), "utf8"))
  .replace(/<\?xml[^>]*>/, "")
  .replace("<svg ", '<svg role="img" aria-label="Multiversa" ');

const dir = await mkdtemp(join(tmpdir(), "lab-og-"));
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  for (const p of PAGES) {
    const t = DICTIONARIES[p.language];
    const vars = {
      lang: p.language,
      fontSans: font("plus-jakarta-sans", "plus-jakarta-sans-latin-wght-normal.woff2"),
      fontSerifItalic: font("newsreader", "newsreader-latin-opsz-italic.woff2"),
      fontMono: font("jetbrains-mono", "jetbrains-mono-latin-wght-normal.woff2"),
      wordmark,
      preview: escapeHtml(t.header.researchPreview),
      kicker: escapeHtml(t.hero.kicker),
      title: escapeHtml(t.hero.title),
      accent: escapeHtml(t.hero.accent),
      state: escapeHtml(t.status.works),
      integrity: escapeHtml(p.integrity),
      path: p.path,
    };
    const html = template.replace(/\{\{(\w+)\}\}/g, (_, k) => {
      if (!(k in vars)) throw new Error(`og template: unknown placeholder {{${k}}}`);
      return vars[k];
    });
    const file = join(dir, `${p.language}.html`);
    await writeFile(file, html);
    await page.goto(pathToFileURL(file).href);
    await page.evaluate(() => document.fonts.ready);
    const out = join(root, p.out);
    await page.screenshot({ path: out, type: "png" });
    try {
      // 256-colour palette with error diffusion: visually identical on this dark gradient, ~40% smaller.
      execFileSync("convert", [out, "-dither", "FloydSteinberg", "-colors", "256", "-strip", "-define", "png:compression-level=9", `PNG8:${out}`]);
    } catch {
      /* ImageMagick not available: keep Chromium's PNG */
    }
    console.log(`${p.out} (${((await stat(out)).size / 1024).toFixed(0)} kB)`);
  }
} finally {
  await browser.close();
  await rm(dir, { recursive: true, force: true });
}
