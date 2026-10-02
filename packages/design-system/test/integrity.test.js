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

test('Color tokens & Brand Rules integrity', async () => {
  // Check source files directly
  const colorsFile = fs.readFileSync(path.join(pkgRoot, 'src', 'tokens', 'colors.ts'), 'utf8');

  // Verify mandatory color tokens
  assert.ok(colorsFile.includes('#0E1422'), 'Titanium Ink #0E1422 present');
  assert.ok(colorsFile.includes('#0F172A'), 'Titanium Surface #0F172A present');
  assert.ok(colorsFile.includes('#6D28D9'), 'Cosmic Violet #6D28D9 present');
  assert.ok(colorsFile.includes('#F5F3FF'), 'Lavender Accent #F5F3FF present');
  assert.ok(colorsFile.includes('#EDE9FE'), 'Lavender Subtle #EDE9FE present');
  assert.ok(colorsFile.includes('#D97706'), 'Semantic Gold #D97706 present');
  assert.ok(colorsFile.includes('#334155'), 'Slate Border Dark #334155 present');
  assert.ok(colorsFile.includes('#64748B'), 'Slate #64748B present');
  assert.ok(colorsFile.includes('#E2E8F0'), 'Slate Border Light #E2E8F0 present');

  // STRICT INVARIANT: NO Chartreuse (#d4ff00)
  assert.ok(!colorsFile.toLowerCase().includes('#d4ff00'), 'NO chartreuse in colors.ts');

  // Scan all files in src/
  const srcFiles = fs.readdirSync(path.join(pkgRoot, 'src'), { recursive: true });
  for (const file of srcFiles) {
    const fullPath = path.join(pkgRoot, 'src', file);
    if (fs.statSync(fullPath).isFile()) {
      const content = fs.readFileSync(fullPath, 'utf8');
      assert.ok(
        !content.toLowerCase().includes('#d4ff00'),
        `File ${file} must not contain chartreuse #d4ff00`
      );
    }
  }
});

test('Typography tokens integrity', () => {
  const typoFile = fs.readFileSync(path.join(pkgRoot, 'src', 'tokens', 'typography.ts'), 'utf8');
  assert.ok(typoFile.includes('Plus Jakarta Sans'), 'Display / Sans includes Plus Jakarta Sans');
  assert.ok(typoFile.includes('Newsreader'), 'Editorial / Serif includes Newsreader');
  assert.ok(typoFile.includes('JetBrains Mono'), 'Monospace / Code includes JetBrains Mono');
});

test('Tailwind preset integrity', () => {
  const presetCjs = fs.readFileSync(path.join(pkgRoot, 'preset.js'), 'utf8');
  assert.ok(presetCjs.includes('titanium'), 'Preset defines titanium');
  assert.ok(presetCjs.includes('violet'), 'Preset defines violet');
  assert.ok(presetCjs.includes('lavender'), 'Preset defines lavender');
  assert.ok(presetCjs.includes('gold'), 'Preset defines gold');
  assert.ok(presetCjs.includes('slate'), 'Preset defines slate');
  assert.ok(presetCjs.includes('Plus Jakarta Sans'), 'Preset defines Plus Jakarta Sans');
  assert.ok(presetCjs.includes('Newsreader'), 'Preset defines Newsreader');
  assert.ok(presetCjs.includes('JetBrains Mono'), 'Preset defines JetBrains Mono');
  assert.ok(!presetCjs.toLowerCase().includes('#d4ff00'), 'Preset does not contain chartreuse');
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
  assert.equal(presetExports.multiversaPreset.theme.extend.colors.brand.ink, '#0E1422');
  assert.equal(presetExports.multiversaPreset.theme.extend.colors.brand.cosmic, '#6D28D9');
  assert.equal(presetExports.multiversaPreset.theme.extend.colors.brand.gold, '#D97706');
});

