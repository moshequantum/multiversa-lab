import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pkgRoot = path.resolve(__dirname, '..');

test('Canonical Brand Assets (SVG) integrity', () => {
  const assetsDir = path.join(pkgRoot, 'assets');
  assert.ok(fs.existsSync(assetsDir), 'assets directory exists');

  const requiredAssets = [
    'multiversa-isotype.svg',
    'multiversa-isotype-squircle.svg',
    'multiversa-wordmark-light.svg',
    'multiversa-wordmark-dark.svg',
    'multiversa-favicon-dark.svg',
    'multiversa-favicon-light.svg',
    'multiversa-favicon-squircle.svg',
  ];

  for (const asset of requiredAssets) {
    const assetPath = path.join(assetsDir, asset);
    assert.ok(fs.existsSync(assetPath), `Asset ${asset} exists`);
    const content = fs.readFileSync(assetPath, 'utf8');
    assert.ok(content.startsWith('<svg'), `${asset} starts with <svg`);
    assert.ok(content.includes('</svg>'), `${asset} ends with </svg>`);
  }

  // Verify authentic isotype geometry
  const isotypeSvg = fs.readFileSync(path.join(assetsDir, 'multiversa-isotype.svg'), 'utf8');
  assert.ok(isotypeSvg.includes('viewBox="0 0 512 512"'), 'viewBox is 0 0 512 512');
  assert.ok(
    isotypeSvg.includes('M189.25 355.03H116.00L143.47 156.97H216.77L189.25 355.03Z'),
    'Contains authentic pillar 1'
  );
  assert.ok(
    isotypeSvg.includes('M280.71 355.03H207.41L234.93 156.97H308.18L280.71 355.03Z'),
    'Contains authentic pillar 2'
  );
  assert.ok(
    isotypeSvg.includes('M372.12 355.03H298.87L326.34 156.97H343.97C373.37 156.97 396.00 182.93 391.94 212.06L372.12 355.03Z'),
    'Contains authentic pillar 3'
  );

  // Mathematical center verification:
  // X: min=116.00, max=396.00 -> center = (116+396)/2 = 256.00
  // Y: min=156.97, max=355.03 -> center = (156.97+355.03)/2 = 256.00
  assert.equal((116.00 + 396.00) / 2, 256.00, 'X is mathematically centered at 256');
  assert.equal((156.97 + 355.03) / 2, 256.00, 'Y is mathematically centered at 256');
});

// Cosmic Night: the values both live sites ship (lab.multiversa.group, multiversa.group).
const CANONICAL_CHANNELS = {
  background: '0.1743 0.0227 283.7998',
  foreground: '0.9185 0.0257 285.8834',
  card: '0.2284 0.0384 282.9324',
  primary: '0.7162 0.1597 290.3962',
  'secondary-foreground': '0.8367 0.0849 285.9111',
  'muted-foreground': '0.7166 0.0462 285.1741',
  border: '0.3261 0.0597 282.5832',
  alternative: '0.75 0.14 65',
};

// Discontinued palette (before Cosmic Night). Must not come back as tokens.
const DISCONTINUED_HEX = ['#0e1422', '#6d28d9', '#f5f3ff', '#d97706'];

const read = (...p) => fs.readFileSync(path.join(pkgRoot, ...p), 'utf8');

test('tokens.css carries the canonical Cosmic Night values', () => {
  const css = read('tokens.css');
  for (const [name, value] of Object.entries(CANONICAL_CHANNELS)) {
    assert.ok(css.includes(`--${name}: ${value};`), `tokens.css defines --${name}: ${value}`);
  }
  for (const alias of ['--color-primary', '--color-canvas', '--color-ivory', '--color-muted', '--color-alternative', '--color-surface']) {
    assert.match(css, new RegExp(`${alias}:\\s*oklch\\(var\\(--`), `tokens.css defines full-color alias ${alias}`);
  }
  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.exports['./tokens.css'], './tokens.css', 'package exports ./tokens.css');
  assert.ok(pkg.files.includes('tokens.css'), 'tokens.css is published');
});

