// Regenerates the static first-paint shell in index.html (header + chapter 00) from the React
// components, so the HTML painted before JS is byte-identical to what React mounts.
//   pnpm --filter @multiversa/lab-web hero-shell          → rewrite index.html
//   pnpm --filter @multiversa/lab-web hero-shell --check  → exit 1 if index.html is stale
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = fileURLToPath(new URL("..", import.meta.url));
const START = "<!--hero-shell:start-->";
const END = "<!--hero-shell:end-->";

// noDiscovery: this throwaway SSR server never serves a browser, so skip the dep scan (it would
// otherwise log "server is being restarted or closed" when we close it mid-scan).
const vite = await createServer({
  root,
  logLevel: "error",
  server: { middlewareMode: true },
  appType: "custom",
  optimizeDeps: { noDiscovery: true, include: [] },
});
try {
  const { renderShell } = await vite.ssrLoadModule("/src/shell.tsx");
  const markup = renderShell();
  const file = `${root}index.html`;
  const html = await readFile(file, "utf8");
  const a = html.indexOf(START);
  const b = html.indexOf(END);
  if (a < 0 || b < 0) throw new Error("hero-shell markers not found in index.html");
  const next = html.slice(0, a + START.length) + markup + html.slice(b);
  if (process.argv.includes("--check")) {
    if (next !== html) {
      console.error("index.html hero shell is stale. Run: pnpm --filter @multiversa/lab-web hero-shell");
      process.exitCode = 1;
    } else console.log("hero shell up to date");
  } else {
    await writeFile(file, next);
    console.log("index.html hero shell regenerated");
  }
} finally {
  await vite.close();
}
