// Fails if a brand SVG served by the Lab drifts from the canonical copy in
// @multiversa/design-system/assets (byte comparison). Runs as part of `build`.
//   pnpm --filter @multiversa/lab-web check:brand
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const publicDir = fileURLToPath(new URL("../public/", import.meta.url));
const assetsDir = fileURLToPath(new URL("../../../packages/design-system/assets/", import.meta.url));

// Files served under a different name than the canonical asset.
const RENAMED = { "favicon.svg": "multiversa-favicon-squircle.svg" };

const canonical = new Set((await readdir(assetsDir)).filter((f) => f.endsWith(".svg")));
const served = (await readdir(publicDir)).filter((f) => f.endsWith(".svg"));

const pairs = served
  .map((file) => [file, RENAMED[file] ?? file])
  .filter(([, source]) => canonical.has(source));

const unpaired = served.filter((f) => f.startsWith("multiversa-") && !canonical.has(f));
const drift = [];
for (const [file, source] of pairs) {
  const [a, b] = await Promise.all([readFile(publicDir + file), readFile(assetsDir + source)]);
  if (!a.equals(b)) drift.push(`public/${file} ≠ design-system/assets/${source}`);
}

if (pairs.length === 0) {
  console.error("check-brand-assets: no brand SVGs matched; paths are wrong.");
  process.exit(1);
}
if (drift.length || unpaired.length) {
  for (const d of drift) console.error(`brand asset drift: ${d}`);
  for (const u of unpaired) console.error(`brand asset without canonical source: public/${u}`);
  console.error("Copy the file from packages/design-system/assets/ (the design system is the source of truth).");
  process.exit(1);
}
console.log(`brand assets in sync with @multiversa/design-system (${pairs.length} files)`);