test('Color tokens & Brand Rules integrity', () => {
  const colorsFile = read('src', 'tokens', 'colors.ts');
  for (const value of Object.values(CANONICAL_CHANNELS)) {
    assert.ok(colorsFile.includes(`'${value}'`), `colors.ts mirrors ${value}`);
  }
  for (const hex of DISCONTINUED_HEX) {
    assert.ok(!colorsFile.toLowerCase().includes(hex), `colors.ts does not ship discontinued ${hex}`);
  }

  // STRICT INVARIANT: NO Chartreuse (#d4ff00), anywhere in the package sources.
  const files = ['tokens.css', 'preset.cjs', 'README.md', ...fs.readdirSync(path.join(pkgRoot, 'src'), { recursive: true }).map((f) => path.join('src', f))];
  for (const file of files) {
    const fullPath = path.join(pkgRoot, file);
    if (!fs.statSync(fullPath).isFile()) continue;
    const content = fs.readFileSync(fullPath, 'utf8').toLowerCase();
    assert.ok(!content.includes('#d4ff00'), `${file} must not contain chartreuse #d4ff00`);
    if (file !== 'README.md') assert.ok(!content.includes('chartreuse:'), `${file} must not define a chartreuse token`);
  }
});

test('Typography tokens integrity', () => {
  const typoFile = fs.readFileSync(path.join(pkgRoot, 'src', 'tokens', 'typography.ts'), 'utf8');
  assert.ok(typoFile.includes('Plus Jakarta Sans'), 'Display / Sans includes Plus Jakarta Sans');
  assert.ok(typoFile.includes('Newsreader'), 'Editorial / Serif includes Newsreader');
  assert.ok(typoFile.includes('JetBrains Mono'), 'Monospace / Code includes JetBrains Mono');
});

test('Tailwind preset integrity', async () => {
  const { createRequire } = await import('node:module');
  const require = createRequire(import.meta.url);
  const presetCjs = require(path.join(pkgRoot, 'preset.cjs'));
  const c = presetCjs.theme.extend.colors;
  assert.equal(c.primary, 'oklch(var(--primary) / <alpha-value>)', 'primary reads the tokens.css channel');
  assert.equal(c.canvas, 'oklch(var(--background) / <alpha-value>)');
  assert.equal(c.ivory, 'oklch(var(--foreground) / <alpha-value>)');
  assert.equal(c.muted, 'oklch(var(--muted-foreground) / <alpha-value>)');
  for (const old of ['titanium', 'violet', 'lavender']) assert.equal(c[old], undefined, `no discontinued ${old} scale`);
  assert.equal(presetCjs.multiversaPreset, presetCjs, 'named export');
  const fonts = JSON.stringify(presetCjs.theme.extend.fontFamily);
  for (const f of ['Plus Jakarta Sans', 'Newsreader', 'JetBrains Mono']) assert.ok(fonts.includes(f), `preset defines ${f}`);

  const pkg = JSON.parse(read('package.json'));
  assert.equal(pkg.exports['./preset'].require, './preset.cjs', 'require() resolves to the CommonJS preset');
});

test('MultiversaLogo uses the exact paths of the official lockup asset', async () => {
  const { pathToFileURL } = await import('node:url');
  const asset = read('assets', 'multiversa-wordmark-light.svg');
  assert.ok(asset.includes('viewBox="0 0 680 135"'), 'asset viewBox is 0 0 680 135');
  const assetPaths = [...asset.matchAll(/<path d="([^"]+)"/g)].map((m) => m[1]);
  assert.equal(assetPaths.length, 15, 'asset has 15 paths (wordmark + pillars + squircle)');

  const { MULTIVERSA_LOCKUP_PATHS, MULTIVERSA_LOCKUP_VIEWBOX } = await import(pathToFileURL(path.join(pkgRoot, 'dist', 'assets', 'svg.js')).href);
  assert.deepEqual([...MULTIVERSA_LOCKUP_PATHS], assetPaths, 'lockup paths match the asset byte for byte');
  assert.equal(MULTIVERSA_LOCKUP_VIEWBOX, '0 0 680 135');

  const logo = read('src', 'components', 'MultiversaLogo.tsx');
  assert.ok(logo.includes('export function MultiversaLogo'), 'MultiversaLogo exported');
  assert.ok(logo.includes('MULTIVERSA_LOCKUP_PATHS'), 'MultiversaLogo renders the canonical paths');
  assert.ok(logo.includes('fill="currentColor"'), 'MultiversaLogo paints with currentColor');
  assert.ok(logo.includes("'aria-label': title"), 'MultiversaLogo has an accessible label');

  // Rendered markup: every asset path is present, painted with currentColor, labelled.
  const React = await import('react');
  const { renderToStaticMarkup } = await import('react-dom/server');
  const { MultiversaLogo } = await import(pathToFileURL(path.join(pkgRoot, 'dist', 'components', 'MultiversaLogo.js')).href);
  const html = renderToStaticMarkup(React.createElement(MultiversaLogo, { height: 27 }));
  for (const d of assetPaths) assert.ok(html.includes(`d="${d}"`), 'rendered logo contains asset path');
  assert.ok(html.includes('aria-label="Multiversa"') && html.includes('role="img"'), 'rendered logo is labelled');
  assert.ok(!html.includes('#'), 'rendered logo has no hard-coded color');
  const deco = renderToStaticMarkup(React.createElement(MultiversaLogo, { decorative: true }));
  assert.ok(deco.includes('aria-hidden="true"') && !deco.includes('aria-label'), 'decorative logo is hidden from AT');
});

