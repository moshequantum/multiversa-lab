// Raster fallbacks of public/favicon.svg (the canonical squircle from @multiversa/design-system):
//   public/favicon.ico            16 + 32 px (PNG-in-ICO), for clients without SVG favicons
//   public/icon-192.png           manifest icon
//   public/icon-512.png           manifest icon
//   public/icon-maskable-512.png  manifest icon, full-bleed with the mark inside the 80% safe zone
//
//   pnpm --filter @multiversa/lab-web icons
//
// Needs a Playwright Chromium (PLAYWRIGHT_BROWSERS_PATH or `pnpm exec playwright-core install chromium`).
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = fileURLToPath(new URL("..", import.meta.url));
const pub = (f) => join(root, "public", f);
const svg = await readFile(pub("favicon.svg"), "utf8");
// Squircle fill from the canonical SVG, reused as the maskable background.
const fill = svg.match(/<rect[^>]*fill="(#[0-9A-Fa-f]{6})"/)?.[1] ?? "#0E1422";
const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

const browser = await chromium.launch();
const render = async (size, { maskable = false } = {}) => {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  const inner = maskable ? Math.round(size * 0.8) : size;
  await page.setContent(
    `<html><body style="margin:0;width:${size}px;height:${size}px;display:grid;place-items:center;background:${maskable ? fill : "transparent"}">` +
      `<img src="${dataUrl}" width="${inner}" height="${inner}" style="display:block"></body></html>`
  );
  await page.waitForFunction(() => document.images[0]?.complete);
  const png = await page.screenshot({ type: "png", omitBackground: !maskable });
  await page.close();
  return png;
};

/** ICO container with PNG payloads (supported by every browser since IE Vista-era). */
function ico(images) {
  const header = Buffer.alloc(6 + 16 * images.length);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = header.length;
  images.forEach(({ size, png }, i) => {
    const e = 6 + 16 * i;
    header.writeUInt8(size >= 256 ? 0 : size, e);
    header.writeUInt8(size >= 256 ? 0 : size, e + 1);
    header.writeUInt16LE(1, e + 4); // colour planes
    header.writeUInt16LE(32, e + 6); // bits per pixel
    header.writeUInt32LE(png.length, e + 8);
    header.writeUInt32LE(offset, e + 12);
    offset += png.length;
  });
  return Buffer.concat([header, ...images.map((i) => i.png)]);
}

try {
  const outputs = {
    "favicon.ico": ico([
      { size: 16, png: await render(16) },
      { size: 32, png: await render(32) },
    ]),
    "icon-192.png": await render(192),
    "icon-512.png": await render(512),
    "icon-maskable-512.png": await render(512, { maskable: true }),
  };
  for (const [file, data] of Object.entries(outputs)) {
    await writeFile(pub(file), data);
    console.log(`public/${file} (${(data.length / 1024).toFixed(1)} kB)`);
  }
} finally {
  await browser.close();
}
