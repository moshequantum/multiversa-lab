// Prerenders the full landing once per language after `vite build`:
//   dist/index.html     → /     (es, default)
//   dist/en/index.html  → /en/  (en)
// Each page gets its own <head> (src/seo.ts) and the complete <App /> markup, which src/main.tsx
// hydrates. Crawlers and LLM bots that don't run JS read the same page humans see.
//
// It then checks its own output and exits 1 if anything a crawler relies on is missing (this is the
// build gate that replaced the old hero-shell --check). `--check` only runs the checks on dist/.
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = `${root}dist/`;
const SITE = "https://lab.multiversa.group";
const HEAD_MARK = /<!--app-head:[\s\S]*?-->/;
const HTML_MARK = "<!--app-html-->";
const outFile = (path) => `${dist}${path.replace(/^\//, "")}index.html`;

// noDiscovery: this throwaway SSR server never serves a browser, so skip the dep scan.
const vite = await createServer({
  root,
  logLevel: "error",
  server: { middlewareMode: true },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, include: [] },
});

let failures = 0;
const fail = (msg) => {
  failures++;
  console.error(`prerender check: ${msg}`);
};

try {
  const { renderApp, renderHead, PAGES } = await vite.ssrLoadModule("/src/entry-server.tsx");
  const { DICTIONARIES } = await vite.ssrLoadModule("/src/i18n/index.tsx");
  const { plainText } = await vite.ssrLoadModule("/src/seo.ts");

  if (!process.argv.includes("--check")) {
    const template = await readFile(`${dist}index.html`, "utf8");
    if (!HEAD_MARK.test(template) || !template.includes(HTML_MARK)) {
      throw new Error("dist/index.html is not the template (markers missing). Run `vite build` first.");
    }
    for (const page of PAGES) {
      const html = template
        .replace('<html lang="es"', `<html lang="${page.hreflang}"`)
        .replace(HEAD_MARK, renderHead(page.language).trimStart())
        .replace(HTML_MARK, renderApp(page.language));
      const file = outFile(page.path);
      await mkdir(file.slice(0, file.lastIndexOf("/")), { recursive: true });
      await writeFile(file, html);
      console.log(`prerendered ${page.path} → ${file.replace(root, "")} (${(html.length / 1024).toFixed(1)} kB)`);
    }
  }

  // ---- Checks: what a crawler without JS must find in each page ----
  const SECTIONS = ["top", "anatomia", "integridad", "gobernanza", "posicion", "cuaderno", "bitacora", "usalo", "preguntas"];
  const decode = (s) =>
    s.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
  for (const page of PAGES) {
    const t = DICTIONARIES[page.language];
    const url = `${SITE}${page.path}`;
    const html = await readFile(outFile(page.path), "utf8");
    const text = decode(html.replace(/<[^>]+>/g, ""));
    const where = page.path;
    if (!html.includes(`<html lang="${page.hreflang}"`)) fail(`${where}: <html lang="${page.hreflang}"> missing`);
    if (HEAD_MARK.test(html) || html.includes(HTML_MARK)) fail(`${where}: template markers left in the page`);
    if (!html.includes(`<link rel="canonical" href="${url}" />`)) fail(`${where}: self-referencing canonical missing`);
    for (const p of PAGES) {
      if (!html.includes(`hreflang="${p.hreflang}" href="${SITE}${p.path}"`)) fail(`${where}: hreflang ${p.hreflang} missing`);
    }
    if (!html.includes(`hreflang="x-default" href="${SITE}/"`)) fail(`${where}: hreflang x-default missing`);
    if (!html.includes(`<meta property="og:image" content="${SITE}${page.ogImage}" />`)) fail(`${where}: og:image missing`);
    if (!html.includes(`<meta property="og:url" content="${url}" />`)) fail(`${where}: og:url missing`);
    for (const id of SECTIONS) if (!html.includes(`id="${id}"`)) fail(`${where}: section #${id} not prerendered`);
    const mustRead = [t.hero.accent, t.hero.lede, t.anatomy.lede, t.integrity.lede, t.governance.lede, t.position.lede, t.notebook.lede, t.getIt.lede, t.footer.builtBy];
    for (const s of mustRead) if (!text.includes(s)) fail(`${where}: visible text missing: "${s.slice(0, 60)}…"`);

    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    if (blocks.length !== 1) fail(`${where}: expected 1 JSON-LD block, found ${blocks.length}`);
    for (const [, json] of blocks) {
      let data;
      try {
        data = JSON.parse(json);
      } catch (e) {
        fail(`${where}: JSON-LD does not parse (${e.message})`);
        continue;
      }
      const types = data["@graph"].map((n) => n["@type"]);
      for (const type of ["Organization", "Person", "WebSite", "WebPage", "SoftwareSourceCode", "FAQPage"]) {
        if (!types.includes(type)) fail(`${where}: JSON-LD ${type} missing`);
      }
      const faq = data["@graph"].find((n) => n["@type"] === "FAQPage");
      for (const q of faq?.mainEntity ?? []) {
        // FAQ structured data must correspond to visible content.
        if (!text.includes(q.name)) fail(`${where}: FAQ question not visible: ${q.name}`);
        const answer = q.acceptedAnswer.text;
        const visible = t.faq.items.some((item) => plainText(item.a) === answer);
        if (!visible || !text.includes(answer)) fail(`${where}: FAQ answer does not match the visible copy: ${q.name}`);
      }
      if (faq?.inLanguage !== page.hreflang) fail(`${where}: FAQPage inLanguage should be ${page.hreflang}`);
    }
    if (/v1\.0|zero hallucination|deterministic ai standard/i.test(text)) {
      // The errata quote "OpenPassport v1.0" to withdraw it; anything else is a regression.
      const hits = text.match(/.{0,40}(v1\.0|zero hallucination|deterministic ai standard).{0,40}/gi) ?? [];
      for (const h of hits) if (!h.includes(t.notebook.errata[0].claim.slice(0, 20))) fail(`${where}: forbidden claim: ${h}`);
    }
  }
} finally {
  await vite.close();
}

if (failures) {
  console.error(`prerender check failed (${failures})`);
  process.exitCode = 1;
} else {
  console.log("prerender check: / and /en/ complete (head, hreflang, sections, JSON-LD, FAQ)");
}