test('React Components export integrity', () => {
  const isotypeComp = fs.readFileSync(path.join(pkgRoot, 'src', 'components', 'MultiversaIsotype.tsx'), 'utf8');
  assert.ok(isotypeComp.includes('export function MultiversaIsotype'), 'MultiversaIsotype component exported');
  assert.ok(isotypeComp.includes('MULTIVERSA_ISOTYPE_PATHS'), 'MultiversaIsotype uses authentic paths');

  const pillComp = fs.readFileSync(path.join(pkgRoot, 'src', 'components', 'StatusPill.tsx'), 'utf8');
  assert.ok(pillComp.includes('export function StatusPill'), 'StatusPill component exported');
  assert.ok(pillComp.includes('production'), 'StatusPill supports production variant');
  assert.ok(pillComp.includes('operating'), 'StatusPill supports operating variant');
  assert.ok(pillComp.includes('standard'), 'StatusPill supports standard variant');
  assert.ok(pillComp.includes('delivers'), 'StatusPill supports delivers variant');

  const cardComp = fs.readFileSync(path.join(pkgRoot, 'src', 'components', 'DesignCard.tsx'), 'utf8');
  assert.ok(cardComp.includes('export function DesignCard'), 'DesignCard component exported');
  assert.ok(cardComp.includes('multiversa-card'), 'DesignCard defines multiversa-card styling');
});

test('Compiled dist export and bundle integrity', async () => {
  const { pathToFileURL } = await import('node:url');
  const distIndex = path.join(pkgRoot, 'dist', 'index.js');
  assert.ok(fs.existsSync(distIndex), 'dist/index.js exists');

  const mainExports = await import(pathToFileURL(distIndex).href);
  assert.ok(mainExports.MultiversaLogo, 'MultiversaLogo is exported from dist/index.js');
  assert.ok(mainExports.MultiversaIsotype, 'MultiversaIsotype is exported from dist/index.js');
  assert.ok(mainExports.StatusPill, 'StatusPill is exported from dist/index.js');
  assert.ok(mainExports.DesignCard, 'DesignCard is exported from dist/index.js');
  assert.ok(mainExports.colors, 'colors are exported from dist/index.js');
  assert.ok(mainExports.typography, 'typography is exported from dist/index.js');
  assert.ok(mainExports.MULTIVERSA_ISOTYPE_PATHS, 'MULTIVERSA_ISOTYPE_PATHS exported');
  assert.ok(mainExports.multiversaPreset, 'multiversaPreset is exported');

  // Verify compiled preset
  const distPreset = path.join(pkgRoot, 'dist', 'preset.js');
  assert.ok(fs.existsSync(distPreset), 'dist/preset.js exists');
  const presetExports = await import(pathToFileURL(distPreset).href);
  assert.ok(presetExports.multiversaPreset, 'multiversaPreset exported from dist/preset.js');
  assert.equal(presetExports.multiversaPreset.theme.extend.colors.primary, 'oklch(var(--primary) / <alpha-value>)');
  assert.equal(mainExports.colors.primary, 'oklch(0.7162 0.1597 290.3962)', 'colors.primary is Cosmic Night primary');
  assert.equal(mainExports.colors.background, 'oklch(0.1743 0.0227 283.7998)', 'colors.background is Cosmic Night canvas');
  assert.equal(mainExports.withAlpha('primary', 0.2), 'oklch(0.7162 0.1597 290.3962 / 0.2)');

  // ESM and CommonJS presets stay in sync.
  const { createRequire } = await import('node:module');
  const cjs = createRequire(import.meta.url)(path.join(pkgRoot, 'preset.cjs'));
  assert.deepEqual(JSON.parse(JSON.stringify(cjs.theme)), JSON.parse(JSON.stringify(presetExports.multiversaPreset.theme)), 'preset.cjs mirrors src/preset.ts');
});

